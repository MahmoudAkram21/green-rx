import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { SideEffectCreatedBy, SideEffectStatus } from '../../generated/client/client';

const EDA_REDIRECT_URL = 'https://edaegypt.gov.eg';

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
                        company: {
                            include: {
                                contractingCompanies: {
                                    where: { isActive: true },
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
            res.json({ supported: false, redirect: EDA_REDIRECT_URL });
            return;
        }

        const hasContract = patientMedicine.tradeName.company.contractingCompanies.length > 0;
        if (!hasContract) {
            res.json({ supported: false, redirect: EDA_REDIRECT_URL });
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

        const patient = await prisma.patient.findUnique({ where: { userId: req.user!.userId } });
        if (!patient) {
            res.status(404).json({ error: 'Patient profile not found' });
            return;
        }

        const patientMedicine = await prisma.patientMedicine.findFirst({
            where: { id: medicationId, patientId: patient.id },
            include: { tradeName: true },
        });

        if (!patientMedicine) {
            res.status(404).json({ error: 'Medication not found or does not belong to you' });
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

        if (patient) {
            await prisma.patientSideEffect.upsert({
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
                },
                update: {},
            });
        }

        res.status(201).json({
            message: 'Side effect created and linked to medication. Pending admin approval to appear in the app.',
            sideEffect,
        });
    } catch (error) {
        next(error);
    }
};

export const reportSideEffects = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { medicationId, sideEffects } = req.body;
        const userId = req.user!.userId;

        if (!medicationId || typeof medicationId !== 'number') {
            res.status(400).json({ error: 'medicationId (number) is required' });
            return;
        }
        if (!Array.isArray(sideEffects) || sideEffects.length === 0) {
            res.status(400).json({ error: 'sideEffects must be a non-empty array of IDs' });
            return;
        }

        const patient = await prisma.patient.findUnique({ where: { userId } });
        if (!patient) {
            res.status(404).json({ error: 'Patient profile not found' });
            return;
        }

        const patientMedicine = await prisma.patientMedicine.findFirst({
            where: { id: medicationId, patientId: patient.id },
        });
        if (!patientMedicine) {
            res.status(404).json({ error: 'Medication not found or does not belong to you' });
            return;
        }

        const existingSideEffects = await prisma.sideEffect.findMany({
            where: { id: { in: sideEffects }, status: SideEffectStatus.Approved },
        });
        if (existingSideEffects.length !== sideEffects.length) {
            const found = new Set(existingSideEffects.map((s) => s.id));
            const missing = sideEffects.filter((id: number) => !found.has(id));
            res.status(400).json({ error: 'Some side effect IDs do not exist or are not approved yet', missing });
            return;
        }

        const result = await prisma.patientSideEffect.createMany({
            data: sideEffects.map((sideEffectId: number) => ({
                patientId: patient.id,
                patientMedicineId: medicationId,
                sideEffectId,
            })),
            skipDuplicates: true,
        });

        res.status(201).json({
            message: 'Side effects reported successfully',
            reportedCount: result.count,
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

        console.log("mahmoud", tradeNameId,)
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
                company: {
                    include: {
                        contractingCompanies: {
                            where: {
                                isActive: true,
                                expiryDate: {
                                    gte: new Date(),
                                },
                            },
                            take: 1,
                        },
                    },
                },
                companyInstructionsPdf: true
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

        // 2. Check active contract with company
        const hasActiveContract =
            tradeName.company && tradeName.company.contractingCompanies.length > 0;

        if (!hasActiveContract) {
            res.status(403).json({
                success: false,
                error: 'NO_ACTIVE_CONTRACT',
                message: 'No active contract for this medication',
            });
            return;
        }

        // 3. Extract side effects from TradeNameSideEffect table
        const sideEffectLinks = await prisma.tradeNameSideEffect.findMany({
            where: {
                tradeNameId,
                sideEffect: {
                    status: SideEffectStatus.Approved,
                },
            },
            include: {
                sideEffect: true,
            },
            orderBy: [
                { frequency: 'asc' },
                { sideEffect: { name: 'asc' } },
            ],
        });

        // 4. Group by frequency
        const frequencyOrder = ['VeryCommon', 'Common', 'Uncommon', 'Rare', 'VeryRare', 'Unknown'];
        const sideEffectsGrouped: Record<string, any[]> = {};

        frequencyOrder.forEach((freq) => {
            sideEffectsGrouped[freq.toLowerCase()] = sideEffectLinks
                .filter((link) => link.frequency === freq)
                .map((link) => ({
                    id: link.sideEffect.id,
                    name: link.sideEffect.name,
                    nameAr: link.sideEffect.nameAr,
                    frequency: link.frequency,
                    bodySystem: link.bodySystem,
                }));
        });

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
                updatedAt: tradeName.companyInstructionsPdf.updatedAt
            } : null,
            sideEffects: sideEffectsGrouped,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * ENHANCED ENDPOINT: Submit multiple side effects with severity and notes in batch
 * POST /my-side-effects/batch
 * Accepts array of side effects with severity and optional notes
 */
export const reportBatchSideEffects = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { medicationId, sideEffects } = req.body;
        const userId = req.user!.userId;

        // 1. Validate request format
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
                message: 'sideEffects must be a non-empty array with {sideEffectId, severity, notes?}',
            });
            return;
        }

        // Validate each side effect object
        for (const se of sideEffects) {
            if (!se.sideEffectId || !se.severity) {
                res.status(400).json({
                    success: false,
                    error: 'INVALID_SIDE_EFFECT_FORMAT',
                    message: 'Each side effect must have sideEffectId and severity (Mild|Moderate|Severe)',
                });
                return;
            }
            if (!['Mild', 'Moderate', 'Severe'].includes(se.severity)) {
                res.status(400).json({
                    success: false,
                    error: 'INVALID_SEVERITY',
                    message: 'Severity must be Mild, Moderate, or Severe',
                });
                return;
            }
        }

        // 2. Get patient
        const patient = await prisma.patient.findUnique({ where: { userId } });
        if (!patient) {
            res.status(404).json({
                success: false,
                error: 'PATIENT_NOT_FOUND',
                message: 'Patient profile not found',
            });
            return;
        }

        // 3. Verify patient owns the medication
        const patientMedicine = await prisma.patientMedicine.findFirst({
            where: { id: medicationId, patientId: patient.id },
        });

        if (!patientMedicine) {
            res.status(403).json({
                success: false,
                error: 'MEDICINE_NOT_IN_PROFILE',
                message: 'This medicine is not in your medication profile',
            });
            return;
        }

        // 4. Verify all side effects exist and are approved
        const sideEffectIds = sideEffects.map((se: any) => se.sideEffectId);
        const existingSideEffects = await prisma.sideEffect.findMany({
            where: {
                id: { in: sideEffectIds },
                status: SideEffectStatus.Approved,
            },
        });

        if (existingSideEffects.length !== sideEffectIds.length) {
            const found = new Set(existingSideEffects.map((s) => s.id));
            const missing = sideEffectIds.filter((id: number) => !found.has(id));
            res.status(400).json({
                success: false,
                error: 'SIDE_EFFECTS_NOT_FOUND',
                message: 'Some side effect IDs do not exist or are not approved yet',
                missing,
            });
            return;
        }

        // 5. Check for duplicates
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

        // 6. Create PatientSideEffect records for each submitted side effect
        const sideEffectMap = new Map(sideEffects.map((se: any) => [se.sideEffectId, se]));

        const results = await Promise.all(
            sideEffectIds.map((sideEffectId: number) =>
                prisma.patientSideEffect.create({
                    data: {
                        patientId: patient.id,
                        patientMedicineId: medicationId,
                        sideEffectId,
                        severity: sideEffectMap.get(sideEffectId)?.severity,
                        notes: sideEffectMap.get(sideEffectId)?.notes || null,
                        reportedAt: new Date(),
                    },
                    include: {
                        sideEffect: true,
                    },
                })
            )
        );

        res.status(201).json({
            success: true,
            message: `${results.length} side effects submitted pending approval`,
            submitted: results.length,
            sideEffects: results.map((r) => ({
                id: r.id,
                name: r.sideEffect.name,
                severity: r.severity,
                notes: r.notes,
                status: 'Pending',
            })),
        });
    } catch (error) {
        next(error);
    }
};
