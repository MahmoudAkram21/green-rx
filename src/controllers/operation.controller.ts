import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { createOperationSchema, updateOperationSchema } from '../zod/operation.zod';

/** GET /operations — list all operations (for dropdown: Patient, Doctor, Admin) */
export const getAllOperations = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const operations = await prisma.operation.findMany({
      orderBy: { name: 'asc' },
    });
    res.json(operations);
  } catch (error) {
    next(error);
  }
};

/** GET /operations/:id */
export const getOperationById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const operation = await prisma.operation.findUnique({
      where: { id },
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

/** POST /operations — Admin create */
export const createOperation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validated = createOperationSchema.parse(req.body);
    const operation = await prisma.operation.create({
      data: { name: validated.name },
    });
    res.status(201).json(operation);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.issues });
      return;
    }
    next(error);
  }
};

/** PUT /operations/:id — Admin update */
export const updateOperation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const validated = updateOperationSchema.parse(req.body);
    const operation = await prisma.operation.update({
      where: { id },
      data: { ...(validated.name !== undefined && { name: validated.name }) },
    });
    res.json(operation);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.issues });
      return;
    }
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Operation not found' });
      return;
    }
    next(error);
  }
};

/** DELETE /operations/:id — Admin delete */
export const deleteOperation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.operation.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error: any) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Operation not found' });
      return;
    }
    next(error);
  }
};
