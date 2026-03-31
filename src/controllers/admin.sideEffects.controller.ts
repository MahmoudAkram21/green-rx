import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';

// Get all approved side effects
export const getAllSideEffects = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const sideEffects = await prisma.sideEffect.findMany({
            where: { status: 'Approved' },
            include: {
                tradeNames: {
                    include: { tradeName: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        // Format to match frontend structure (medications array instead of junction table)
        const formatted = sideEffects.map(se => ({
            ...se,
            medications: se.tradeNames.map(tn => ({
                id: tn.tradeName.id,
                name: tn.tradeName.title
            }))
        }));

        res.json({ sideEffects: formatted });
    } catch (error) {
        next(error);
    }
};

// Get pending side effects
export const getPendingSideEffects = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const sideEffects = await prisma.sideEffect.findMany({
            where: { status: 'Pending' },
            include: {
                tradeNames: {
                    include: { tradeName: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        const formatted = sideEffects.map(se => ({
            ...se,
            medications: se.tradeNames.map(tn => ({
                id: tn.tradeName.id,
                name: tn.tradeName.title
            }))
        }));

        res.json({ sideEffects: formatted });
    } catch (error) {
        next(error);
    }
};

// Create a new side effect
export const createSideEffect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { name, nameAr, tradeNames } = req.body;
        const userId = req.user?.userId;

        if (!name) {
            res.status(400).json({ error: 'Name is required' });
            return;
        }

        const newSideEffect = await prisma.sideEffect.create({
            data: {
                name,
                nameAr: nameAr || null,
                createdBy: 'Admin',
                status: 'Approved',
                createdByUserId: userId,
                ...(tradeNames && tradeNames.length > 0 && {
                    tradeNames: {
                        create: tradeNames.map((id: number) => ({
                            tradeName: { connect: { id } }
                        }))
                    }
                })
            },
            include: {
                tradeNames: { include: { tradeName: true } }
            }
        });

        res.status(201).json({
            sideEffect: {
                ...newSideEffect,
                medications: newSideEffect.tradeNames.map(tn => ({
                    id: tn.tradeName.id,
                    name: tn.tradeName.title
                }))
            }
        });
    } catch (error) {
        next(error);
    }
};

// Update an existing side effect
export const updateSideEffect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        const { name, nameAr } = req.body;

        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid ID' });
            return;
        }

        const existing = await prisma.sideEffect.findUnique({ where: { id } });
        if (!existing) {
            res.status(404).json({ error: 'Side effect not found' });
            return;
        }

        const updated = await prisma.sideEffect.update({
            where: { id },
            data: {
                ...(name && { name }),
                ...(nameAr !== undefined && { nameAr })
            }
        });

        res.json({ sideEffect: updated });
    } catch (error) {
        next(error);
    }
};

// Approve a pending side effect
export const approveSideEffect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        
        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid ID' });
            return;
        }

        const existing = await prisma.sideEffect.findUnique({ where: { id } });
        if (!existing) {
            res.status(404).json({ error: 'Side effect not found' });
            return;
        }

        const updated = await prisma.sideEffect.update({
            where: { id },
            data: { status: 'Approved' }
        });

        res.json({ message: 'Approved successfully', sideEffect: updated });
    } catch (error) {
        next(error);
    }
};

// Attach trade names parsing
export const attachTradeNames = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        const { tradeNames } = req.body;

        if (isNaN(id) || !Array.isArray(tradeNames)) {
            res.status(400).json({ error: 'Invalid parameters' });
            return;
        }

        const existing = await prisma.sideEffect.findUnique({ where: { id } });
        if (!existing) {
            res.status(404).json({ error: 'Side effect not found' });
            return;
        }

        // Add relationships avoiding duplicates using standard prisma creates
        // It's safer to just iterate with upsert or ignore since createMany doesn't handle conflicts without skipDuplicates (only on some DBs)
        await prisma.tradeNameSideEffect.createMany({
            data: tradeNames.map((tnId: number) => ({
                sideEffectId: id,
                tradeNameId: tnId
            })),
            skipDuplicates: true
        });

        res.json({ message: 'Trade names attached successfully' });
    } catch (error) {
        next(error);
    }
};

// Remove single trade name from side effect mapping
export const removeTradeName = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        const tradeNameId = parseInt(req.params.tradeNameId);

        if (isNaN(id) || isNaN(tradeNameId)) {
            res.status(400).json({ error: 'Invalid parameter IDs' });
            return;
        }

        await prisma.tradeNameSideEffect.delete({
            where: {
                sideEffectId_tradeNameId: {
                    sideEffectId: id,
                    tradeNameId
                }
            }
        }).catch(err => {
            if (err.code !== 'P2025') throw err; // Ignore not found error
        });

        res.json({ message: 'Trade name removed' });
    } catch (error) {
        next(error);
    }
};
