import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';

export const getRequests = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { status = 'Pending', page = '1', limit = '20' } = req.query;
        const pageNum = parseInt(page as string);
        const limitNum = parseInt(limit as string);
        const skip = (pageNum - 1) * limitNum;

        const whereClause: any = {
            ...(status && { status: status as string })
        };

        const [requests, total] = await Promise.all([
            prisma.addMedicineRequest.findMany({
                where: whereClause,
                skip,
                take: limitNum,
                include: {
                    patient: {
                        include: {
                            user: true
                        }
                    },
                    patientMedicine: {
                        select: {
                            id: true,
                            medicineName: true,
                            imageUrl: true
                        }
                    },
                    matchedTradeName: {
                        select: {
                            id: true,
                            title: true
                        }
                    },
                    matchedActiveSubstance: {
                        select: {
                            id: true,
                            activeSubstance: true
                        }
                    }
                },
                orderBy: { createdAt: 'desc' }
            }),
            prisma.addMedicineRequest.count({ where: whereClause })
        ]);

        res.json({
            data: requests,
            total,
            page: pageNum,
            limit: limitNum
        });
    } catch (error) {
        next(error);
    }
};

export const getRequestById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid ID' });
            return;
        }

        const request = await prisma.addMedicineRequest.findUnique({
            where: { id },
            include: {
                patient: {
                    include: {
                        user: true
                    }
                },
                patientMedicine: {
                    select: {
                        id: true,
                        medicineName: true,
                        imageUrl: true
                    }
                },
                matchedTradeName: {
                    select: {
                        id: true,
                        title: true
                    }
                },
                matchedActiveSubstance: {
                    select: {
                        id: true,
                        activeSubstance: true
                    }
                }
            }
        });

        if (!request) {
            res.status(404).json({ error: 'Request not found' });
            return;
        }

        res.json(request);
    } catch (error) {
        next(error);
    }
};

export const resolveRequest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        const { tradeNameId, activeSubstanceId, resolutionNotes } = req.body;
        const userId = req.user?.userId;

        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid ID' });
            return;
        }

        const requestData = await prisma.addMedicineRequest.findUnique({ where: { id } });

        if (!requestData) {
            res.status(404).json({ error: 'Request not found' });
            return;
        }

        if (requestData.status === 'Resolved') {
            res.status(400).json({ error: 'Request already resolved' });
            return;
        }

        // 1. Update the AddMedicineRequest record
        const updatedRequest = await prisma.addMedicineRequest.update({
            where: { id },
            data: {
                status: 'Resolved',
                resolvedByUserId: userId,
                resolvedAt: new Date(),
                resolutionNotes,
                ...(tradeNameId && { matchedTradeNameId: parseInt(tradeNameId, 10) }),
                ...(activeSubstanceId && { matchedActiveSubstanceId: parseInt(activeSubstanceId, 10) })
            }
        });

        // 2. Also update the linked PatientMedicine setting `isVerified` and connecting the `tradeNameId` if provided
        await prisma.patientMedicine.update({
            where: { id: requestData.patientMedicineId },
            data: {
                isVerified: true,
                ...(tradeNameId && { tradeNameId: parseInt(tradeNameId, 10) })
            }
        });

        res.json({ message: 'Request resolved successfully', request: updatedRequest });
    } catch (error) {
        next(error);
    }
};
