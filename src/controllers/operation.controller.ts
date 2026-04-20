import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { ActiveSubstanceWarningField } from '../../generated/client/client';
import {
  createOperationSchema,
  setOperationWarningMappingsSchema,
  updateOperationSchema,
} from '../zod/operation.zod';

const isMissingOrganWarningMappingTable = (error: any): boolean => {
  const message = String(error?.message || '');
  return error?.code === 'P2021' && message.includes('organ_warning_field_mappings');
};

/** GET /operations — list all operations (for dropdown: Patient, Doctor, Admin) */
export const getAllOperations = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    let operations: any[] = [];
    try {
      operations = await prisma.organ.findMany({
        orderBy: { name: 'asc' },
        include: {
          warningFieldMappings: {
            orderBy: { fieldName: 'asc' },
            select: { id: true, fieldName: true },
          },
        },
      });
    } catch (error: any) {
      if (!isMissingOrganWarningMappingTable(error)) throw error;
      const base = await prisma.organ.findMany({ orderBy: { name: 'asc' } });
      operations = base.map((o) => ({ ...o, warningFieldMappings: [] }));
    }
    res.json(operations);
  } catch (error) {
    next(error);
  }
};

/** GET /operations/:id */
export const getOperationById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    let operation: any = null;
    try {
      operation = await prisma.organ.findUnique({
        where: { id },
        include: {
          warningFieldMappings: {
            orderBy: { fieldName: 'asc' },
            select: { id: true, fieldName: true },
          },
        },
      });
    } catch (error: any) {
      if (!isMissingOrganWarningMappingTable(error)) throw error;
      const base = await prisma.organ.findUnique({ where: { id } });
      operation = base ? { ...base, warningFieldMappings: [] } : null;
    }
    if (!operation) {
      res.status(404).json({ error: 'Organ not found' });
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
    const operation = await prisma.organ.create({
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
    const operation = await prisma.organ.update({
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
      res.status(404).json({ error: 'Organ not found' });
      return;
    }
    next(error);
  }
};

/** DELETE /operations/:id — Admin delete */
export const deleteOperation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.organ.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error: any) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Organ not found' });
      return;
    }
    next(error);
  }
};

/** GET /operations/warning-field-options — enum values allowed for organ mapping. */
export const getOperationWarningFieldOptions = async (_req: Request, res: Response) => {
  res.json({
    fieldOptions: Object.values(ActiveSubstanceWarningField),
  });
};

/** GET /operations/:id/warning-field-mappings */
export const getOperationWarningMappings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    let organ: any = null;
    try {
      organ = await prisma.organ.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          warningFieldMappings: {
            orderBy: { fieldName: 'asc' },
            select: { id: true, fieldName: true },
          },
        },
      });
    } catch (error: any) {
      if (!isMissingOrganWarningMappingTable(error)) throw error;
      const base = await prisma.organ.findUnique({
        where: { id },
        select: { id: true, name: true },
      });
      organ = base ? { ...base, warningFieldMappings: [] } : null;
    }
    if (!organ) {
      res.status(404).json({ error: 'Organ not found' });
      return;
    }
    res.json({
      organId: organ.id,
      organName: organ.name,
      mappings: organ.warningFieldMappings,
      fieldNames: organ.warningFieldMappings.map((m: any) => m.fieldName),
    });
  } catch (error) {
    next(error);
  }
};

/** PUT /operations/:id/warning-field-mappings — replace all mappings for one organ. */
export const setOperationWarningMappings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const validated = setOperationWarningMappingsSchema.parse(req.body);
    const organ = await prisma.organ.findUnique({ where: { id } });
    if (!organ) {
      res.status(404).json({ error: 'Organ not found' });
      return;
    }

    const [, mappings] = await prisma.$transaction([
      prisma.organWarningFieldMapping.deleteMany({ where: { organId: id } }),
      prisma.organWarningFieldMapping.createManyAndReturn({
        data: validated.fieldNames.map((fieldName) => ({ organId: id, fieldName })),
      }),
    ]);

    res.json({
      message: `${mappings.length} warning field mapping(s) set for ${organ.name}`,
      organId: id,
      fieldNames: mappings.map((m) => m.fieldName),
      mappings,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.issues });
      return;
    }
    if (isMissingOrganWarningMappingTable(error)) {
      res.status(503).json({
        error:
          'Organ warning-field mapping storage is not available yet. Please run the latest database migrations.',
      });
      return;
    }
    next(error);
  }
};
