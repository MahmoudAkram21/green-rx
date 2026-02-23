import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import path from 'path';
import fs from 'fs';

const uploadsDir = path.join(__dirname, '../../uploads/patient-medicines');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// ── GET /patient-medicines/patient/:patientId ─────────────────────────────────
export const getPatientMedicines = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { patientId } = req.params;
        const { isOngoing } = req.query;

        const where: any = { patientId: Number(patientId) };
        if (isOngoing !== undefined) {
            where.isOngoing = isOngoing === 'true';
        }

        const medicines = await prisma.patientMedicine.findMany({
            where,
            include: {
                tradeName: {
                    include: { activeSubstance: true, company: true }
                },
                activeSubstance: true,
            },
            orderBy: { createdAt: 'desc' },
        });

        res.json(medicines);
    } catch (error) {
        next(error);
    }
};

// ── GET /patient-medicines/:id ────────────────────────────────────────────────
export const getPatientMedicineById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const medicine = await prisma.patientMedicine.findUnique({
            where: { id: Number(req.params.id) },
            include: {
                tradeName: { include: { activeSubstance: true, company: true } },
                activeSubstance: true,
            },
        });

        if (!medicine) {
            res.status(404).json({ message: 'Medicine record not found' });
            return;
        }

        res.json(medicine);
    } catch (error) {
        next(error);
    }
};

// ── POST /patient-medicines/patient/:patientId ────────────────────────────────
// Patient picks a medicine that exists in the system (tradeNameId required)
export const addPatientMedicine = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { patientId } = req.params;
        const {
            tradeNameId,
            medicineName,
            dosage,
            frequency,
            startDate,
            endDate,
            isOngoing,
            notes,
        } = req.body;

        if (!medicineName) {
            res.status(400).json({ message: 'medicineName is required' });
            return;
        }

        // If tradeNameId provided, pull activeSubstanceId automatically
        let activeSubstanceId: number | undefined;
        if (tradeNameId) {
            const tn = await prisma.tradeName.findUnique({
                where: { id: Number(tradeNameId) },
                select: { activeSubstanceId: true },
            });
            if (!tn) {
                res.status(404).json({ message: 'Trade name not found in system' });
                return;
            }
            activeSubstanceId = tn.activeSubstanceId;
        }

        const medicine = await prisma.patientMedicine.create({
            data: {
                patientId: Number(patientId),
                tradeNameId: tradeNameId ? Number(tradeNameId) : null,
                activeSubstanceId: activeSubstanceId ?? null,
                medicineName,
                dosage,
                frequency,
                startDate: startDate ? new Date(startDate) : null,
                endDate: endDate ? new Date(endDate) : null,
                isOngoing: isOngoing !== undefined ? Boolean(isOngoing) : true,
                notes,
            },
            include: {
                tradeName: { include: { activeSubstance: true, company: true } },
                activeSubstance: true,
            },
        });

        res.status(201).json(medicine);
    } catch (error) {
        next(error);
    }
};

// ── POST /patient-medicines/patient/:patientId/upload-image ───────────────────
// Patient does NOT find their medicine — uploads an image instead
export const addPatientMedicineByImage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { patientId } = req.params;
        const { medicineName, dosage, frequency, startDate, endDate, isOngoing, notes } = req.body;

        if (!req.file) {
            res.status(400).json({ message: 'Image file is required for unrecognised medicine upload' });
            return;
        }

        const imageUrl = `/uploads/patient-medicines/${req.file.filename}`;

        const medicine = await prisma.patientMedicine.create({
            data: {
                patientId: Number(patientId),
                medicineName: medicineName || req.file.originalname,
                dosage,
                frequency,
                startDate: startDate ? new Date(startDate) : null,
                endDate: endDate ? new Date(endDate) : null,
                isOngoing: isOngoing !== undefined ? Boolean(isOngoing) : true,
                notes,
                imageUrl,
                imageFileName: req.file.originalname,
                isVerified: false,
            },
        });

        res.status(201).json(medicine);
    } catch (error) {
        next(error);
    }
};

// ── PATCH /patient-medicines/:id ──────────────────────────────────────────────
export const updatePatientMedicine = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const { dosage, frequency, startDate, endDate, isOngoing, notes, medicineName } = req.body;

        const existing = await prisma.patientMedicine.findUnique({ where: { id: Number(id) } });
        if (!existing) {
            res.status(404).json({ message: 'Medicine record not found' });
            return;
        }

        const medicine = await prisma.patientMedicine.update({
            where: { id: Number(id) },
            data: {
                medicineName: medicineName ?? existing.medicineName,
                dosage,
                frequency,
                startDate: startDate ? new Date(startDate) : existing.startDate,
                endDate: endDate ? new Date(endDate) : existing.endDate,
                isOngoing: isOngoing !== undefined ? Boolean(isOngoing) : existing.isOngoing,
                notes,
            },
            include: {
                tradeName: { include: { activeSubstance: true } },
            },
        });

        res.json(medicine);
    } catch (error) {
        next(error);
    }
};

// ── DELETE /patient-medicines/:id ─────────────────────────────────────────────
export const deletePatientMedicine = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;

        const existing = await prisma.patientMedicine.findUnique({ where: { id: Number(id) } });
        if (!existing) {
            res.status(404).json({ message: 'Medicine record not found' });
            return;
        }

        // Delete uploaded image file if it exists
        if (existing.imageUrl) {
            const filePath = path.join(__dirname, '../..', existing.imageUrl);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }

        await prisma.patientMedicine.delete({ where: { id: Number(id) } });
        res.json({ message: 'Medicine record deleted successfully' });
    } catch (error) {
        next(error);
    }
};

// ── PATCH /patient-medicines/:id/verify  (Admin/Doctor only) ──────────────────
// Links an image-uploaded medicine to a real TradeName in the system
export const verifyPatientMedicine = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const { tradeNameId } = req.body;
        const verifierId = (req as any).user?.userId;

        if (!tradeNameId) {
            res.status(400).json({ message: 'tradeNameId is required to verify' });
            return;
        }

        const tn = await prisma.tradeName.findUnique({
            where: { id: Number(tradeNameId) },
            select: { id: true, title: true, activeSubstanceId: true },
        });
        if (!tn) {
            res.status(404).json({ message: 'Trade name not found' });
            return;
        }

        const medicine = await prisma.patientMedicine.update({
            where: { id: Number(id) },
            data: {
                tradeNameId: tn.id,
                activeSubstanceId: tn.activeSubstanceId,
                medicineName: tn.title,
                isVerified: true,
                verifiedBy: verifierId,
                verifiedAt: new Date(),
            },
            include: {
                tradeName: { include: { activeSubstance: true, company: true } },
            },
        });

        res.json(medicine);
    } catch (error) {
        next(error);
    }
};

// ── GET /patient-medicines/unverified  (Admin only) ───────────────────────────
export const getUnverifiedMedicines = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { page = '1', limit = '20' } = req.query;

        const [items, total] = await Promise.all([
            prisma.patientMedicine.findMany({
                where: { imageUrl: { not: null }, isVerified: false },
                include: {
                    patient: { select: { id: true, name: true } },
                },
                skip: (Number(page) - 1) * Number(limit),
                take: Number(limit),
                orderBy: { createdAt: 'desc' },
            }),
            prisma.patientMedicine.count({
                where: { imageUrl: { not: null }, isVerified: false },
            }),
        ]);

        res.json({ data: items, total, page: Number(page), limit: Number(limit) });
    } catch (error) {
        next(error);
    }
};
