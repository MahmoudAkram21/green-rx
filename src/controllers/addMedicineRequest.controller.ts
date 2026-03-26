import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { AddMedicineRequestStatus } from '../../generated/client/client';

// GET /add-medicine-requests – list with filters (admin only)
export const listAddMedicineRequests = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { status, page = '1', limit = '20' } = req.query;
        const where: { status?: AddMedicineRequestStatus } = {};
        if (status === 'Pending' || status === 'Resolved') {
            where.status = status as AddMedicineRequestStatus;
        }

        const [items, total] = await Promise.all([
            prisma.addMedicineRequest.findMany({
                where,
                include: {
                    patient: { select: { id: true, user: { select: { name: true, email: true } } } },
                    patientMedicine: { select: { id: true, medicineName: true, imageUrl: true } },
                    matchedTradeName: { select: { id: true, title: true } },
                    matchedActiveSubstance: { select: { id: true, name: true } },
                },
                skip: (Number(page) - 1) * Number(limit),
                take: Number(limit),
                orderBy: { createdAt: 'desc' },
            }),
            prisma.addMedicineRequest.count({ where }),
        ]);

        const data = items.map((r) => ({
            ...r,
            tradeNameMissing: r.matchedTradeNameId == null,
            activeSubstanceMissing: r.matchedActiveSubstanceId == null,
        }));

        res.json({ data, total, page: Number(page), limit: Number(limit) });
    } catch (error) {
        next(error);
    }
};

// GET /add-medicine-requests/:id – single request with full data
export const getAddMedicineRequestById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const request = await prisma.addMedicineRequest.findUnique({
            where: { id: Number(id) },
            include: {
                patient: { select: { id: true, user: { select: { name: true, email: true } } } },
                patientMedicine: {
                    select: {
                        id: true,
                        medicineName: true,
                        imageUrl: true,
                        imageFileName: true,
                        tradeNameId: true,
                        activeSubstanceId: true,
                        isVerified: true,
                    },
                },
                matchedTradeName: { include: { activeSubstance: true, company: true } },
                matchedActiveSubstance: true,
                resolver: { select: { id: true, email: true } },
            },
        });

        if (!request) {
            res.status(404).json({ message: 'Add medicine request not found' });
            return;
        }

        res.json({
            ...request,
            tradeNameMissing: request.matchedTradeNameId == null,
            activeSubstanceMissing: request.matchedActiveSubstanceId == null,
        });
    } catch (error) {
        next(error);
    }
};

// PATCH /add-medicine-requests/:id/resolve – link IDs to PatientMedicine and mark resolved
export const resolveAddMedicineRequest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const { tradeNameId, activeSubstanceId, resolutionNotes } = req.body;
        const userId = (req as any).user?.userId;

        const addRequest = await prisma.addMedicineRequest.findUnique({
            where: { id: Number(id) },
            include: { patientMedicine: true },
        });

        if (!addRequest) {
            res.status(404).json({ message: 'Add medicine request not found' });
            return;
        }

        if (addRequest.status === AddMedicineRequestStatus.Resolved) {
            res.status(400).json({ message: 'Request is already resolved' });
            return;
        }

        let finalTradeNameId: number | null = addRequest.patientMedicine.tradeNameId;
        let finalActiveSubstanceId: number | null = addRequest.patientMedicine.activeSubstanceId;
        let medicineName = addRequest.patientMedicine.medicineName;

        if (tradeNameId != null) {
            const tn = await prisma.tradeName.findUnique({
                where: { id: Number(tradeNameId) },
                select: { id: true, title: true, activeSubstanceId: true },
            });
            if (!tn) {
                res.status(404).json({ message: 'Trade name not found' });
                return;
            }
            finalTradeNameId = tn.id;
            finalActiveSubstanceId = tn.activeSubstanceId;
            medicineName = tn.title;
        }

        if (activeSubstanceId != null && finalActiveSubstanceId == null) {
            const as_ = await prisma.activeSubstance.findUnique({
                where: { id: Number(activeSubstanceId) },
            });
            if (!as_) {
                res.status(404).json({ message: 'Active substance not found' });
                return;
            }
            finalActiveSubstanceId = as_.id;
        }

        await prisma.$transaction([
            prisma.patientMedicine.update({
                where: { id: addRequest.patientMedicineId },
                data: {
                    tradeNameId: finalTradeNameId,
                    activeSubstanceId: finalActiveSubstanceId,
                    medicineName,
                    isVerified: true,
                    verifiedBy: userId,
                    verifiedAt: new Date(),
                },
            }),
            prisma.addMedicineRequest.update({
                where: { id: Number(id) },
                data: {
                    status: AddMedicineRequestStatus.Resolved,
                    resolvedBy: userId,
                    resolvedAt: new Date(),
                    resolutionNotes: resolutionNotes ?? null,
                    ...(finalTradeNameId != null && { matchedTradeNameId: finalTradeNameId }),
                    ...(finalActiveSubstanceId != null && { matchedActiveSubstanceId: finalActiveSubstanceId }),
                },
            }),
        ]);

        const updated = await prisma.addMedicineRequest.findUnique({
            where: { id: Number(id) },
            include: {
                patient: { select: { id: true, user: { select: { name: true, email: true } } } },
                patientMedicine: {
                    include: {
                        tradeName: { include: { activeSubstance: true, company: true } },
                        activeSubstance: true,
                    },
                },
                matchedTradeName: true,
                matchedActiveSubstance: true,
                resolver: { select: { id: true, email: true } },
            },
        });

        res.json(updated);
    } catch (error) {
        next(error);
    }
};
