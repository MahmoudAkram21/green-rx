import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { ActiveSubstanceLifestyleField } from '../../generated/client/client';
import { prisma } from '../lib/prisma';
import { createLifestyleSchema, updateLifestyleSchema } from '../zod/lifestyle.zod';

/** GET /lifestyles/active-substance-field-options — enum values for admin UI */
export const getLifestyleActiveSubstanceFieldOptions = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.json(Object.values(ActiveSubstanceLifestyleField));
  } catch (error) {
    next(error);
  }
};

/** GET /lifestyles — list all (for patient dropdown and admin) */
export const getAllLifestyles = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const lifestyles = await prisma.lifestyle.findMany({
      orderBy: { id: 'asc' },
    });
    res.json(lifestyles);
  } catch (error) {
    next(error);
  }
};

/** GET /lifestyles/:id */
export const getLifestyleById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const lifestyle = await prisma.lifestyle.findUnique({ where: { id } });
    if (!lifestyle) {
      res.status(404).json({ error: 'Lifestyle not found' });
      return;
    }
    res.json(lifestyle);
  } catch (error) {
    next(error);
  }
};

/** POST /lifestyles — Admin create */
export const createLifestyle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validated = createLifestyleSchema.parse(req.body);
    const lifestyle = await prisma.lifestyle.create({
      data: {
        question: validated.question,
        activeSubstanceField: validated.activeSubstanceField,
      },
    });
    res.status(201).json(lifestyle);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.issues });
      return;
    }
    next(error);
  }
};

/** PUT /lifestyles/:id — Admin update */
export const updateLifestyle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const validated = updateLifestyleSchema.parse(req.body);
    const lifestyle = await prisma.lifestyle.update({
      where: { id },
      data: {
        ...(validated.question !== undefined && { question: validated.question }),
        ...(validated.activeSubstanceField !== undefined && { activeSubstanceField: validated.activeSubstanceField }),
      },
    });
    res.json(lifestyle);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.issues });
      return;
    }
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Lifestyle not found' });
      return;
    }
    next(error);
  }
};

/** DELETE /lifestyles/:id — Admin delete */
export const deleteLifestyle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.lifestyle.delete({ where: { id } });
    res.status(204).send();
  } catch (error: any) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Lifestyle not found' });
      return;
    }
    next(error);
  }
};
