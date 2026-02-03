"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTradeName = exports.updateTradeName = exports.searchTradeNames = exports.getTradeNameById = exports.createTradeName = void 0;
const zod_1 = require("zod");
const prisma_1 = require("../lib/prisma");
const tradeName_zod_1 = require("../zod/tradeName.zod");
// Create Trade Name
const createTradeName = async (req, res, next) => {
    try {
        const validatedData = tradeName_zod_1.createTradeNameSchema.parse(req.body);
        const tradeName = await prisma_1.prisma.tradeName.create({
            data: validatedData,
            include: {
                activeSubstance: {
                    select: { activeSubstance: true }
                },
                company: {
                    select: { name: true }
                }
            }
        });
        res.status(201).json({
            message: 'Trade name created successfully',
            tradeName
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({ error: error.issues });
            return;
        }
        if (error.code === 'P2002') {
            res.status(409).json({ error: 'Trade name already exists' });
            return;
        }
        next(error);
    }
};
exports.createTradeName = createTradeName;
// Get Trade Name by ID
const getTradeNameById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const tradeName = await prisma_1.prisma.tradeName.findUnique({
            where: { id: parseInt(id) },
            include: {
                activeSubstance: true,
                company: true,
                adverseReactions: {
                    take: 10,
                    orderBy: { createdAt: 'desc' }
                }
            }
        });
        if (!tradeName) {
            res.status(404).json({ error: 'Trade name not found' });
            return;
        }
        res.json(tradeName);
    }
    catch (error) {
        next(error);
    }
};
exports.getTradeNameById = getTradeNameById;
// Search Trade Names
const searchTradeNames = async (req, res, next) => {
    try {
        const { search, activeSubstanceId, companyId, isAvailable, page = '1', limit = '20' } = req.query;
        const whereClause = {};
        if (search) {
            whereClause.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                {
                    activeSubstance: {
                        activeSubstance: { contains: search, mode: 'insensitive' }
                    }
                }
            ];
        }
        if (activeSubstanceId) {
            whereClause.activeSubstanceId = parseInt(activeSubstanceId);
        }
        if (companyId) {
            whereClause.companyId = parseInt(companyId);
        }
        if (isAvailable !== undefined) {
            whereClause.isAvailable = isAvailable === 'true';
        }
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const take = parseInt(limit);
        const [tradeNames, total] = await Promise.all([
            prisma_1.prisma.tradeName.findMany({
                where: whereClause,
                include: {
                    activeSubstance: {
                        select: { activeSubstance: true, classification: true }
                    },
                    company: {
                        select: { name: true }
                    }
                },
                skip,
                take,
                orderBy: { title: 'asc' }
            }),
            prisma_1.prisma.tradeName.count({ where: whereClause })
        ]);
        res.json({
            tradeNames,
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / parseInt(limit))
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.searchTradeNames = searchTradeNames;
// Update Trade Name
const updateTradeName = async (req, res, next) => {
    try {
        const { id } = req.params;
        const validatedData = tradeName_zod_1.updateTradeNameSchema.parse(req.body);
        const tradeName = await prisma_1.prisma.tradeName.update({
            where: { id: parseInt(id) },
            data: validatedData,
            include: {
                activeSubstance: true,
                company: true
            }
        });
        res.json({
            message: 'Trade name updated successfully',
            tradeName
        });
    }
    catch (error) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'Trade name not found' });
            return;
        }
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({ error: error.issues });
            return;
        }
        next(error);
    }
};
exports.updateTradeName = updateTradeName;
// Delete Trade Name
const deleteTradeName = async (req, res, next) => {
    try {
        const { id } = req.params;
        await prisma_1.prisma.tradeName.delete({
            where: { id: parseInt(id) }
        });
        res.json({ message: 'Trade name deleted successfully' });
    }
    catch (error) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'Trade name not found' });
            return;
        }
        next(error);
    }
};
exports.deleteTradeName = deleteTradeName;
//# sourceMappingURL=tradeName.controller.js.map