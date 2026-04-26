import { randomUUID } from 'crypto';
import { SideEffectStatus, AdrReportRoutingStatus, AdrSideEffectSourceType } from '../../generated/client/client';
import { prisma } from '../lib/prisma';
import { getPatientSideEffectsFallbackRedirectUrl } from '../controllers/settings.controller';
import { sendMail } from './mail.service';
import { extractSideEffects } from './sideEffectExtract.service';
import { DEFAULT_ADR_QUESTION_TEMPLATE } from '../constants/adrQuestionDefaults';
import type { AdrQuestionFieldTypeCode } from '../constants/adrQuestionFieldType';

export type AdrQuestionTemplateItem = {
  key: string;
  labelEn: string;
  labelAr: string;
  required: boolean;
  /** Mobile: how to render input (`TEXT`, `DATE`, `BOOLEAN`, …). */
  fieldType: AdrQuestionFieldTypeCode;
  label?: string;
};

function rowsToTemplateItems(
  rows: Array<{
    key: string;
    labelEn: string;
    labelAr: string;
    required: boolean;
    fieldType: AdrQuestionFieldTypeCode;
  }>,
): AdrQuestionTemplateItem[] {
  return rows.map((q) => ({
    key: q.key,
    labelEn: q.labelEn,
    labelAr: q.labelAr,
    required: q.required,
    fieldType: q.fieldType,
  }));
}

/** Active questions for patient template and required validation (DB, else code defaults). */
export async function loadActiveAdrQuestions(): Promise<AdrQuestionTemplateItem[]> {
  try {
    const rows = await prisma.adrQuestion.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
      select: { key: true, labelEn: true, labelAr: true, required: true, fieldType: true },
    });
    if (rows.length === 0) {
      return rowsToTemplateItems(DEFAULT_ADR_QUESTION_TEMPLATE);
    }
    return rowsToTemplateItems(rows);
  } catch {
    return rowsToTemplateItems(DEFAULT_ADR_QUESTION_TEMPLATE);
  }
}

/** All questions by key (including inactive) for answer label snapshots and email display. */
export async function loadAdrQuestionLabelMap(): Promise<Map<string, { labelEn: string; labelAr: string }>> {
  const map = new Map<string, { labelEn: string; labelAr: string }>();
  try {
    const rows = await prisma.adrQuestion.findMany({
      select: { key: true, labelEn: true, labelAr: true },
    });
    for (const r of rows) {
      map.set(r.key, { labelEn: r.labelEn, labelAr: r.labelAr });
    }
  } catch {
    // missing table / DB unavailable — use defaults below
  }
  if (map.size === 0) {
    for (const d of DEFAULT_ADR_QUESTION_TEMPLATE) {
      map.set(d.key, { labelEn: d.labelEn, labelAr: d.labelAr });
    }
  }
  return map;
}

export async function getAdrQuestionTemplate(lang: string = 'en'): Promise<AdrQuestionTemplateItem[]> {
  const base = await loadActiveAdrQuestions();
  const isArabic = lang.toLowerCase().startsWith('ar');
  return base.map((q) => ({
    key: q.key,
    labelEn: q.labelEn,
    labelAr: q.labelAr,
    required: q.required,
    fieldType: q.fieldType,
    ...(isArabic ? { label: q.labelAr } : { label: q.labelEn }),
  }));
}

type SubmitAdrReportInput = {
  userId: number;
  tradeNameId: number;
  locale?: string;
  sideEffects: Array<{
    name: string;
    answers: Array<{
      questionKey: string;
      answerValue: string;
    }>;
  }>;
};

function toReportKey(name: string): string {
  return name.trim().toLowerCase();
}

function findCompanyEmail(contactInfo: unknown): string | null {
  if (!contactInfo || typeof contactInfo !== 'object' || Array.isArray(contactInfo)) return null;
  const obj = contactInfo as Record<string, unknown>;
  if (typeof obj.email === 'string' && obj.email.trim()) return obj.email.trim();
  if (Array.isArray(obj.emails) && typeof obj.emails[0] === 'string' && obj.emails[0].trim()) {
    return obj.emails[0].trim();
  }
  return null;
}

async function buildAllowedSideEffects(activeSubstanceId: number) {
  const records = await prisma.medicationSideEffect.findMany({
    where: {
      activeSubstanceId,
      sideEffect: { status: SideEffectStatus.Approved },
    },
    include: { sideEffect: true },
  });

  const out = new Map<
    string,
    { sourceType: AdrSideEffectSourceType; organ: string | null; frequency: string | null }
  >();

  for (const r of records) {
    out.set(toReportKey(r.sideEffect.name), {
      sourceType: AdrSideEffectSourceType.CATALOG,
      organ: r.bodySystem ?? null,
      frequency: r.frequency ?? null,
    });
  }

  const extracted = await extractSideEffects(activeSubstanceId);
  if (extracted) {
    for (const [organ, rows] of Object.entries(extracted.sideEffects)) {
      for (const row of rows) {
        const key = toReportKey(row.name);
        if (out.has(key)) continue;
        out.set(key, {
          sourceType: AdrSideEffectSourceType.EXTRACTED,
          organ,
          frequency: row.frequency,
        });
      }
    }
  }

  return out;
}

type AdrEmailAnswerLine = { questionKey: string; answerValue: string; displayLabel: string };

type AdrEmailPayload = {
  referenceCode: string;
  tradeNameTitle: string;
  submittedAt: Date;
  sideEffects: Array<{ name: string; answers: AdrEmailAnswerLine[] }>;
};

export function buildAnonymizedAdrEmailText(params: AdrEmailPayload): string {
  const lines = params.sideEffects
    .map((s, idx) => {
      const answers = s.answers.map((a) => `- ${a.displayLabel}: ${a.answerValue}`).join('\n');
      return `${idx + 1}) ${s.name}\n${answers}`;
    })
    .join('\n\n');

  return [
    'An adverse drug reaction report was submitted.',
    '',
    `Reference: ${params.referenceCode}`,
    `Trade Name: ${params.tradeNameTitle}`,
    `Submitted At: ${params.submittedAt.toISOString()}`,
    '',
    'Side effects and answers:',
    lines,
  ].join('\n');
}

async function sendAnonymizedAdrEmail(params: {
  to: string;
} & AdrEmailPayload) {
  const text = buildAnonymizedAdrEmailText(params);

  await sendMail({
    to: params.to,
    subject: `ADR Report ${params.referenceCode} - ${params.tradeNameTitle}`,
    text,
  });
}

function labelForLocale(
  labels: { labelEn: string; labelAr: string },
  locale: string,
): string {
  return locale.toLowerCase().startsWith('ar') ? labels.labelAr : labels.labelEn;
}

export async function submitAdrReport(input: SubmitAdrReportInput) {
  const patient = await prisma.patient.findUnique({ where: { userId: input.userId } });
  if (!patient) {
    return { ok: false as const, status: 404, error: 'PATIENT_NOT_FOUND', message: 'Patient profile not found' };
  }

  if (!Array.isArray(input.sideEffects) || input.sideEffects.length === 0) {
    return {
      ok: false as const,
      status: 400,
      error: 'INVALID_SIDE_EFFECTS',
      message: 'sideEffects must be a non-empty array (POST /side-effects/add)',
    };
  }

  const tradeName = await prisma.tradeName.findUnique({
    where: { id: input.tradeNameId },
    include: { company: true, activeSubstance: { select: { id: true } } },
  });
  if (!tradeName) {
    return { ok: false as const, status: 404, error: 'TRADE_NAME_NOT_FOUND', message: 'Trade name not found' };
  }

  const [allowed, activeTemplate, labelMap] = await Promise.all([
    buildAllowedSideEffects(tradeName.activeSubstanceId),
    loadActiveAdrQuestions(),
    loadAdrQuestionLabelMap(),
  ]);

  const invalid: string[] = [];
  const normalizedPayload: Array<{
    name: string;
    key: string;
    answers: Array<{ questionKey: string; answerValue: string }>;
    meta: { sourceType: AdrSideEffectSourceType; organ: string | null; frequency: string | null };
  }> = [];

  const seen = new Set<string>();
  for (const item of input.sideEffects) {
    const rawName = typeof item?.name === 'string' ? item.name.trim() : '';
    const key = toReportKey(rawName);
    if (!rawName || seen.has(key)) continue;
    seen.add(key);

    const meta = allowed.get(key);
    if (!meta) {
      invalid.push(rawName || '(empty)');
      continue;
    }

    const answers = Array.isArray(item.answers)
      ? item.answers
          .map((a) => ({
            questionKey: typeof a?.questionKey === 'string' ? a.questionKey.trim() : '',
            answerValue: typeof a?.answerValue === 'string' ? a.answerValue.trim() : '',
          }))
          .filter((a) => a.questionKey && a.answerValue)
      : [];

    const requiredKeys = activeTemplate.filter((q) => q.required).map((q) => q.key);
    const answeredKeys = new Set(answers.map((a) => a.questionKey));
    const missing = requiredKeys.filter((k) => !answeredKeys.has(k));
    if (missing.length > 0) {
      return {
        ok: false as const,
        status: 400,
        error: 'MISSING_REQUIRED_ANSWERS',
        message: `Missing required answers for side effect "${rawName}" (use GET /adr/questions-template for keys)`,
        missingQuestionKeys: missing,
      };
    }

    normalizedPayload.push({ name: rawName, key, answers, meta });
  }

  if (invalid.length > 0) {
    return {
      ok: false as const,
      status: 400,
      error: 'INVALID_SIDE_EFFECT_SELECTION',
      message:
        'Some selected side effects are not available for this medicine (names must match catalog or extracted list from GET /medicines/{tradeNameId}/side-effects or GET /side-effects/by-medication/{id})',
      invalidSideEffects: invalid,
    };
  }

  if (normalizedPayload.length === 0) {
    return { ok: false as const, status: 400, error: 'INVALID_SIDE_EFFECTS', message: 'No valid side effects were submitted' };
  }

  const referenceCode = `ADR-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${randomUUID().slice(0, 8).toUpperCase()}`;
  const locale = typeof input.locale === 'string' && input.locale.trim() ? input.locale.trim() : 'en';
  const companyEmail = findCompanyEmail(tradeName.company?.contactInfo ?? null);

  const initialRoutingStatus = tradeName.company ? AdrReportRoutingStatus.EMAIL_FAILED : AdrReportRoutingStatus.STORED_ONLY;

  const resolveLabels = (questionKey: string) => {
    const fromDb = labelMap.get(questionKey);
    if (fromDb) {
      return { labelEn: fromDb.labelEn, labelAr: fromDb.labelAr };
    }
    const fromDefault = DEFAULT_ADR_QUESTION_TEMPLATE.find((t) => t.key === questionKey);
    if (fromDefault) {
      return { labelEn: fromDefault.labelEn, labelAr: fromDefault.labelAr };
    }
    return { labelEn: questionKey, labelAr: questionKey };
  };

  const created = await prisma.adrReport.create({
    data: {
      referenceCode,
      patientId: patient.id,
      tradeNameId: tradeName.id,
      activeSubstanceId: tradeName.activeSubstanceId,
      companyId: tradeName.companyId,
      locale,
      routingStatus: initialRoutingStatus,
      emailStatus: tradeName.company ? 'PENDING' : 'SKIPPED_NO_COMPANY',
      items: {
        create: normalizedPayload.map((p) => ({
          sideEffectName: p.name,
          reportKey: p.key,
          sourceType: p.meta.sourceType,
          organ: p.meta.organ,
          frequency: p.meta.frequency,
          answers: {
            create: p.answers.map((a) => {
              const { labelEn, labelAr } = resolveLabels(a.questionKey);
              return {
                questionKey: a.questionKey,
                questionLabelEn: labelEn,
                questionLabelAr: labelAr,
                answerValue: a.answerValue,
              };
            }),
          },
        })),
      },
    },
    include: {
      items: {
        include: { answers: true },
      },
    },
  });

  let routingStatus = created.routingStatus;
  let emailStatus = created.emailStatus;
  let emailError: string | null = null;

  const emailSideEffects = normalizedPayload.map((p) => ({
    name: p.name,
    answers: p.answers.map((a) => {
      const labels = resolveLabels(a.questionKey);
      return {
        questionKey: a.questionKey,
        answerValue: a.answerValue,
        displayLabel: labelForLocale(labels, locale),
      };
    }),
  }));

  if (tradeName.company && companyEmail) {
    try {
      await sendAnonymizedAdrEmail({
        to: companyEmail,
        referenceCode: created.referenceCode,
        tradeNameTitle: tradeName.title,
        submittedAt: created.submittedAt,
        sideEffects: emailSideEffects,
      });
      routingStatus = AdrReportRoutingStatus.STORED_AND_EMAILED;
      emailStatus = 'SENT';
    } catch (err: any) {
      routingStatus = AdrReportRoutingStatus.EMAIL_FAILED;
      emailStatus = 'FAILED';
      emailError = String(err?.message ?? err);
    }
  } else if (tradeName.company && !companyEmail) {
    routingStatus = AdrReportRoutingStatus.EMAIL_FAILED;
    emailStatus = 'FAILED_NO_COMPANY_EMAIL';
    emailError = 'Company exists but no email was found in contactInfo';
  } else {
    routingStatus = AdrReportRoutingStatus.STORED_ONLY;
    emailStatus = 'SKIPPED_NO_COMPANY';
  }

  const updated = await prisma.adrReport.update({
    where: { id: created.id },
    data: { routingStatus, emailStatus, emailError },
    include: {
      items: {
        include: { answers: true },
      },
    },
  });

  const externalSubmitUrl = !tradeName.company ? await getPatientSideEffectsFallbackRedirectUrl() : null;

  return {
    ok: true as const,
    report: updated,
    result: routingStatus === AdrReportRoutingStatus.STORED_AND_EMAILED ? 'stored_and_emailed' : 'stored_only',
    externalSubmitUrl,
  };
}
