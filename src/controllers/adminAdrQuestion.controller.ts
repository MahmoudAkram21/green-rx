import { Request, Response, NextFunction } from 'express';
import { AdrQuestionFieldType } from '../../generated/client/client';
import { prisma } from '../lib/prisma';
import { isAdrQuestionFieldType } from '../constants/adrQuestionFieldType';
import { isValidAdrQuestionKey } from '../utils/adrQuestionKey.util';

export async function listAdrQuestions(_req: Request, res: Response, next: NextFunction) {
  try {
    const rows = await prisma.adrQuestion.findMany({
      orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
    });
    res.json(rows);
  } catch (e) {
    next(e);
  }
}

export async function createAdrQuestion(req: Request, res: Response, next: NextFunction) {
  try {
    const key = typeof req.body?.key === 'string' ? req.body.key.trim() : '';
    const labelEn = typeof req.body?.labelEn === 'string' ? req.body.labelEn.trim() : '';
    const labelAr = typeof req.body?.labelAr === 'string' ? req.body.labelAr.trim() : '';
    if (!key || !labelEn || !labelAr) {
      res.status(400).json({ error: 'key, labelEn, and labelAr are required' });
      return;
    }
    if (!isValidAdrQuestionKey(key)) {
      res.status(400).json({ error: 'key must match /^[a-zA-Z][a-zA-Z0-9]*$/' });
      return;
    }
    const required = Boolean(req.body?.required);
    let fieldType: AdrQuestionFieldType = AdrQuestionFieldType.TEXT;
    if (req.body?.fieldType != null && req.body?.fieldType !== '') {
      if (!isAdrQuestionFieldType(req.body.fieldType)) {
        res.status(400).json({
          error: 'Invalid fieldType',
          allowed: ['TEXT', 'TEXTAREA', 'DATE', 'BOOLEAN', 'NUMBER', 'SINGLE_CHOICE'],
        });
        return;
      }
      fieldType = req.body.fieldType as AdrQuestionFieldType;
    }
    let sortOrder = Number(req.body?.sortOrder);
    if (!Number.isFinite(sortOrder)) {
      const agg = await prisma.adrQuestion.aggregate({ _max: { sortOrder: true } });
      sortOrder = (agg._max.sortOrder ?? -1) + 1;
    }

    const row = await prisma.adrQuestion.create({
      data: {
        key,
        labelEn,
        labelAr,
        required,
        fieldType,
        isActive: req.body?.isActive === false ? false : true,
        sortOrder,
      },
    });
    res.status(201).json(row);
  } catch (e: any) {
    if (e?.code === 'P2002') {
      res.status(409).json({ error: 'Duplicate key' });
      return;
    }
    next(e);
  }
}

export async function updateAdrQuestion(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
      res.status(400).json({ error: 'Invalid id' });
      return;
    }
    if (req.body != null && typeof req.body === 'object' && 'key' in req.body) {
      res.status(400).json({ error: 'key cannot be changed after creation' });
      return;
    }

    const labelEn = typeof req.body?.labelEn === 'string' ? req.body.labelEn.trim() : undefined;
    const labelAr = typeof req.body?.labelAr === 'string' ? req.body.labelAr.trim() : undefined;
    const data: {
      labelEn?: string;
      labelAr?: string;
      required?: boolean;
      isActive?: boolean;
      fieldType?: AdrQuestionFieldType;
    } = {};
    if (labelEn !== undefined) {
      if (!labelEn) {
        res.status(400).json({ error: 'labelEn cannot be empty' });
        return;
      }
      data.labelEn = labelEn;
    }
    if (labelAr !== undefined) {
      if (!labelAr) {
        res.status(400).json({ error: 'labelAr cannot be empty' });
        return;
      }
      data.labelAr = labelAr;
    }
    if (typeof req.body?.required === 'boolean') data.required = req.body.required;
    if (typeof req.body?.isActive === 'boolean') data.isActive = req.body.isActive;
    if (req.body?.fieldType != null && req.body?.fieldType !== '') {
      if (!isAdrQuestionFieldType(req.body.fieldType)) {
        res.status(400).json({
          error: 'Invalid fieldType',
          allowed: ['TEXT', 'TEXTAREA', 'DATE', 'BOOLEAN', 'NUMBER', 'SINGLE_CHOICE'],
        });
        return;
      }
      data.fieldType = req.body.fieldType as AdrQuestionFieldType;
    }

    if (Object.keys(data).length === 0) {
      res.status(400).json({
        error: 'No updatable fields provided (labelEn, labelAr, required, isActive, fieldType)',
      });
      return;
    }

    try {
      const row = await prisma.adrQuestion.update({
        where: { id },
        data,
      });
      res.json(row);
    } catch (e: any) {
      if (e?.code === 'P2025') {
        res.status(404).json({ error: 'Question not found' });
        return;
      }
      throw e;
    }
  } catch (e) {
    next(e);
  }
}

export async function reorderAdrQuestions(req: Request, res: Response, next: NextFunction) {
  try {
    const orderedIds = req.body?.orderedIds;
    if (!Array.isArray(orderedIds) || orderedIds.length === 0) {
      res.status(400).json({ error: 'orderedIds must be a non-empty array of ids' });
      return;
    }
    const ids = orderedIds.map((x: unknown) => Number(x)).filter((n) => Number.isFinite(n));
    if (ids.length !== orderedIds.length) {
      res.status(400).json({ error: 'orderedIds must contain only numbers' });
      return;
    }

    const allRows = await prisma.adrQuestion.findMany({ select: { id: true } });
    const allIds = new Set(allRows.map((r) => r.id));
    if (ids.length !== allIds.size) {
      res.status(400).json({ error: 'orderedIds must include every question id exactly once' });
      return;
    }
    for (const id of ids) {
      if (!allIds.has(id)) {
        res.status(400).json({ error: `Unknown id: ${id}` });
        return;
      }
    }

    await prisma.$transaction(
      ids.map((id, index) =>
        prisma.adrQuestion.update({
          where: { id },
          data: { sortOrder: index },
        }),
      ),
    );

    const rows = await prisma.adrQuestion.findMany({
      orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
    });
    res.json(rows);
  } catch (e) {
    next(e);
  }
}
