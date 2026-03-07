import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { SideEffectCreatedBy, SideEffectStatus } from '../../generated/client/client';

const createSideEffectSchema = z.object({
    name: z.string().min(1).max(200).trim(),
    nameAr: z.string().max(200).trim().optional().nullable(),
    medications: z.array(z.number().int().positive()).optional().default([]), // active substance IDs
});

const updateSideEffectSchema = z.object({
    name: z.string().min(1).max(200).trim().optional(),
    nameAr: z.string().max(200).trim().optional().nullable(),
});

const attachTradeNamesSchema = z.object({
    tradeNames: z.array(z.number().int().positive()).min(1),
});

export const createSideEffect = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsed = createSideEffectSchema.parse(req.body);
        const name = parsed.name.trim();

        const existing = await prisma.sideEffect.findUnique({ where: { name } });
        if (existing) {
            res.status(409).json({ error: 'Side effect with this name already exists', sideEffect: existing });
            return;
        }

        const sideEffect = await prisma.sideEffect.create({
            data: {
                name,
                nameAr: parsed.nameAr?.trim() || null,
                createdBy: SideEffectCreatedBy.Admin,
                status: SideEffectStatus.Approved,
            },
        });

        if (parsed.medications.length > 0) {
            const validSubstances = await prisma.activeSubstance.findMany({
                where: { id: { in: parsed.medications } },
            });
            const validIds = validSubstances.map((s) => s.id);
            await prisma.medicationSideEffect.createMany({
                data: validIds.map((activeSubstanceId) => ({
                    activeSubstanceId,
                    sideEffectId: sideEffect.id,
                    frequency: 'Unknown',
                })),
                skipDuplicates: true,
            });
        }

        const withMedications = await prisma.sideEffect.findUnique({
            where: { id: sideEffect.id },
            include: {
                medicationSideEffects: {
                    include: { activeSubstance: { select: { id: true, activeSubstance: true } } },
                },
            },
        });

        res.status(201).json({
            message: 'Side effect created successfully',
            sideEffect: withMedications,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: 'Validation failed', issues: error.issues });
            return;
        }
        next(error);
    }
};

export const updateSideEffect = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid side effect ID' });
            return;
        }

        const parsed = updateSideEffectSchema.parse(req.body);

        const existing = await prisma.sideEffect.findUnique({ where: { id } });
        if (!existing) {
            res.status(404).json({ error: 'Side effect not found' });
            return;
        }

        if (parsed.name && parsed.name !== existing.name) {
            const duplicate = await prisma.sideEffect.findUnique({ where: { name: parsed.name } });
            if (duplicate) {
                res.status(409).json({ error: 'Another side effect with this name already exists' });
                return;
            }
        }

        const updateData: { name?: string; nameAr?: string | null } = {};
        if (parsed.name !== undefined) updateData.name = parsed.name;
        if (parsed.nameAr !== undefined) updateData.nameAr = parsed.nameAr?.trim() || null;

        const updated = await prisma.sideEffect.update({
            where: { id },
            data: updateData,
            include: {
                medicationSideEffects: {
                    include: { activeSubstance: { select: { id: true, activeSubstance: true } } },
                },
            },
        });

        res.json({ message: 'Side effect updated successfully', sideEffect: updated });
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: 'Validation failed', issues: error.issues });
            return;
        }
        next(error);
    }
};

export const attachTradeNames = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid side effect ID' });
            return;
        }

        const parsed = attachTradeNamesSchema.parse(req.body);

        const sideEffect = await prisma.sideEffect.findUnique({ where: { id } });
        if (!sideEffect) {
            res.status(404).json({ error: 'Side effect not found' });
            return;
        }

        const validTradeNames = await prisma.tradeName.findMany({
            where: { id: { in: parsed.tradeNames } },
            select: { id: true, activeSubstanceId: true },
        });
        const activeSubstanceIds = [...new Set(validTradeNames.map((t) => t.activeSubstanceId))];

        const result = await prisma.medicationSideEffect.createMany({
            data: activeSubstanceIds.map((activeSubstanceId) => ({
                activeSubstanceId,
                sideEffectId: id,
                frequency: 'Unknown',
            })),
            skipDuplicates: true,
        });

        const updated = await prisma.sideEffect.findUnique({
            where: { id },
            include: {
                medicationSideEffects: {
                    include: { activeSubstance: { select: { id: true, activeSubstance: true } } },
                },
            },
        });

        res.json({
            message: `Attached ${result.count} medication(s) to side effect`,
            sideEffect: updated,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: 'Validation failed', issues: error.issues });
            return;
        }
        next(error);
    }
};

export const removeTradeName = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const tradeNameId = parseInt(req.params.tradeNameId);
        if (isNaN(id) || isNaN(tradeNameId)) {
            res.status(400).json({ error: 'Invalid ID' });
            return;
        }

        const tradeName = await prisma.tradeName.findUnique({
            where: { id: tradeNameId },
            select: { activeSubstanceId: true },
        });
        if (!tradeName) {
            res.status(404).json({ error: 'Trade name not found' });
            return;
        }

        await prisma.medicationSideEffect.deleteMany({
            where: {
                sideEffectId: id,
                activeSubstanceId: tradeName.activeSubstanceId,
            },
        });

        res.json({ message: 'Trade name removed from side effect successfully' });
    } catch (error) {
        next(error);
    }
};

export const listSideEffects = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const sideEffects = await prisma.sideEffect.findMany({
            include: {
                medicationSideEffects: {
                    include: { activeSubstance: { select: { id: true, activeSubstance: true } } },
                },
            },
            orderBy: { name: 'asc' },
        });

        res.json({
            sideEffects: sideEffects.map((s) => ({
                id: s.id,
                name: s.name,
                nameAr: s.nameAr,
                createdBy: s.createdBy,
                status: s.status,
                createdAt: s.createdAt,
                medications: s.medicationSideEffects.map((m) => ({
                    id: m.activeSubstance.id,
                    name: m.activeSubstance.activeSubstance,
                })),
            })),
        });
    } catch (error) {
        next(error);
    }
};

export const listPendingSideEffects = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const sideEffects = await prisma.sideEffect.findMany({
            where: { status: SideEffectStatus.Pending, createdBy: SideEffectCreatedBy.Patient },
            include: {
                medicationSideEffects: {
                    include: { activeSubstance: { select: { id: true, activeSubstance: true } } },
                },
            },
            orderBy: { createdAt: 'desc' },
        });

        res.json({
            sideEffects: sideEffects.map((s) => ({
                id: s.id,
                name: s.name,
                nameAr: s.nameAr,
                createdBy: s.createdBy,
                status: s.status,
                createdByUserId: s.createdByUserId,
                createdAt: s.createdAt,
                medications: s.medicationSideEffects.map((m) => ({
                    id: m.activeSubstance.id,
                    name: m.activeSubstance.activeSubstance,
                })),
            })),
        });
    } catch (error) {
        next(error);
    }
};

export const approveSideEffect = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid side effect ID' });
            return;
        }

        const sideEffect = await prisma.sideEffect.findUnique({ where: { id } });
        if (!sideEffect) {
            res.status(404).json({ error: 'Side effect not found' });
            return;
        }

        if (sideEffect.status === SideEffectStatus.Approved) {
            res.status(400).json({ error: 'Side effect is already approved' });
            return;
        }

        const updated = await prisma.sideEffect.update({
            where: { id },
            data: { status: SideEffectStatus.Approved },
            include: {
                medicationSideEffects: {
                    include: { activeSubstance: { select: { id: true, activeSubstance: true } } },
                },
            },
        });

        res.json({
            message: 'Side effect approved successfully. It will now appear in the mobile app.',
            sideEffect: updated,
        });
    } catch (error) {
        next(error);
    }
};
