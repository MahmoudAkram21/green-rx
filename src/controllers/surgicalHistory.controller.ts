import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import surgicalHistoryRepository from '../repositories/surgicalHistory.reposiory';
import { SurgicalHistoryCreateManyInput } from '../../generated/client/models';
const createSurgicalHistorySchema = z.object({
  
  organId: z.coerce.number().int().positive(),
});

export const getSurgicalHistories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const patientId = parseInt(req.params.patientId);
    const list = await surgicalHistoryRepository.getSurgicalHistoriesByPatientId(patientId);
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
      const organ = await prisma.organ.findUnique({ where: { id: v.organId } });
      if (!organ) {
        res.status(400).json({ error: `Organ with id ${v.organId} not found` });
        return;
      }
    }

    const data: SurgicalHistoryCreateManyInput[] = validatedItems.map((v) => {
      return { patientId, organId: v.organId };
    });

    const surgicalHistories = await surgicalHistoryRepository.createSurgicalHistory(data);

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
