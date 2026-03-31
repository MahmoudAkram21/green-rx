import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';

export const getAllOperations = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const operations = await prisma.operation.findMany({
            orderBy: { name: 'asc' }
        });
        res.json(operations);
    } catch (error) {
        next(error);
    }
};

export const getOperationById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid operation ID' });
            return;
        }

        const operation = await prisma.operation.findUnique({
            where: { id }
        });

        if (!operation) {
            res.status(404).json({ error: 'Operation not found' });
            return;
        }

        res.json(operation);
    } catch (error) {
        next(error);
    }
};

export const createOperation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { name } = req.body;
        if (!name) {
            res.status(400).json({ error: 'Name is required' });
            return;
        }

        const exactMatch = await prisma.operation.findUnique({
            where: { name }
        });

        if (exactMatch) {
            res.status(400).json({ error: 'Operation with this name already exists' });
            return;
        }

        const newOperation = await prisma.operation.create({
            data: { name }
        });

        res.status(201).json(newOperation);
    } catch (error) {
        next(error);
    }
};

export const updateOperation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        const { name, isActive } = req.body;

        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid operation ID' });
            return;
        }

        const existing = await prisma.operation.findUnique({ where: { id } });
        if (!existing) {
            res.status(404).json({ error: 'Operation not found' });
            return;
        }

        if (name && name !== existing.name) {
            const exactMatch = await prisma.operation.findUnique({ where: { name } });
            if (exactMatch) {
                res.status(400).json({ error: 'Operation with this name already exists' });
                return;
            }
        }

        const updated = await prisma.operation.update({
            where: { id },
            data: {
                ...(name && { name }),
                ...(isActive !== undefined && { isActive }),
            }
        });

        res.json(updated);
    } catch (error) {
        next(error);
    }
};

export const deleteOperation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid operation ID' });
            return;
        }

        const existing = await prisma.operation.findUnique({ where: { id } });
        if (!existing) {
            res.status(404).json({ error: 'Operation not found' });
            return;
        }

        await prisma.operation.delete({ where: { id } });
        res.status(204).end();
    } catch (error) {
        next(error);
    }
};
