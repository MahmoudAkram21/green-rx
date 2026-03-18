import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { createAllergenCategorySchema, updateAllergenCategorySchema } from '../zod/allergenCategory.zod';

/** GET /allergen-categories — list all (for patient dropdown and admin) */
export const getAllAllergenCategories = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await prisma.allergenCategory.findMany({
      orderBy: { id: 'asc' },
      include: { _count: { select: { allergens: true } } },
    });
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

/** GET /allergen-categories/:id */
export const getAllergenCategoryById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const category = await prisma.allergenCategory.findUnique({
      where: { id },
      include: { _count: { select: { allergens: true } } },
    });
    if (!category) {
      res.status(404).json({ error: 'Allergen category not found' });
      return;
    }
    res.json(category);
  } catch (error) {
    next(error);
  }
};

/** GET /allergen-categories/:id/allergens — list allergens for a category */
export const getAllergensByCategoryId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allergenCategoryId = parseInt(req.params.id);
    const category = await prisma.allergenCategory.findUnique({ where: { id: allergenCategoryId } });
    if (!category) {
      res.status(404).json({ error: 'Allergen category not found' });
      return;
    }
    const allergens = await prisma.allergen.findMany({
      where: { allergenCategoryId },
      orderBy: { name: 'asc' },
    });
    res.json(allergens);
  } catch (error) {
    next(error);
  }
};

/** POST /allergen-categories — Admin create */
export const createAllergenCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validated = createAllergenCategorySchema.parse(req.body);
    const category = await prisma.allergenCategory.create({
      data: { name: validated.name },
    });
    res.status(201).json(category);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.issues });
      return;
    }
    next(error);
  }
};

/** PUT /allergen-categories/:id — Admin update */
export const updateAllergenCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const validated = updateAllergenCategorySchema.parse(req.body);
    const category = await prisma.allergenCategory.update({
      where: { id },
      data: {
        ...(validated.name !== undefined && { name: validated.name }),
      },
    });
    res.json(category);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.issues });
      return;
    }
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Allergen category not found' });
      return;
    }
    next(error);
  }
};

/** DELETE /allergen-categories/:id — Admin delete */
export const deleteAllergenCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.allergenCategory.delete({ where: { id } });
    res.status(204).send();
  } catch (error: any) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Allergen category not found' });
      return;
    }
    if (error.code === 'P2003') {
      res.status(400).json({ error: 'Cannot delete category that has allergens assigned to it' });
      return;
    }
    next(error);
  }
};
