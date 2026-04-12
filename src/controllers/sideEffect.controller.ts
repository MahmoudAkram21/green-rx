import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import {
    PatientSideEffectSeverity,
    Prisma,
    SideEffectCreatedBy,
    SideEffectStatus,
} from '../../generated/client/client';
import { extractSideEffects } from '../services/sideEffectExtract.service';
import { getPatientSideEffectsFallbackRedirectUrl } from './settings.controller';

/** Prisma filter: active contracting row, not past expiry (null expiry = open-ended). */
const activeContractingCompanyFilter: Prisma.ContractingCompanyWhereInput = {
    isActive: true,
    OR: [{ expiryDate: null }, { expiryDate: { gte: new Date() } }],
};

/**
 * Side effects may be shown if there is an explicit EDA-style contract for this trade name
 * or manufacturer, or if the trade name is linked to an active manufacturer (company) record.
 */
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

        if (!patientMedicine.tradeName || !patientMedicine.tradeName.company) {
            const redirect = await getPatientSideEffectsFallbackRedirectUrl();
            res.json({
                supported: false,
                redirect,
                reason: 'NO_COMPANY',
                message: 'This medicine is not linked to a manufacturer. Open the link for more information.',
            });
            return;
        }

        const hasContract = tradeNameAllowsSideEffectsDisclosure(patientMedicine.tradeName);
        if (!hasContract) {
            const redirect = await getPatientSideEffectsFallbackRedirectUrl();
            res.json({
                supported: false,
                redirect,
                reason: 'NO_ACTIVE_CONTRACT',
                message: 'Side effects are not available in the app for this medicine. Open the link for more information.',
            });
            return;
        }

        const activeSubstanceId =
            patientMedicine.activeSubstanceId ?? patientMedicine.tradeName.activeSubstanceId;

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

        res.json({
            supported: true,
            sideEffects: records.map((r) => ({
                id: r.sideEffect.id,
                name: r.sideEffect.name,
                nameAr: r.sideEffect.nameAr,
                frequency: r.frequency,
                bodySystem: r.bodySystem,
            })),
        });
    } catch (error) {
        next(error);
    }
};

function parseAddSideEffectSeverityNotes(body: Record<string, unknown>):
    | {
          ok: true;
          severity: PatientSideEffectSeverity | null | undefined;
          notes: string | null | undefined;
      }
    | { ok: false; error: string } {
    let severity: PatientSideEffectSeverity | null | undefined = undefined;
    if (Object.prototype.hasOwnProperty.call(body, 'severity')) {
        if (body.severity === null) {
            severity = null;
        } else if (typeof body.severity === 'string') {
            if (
                body.severity !== PatientSideEffectSeverity.Mild &&
                body.severity !== PatientSideEffectSeverity.Moderate &&
                body.severity !== PatientSideEffectSeverity.Severe
            ) {
                return { ok: false, error: 'severity must be Mild, Moderate, or Severe' };
            }
            severity = body.severity as PatientSideEffectSeverity;
        } else {
            return { ok: false, error: 'severity must be Mild, Moderate, Severe, or null' };
        }
    }

    let notes: string | null | undefined = undefined;
    if (Object.prototype.hasOwnProperty.call(body, 'notes')) {
        if (body.notes === null) {
            notes = null;
        } else if (typeof body.notes === 'string') {
            const t = body.notes.trim();
            notes = t.length > 0 ? t : null;
        } else {
            return { ok: false, error: 'notes must be a string or null when provided' };
        }
    }

    return { ok: true, severity, notes };
}

export const addSideEffect = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { medicationId, name } = req.body;

        if (!name || typeof name !== 'string' || !name.trim()) {
            res.status(400).json({ error: 'name is required' });
            return;
        }
        if (!medicationId || typeof medicationId !== 'number') {
            res.status(400).json({ error: 'medicationId (number) is required' });
            return;
        }

        const parsedSn = parseAddSideEffectSeverityNotes(req.body as Record<string, unknown>);
        if (!parsedSn.ok) {
            res.status(400).json({ error: parsedSn.error });
            return;
        }
        const { severity: sevIn, notes: notesIn } = parsedSn;

        const patient = await prisma.patient.findUnique({ where: { userId: req.user!.userId } });
        if (!patient) {
            res.status(404).json({ error: 'Patient profile not found' });
            return;
        }

        const patientMedicine = await prisma.patientMedicine.findFirst({
            where: { id: medicationId, patientId: patient.id },
            include: { tradeName: { include: { company: true } } },
        });

        if (!patientMedicine) {
            res.status(404).json({ error: 'Medication not found or does not belong to you' });
            return;
        }

        if (patientMedicine.tradeName && !patientMedicine.tradeName.company) {
            const redirect = await getPatientSideEffectsFallbackRedirectUrl();
            res.status(403).json({
                error: 'SIDE_EFFECTS_TRADE_NAME_NO_COMPANY',
                message:
                    'This medicine is not linked to a manufacturer. You cannot add side effects here; open the link for more information.',
                redirect,
            });
            return;
        }

        const activeSubstanceId =
            patientMedicine.activeSubstanceId ?? patientMedicine.tradeName?.activeSubstanceId;

        const trimmedName = name.trim();
        let sideEffect = await prisma.sideEffect.findUnique({ where: { name: trimmedName } });

        if (!sideEffect) {
            sideEffect = await prisma.sideEffect.create({
                data: {
                    name: trimmedName,
                    createdBy: SideEffectCreatedBy.Patient,
                    status: SideEffectStatus.Pending,
                    createdByUserId: req.user!.userId,
                },
            });
        }

        if (activeSubstanceId) {
            await prisma.medicationSideEffect.upsert({
                where: {
                    activeSubstanceId_sideEffectId: {
                        activeSubstanceId,
                        sideEffectId: sideEffect.id,
                    },
                },
                create: {
                    activeSubstanceId,
                    sideEffectId: sideEffect.id,
                    frequency: 'Unknown',
                },
                update: {},
            });
        }

        const createSeverity = sevIn === undefined ? null : sevIn;
        const createNotes = notesIn === undefined ? null : notesIn;
        const updateData: {
            severity?: PatientSideEffectSeverity | null;
            notes?: string | null;
            reportedAt?: Date;
        } = {};
        if (sevIn !== undefined) updateData.severity = sevIn;
        if (notesIn !== undefined) updateData.notes = notesIn;
        if (sevIn !== undefined || notesIn !== undefined) {
            updateData.reportedAt = new Date();
        }

        const patientSideEffect = await prisma.patientSideEffect.upsert({
            where: {
                patientId_patientMedicineId_sideEffectId: {
                    patientId: patient.id,
                    patientMedicineId: medicationId,
                    sideEffectId: sideEffect.id,
                },
            },
            create: {
                patientId: patient.id,
                patientMedicineId: medicationId,
                sideEffectId: sideEffect.id,
                severity: createSeverity,
                notes: createNotes,
                reportedAt: new Date(),
            },
            update: Object.keys(updateData).length > 0 ? updateData : {},
        });

        res.status(201).json({
            message: 'Side effect created and linked to medication. Pending admin approval to appear in the app.',
            sideEffect,
            patientSideEffect: {
                id: patientSideEffect.id,
                severity: patientSideEffect.severity,
                notes: patientSideEffect.notes,
                reportedAt: patientSideEffect.reportedAt,
            },
        });
    } catch (error) {
        next(error);
    }
};

type NormalizedReportItem = {
    sideEffectId: number;
    severity: PatientSideEffectSeverity | null;
    notes: string | null;
};

type ParsedReportInputItem =
    | { kind: 'id'; sideEffectId: number; severity: PatientSideEffectSeverity | null; notes: string | null }
    | { kind: 'name'; name: string; severity: PatientSideEffectSeverity | null; notes: string | null };

/** Find or create catalog row by name and link to active substance (same idea as POST /side-effects/add). */
async function resolveSideEffectIdFromReportName(
    name: string,
    activeSubstanceId: number | null,
    userId: number
): Promise<number> {
    const trimmedName = name.trim();
    let sideEffect = await prisma.sideEffect.findUnique({ where: { name: trimmedName } });

    if (!sideEffect) {
        sideEffect = await prisma.sideEffect.create({
            data: {
                name: trimmedName,
                createdBy: SideEffectCreatedBy.Patient,
                status: SideEffectStatus.Pending,
                createdByUserId: userId,
            },
        });
    }

    if (activeSubstanceId) {
        await prisma.medicationSideEffect.upsert({
            where: {
                activeSubstanceId_sideEffectId: {
                    activeSubstanceId,
                    sideEffectId: sideEffect.id,
                },
            },
            create: {
                activeSubstanceId,
                sideEffectId: sideEffect.id,
                frequency: 'Unknown',
            },
            update: {},
        });
    }

    return sideEffect.id;
}

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

/**
 * Each item: either { sideEffectId } (approved catalog id) or { name } (e.g. from GET /medicines/:id/side-effects
 * extracted strings — no id). Exactly one of sideEffectId or name per object.
 */
function parseReportSideEffectInput(raw: unknown[]): ParsedReportInputItem[] | { error: string; message: string } {
    const items: ParsedReportInputItem[] = [];
    const seenIds = new Set<number>();
    const seenNames = new Set<string>();

    for (const el of raw) {
        if (el === null || typeof el !== 'object' || Array.isArray(el)) {
            return {
                error: 'INVALID_SIDE_EFFECT_FORMAT',
                message:
                    'Each item must be an object: { sideEffectId, severity?, notes? } for catalog entries, or { name, severity?, notes? } when there is no id (e.g. extracted from medicine data)',
            };
        }

        const o = el as Record<string, unknown>;
        const sn = parseSeverityAndNotes(o);
        if ('error' in sn) {
            return sn;
        }
        const { severity, notes } = sn;

        const hasId =
            typeof o.sideEffectId === 'number' && Number.isInteger(o.sideEffectId) && (o.sideEffectId as number) >= 1;
        const nameRaw = typeof o.name === 'string' ? o.name.trim() : '';
        const hasName = nameRaw.length > 0;

        if (hasId === hasName) {
            return {
                error: 'INVALID_SIDE_EFFECT_FORMAT',
                message:
                    'Each item must include exactly one of: sideEffectId (positive integer) or name (non-empty string)',
            };
        }

        if (hasId) {
            const sideEffectId = o.sideEffectId as number;
            if (seenIds.has(sideEffectId)) continue;
            seenIds.add(sideEffectId);
            items.push({ kind: 'id', sideEffectId, severity, notes });
        } else {
            const key = nameRaw.toLowerCase();
            if (seenNames.has(key)) continue;
            seenNames.add(key);
            items.push({ kind: 'name', name: nameRaw, severity, notes });
        }
    }

    if (items.length === 0) {
        return { error: 'INVALID_SIDE_EFFECTS', message: 'sideEffects must be a non-empty array' };
    }

    return items;
}

/** POST /my-side-effects — report approved side effects for a medicine (optional severity & notes per item). */
export const reportSideEffects = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { medicationId, sideEffects } = req.body;
        const userId = req.user!.userId;

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
                message:
                    'sideEffects must be a non-empty array of { sideEffectId, severity?, notes? } and/or { name, severity?, notes? }',
            });
            return;
        }

        const parsedInput = parseReportSideEffectInput(sideEffects);
        if (!Array.isArray(parsedInput)) {
            res.status(400).json({ success: false, ...parsedInput });
            return;
        }

        const patient = await prisma.patient.findUnique({ where: { userId } });
        if (!patient) {
            res.status(404).json({
                success: false,
                error: 'PATIENT_NOT_FOUND',
                message: 'Patient profile not found',
            });
            return;
        }

        const patientMedicine = await prisma.patientMedicine.findFirst({
            where: { id: medicationId, patientId: patient.id },
            include: { tradeName: { include: { company: true } } },
        });
        if (!patientMedicine) {
            res.status(403).json({
                success: false,
                error: 'MEDICINE_NOT_IN_PROFILE',
                message: 'This medicine is not in your medication profile',
            });
            return;
        }

        if (patientMedicine.tradeName && !patientMedicine.tradeName.company) {
            const redirect = await getPatientSideEffectsFallbackRedirectUrl();
            res.status(403).json({
                success: false,
                error: 'SIDE_EFFECTS_TRADE_NAME_NO_COMPANY',
                message:
                    'This medicine is not linked to a manufacturer. Reporting side effects here is not available; open the link for more information.',
                redirect,
            });
            return;
        }

        const activeSubstanceId =
            patientMedicine.activeSubstanceId ?? patientMedicine.tradeName?.activeSubstanceId ?? null;

        type Row = NormalizedReportItem & { mustBeApproved: boolean };
        const resolvedRows: Row[] = [];
        for (const item of parsedInput) {
            if (item.kind === 'id') {
                resolvedRows.push({
                    sideEffectId: item.sideEffectId,
                    severity: item.severity,
                    notes: item.notes,
                    mustBeApproved: true,
                });
            } else {
                const sideEffectId = await resolveSideEffectIdFromReportName(
                    item.name,
                    activeSubstanceId,
                    userId
                );
                resolvedRows.push({
                    sideEffectId,
                    severity: item.severity,
                    notes: item.notes,
                    mustBeApproved: false,
                });
            }
        }

        const deduped = new Map<number, Row>();
        for (const row of resolvedRows) {
            if (!deduped.has(row.sideEffectId)) {
                deduped.set(row.sideEffectId, row);
            }
        }
        const finalRows = [...deduped.values()];

        const explicitIds = finalRows.filter((r) => r.mustBeApproved).map((r) => r.sideEffectId);
        if (explicitIds.length > 0) {
            const existingSideEffects = await prisma.sideEffect.findMany({
                where: { id: { in: explicitIds }, status: SideEffectStatus.Approved },
            });
            if (existingSideEffects.length !== explicitIds.length) {
                const found = new Set(existingSideEffects.map((s) => s.id));
                const missing = explicitIds.filter((id: number) => !found.has(id));
                res.status(400).json({
                    success: false,
                    error: 'SIDE_EFFECTS_NOT_FOUND',
                    message: 'Some side effect IDs do not exist or are not approved yet',
                    missing,
                });
                return;
            }
        }

        const sideEffectIds = finalRows.map((i) => i.sideEffectId);
        const existingSubmissions = await prisma.patientSideEffect.findMany({
            where: {
                patientId: patient.id,
                patientMedicineId: medicationId,
                sideEffectId: { in: sideEffectIds },
            },
        });

        if (existingSubmissions.length > 0) {
            const duplicateIds = existingSubmissions.map((s) => s.sideEffectId);
            res.status(409).json({
                success: false,
                error: 'DUPLICATE_SUBMISSION',
                message: `${duplicateIds.length} of these side effects were already reported`,
                duplicates: duplicateIds,
            });
            return;
        }

        const normalized: NormalizedReportItem[] = finalRows.map(
            ({ sideEffectId, severity, notes }) => ({ sideEffectId, severity, notes })
        );
        const byId = new Map(normalized.map((i) => [i.sideEffectId, i]));
        const results = await Promise.all(
            sideEffectIds.map((sideEffectId: number) => {
                const item = byId.get(sideEffectId)!;
                return prisma.patientSideEffect.create({
                    data: {
                        patientId: patient.id,
                        patientMedicineId: medicationId,
                        sideEffectId,
                        severity: item.severity,
                        notes: item.notes,
                        reportedAt: new Date(),
                    },
                    include: { sideEffect: true },
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
                name: r.sideEffect.name,
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
                sideEffect: true,
                patientMedicine: {
                    select: { id: true, medicineName: true, tradeNameId: true },
                },
            },
            orderBy: { reportedAt: 'desc' },
        });

        res.json({
            sideEffects: records.map((r) => ({
                id: r.id,
                sideEffect: { id: r.sideEffect.id, name: r.sideEffect.name, nameAr: r.sideEffect.nameAr },
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

        const records = await prisma.patientSideEffect.findMany({
            where: { patientId: patient.id, patientMedicineId: medicationId },
            include: { sideEffect: true },
            orderBy: { reportedAt: 'desc' },
        });

        res.json({
            sideEffects: records.map((r) => ({
                id: r.id,
                sideEffect: { id: r.sideEffect.id, name: r.sideEffect.name, nameAr: r.sideEffect.nameAr },
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
 * - Validates active contract with company
 * - Groups by frequency
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

        const redirect = await getPatientSideEffectsFallbackRedirectUrl();

        if (!tradeName.company) {
            res.status(403).json({
                success: false,
                error: 'NO_COMPANY',
                message: 'This medicine is not linked to a manufacturer. Open the link for more information.',
                redirect,
            });
            return;
        }

        const hasActiveContract = tradeNameAllowsSideEffectsDisclosure(tradeName);

        if (!hasActiveContract) {
            res.status(403).json({
                success: false,
                error: 'NO_ACTIVE_CONTRACT',
                message: 'No active contract for this medication. Open the link for more information.',
                redirect,
            });
            return;
        }

        // 3. Extract side effects on-the-fly from ActiveSubstance JSON fields
        const extracted = await extractSideEffects(tradeName.activeSubstanceId);

        res.json({
            success: true,
            medicineId: tradeName.id,
            tradeName: tradeName.title,
            hasContract: true,
            instructionPdf: tradeName.companyInstructionsPdf ? {
                id: tradeName.companyInstructionsPdf.id,
                url: tradeName.companyInstructionsPdf.url,
                views: tradeName.companyInstructionsPdf.views,
                createdAt: tradeName.companyInstructionsPdf.createdAt,
                updatedAt: tradeName.companyInstructionsPdf.updatedAt,
            } : null,
            sideEffects: extracted?.sideEffects ?? {
                veryCommon: [],
                common:     [],
                uncommon:   [],
                rare:       [],
                veryRare:   [],
                unknown:    [],
            },
        });
    } catch (error) {
        next(error);
    }
};

