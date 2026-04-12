/**
 * Pharma Safety Engine
 *
 * Unified drug safety evaluation against a patient's full medical profile.
 * Returns a RED / ORANGE / GREEN color status with structured warnings and
 * a filtered subset of drug data relevant to the patient.
 *
 * All 7 checks run per drug:
 *   1. Allergy
 *   2. Disease (body system mapping + warning rules + contraindication keywords)
 *   3. Family Disease (Father/Mother only → ORANGE ceiling)
 *   4. Lifestyle
 *   5. Surgical History (recent organs only)
 *   6. Drug Interaction (text match against current meds)
 *   7. Cancer Risk (family triggersCancerCheck + carcinogenicityMutagenicity)
 */

import { prisma } from '../lib/prisma';
import { WarningSeverity, FamilyRelation, SurgeryTimeframe, PrescriptionStatus } from '../../generated/client/client';
import { checkAllergyConflicts } from './allergyCheck.service';

// ─── Public Types ─────────────────────────────────────────────────────────────

export type StatusColor = 'RED' | 'ORANGE' | 'GREEN';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PatientContext = any;

export interface SafetyWarning {
  checkType:
    | 'allergy'
    | 'disease'
    | 'contraindication'
    | 'familyDisease'
    | 'lifestyle'
    | 'surgery'
    | 'drugInteraction'
    | 'cancerRisk';
  severity: WarningSeverity;
  statusColor: StatusColor;
  message: string;
  blocked: boolean;
}

export interface SafetyEvalInput {
  patientId: number;
  tradeNameId?: number | null;
  activeSubstanceId?: number | null;
  /**
   * Optional pre-loaded patient context. When evaluating many drugs for the
   * same patient (e.g. search results), call loadPatientContext() once in the
   * controller and pass the result here to avoid an N+1 database query.
   */
  preloadedPatient?: PatientContext;
}

export interface SafetyEvalResult {
  statusColor: StatusColor;
  blocked: boolean;
  warnings: SafetyWarning[];
  filteredData: Record<string, unknown>;
}

// ─── Shared Utility ───────────────────────────────────────────────────────────

/**
 * Returns true when the value contains real clinical text.
 * Handles plain strings, JSON translation objects { en, ar }, and nulls.
 */
export function hasContent(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  let text: string;
  if (typeof value === 'object') {
    text = (value as Record<string, string>).en ?? JSON.stringify(value);
  } else {
    text = String(value);
  }
  const normalized = text.trim().toUpperCase();
  return (
    normalized !== '' &&
    normalized !== 'NA' &&
    normalized !== 'N/A' &&
    normalized !== 'NIL' &&
    normalized !== 'NONE' &&
    normalized !== '-'
  );
}

function extractText(value: unknown): string {
  if (!value) return '';
  if (typeof value === 'object') {
    return (value as Record<string, string>).en ?? JSON.stringify(value);
  }
  return String(value);
}

// ─── Static Maps ──────────────────────────────────────────────────────────────

/**
 * Maps organ names (stored in Organ.name) to the corresponding
 * ActiveSubstance warning field. Only organs present in this map
 * are checked; unmapped organs are silently skipped.
 */
const ORGAN_TO_WARNING_FIELD: Record<string, string> = {
  liver:       'hepaticWarning',
  kidney:      'renalWarning',
  heart:       'cardiacWarning',
  lung:        'pulmonaryWarning',
  respiratory: 'pulmonaryWarning',
  eye:         'eyeDisordersWarning',
  ear:         'earDisordersWarning',
  stomach:     'gitWarning',
  intestine:   'gitWarning',
  git:         'gitWarning',
  colon:       'gitWarning',
  vessel:      'vascularWarning',
  artery:      'vascularWarning',
  vein:        'vascularWarning',
  brain:       'nervousSystemWarning',
  nervous:     'nervousSystemWarning',
  bone:        'musculoSkeletalWarning',
  joint:       'musculoSkeletalWarning',
  muscle:      'musculoSkeletalWarning',
  skin:        'skinConnectiveTissueWarning',
  blood:       'bloodWarning',
  lymph:       'bloodWarning',
  spleen:      'immuneSystemWarning',
  immune:      'immuneSystemWarning',
  thyroid:     'metabolismWarning',
  pancreas:    'metabolismWarning',
};

/**
 * Maps each ActiveSubstanceWarningField to its ADR column names
 * (veryCommon, common) for dynamic filteredData building and ADR color checks.
 */
const FIELD_TO_ADR_COLUMNS: Record<string, { veryCommon: string; common: string }> = {
  vascularWarning:            { veryCommon: 'veryCommonVascular',      common: 'commonVascular'       },
  cardiacWarning:             { veryCommon: 'veryCommonCardiac',       common: 'commonCardiac'        },
  gitWarning:                 { veryCommon: 'veryCommonGIT',           common: 'commonGIT'            },
  hepaticWarning:             { veryCommon: 'veryCommonHepatic',       common: 'commonHepatobiliary'  },
  renalWarning:               { veryCommon: 'veryCommonRenal',         common: 'commonRenal'          },
  nervousSystemWarning:       { veryCommon: 'veryCommonNervousSystem', common: 'commonNervousSystem'  },
  psychiatricWarning:         { veryCommon: 'veryCommonPsychiatric',   common: 'commonPsychiatric'    },
  pulmonaryWarning:           { veryCommon: 'veryCommonRespiratory',   common: 'commonRespiratory'    },
  metabolismWarning:          { veryCommon: 'veryCommonMetabolism',    common: 'commonMetabolism'     },
  bloodWarning:               { veryCommon: 'veryCommonBlood',         common: 'commonBlood'          },
  immuneSystemWarning:        { veryCommon: 'veryCommonInfection',     common: 'commonImmunity'       },
  infectionWarning:           { veryCommon: 'veryCommonInfection',     common: 'commonInfections'     },
  musculoSkeletalWarning:     { veryCommon: 'veryCommonMusculoskeletal', common: 'commonMusculoskeletal' },
  skinConnectiveTissueWarning:{ veryCommon: 'veryCommonSkin',          common: 'commonSkin'           },
  eyeDisordersWarning:        { veryCommon: 'veryCommonEye',           common: 'commonEye'            },
  earDisordersWarning:        { veryCommon: 'veryCommonEar',           common: 'commonEar'            },
  electrolyteImbalanceWarning:{ veryCommon: 'veryCommonMetabolism',    common: 'commonMetabolism'     },
};

/** Drug interaction fields that escalate to RED on a match. */
const HIGH_SEVERITY_INTERACTION_FIELDS = new Set([
  'interactionAnticoagulant',
  'interactionAntidiabetic',
  'interactionAntidepressant',
  'interactionChemotherapy',
  'interactionHIVProtease',
  'interactionImmunosuppressive',
  'interactionDigoxin',
]);

/** All 31 interaction field names on ActiveSubstance. */
const ALL_INTERACTION_FIELDS = [
  'interactionVitaminsFood',
  'interactionBisphosphonates',
  'interactionAlcohol',
  'interactionMuscleRelaxant',
  'interactionRetinoids',
  'interactionCorticosteroids',
  'interactionXanthines',
  'interactionSympathomimetics',
  'interactionAnticholinergic',
  'interactionChemotherapy',
  'interactionAntibiotics',
  'interactionHormones',
  'interactionStatins',
  'interactionAntihypertensive',
  'interactionAntidiuretics',
  'interactionAntidepressant',
  'interactionAntidiabetic',
  'interactionLowBloodSugarAgents',
  'interactionDigoxin',
  'interactionAnticoagulant',
  'interactionNSAIDs',
  'interactionImmunosuppressive',
  'interactionAntacids',
  'interactionUricosurics',
  'interactionProtectants',
  'interactionAntiParkinson',
  'interactionHIVProtease',
  'interactionBloodProduct',
  'interactionVaccines',
  'interactionAnthelmintics',
  'interactionPDE5Inhibitors',
];

// ─── Patient Context Loader ───────────────────────────────────────────────────

/**
 * Loads a patient's full medical profile required for all 7 safety checks.
 * Export this and pass the result to evaluateDrugSafety to avoid N+1 queries
 * when evaluating multiple drugs for the same patient (e.g. search results).
 */
export async function loadPatientContext(patientId: number) {
  return prisma.patient.findUnique({
    where: { id: patientId },
    include: {
      patientDiseases: {
        include: {
          disease: {
            include: {
              bodySystemMappings: true,
              diseaseWarningRules: true,
            },
          },
        },
      },
      familyHistories: {
        where: { relation: { in: [FamilyRelation.Father, FamilyRelation.Mother] } },
        include: {
          disease: {
            include: {
              bodySystemMappings: true,
            },
          },
        },
      },
      patientLifestyles: {
        where: { value: true },
        include: {
          lifestyle: true,
        },
      },
      surgicalHistories: {
        where: { surgeryTimeframe: { in: [SurgeryTimeframe.THREE_MONTHS, SurgeryTimeframe.SIX_MONTHS] } },
        include: {
          organ: true,
        },
      },
      prescriptions: {
        where: {
          status: { in: [PrescriptionStatus.Approved, PrescriptionStatus.Filled] },
          validUntil: { gte: new Date() },
        },
        include: {
          prescriptionMedicines: {
            include: {
              patientMedicine: {
                include: {
                  tradeName: { include: { activeSubstance: true } },
                  activeSubstance: true,
                },
              },
            },
          },
        },
      },
      medicines: {
        where: { isOngoing: true },
        include: {
          tradeName: { include: { activeSubstance: true } },
          activeSubstance: true,
        },
      },
    },
  });
}

// ─── Drug Graph Loader ────────────────────────────────────────────────────────

async function loadDrugData(tradeNameId?: number | null, activeSubstanceId?: number | null) {
  let resolvedActiveSubstanceId = activeSubstanceId ?? null;
  let tradeName: Awaited<ReturnType<typeof prisma.tradeName.findUnique>> | null = null;
  let activeSubstance: Awaited<ReturnType<typeof prisma.activeSubstance.findUnique>> | null = null;

  if (tradeNameId) {
    tradeName = await prisma.tradeName.findUnique({
      where: { id: tradeNameId },
      include: {
        activeSubstance: true,
        excipientTradeName: { include: { excipient: { select: { id: true, name: true } } } },
      },
    });
    if (tradeName) {
      resolvedActiveSubstanceId = tradeName.activeSubstanceId;
      activeSubstance = (tradeName as any).activeSubstance;
    }
  }

  if (!activeSubstance && resolvedActiveSubstanceId) {
    activeSubstance = await prisma.activeSubstance.findUnique({
      where: { id: resolvedActiveSubstanceId },
    });
  }

  return { tradeName, activeSubstance, resolvedActiveSubstanceId };
}

// ─── Color Helpers ────────────────────────────────────────────────────────────

function aggregateColor(warnings: SafetyWarning[]): StatusColor {
  if (warnings.some((w) => w.statusColor === 'RED')) return 'RED';
  if (warnings.some((w) => w.statusColor === 'ORANGE')) return 'ORANGE';
  return 'GREEN';
}

function warn(
  checkType: SafetyWarning['checkType'],
  color: StatusColor,
  message: string,
  severity: WarningSeverity,
  blocked = false,
): SafetyWarning {
  return { checkType, severity, statusColor: color, message, blocked };
}

// ─── Check 1: Allergy ─────────────────────────────────────────────────────────

async function checkAllergy(
  patientId: number,
  tradeNameId: number | null,
  activeSubstanceId: number | null,
): Promise<SafetyWarning[]> {
  const gate = await checkAllergyConflicts({ patientId, tradeNameId, activeSubstanceId });
  return gate.conflicts.map((c) =>
    warn(
      'allergy',
      'RED',
      `ALLERGY CONFLICT [${c.type.toUpperCase()}]: ${c.reason}${c.reaction ? ` Documented reaction: ${c.reaction}.` : ''}`,
      WarningSeverity.Critical,
      true,
    ),
  );
}

// ─── Check 2: Disease Body System + Warning Rules + Contraindication ──────────

function checkDiseases(
  patient: PatientContext,
  drug: Record<string, unknown>,
): SafetyWarning[] {
  const warnings: SafetyWarning[] = [];
  const diseases = patient.patientDiseases.map((pd: any) => pd.disease);

  for (const disease of diseases) {
    // 2a. DiseaseWarningRule checks
    for (const rule of disease.diseaseWarningRules) {
      let applies = false;
      if (
        (rule.ruleType === 'BLOCK_ACTIVE_SUBSTANCE' || rule.ruleType === 'WARN_ACTIVE_SUBSTANCE') &&
        rule.targetActiveSubstanceId === drug['id']
      ) {
        applies = true;
      } else if (
        rule.ruleType === 'BLOCK_DRUG_CLASS' ||
        rule.ruleType === 'REQUIRE_MONITORING' ||
        rule.ruleType === 'REQUIRE_SPECIALIST_APPROVAL' ||
        rule.ruleType === 'ADJUST_DOSAGE'
      ) {
        // Policy A (default): these rule types apply to every drug for the disease (e.g. CKD monitoring).
        // Narrowing to targetActiveSubstanceId only would require data model / product changes for each rule.
        applies = true;
      }

      if (applies) {
        const color: StatusColor = rule.autoBlock || rule.ruleType === 'BLOCK_ACTIVE_SUBSTANCE' || rule.ruleType === 'BLOCK_DRUG_CLASS'
          ? 'RED'
          : 'ORANGE';
        warnings.push(
          warn(
            'disease',
            color,
            `[${disease.name}] ${rule.warningMessage}${rule.requiredMonitoring ? ` Monitoring: ${rule.requiredMonitoring}.` : ''}`,
            rule.severity,
            rule.autoBlock,
          ),
        );
      }
    }

    // 2b. Body system field checks
    for (const mapping of disease.bodySystemMappings) {
      const fieldName = mapping.fieldName as string;
      const fieldValue = drug[fieldName];
      if (!hasContent(fieldValue)) continue;

      warnings.push(
        warn(
          'disease',
          'ORANGE',
          `[${disease.name}] Body system warning (${fieldName}): ${extractText(fieldValue)}`,
          WarningSeverity.Medium,
        ),
      );

      // 2c. ADR frequency checks for this body system
      const adrCols = FIELD_TO_ADR_COLUMNS[fieldName];
      if (adrCols) {
        const veryCommonVal = drug[adrCols.veryCommon];
        if (hasContent(veryCommonVal)) {
          const text = extractText(veryCommonVal);
          const hasParentheses = /\(/.test(text);
          const color: StatusColor = hasParentheses ? 'ORANGE' : 'RED';
          warnings.push(
            warn(
              'disease',
              color,
              `[${disease.name}] Very Common ADR (${fieldName.replace('Warning', '')}): ${text}`,
              hasParentheses ? WarningSeverity.Medium : WarningSeverity.High,
              !hasParentheses,
            ),
          );
        }

        const commonVal = drug[adrCols.common];
        if (hasContent(commonVal)) {
          warnings.push(
            warn(
              'disease',
              'ORANGE',
              `[${disease.name}] Common ADR (${fieldName.replace('Warning', '')}): ${extractText(commonVal)}`,
              WarningSeverity.Low,
            ),
          );
        }
      }
    }

    // 2d. Contraindication keyword check
    const contraindicationText = extractText(drug['contraindications']);
    if (hasContent(contraindicationText) && disease.contraindicationKeywords.length > 0) {
      const lowerText = contraindicationText.toLowerCase();
      const matchedKeyword = disease.contraindicationKeywords.find((kw: string) =>
        lowerText.includes(kw.toLowerCase()),
      );
      if (matchedKeyword) {
        warnings.push(
          warn(
            'contraindication',
            'RED',
            `[${disease.name}] Contraindicated: keyword "${matchedKeyword}" found. ${contraindicationText}`,
            WarningSeverity.Critical,
            true,
          ),
        );
      }
    }
  }

  return warnings;
}

// ─── Check 3: Family Disease ──────────────────────────────────────────────────

function checkFamilyDiseases(
  patient: PatientContext,
  drug: Record<string, unknown>,
): SafetyWarning[] {
  const warnings: SafetyWarning[] = [];

  for (const fh of patient.familyHistories) {
    const disease = fh.disease;

    for (const mapping of disease.bodySystemMappings) {
      const fieldName = mapping.fieldName as string;
      const fieldValue = drug[fieldName];
      if (!hasContent(fieldValue)) continue;

      warnings.push(
        warn(
          'familyDisease',
          'ORANGE',
          `[Family - ${fh.relation}/${disease.name}] Predisposition warning (${fieldName}): ${extractText(fieldValue)}`,
          WarningSeverity.Low,
        ),
      );

      const adrCols = FIELD_TO_ADR_COLUMNS[fieldName];
      if (adrCols) {
        const veryCommonVal = drug[adrCols.veryCommon];
        if (hasContent(veryCommonVal)) {
          warnings.push(
            warn(
              'familyDisease',
              'ORANGE',
              `[Family - ${fh.relation}/${disease.name}] Very Common ADR (${fieldName.replace('Warning', '')}): ${extractText(veryCommonVal)}`,
              WarningSeverity.Low,
            ),
          );
        }
      }
    }
  }

  return warnings;
}

// ─── Check 4: Lifestyle ───────────────────────────────────────────────────────

function checkLifestyle(
  patient: PatientContext,
  drug: Record<string, unknown>,
): SafetyWarning[] {
  const warnings: SafetyWarning[] = [];

  for (const pl of patient.patientLifestyles) {
    const fieldName = pl.lifestyle?.activeSubstanceField;
    if (!fieldName) continue;
    const fieldValue = drug[fieldName];
    if (!hasContent(fieldValue)) continue;

    warnings.push(
      warn(
        'lifestyle',
        'ORANGE',
        `[Lifestyle] Patient indicated "${pl.lifestyle.question}". Drug warning: ${extractText(fieldValue)}`,
        WarningSeverity.Medium,
      ),
    );
  }

  return warnings;
}

// ─── Check 5: Surgical History ────────────────────────────────────────────────

function checkSurgeries(
  patient: PatientContext,
  drug: Record<string, unknown>,
): SafetyWarning[] {
  const warnings: SafetyWarning[] = [];

  for (const sh of patient.surgicalHistories) {
    const organName = sh.organ?.name?.toLowerCase() ?? '';
    const fieldName = ORGAN_TO_WARNING_FIELD[organName];
    if (!fieldName) continue;

    const fieldValue = drug[fieldName];
    if (!hasContent(fieldValue)) continue;

    warnings.push(
      warn(
        'surgery',
        'ORANGE',
        `[Surgical History] Recent ${sh.organ.name} surgery (${sh.surgeryTimeframe}). Drug has ${fieldName.replace('Warning', '')} warning: ${extractText(fieldValue)}`,
        WarningSeverity.Medium,
      ),
    );
  }

  return warnings;
}

// ─── Check 6: Drug Interaction ────────────────────────────────────────────────

function checkDrugInteractions(
  patient: PatientContext,
  drug: Record<string, unknown>,
): SafetyWarning[] {
  const warnings: SafetyWarning[] = [];

  // Collect current active substance names
  const currentSubstanceNames: string[] = [];

  for (const rx of patient.prescriptions) {
    for (const link of rx.prescriptionMedicines) {
      const pm = link.patientMedicine;
      const sub = pm?.tradeName?.activeSubstance ?? pm?.activeSubstance;
      if (sub?.name) currentSubstanceNames.push(sub.name.toLowerCase());
    }
  }
  for (const med of patient.medicines) {
    const sub = med.tradeName?.activeSubstance ?? med.activeSubstance;
    if (sub?.name) currentSubstanceNames.push(sub.name.toLowerCase());
  }

  if (currentSubstanceNames.length === 0) return warnings;

  for (const field of ALL_INTERACTION_FIELDS) {
    const fieldValue = drug[field];
    if (!hasContent(fieldValue)) continue;

    const interactionText = extractText(fieldValue).toLowerCase();
    const matchedSubstance = currentSubstanceNames.find((name) =>
      interactionText.includes(name),
    );

    if (matchedSubstance) {
      const isHighSeverity = HIGH_SEVERITY_INTERACTION_FIELDS.has(field);
      const color: StatusColor = isHighSeverity ? 'RED' : 'ORANGE';
      const severity = isHighSeverity ? WarningSeverity.High : WarningSeverity.Medium;
      warnings.push(
        warn(
          'drugInteraction',
          color,
          `[Drug Interaction] ${field.replace('interaction', '')} interaction with "${matchedSubstance}": ${extractText(fieldValue)}`,
          severity,
          isHighSeverity,
        ),
      );
    }
  }

  // ironChelator is a plain String field (not JSON) — check separately
  const ironChelatorText = drug['ironChelator'];
  if (hasContent(ironChelatorText) && typeof ironChelatorText === 'string') {
    const lowerText = ironChelatorText.toLowerCase();
    const matchedSubstance = currentSubstanceNames.find((name) => lowerText.includes(name));
    if (matchedSubstance) {
      warnings.push(
        warn(
          'drugInteraction',
          'ORANGE',
          `[Drug Interaction] Iron chelator interaction with "${matchedSubstance}": ${ironChelatorText}`,
          WarningSeverity.Medium,
          false,
        ),
      );
    }
  }

  return warnings;
}

// ─── Check 7: Cancer Risk ─────────────────────────────────────────────────────

function checkCancerRisk(
  patient: PatientContext,
  drug: Record<string, unknown>,
): SafetyWarning[] {
  const warnings: SafetyWarning[] = [];

  const hasFamilyCancer = patient.familyHistories.some((fh: any) => fh.disease.triggersCancerCheck);
  if (!hasFamilyCancer) return warnings;

  const carcinogenicityValue = drug['carcinogenicityMutagenicity'];
  if (!hasContent(carcinogenicityValue)) return warnings;

  const cancerRelatives = patient.familyHistories
    .filter((fh: any) => fh.disease.triggersCancerCheck)
    .map((fh: any) => `${fh.relation} (${fh.disease.name})`)
    .join(', ');

  warnings.push(
    warn(
      'cancerRisk',
      'RED',
      `[Cancer Risk] Patient has family history of cancer (${cancerRelatives}). Drug has carcinogenicity/mutagenicity data: ${extractText(carcinogenicityValue)}`,
      WarningSeverity.High,
      false,
    ),
  );

  return warnings;
}

// ─── filteredData Builder ─────────────────────────────────────────────────────

function buildFilteredData(
  patient: PatientContext,
  drug: Record<string, unknown>,
): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  // Fixed fields always included
  const fixedFields = [
    'id', 'name', 'concentration', 'dosageForm', 'indication',
    'adultDoseMaxPerDay', 'adultDoseMgPerKg', 'pediatricDose',
    'medicationErrorWarning', 'effectOnDriving', 'interferenceLabTests',
    'pregnancyCategory', 'additionalMonitoring', 'highlightedWarning',
    'additiveRMM',
  ];
  for (const f of fixedFields) {
    if (drug[f] !== undefined) result[f] = drug[f];
  }

  // Excipients (always shown via tradeName relation — passed in by controller)
  if (drug['excipientTradeName'] !== undefined) {
    result['excipientTradeName'] = drug['excipientTradeName'];
  }

  // Age-based contextual fields
  const age = patient.ageClassification;
  if (age === 'Elderly') {
    result['specialPopulationElderly'] = drug['specialPopulationElderly'];
    result['renalWarning'] = drug['renalWarning'];
    result['hepaticWarning'] = drug['hepaticWarning'];
  }
  if (['Neonates', 'Infants', 'Toddlers', 'Children', 'Adolescents'].includes(age)) {
    result['specialPopulationChildren'] = drug['specialPopulationChildren'];
    result['doseInKg'] = drug['doseInKg'];
  }

  // Pregnancy / lactation contextual fields
  if (patient.pregnancyStatus || patient.pregnancyWarning) {
    result['pregnancyWarning'] = drug['pregnancyWarning'];
    result['pregnancyCategory'] = drug['pregnancyCategory'];
    result['reproductiveWarningFemale'] = drug['reproductiveWarningFemale'];
  }
  if (patient.lactation) {
    result['lactationWarning'] = drug['lactationWarning'];
  }

  // Disease-relevant ADR columns only
  const patientFieldNames = new Set<string>(
    patient.patientDiseases.flatMap((pd: any) =>
      pd.disease.bodySystemMappings.map((m: any) => m.fieldName as string),
    ),
  );

  for (const fieldName of patientFieldNames) {
    // Warning field itself
    result[fieldName] = drug[fieldName];

    // Relevant ADR frequency columns
    const adrCols = FIELD_TO_ADR_COLUMNS[fieldName];
    if (adrCols) {
      result[adrCols.veryCommon] = drug[adrCols.veryCommon];
      result[adrCols.common] = drug[adrCols.common];
    }
  }

  return result;
}

// ─── Main Entry Point ─────────────────────────────────────────────────────────

/**
 * Evaluates a drug's safety profile against a patient's full medical context.
 *
 * @param input - patientId (required) + tradeNameId and/or activeSubstanceId
 * @returns SafetyEvalResult with statusColor, warnings array, and filteredData
 */
export async function evaluateDrugSafety(input: SafetyEvalInput): Promise<SafetyEvalResult> {
  const { patientId, tradeNameId, activeSubstanceId, preloadedPatient } = input;

  if (!tradeNameId && !activeSubstanceId) {
    return { statusColor: 'GREEN', blocked: false, warnings: [], filteredData: {} };
  }

  // Use pre-loaded patient context when available (avoids N+1 in search endpoints).
  // Otherwise load patient and drug data in parallel.
  const [patient, { tradeName, activeSubstance, resolvedActiveSubstanceId }] = await Promise.all([
    preloadedPatient ? Promise.resolve(preloadedPatient) : loadPatientContext(patientId),
    loadDrugData(tradeNameId, activeSubstanceId),
  ]);

  if (!patient) {
    throw new Error(`Patient ${patientId} not found`);
  }

  if (!activeSubstance) {
    return { statusColor: 'GREEN', blocked: false, warnings: [], filteredData: {} };
  }

  const drug = activeSubstance as unknown as Record<string, unknown>;
  drug['id'] = activeSubstance.id;

  // Attach excipients from trade name if available
  if (tradeName) {
    drug['excipientTradeName'] = (tradeName as any).excipientTradeName ?? [];
  }

  // Run all checks — allergy is async, rest are in-memory
  const [allergyWarnings] = await Promise.all([
    checkAllergy(patientId, tradeNameId ?? null, resolvedActiveSubstanceId),
  ]);

  const allWarnings: SafetyWarning[] = [
    ...allergyWarnings,
    ...checkDiseases(patient, drug),
    ...checkFamilyDiseases(patient, drug),
    ...checkLifestyle(patient, drug),
    ...checkSurgeries(patient, drug),
    ...checkDrugInteractions(patient, drug),
    ...checkCancerRisk(patient, drug),
  ];

  const statusColor = aggregateColor(allWarnings);
  const blocked = allWarnings.some((w) => w.blocked);
  const filteredData = buildFilteredData(patient, drug);

  return { statusColor, blocked, warnings: allWarnings, filteredData };
}
