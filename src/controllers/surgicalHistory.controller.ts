import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

const createSurgicalHistorySchema = z.object({
  operationName: z.string().min(1),
  surgeryDate: z.union([z.string().datetime(), z.coerce.date()]),
});

export const getSurgicalHistories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const patientId = parseInt(req.params.patientId);
    const list = await prisma.surgicalHistory.findMany({
      where: { patientId },
      orderBy: { surgeryDate: 'desc' },
    });
    res.json(list);
  } catch (error) {
    next(error);
  }
};

export const addSurgicalHistory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const patientId = parseInt(req.params.patientId);
    const validated = createSurgicalHistorySchema.parse(req.body);

    const patient = await prisma.patient.findUnique({ where: { id: patientId } });
    if (!patient) {
      res.status(404).json({ error: 'Patient not found' });
      return;
    }

    const surgeryDate = typeof validated.surgeryDate === 'string' ? new Date(validated.surgeryDate) : validated.surgeryDate;
    const record = await prisma.surgicalHistory.create({
      data: {
        patientId,
        operationName: validated.operationName,
        surgeryDate,
      },
    });
    res.status(201).json({ message: 'Surgical history added successfully', surgicalHistory: record });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.issues });
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
