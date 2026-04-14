import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import surgicalHistoryRepository from '../repositories/surgicalHistory.reposiory';
import { surgicalHistoryUpsertItemSchema } from '../zod/surgicalHistory.zod';

class SurgicalSyncError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message);
    this.name = 'SurgicalSyncError';
  }
}

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
 * POST /patients/:patientId/surgeries — **full sync** of surgical history.
 * Body: one object, a non-empty array, or **`[]`** to clear all.
 * After upserts, any existing row for this patient whose `id` was not kept is **deleted**.
 * Create: `{ organId, surgeryTimeframe }`. Update: `{ id, organId?, surgeryTimeframe? }`.
 * New entry without `id` but with an `organId` already on file updates that row’s timeframe.
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

    const { surgicalHistories, statusCode, deletedCount } = await prisma.$transaction(async (tx) => {
      if (validatedItems.length === 0) {
        const del = await tx.surgicalHistory.deleteMany({ where: { patientId } });
        const list = await tx.surgicalHistory.findMany({
          where: { patientId },
          orderBy: { createdAt: 'desc' },
          include: { organ: true },
        });
        return { surgicalHistories: list, statusCode: 200 as const, deletedCount: del.count };
      }

      const newEntries = validatedItems.filter((x) => x.id == null);
      const newOrganIds = newEntries.map((x) => x.organId!);
      if (new Set(newOrganIds).size !== newOrganIds.length) {
        throw new SurgicalSyncError(400, 'Duplicate organId for new entries in the same request');
      }

      const processedIds = new Set<number>();
      let anyUpdate = false;

      for (const v of validatedItems) {
        if (v.organId != null) {
          const organ = await tx.organ.findUnique({ where: { id: v.organId } });
          if (!organ) {
            throw new SurgicalSyncError(400, `Organ with id ${v.organId} not found`);
          }
        }

        if (v.id != null) {
          const existing = await tx.surgicalHistory.findFirst({
            where: { id: v.id, patientId },
          });
          if (!existing) {
            throw new SurgicalSyncError(404, 'Surgical history not found for this patient');
          }
          anyUpdate = true;

          if (v.organId !== undefined && v.organId !== existing.organId) {
            const clash = await tx.surgicalHistory.findFirst({
              where: { patientId, organId: v.organId, NOT: { id: v.id } },
            });
            if (clash) {
              throw new SurgicalSyncError(
                400,
                'Another surgical history already uses this organ for this patient'
              );
            }
          }

          await tx.surgicalHistory.update({
            where: { id: v.id },
            data: {
              ...(v.organId !== undefined ? { organId: v.organId } : {}),
              ...(v.surgeryTimeframe !== undefined ? { surgeryTimeframe: v.surgeryTimeframe } : {}),
            },
          });
          processedIds.add(v.id);
        } else {
          const existingByOrgan = await tx.surgicalHistory.findFirst({
            where: { patientId, organId: v.organId! },
          });
          if (existingByOrgan) {
            await tx.surgicalHistory.update({
              where: { id: existingByOrgan.id },
              data: { surgeryTimeframe: v.surgeryTimeframe! },
            });
            processedIds.add(existingByOrgan.id);
            anyUpdate = true;
          } else {
            const created = await tx.surgicalHistory.create({
              data: {
                patientId,
                organId: v.organId!,
                surgeryTimeframe: v.surgeryTimeframe!,
              },
            });
            processedIds.add(created.id);
          }
        }
      }

      const delResult = await tx.surgicalHistory.deleteMany({
        where: { patientId, id: { notIn: [...processedIds] } },
      });

      const list = await tx.surgicalHistory.findMany({
        where: { patientId },
        orderBy: { createdAt: 'desc' },
        include: { organ: true },
      });

      const code = delResult.count > 0 || anyUpdate ? 200 : 201;
      return {
        surgicalHistories: list,
        statusCode: code,
        deletedCount: delResult.count,
      };
    });

    const msg =
      validatedItems.length === 0
        ? 'All surgical history cleared'
        : statusCode === 200
          ? 'Surgical history synced successfully'
          : surgicalHistories.length === 1
            ? 'Surgical history added successfully'
            : `${surgicalHistories.length} surgical history entries added successfully`;

    res.status(statusCode).json({
      message: msg,
      count: surgicalHistories.length,
      deletedCount,
      surgicalHistories,
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.issues });
      return;
    }
    if (error instanceof SurgicalSyncError) {
      res.status(error.statusCode).json({ error: error.message });
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
