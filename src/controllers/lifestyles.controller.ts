import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';

export const getAllLifestyles = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const lifestyles = await prisma.lifestyle.findMany({
            orderBy: { id: 'asc' }
        });
        res.json(lifestyles);
    } catch (error) {
        next(error);
    }
};

export const getLifestyleById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid lifestyle ID' });
            return;
        }

        const lifestyle = await prisma.lifestyle.findUnique({
            where: { id }
        });

        if (!lifestyle) {
            res.status(404).json({ error: 'Lifestyle not found' });
            return;
        }

        res.json(lifestyle);
    } catch (error) {
        next(error);
    }
};

export const createLifestyle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { question, activeSubstanceField } = req.body;
        if (!question || !activeSubstanceField) {
            res.status(400).json({ error: 'Question and activeSubstanceField are required' });
            return;
        }

        const newLifestyle = await prisma.lifestyle.create({
            data: { question, activeSubstanceField }
        });

        res.status(201).json(newLifestyle);
    } catch (error) {
        next(error);
    }
};

export const updateLifestyle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        const { question, activeSubstanceField } = req.body;

        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid lifestyle ID' });
            return;
        }

        const existing = await prisma.lifestyle.findUnique({ where: { id } });
        if (!existing) {
            res.status(404).json({ error: 'Lifestyle not found' });
            return;
        }

        const updated = await prisma.lifestyle.update({
            where: { id },
            data: {
                ...(question && { question }),
                ...(activeSubstanceField && { activeSubstanceField }),
            }
        });

        res.json(updated);
    } catch (error) {
        next(error);
    }
};

export const deleteLifestyle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid lifestyle ID' });
            return;
        }

        const existing = await prisma.lifestyle.findUnique({ where: { id } });
        if (!existing) {
            res.status(404).json({ error: 'Lifestyle not found' });
            return;
        }

        await prisma.lifestyle.delete({ where: { id } });
        res.status(204).end();
    } catch (error) {
        next(error);
    }
};
