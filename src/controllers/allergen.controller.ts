import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { createAllergenSchema, updateAllergenSchema } from '../zod/allergen.zod';

/** GET /allergens — list all (optional ?categoryId=N filter; for patient dropdown and admin) */
export const getAllAllergens = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categoryId = req.query.categoryId ? parseInt(req.query.categoryId as string) : undefined;
    const allergens = await prisma.allergen.findMany({
      where: categoryId !== undefined ? { allergenCategoryId: categoryId } : undefined,
      orderBy: { name: 'asc' },
      include: {
        allergenCategory: { select: { id: true, name: true } },
        allergenActiveSubstances: {
          include: { activeSubstance: { select: { id: true, name: true, concentration: true } } },
        },
        allergenExcipients: {
          include: { excipient: { select: { id: true, name: true, description: true } } },
        },
      },
    });
    res.json(allergens);
  } catch (error) {
    next(error);
  }
};

/** GET /allergens/:id */
export const getAllergenById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const allergen = await prisma.allergen.findUnique({
      where: { id },
      include: {
        allergenCategory: { select: { id: true, name: true } },
        allergenActiveSubstances: {
          include: { activeSubstance: { select: { id: true, name: true, concentration: true } } },
        },
        allergenExcipients: {
          include: { excipient: { select: { id: true, name: true, description: true } } },
        },
      },
    });
    if (!allergen) {
      res.status(404).json({ error: 'Allergen not found' });
      return;
    }
    res.json(allergen);
  } catch (error) {
    next(error);
  }
};

/** POST /allergens — Admin create */
export const createAllergen = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validated = createAllergenSchema.parse(req.body);

    const category = await prisma.allergenCategory.findUnique({ where: { id: validated.allergenCategoryId } });
    if (!category) {
      res.status(400).json({ error: `Allergen category with id ${validated.allergenCategoryId} not found` });
      return;
    }

    const allergen = await prisma.allergen.create({
      data: {
        name: validated.name,
        allergenCategoryId: validated.allergenCategoryId,
        ...(validated.allergenType != null && { allergenType: validated.allergenType }),
      },
      include: { allergenCategory: { select: { id: true, name: true } } },
    });
    res.status(201).json(allergen);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.issues });
      return;
    }
    next(error);
  }
};

/** PUT /allergens/:id — Admin update */
export const updateAllergen = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const validated = updateAllergenSchema.parse(req.body);

    if (validated.allergenCategoryId !== undefined) {
      const category = await prisma.allergenCategory.findUnique({ where: { id: validated.allergenCategoryId } });
      if (!category) {
        res.status(400).json({ error: `Allergen category with id ${validated.allergenCategoryId} not found` });
        return;
      }
    }

    const allergen = await prisma.allergen.update({
      where: { id },
      data: {
        ...(validated.name !== undefined && { name: validated.name }),
        ...(validated.allergenType !== undefined && { allergenType: validated.allergenType }),
        ...(validated.allergenCategoryId !== undefined && { allergenCategoryId: validated.allergenCategoryId }),
      },
      include: { allergenCategory: { select: { id: true, name: true } } },
    });
    res.json(allergen);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.issues });
      return;
    }
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Allergen not found' });
      return;
    }
    next(error);
  }
};

/** DELETE /allergens/:id — Admin delete */
export const deleteAllergen = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.allergen.delete({ where: { id } });
    res.status(204).send();
  } catch (error: any) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Allergen not found' });
      return;
    }
    next(error);
  }
};
