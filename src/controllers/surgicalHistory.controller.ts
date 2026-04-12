import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import surgicalHistoryRepository from '../repositories/surgicalHistory.reposiory';
import { surgicalHistoryUpsertItemSchema } from '../zod/surgicalHistory.zod';

export const getSurgicalHistories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const patientId = parseInt(req.params.patientId, 10);
    const list = await surgicalHistoryRepository.getSurgicalHistoriesByPatientId(patientId);
    res.json(list);
  } catch (error) {
    next(error);
  }
};

/**
 * POST /patients/:patientId/surgeries — add and update surgical history.
 * Body: one object or array. Create: { organId, surgeryTimeframe }. Update: { id, organId?, surgeryTimeframe? }.
 */
export const addSurgicalHistory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const patientId = parseInt(req.params.patientId, 10);
    const raw = req.body;
    const items = Array.isArray(raw) ? raw : [raw];
    const validatedItems = z.array(surgicalHistoryUpsertItemSchema).parse(items);

    const patient = await prisma.patient.findUnique({ where: { id: patientId } });
    if (!patient) {
      res.status(404).json({ error: 'Patient not found' });
      return;
    }

    if (validatedItems.length === 0) {
      res.status(400).json({ error: 'At least one surgical history entry is required' });
      return;
    }

    const surgicalHistories = [];

    for (const v of validatedItems) {
      if (v.organId != null) {
        const organ = await prisma.organ.findUnique({ where: { id: v.organId } });
        if (!organ) {
          res.status(400).json({ error: `Organ with id ${v.organId} not found` });
          return;
        }
      }

      if (v.id != null) {
        const existing = await prisma.surgicalHistory.findFirst({
          where: { id: v.id, patientId },
        });
        if (!existing) {
          res.status(404).json({ error: 'Surgical history not found for this patient' });
          return;
        }

        const updateData: { organId?: number; surgeryTimeframe?: (typeof v)['surgeryTimeframe'] } = {};
        if (v.organId !== undefined) updateData.organId = v.organId;
        if (v.surgeryTimeframe !== undefined) updateData.surgeryTimeframe = v.surgeryTimeframe;

        await surgicalHistoryRepository.updateSurgicalHistory(v.id, updateData);
        const full = await prisma.surgicalHistory.findUnique({
          where: { id: v.id },
          include: { organ: true },
        });
        if (full) surgicalHistories.push(full);
      } else {
        const created = await prisma.surgicalHistory.create({
          data: {
            patientId,
            organId: v.organId!,
            surgeryTimeframe: v.surgeryTimeframe!,
          },
          include: { organ: true },
        });
        surgicalHistories.push(created);
      }
    }

    const hasUpdate = validatedItems.some((x) => x.id != null);
    const statusCode = hasUpdate ? 200 : 201;

    res.status(statusCode).json({
      message: hasUpdate
        ? 'Surgical history saved successfully'
        : surgicalHistories.length === 1
          ? 'Surgical history added successfully'
          : `${surgicalHistories.length} surgical history entries added successfully`,
      count: surgicalHistories.length,
      surgicalHistories,
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.issues });
      return;
    }
    const err = error as { code?: string };
    if (err?.code === 'P2002') {
      res.status(400).json({
        error:
          'This operation is already in your surgical history. Each operation can only be added once per patient.',
      });
      return;
    }
    next(error);
  }
};

export const deleteSurgicalHistory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    await prisma.surgicalHistory.delete({ where: { id } });
    res.json({ message: 'Surgical history deleted successfully' });
  } catch (error: unknown) {
    const err = error as { code?: string };
    if (err.code === 'P2025') {
      res.status(404).json({ error: 'Surgical history not found' });
      return;
    }
    next(error);
  }
};
