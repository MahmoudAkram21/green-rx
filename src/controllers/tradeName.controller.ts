import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { createTradeNameSchema, updateTradeNameSchema } from '../zod/tradeName.zod';

// Create Trade Name
export const createTradeName = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = createTradeNameSchema.parse(req.body);

        const tradeName = await prisma.tradeName.create({
            data: validatedData as any,
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
    } catch (error: any) {
        if (error instanceof z.ZodError) {
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

// List Trade Names (for dropdowns, PatientTest, etc.)
export const listTradeNames = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { page = '1', limit = '100' } = req.query;
        const pageNum = Math.max(1, parseInt(page as string) || 1);
        const limitNum = Math.min(1000, Math.max(1, parseInt(limit as string) || 100));
        const skip = (pageNum - 1) * limitNum;

        const [tradeNames, total] = await Promise.all([
            prisma.tradeName.findMany({
                include: {
                    activeSubstance: { select: { activeSubstance: true, id: true } },
                    company: { select: { name: true, id: true } }
                },
                orderBy: { title: 'asc' },
                skip,
                take: limitNum
            }),
            prisma.tradeName.count()
        ]);

        res.json({
            tradeNames,
            pagination: {
                total,
                page: pageNum,
                limit: limitNum,
                totalPages: Math.ceil(total / limitNum) || 1
            }
        });
    } catch (error) {
        next(error);
    }
};

// Get Trade Name by ID
export const getTradeNameById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const tradeName = await prisma.tradeName.findUnique({
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
    } catch (error) {
        next(error);
    }
};

// Search Trade Names
export const searchTradeNames = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            search,
            activeSubstanceId,
            companyId,
            isAvailable,
            page = '1',
            limit = '20'
        } = req.query;

        const whereClause: any = {};

        if (search) {
            whereClause.OR = [
                { title: { contains: search as string, mode: 'insensitive' } },
                {
                    activeSubstance: {
                        activeSubstance: { contains: search as string, mode: 'insensitive' }
                    }
                }
            ];
        }

        if (activeSubstanceId) {
            whereClause.activeSubstanceId = parseInt(activeSubstanceId as string);
        }

        if (companyId) {
            whereClause.companyId = parseInt(companyId as string);
        }

        if (isAvailable !== undefined) {
            whereClause.isAvailable = isAvailable === 'true';
        }

        const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
        const take = parseInt(limit as string);

        const [tradeNames, total] = await Promise.all([
            prisma.tradeName.findMany({
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
            prisma.tradeName.count({ where: whereClause })
        ]);

        res.json({
            tradeNames,
            pagination: {
                total,
                page: parseInt(page as string),
                limit: parseInt(limit as string),
                totalPages: Math.ceil(total / parseInt(limit as string))
            }
        });
    } catch (error) {
        next(error);
    }
};

// Update Trade Name
export const updateTradeName = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const validatedData = updateTradeNameSchema.parse(req.body);

        const tradeName = await prisma.tradeName.update({
            where: { id: parseInt(id) },
            data: validatedData as any,
            include: {
                activeSubstance: true,
                company: true
            }
        });

        res.json({
            message: 'Trade name updated successfully',
            tradeName
        });
    } catch (error: any) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'Trade name not found' });
            return;
        }
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.issues });
            return;
        }
        next(error);
    }
};

// Delete Trade Name
export const deleteTradeName = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        await prisma.tradeName.delete({
            where: { id: parseInt(id) }
        });

        res.json({ message: 'Trade name deleted successfully' });
    } catch (error: any) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'Trade name not found' });
            return;
        }
        next(error);
    }
};
