import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

const createSurgicalHistorySchema = z.object({
  operationId: z.coerce.number().int().positive(),
  surgeryDate: z.union([
    z.string().datetime({ offset: true }),
    z.string().min(1).transform((s) => new Date(s)),
    z.coerce.date(),
  ]),
});

export const getSurgicalHistories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const patientId = parseInt(req.params.patientId);
    const list = await prisma.surgicalHistory.findMany({
      where: { patientId },
      orderBy: { surgeryDate: 'desc' },
      include: { operation: true },
    });
    res.json(list);
  } catch (error) {
    next(error);
  }
};

export const addSurgicalHistory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const patientId = parseInt(req.params.patientId);
    const raw = req.body;
    const items = Array.isArray(raw) ? raw : [raw];
    const validatedItems = z.array(createSurgicalHistorySchema).parse(items);

    const patient = await prisma.patient.findUnique({ where: { id: patientId } });
    if (!patient) {
      res.status(404).json({ error: 'Patient not found' });
      return;
    }

    if (validatedItems.length === 0) {
      res.status(400).json({ error: 'At least one surgical history entry is required' });
      return;
    }

    for (const v of validatedItems) {
      const op = await prisma.operation.findUnique({ where: { id: v.operationId } });
      if (!op) {
        res.status(400).json({ error: `Operation with id ${v.operationId} not found` });
        return;
      }
    }

    const data = validatedItems.map((v) => {
      const surgeryDate = typeof v.surgeryDate === 'string' ? new Date(v.surgeryDate) : v.surgeryDate;
      return { patientId, operationId: v.operationId, surgeryDate };
    });

    const surgicalHistories = await prisma.surgicalHistory.createManyAndReturn({ data });

    res.status(201).json({
      message: surgicalHistories.length === 1 ? 'Surgical history added successfully' : `${surgicalHistories.length} surgical history entries added successfully`,
      count: surgicalHistories.length,
      surgicalHistories,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.issues });
      return;
    }
    if (error?.code === 'P2002') {
      res.status(400).json({
        error: 'This operation is already in your surgical history. Each operation can only be added once per patient.',
      });
      return;
    }
    next(error);
  }
};

export const deleteSurgicalHistory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.surgicalHistory.delete({ where: { id } });
    res.json({ message: 'Surgical history deleted successfully' });
  } catch (error: any) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Surgical history not found' });
      return;
    }
    next(error);
  }
};
