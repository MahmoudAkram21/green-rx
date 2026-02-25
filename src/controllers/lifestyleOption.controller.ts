import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import {
  createLifestyleOptionSchema,
  updateLifestyleOptionSchema,
} from '../zod/lifestyleOption.zod';

const VALID_TYPES = ['physical_activity', 'dietary_habits'] as const;

/** GET /lifestyle-options — list options (app: ?type=physical_activity|dietary_habits; admin: all) */
export const getLifestyleOptions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { type } = req.query;
    const where: { isActive?: boolean; type?: string } = { isActive: true };
    if (type && typeof type === 'string' && VALID_TYPES.includes(type as any)) {
      where.type = type;
    }
    const options = await prisma.lifestyleOption.findMany({
      where,
      orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
    });
    res.json(options);
  } catch (error) {
    next(error);
  }
};

/** GET /lifestyle-options/all — list all options including inactive (Admin only) */
export const getAllLifestyleOptionsAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { type } = req.query;
    const where: { type?: string } = {};
    if (type && typeof type === 'string' && VALID_TYPES.includes(type as any)) {
      where.type = type;
    }
    const options = await prisma.lifestyleOption.findMany({
      where: Object.keys(where).length ? where : undefined,
      orderBy: [{ type: 'asc' }, { sortOrder: 'asc' }, { id: 'asc' }],
    });
    res.json(options);
  } catch (error) {
    next(error);
  }
};

/** GET /lifestyle-options/:id */
export const getLifestyleOptionById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const option = await prisma.lifestyleOption.findUnique({
      where: { id: parseInt(id) },
    });
    if (!option) {
      res.status(404).json({ error: 'Lifestyle option not found' });
      return;
    }
    res.json(option);
  } catch (error) {
    next(error);
  }
};

/** POST /lifestyle-options — Admin create */
export const createLifestyleOption = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validated = createLifestyleOptionSchema.parse(req.body);
    const option = await prisma.lifestyleOption.create({
      data: {
        type: validated.type,
        label: validated.label,
        value: validated.value ?? validated.label,
        sortOrder: validated.sortOrder ?? 0,
        isActive: validated.isActive ?? true,
      },
    });
    res.status(201).json(option);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.issues });
      return;
    }
    next(error);
  }
};

/** PUT /lifestyle-options/:id — Admin update */
export const updateLifestyleOption = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const validated = updateLifestyleOptionSchema.parse(req.body);
    const option = await prisma.lifestyleOption.update({
      where: { id: parseInt(id) },
      data: {
        ...(validated.type !== undefined && { type: validated.type }),
        ...(validated.label !== undefined && { label: validated.label }),
        ...(validated.value !== undefined && { value: validated.value }),
        ...(validated.sortOrder !== undefined && { sortOrder: validated.sortOrder }),
        ...(validated.isActive !== undefined && { isActive: validated.isActive }),
      },
    });
    res.json(option);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.issues });
      return;
    }
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Lifestyle option not found' });
      return;
    }
    next(error);
  }
};

/** DELETE /lifestyle-options/:id — Admin delete */
export const deleteLifestyleOption = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await prisma.lifestyleOption.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error: any) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Lifestyle option not found' });
      return;
    }
    next(error);
  }
};
