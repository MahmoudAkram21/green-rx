"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveRequest = exports.getRequestById = exports.getRequests = void 0;
const prisma_1 = require("../lib/prisma");
const getRequests = async (req, res, next) => {
    try {
        const { status = 'Pending', page = '1', limit = '20' } = req.query;
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;
        const whereClause = {
            ...(status && { status: status })
        };
        const [requests, total] = await Promise.all([
            prisma_1.prisma.addMedicineRequest.findMany({
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
            prisma_1.prisma.addMedicineRequest.count({ where: whereClause })
        ]);
        res.json({
            data: requests,
            total,
            page: pageNum,
            limit: limitNum
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getRequests = getRequests;
const getRequestById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid ID' });
            return;
        }
        const request = await prisma_1.prisma.addMedicineRequest.findUnique({
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
    }
    catch (error) {
        next(error);
    }
};
exports.getRequestById = getRequestById;
const resolveRequest = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const { tradeNameId, activeSubstanceId, resolutionNotes } = req.body;
        const userId = req.user?.userId;
        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid ID' });
            return;
        }
        const requestData = await prisma_1.prisma.addMedicineRequest.findUnique({ where: { id } });
        if (!requestData) {
            res.status(404).json({ error: 'Request not found' });
            return;
        }
        if (requestData.status === 'Resolved') {
            res.status(400).json({ error: 'Request already resolved' });
            return;
        }
        // 1. Update the AddMedicineRequest record
        const updatedRequest = await prisma_1.prisma.addMedicineRequest.update({
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
        await prisma_1.prisma.patientMedicine.update({
            where: { id: requestData.patientMedicineId },
            data: {
                isVerified: true,
                ...(tradeNameId && { tradeNameId: parseInt(tradeNameId, 10) })
            }
        });
        res.json({ message: 'Request resolved successfully', request: updatedRequest });
    }
    catch (error) {
        next(error);
    }
};
exports.resolveRequest = resolveRequest;
//# sourceMappingURL=addMedicineRequests.controller.js.map