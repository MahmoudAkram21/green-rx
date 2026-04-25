import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { PatientSideEffectSeverity, Prisma, SideEffectStatus } from '../../generated/client/client';
import { extractSideEffects, type ExtractedSideEffects } from '../services/sideEffectExtract.service';
import { getAdrQuestionTemplate, submitAdrReport } from '../services/adrReport.service';

/** Prisma filter: active contracting row, not past expiry (null expiry = open-ended). */
const activeContractingCompanyFilter: Prisma.ContractingCompanyWhereInput = {
    isActive: true,
    OR: [{ expiryDate: null }, { expiryDate: { gte: new Date() } }],
};

/**
 * Side effects may be shown if there is an explicit EDA-style contract for this trade name
 * or manufacturer, or if the trade name is linked to an active manufacturer (company) record.
 */
/** Flatten grouped extract output for merging into GET /side-effects/by-medication. */
function flattenExtractedForMerge(extracted: ExtractedSideEffects): Array<{
    name: string;
    bodySystem: string;
    frequency: string;
}> {
    const out: Array<{ name: string; bodySystem: string; frequency: string }> = [];
    for (const [bodySystem, rows] of Object.entries(extracted.sideEffects)) {
        for (const e of rows) {
            out.push({ name: e.name, bodySystem, frequency: e.frequency });
        }
    }
    return out;
}

function tradeNameAllowsSideEffectsDisclosure(tradeName: {
    contractingCompanyTradeNames: { id: number }[];
    company: null | {
        isActive: boolean;
        deletedAt: Date | null;
        contractingCompanies: { id: number }[];
    };
}): boolean {
    if (!tradeName.company) return false;
    if (
        tradeName.contractingCompanyTradeNames.length > 0 ||
        tradeName.company.contractingCompanies.length > 0
    ) {
        return true;
    }
    return tradeName.company.isActive && tradeName.company.deletedAt == null;
}

const patientMedicineForSideEffectInclude = {
    tradeName: { include: { company: true } },
} as const;

type PatientMedicineForSideEffect = Prisma.PatientMedicineGetPayload<{
    include: typeof patientMedicineForSideEffectInclude;
}>;

/**
 * `medicationId` may be **PatientMedicine.id** or **TradeName.id** when exactly one profile row uses that trade name.
 */
async function resolvePatientMedicineForSideEffectReporting(
    patientId: number,
    medicationId: number
): Promise<
    | { ok: true; patientMedicine: PatientMedicineForSideEffect }
    | { ok: false; reason: 'not_found' | 'ambiguous' }
> {
    const byId = await prisma.patientMedicine.findFirst({
        where: { id: medicationId, patientId },
        include: patientMedicineForSideEffectInclude,
    });
    if (byId) {
        return { ok: true, patientMedicine: byId };
    }

    const byTrade = await prisma.patientMedicine.findMany({
        where: { tradeNameId: medicationId, patientId },
        include: patientMedicineForSideEffectInclude,
        orderBy: { id: 'desc' },
    });
    if (byTrade.length === 0) {
        return { ok: false, reason: 'not_found' };
    }
    if (byTrade.length > 1) {
        return { ok: false, reason: 'ambiguous' };
    }
    return { ok: true, patientMedicine: byTrade[0] };
}

const ambiguousMedicationIdMessage =
    'More than one medicine in your profile uses this trade name. Use medicationId = the PatientMedicine `id` from GET /patient-medicines/patient/{patientId} (not tradeNameId).';

export const getSideEffectsByMedication = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const medicationId = parseInt(req.params.medicationId);
        if (isNaN(medicationId)) {
            res.status(400).json({ error: 'Invalid medicationId' });
            return;
        }

        const patientMedicine = await prisma.patientMedicine.findUnique({
            where: { id: medicationId },
            include: {
                tradeName: {
                    include: {
                        contractingCompanyTradeNames: {
                            where: {
                                contractingCompany: activeContractingCompanyFilter,
                            },
                            take: 1,
                        },
                        company: {
                            include: {
                                contractingCompanies: {
                                    where: activeContractingCompanyFilter,
                                    take: 1,
                                },
                            },
                        },
                    },
                },
            },
        });

        if (!patientMedicine) {
            res.status(404).json({ error: 'Medication not found' });
            return;
        }

        // Side effects are available even when no company/contract exists.
        // Reporting for no-company medicines is stored internally (no company email route).

        const activeSubstanceId =
            patientMedicine.activeSubstanceId ?? patientMedicine.tradeName?.activeSubstanceId;

        if (!activeSubstanceId) {
            res.json({ supported: true, sideEffects: [] });
            return;
        }

        const records = await prisma.medicationSideEffect.findMany({
            where: {
                activeSubstanceId,
                sideEffect: { status: SideEffectStatus.Approved },
            },
            include: { sideEffect: true },
            orderBy: { sideEffect: { name: 'asc' } },
        });

        const catalogRows = records.map((r) => ({
            name: r.sideEffect.name,
            nameAr: r.sideEffect.nameAr,
            frequency: r.frequency,
            bodySystem: r.bodySystem,
        }));

        const seenNames = new Set(catalogRows.map((s) => s.name.trim().toLowerCase()));
        const merged: Array<{
            name: string;
            nameAr: string | null;
            frequency: string | null;
            bodySystem: string | null;
        }> = [...catalogRows];

        const extracted = await extractSideEffects(activeSubstanceId);
        if (extracted) {
            for (const row of flattenExtractedForMerge(extracted)) {
                const key = row.name.trim().toLowerCase();
                if (seenNames.has(key)) continue;
                seenNames.add(key);
                merged.push({
                    name: row.name,
                    nameAr: null,
                    frequency: row.frequency,
                    bodySystem: row.bodySystem,
                });
            }
        }

        merged.sort((a, b) => a.name.localeCompare(b.name));

        res.json({
            supported: true,
            sideEffects: merged,
        });
    } catch (error) {
        next(error);
    }
};

/** POST /side-effects/add — ADR questionnaire (multiple side effects, each with answers). */
export const addSideEffect = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { tradeNameId, sideEffects, locale } = req.body ?? {};
        if (!tradeNameId || typeof tradeNameId !== 'number') {
            res.status(400).json({ error: 'INVALID_TRADE_NAME_ID', message: 'tradeNameId (number) is required' });
            return;
        }
        if (!Array.isArray(sideEffects) || sideEffects.length === 0) {
            res.status(400).json({ error: 'INVALID_SIDE_EFFECTS', message: 'sideEffects must be a non-empty array' });
            return;
        }

        const result = await submitAdrReport({
            userId: req.user!.userId,
            tradeNameId,
            locale,
            sideEffects,
        });

        if (!result.ok) {
            res.status(result.status).json({
                error: result.error,
                message: result.message,
                ...(result as Record<string, unknown>),
            });
            return;
        }

        res.status(201).json({
            message: 'ADR report submitted successfully',
            result: result.result,
            report: {
                id: result.report.id,
                referenceCode: result.report.referenceCode,
                tradeNameId: result.report.tradeNameId,
                companyId: result.report.companyId,
                routingStatus: result.report.routingStatus,
                emailStatus: result.report.emailStatus,
                submittedAt: result.report.submittedAt,
            },
        });
    } catch (error) {
        next(error);
    }
};

type ParsedReportNameItem = {
    reportedName: string;
    reportKey: string;
    severity: PatientSideEffectSeverity | null;
    notes: string | null;
};

function parseSeverityAndNotes(o: Record<string, unknown>):
    | { severity: PatientSideEffectSeverity | null; notes: string | null }
    | { error: string; message: string } {
    let severity: PatientSideEffectSeverity | null = null;
    if (o.severity !== undefined && o.severity !== null) {
        if (typeof o.severity !== 'string') {
            return { error: 'INVALID_SEVERITY', message: 'severity must be Mild, Moderate, or Severe' };
        }
        if (
            o.severity !== PatientSideEffectSeverity.Mild &&
            o.severity !== PatientSideEffectSeverity.Moderate &&
            o.severity !== PatientSideEffectSeverity.Severe
        ) {
            return { error: 'INVALID_SEVERITY', message: 'Severity must be Mild, Moderate, or Severe' };
        }
        severity = o.severity as PatientSideEffectSeverity;
    }

    let notes: string | null = null;
    if (o.notes !== undefined && o.notes !== null) {
        if (typeof o.notes !== 'string') {
            return { error: 'INVALID_NOTES', message: 'notes must be a string when provided' };
        }
        const t = o.notes.trim();
        notes = t.length > 0 ? t : null;
    }

    return { severity, notes };
}

/** Each item: { name, severity?, notes? } only (no sideEffectId). */
function parseReportSideEffectInput(raw: unknown[]): ParsedReportNameItem[] | { error: string; message: string } {
    const items: ParsedReportNameItem[] = [];
    const seenKeys = new Set<string>();

    for (const el of raw) {
        if (el === null || typeof el !== 'object' || Array.isArray(el)) {
            return {
                error: 'INVALID_SIDE_EFFECT_FORMAT',
                message:
                    'Each item must be an object: { name, severity?, notes? } (e.g. names from GET /side-effects/by-medication or GET /medicines/:tradeNameId/side-effects)',
            };
        }

        const o = el as Record<string, unknown>;
        if (o.sideEffectId !== undefined && o.sideEffectId !== null) {
            return {
                error: 'INVALID_SIDE_EFFECT_FORMAT',
                message: 'sideEffectId is not supported; use { name, severity?, notes? } only',
            };
        }

        const sn = parseSeverityAndNotes(o);
        if ('error' in sn) {
            return sn;
        }
        const { severity, notes } = sn;

        const nameRaw = typeof o.name === 'string' ? o.name.trim() : '';
        if (!nameRaw) {
            return {
                error: 'INVALID_SIDE_EFFECT_FORMAT',
                message: 'Each item must include name (non-empty string)',
            };
        }

        const reportKey = nameRaw.toLowerCase();
        if (seenKeys.has(reportKey)) continue;
        seenKeys.add(reportKey);
        items.push({ reportedName: nameRaw, reportKey, severity, notes });
    }

    if (items.length === 0) {
        return { error: 'INVALID_SIDE_EFFECTS', message: 'sideEffects must be a non-empty array' };
    }

    return items;
}

/** POST /my-side-effects — report side effects by name (optional severity & notes per item). */
export const reportSideEffects = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { medicationId, sideEffects } = req.body;

        if (!medicationId || typeof medicationId !== 'number') {
            res.status(400).json({
                success: false,
                error: 'INVALID_MEDICATION_ID',
                message: 'medicationId (number) is required',
            });
            return;
        }
        if (!Array.isArray(sideEffects) || sideEffects.length === 0) {
            res.status(400).json({
                success: false,
                error: 'INVALID_SIDE_EFFECTS',
                message: 'sideEffects must be a non-empty array of { name, severity?, notes? }',
            });
            return;
        }

        const parsedInput = parseReportSideEffectInput(sideEffects);
        if (!Array.isArray(parsedInput)) {
            res.status(400).json({ success: false, ...parsedInput });
            return;
        }

        const patient = await prisma.patient.findUnique({ where: { userId: req.user!.userId } });
        if (!patient) {
            res.status(404).json({
                success: false,
                error: 'PATIENT_NOT_FOUND',
                message: 'Patient profile not found',
            });
            return;
        }

        const resolved = await resolvePatientMedicineForSideEffectReporting(patient.id, medicationId);
        if (!resolved.ok) {
            if (resolved.reason === 'ambiguous') {
                res.status(400).json({
                    success: false,
                    error: 'AMBIGUOUS_MEDICATION_ID',
                    message: ambiguousMedicationIdMessage,
                });
                return;
            }
            res.status(403).json({
                success: false,
                error: 'MEDICINE_NOT_IN_PROFILE',
                message: 'This medicine is not in your medication profile',
            });
            return;
        }
        const patientMedicine = resolved.patientMedicine;
        const patientMedicineId = patientMedicine.id;

        const reportKeys = parsedInput.map((i) => i.reportKey);
        const existingSubmissions = await prisma.patientSideEffect.findMany({
            where: {
                patientId: patient.id,
                patientMedicineId: patientMedicineId,
                reportKey: { in: reportKeys },
            },
        });

        if (existingSubmissions.length > 0) {
            const duplicates = existingSubmissions.map((s) => s.reportKey);
            res.status(409).json({
                success: false,
                error: 'DUPLICATE_SUBMISSION',
                message: `${duplicates.length} of these side effects were already reported`,
                duplicates,
            });
            return;
        }

        const byKey = new Map(parsedInput.map((i) => [i.reportKey, i]));
        const results = await Promise.all(
            reportKeys.map((reportKey) => {
                const item = byKey.get(reportKey)!;
                return prisma.patientSideEffect.create({
                    data: {
                        patientId: patient.id,
                        patientMedicineId: patientMedicineId,
                        reportedName: item.reportedName,
                        reportKey: item.reportKey,
                        severity: item.severity,
                        notes: item.notes,
                        reportedAt: new Date(),
                    },
                });
            })
        );

        res.status(201).json({
            success: true,
            message: `${results.length} side effect(s) reported successfully`,
            submitted: results.length,
            reportedCount: results.length,
            sideEffects: results.map((r) => ({
                id: r.id,
                name: r.reportedName,
                severity: r.severity,
                notes: r.notes,
            })),
        });
    } catch (error) {
        next(error);
    }
};

export const getMySideEffects = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user!.userId;

        const patient = await prisma.patient.findUnique({ where: { userId } });
        if (!patient) {
            res.status(404).json({ error: 'Patient profile not found' });
            return;
        }

        const records = await prisma.patientSideEffect.findMany({
            where: { patientId: patient.id },
            include: {
                patientMedicine: {
                    select: { id: true, medicineName: true, tradeNameId: true },
                },
            },
            orderBy: { reportedAt: 'desc' },
        });

        res.json({
            sideEffects: records.map((r) => ({
                id: r.id,
                name: r.reportedName,
                medication: r.patientMedicine,
                severity: r.severity,
                notes: r.notes,
                reportedAt: r.reportedAt,
            })),
        });
    } catch (error) {
        next(error);
    }
};

export const getMySideEffectsByMedication = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user!.userId;
        const medicationId = parseInt(req.params.medicationId);
        if (isNaN(medicationId)) {
            res.status(400).json({ error: 'Invalid medicationId' });
            return;
        }

        const patient = await prisma.patient.findUnique({ where: { userId } });
        if (!patient) {
            res.status(404).json({ error: 'Patient profile not found' });
            return;
        }

        const resolved = await resolvePatientMedicineForSideEffectReporting(patient.id, medicationId);
        if (!resolved.ok) {
            if (resolved.reason === 'ambiguous') {
                res.status(400).json({ error: 'AMBIGUOUS_MEDICATION_ID', message: ambiguousMedicationIdMessage });
                return;
            }
            res.status(404).json({ error: 'Medication not found or does not belong to you' });
            return;
        }

        const records = await prisma.patientSideEffect.findMany({
            where: { patientId: patient.id, patientMedicineId: resolved.patientMedicine.id },
            orderBy: { reportedAt: 'desc' },
        });

        res.json({
            sideEffects: records.map((r) => ({
                id: r.id,
                name: r.reportedName,
                severity: r.severity,
                notes: r.notes,
                reportedAt: r.reportedAt,
            })),
        });
    } catch (error) {
        next(error);
    }
};

/**
 * NEW ENDPOINT: Extract side effects for a trade name from database
 * GET /medicines/:tradeNameId/side-effects
 * - Filters by TradeNameSideEffect table
 * - Groups by organ/body system
 */
export const getSideEffectsByTradeName = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tradeNameId = parseInt(req.params.tradeNameId);

        if (isNaN(tradeNameId)) {
            res.status(400).json({
                success: false,
                error: 'INVALID_TRADE_NAME_ID',
                message: 'Invalid trade name ID',
            });
            return;
        }

        // 1. Verify trade name exists
        const tradeName = await prisma.tradeName.findUnique({
            where: { id: tradeNameId },
            include: {
                contractingCompanyTradeNames: {
                    where: {
                        contractingCompany: activeContractingCompanyFilter,
                    },
                    take: 1,
                },
                company: {
                    include: {
                        contractingCompanies: {
                            where: activeContractingCompanyFilter,
                            take: 1,
                        },
                    },
                },
                companyInstructionsPdf: true,
            },
        });

        if (!tradeName) {
            res.status(404).json({
                success: false,
                error: 'MEDICINE_NOT_FOUND',
                message: 'Trade name not found',
            });
            return;
        }

        const hasActiveContract = tradeNameAllowsSideEffectsDisclosure(tradeName);

        // 3. Extract side effects on-the-fly from ActiveSubstance JSON fields
        const extracted = await extractSideEffects(tradeName.activeSubstanceId);

        res.json({
            success: true,
            medicineId: tradeName.id,
            tradeName: tradeName.title,
            hasContract: hasActiveContract,
            instructionPdf: tradeName.companyInstructionsPdf ? {
                id: tradeName.companyInstructionsPdf.id,
                url: tradeName.companyInstructionsPdf.url,
                views: tradeName.companyInstructionsPdf.views,
                createdAt: tradeName.companyInstructionsPdf.createdAt,
                updatedAt: tradeName.companyInstructionsPdf.updatedAt,
            } : null,
            sideEffects: extracted?.sideEffects ?? {},
        });
    } catch (error) {
        next(error);
    }
};

/** GET /adr/questions-template?lang=en|ar */
export const getAdrQuestionsTemplate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const lang = typeof req.query.lang === 'string' ? req.query.lang : 'en';
        res.json({
            template: await getAdrQuestionTemplate(lang),
        });
    } catch (error) {
        next(error);
    }
};

