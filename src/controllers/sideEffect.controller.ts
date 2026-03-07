import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';

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
            where: { activeSubstanceId },
            include: { sideEffect: true },
            orderBy: { sideEffect: { name: 'asc' } },
        });

        res.json({
            supported: true,
            sideEffects: records.map((r) => ({
                id: r.sideEffect.id,
                name: r.sideEffect.name,
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

        const patientMedicine = await prisma.patientMedicine.findUnique({
            where: { id: medicationId },
            include: { tradeName: true },
        });

        if (!patientMedicine) {
            res.status(404).json({ error: 'Medication not found' });
            return;
        }

        const activeSubstanceId =
            patientMedicine.activeSubstanceId ?? patientMedicine.tradeName?.activeSubstanceId;

        const sideEffect = await prisma.sideEffect.upsert({
            where: { name: name.trim() },
            create: { name: name.trim() },
            update: {},
        });

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

        res.status(201).json({
            message: 'Side effect created and linked to medication',
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
            where: { id: { in: sideEffects } },
        });
        if (existingSideEffects.length !== sideEffects.length) {
            const found = new Set(existingSideEffects.map((s) => s.id));
            const missing = sideEffects.filter((id: number) => !found.has(id));
            res.status(400).json({ error: 'Some side effect IDs do not exist', missing });
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
                sideEffect: { id: r.sideEffect.id, name: r.sideEffect.name },
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
                sideEffect: { id: r.sideEffect.id, name: r.sideEffect.name },
                severity: r.severity,
                notes: r.notes,
                reportedAt: r.reportedAt,
            })),
        });
    } catch (error) {
        next(error);
    }
};
