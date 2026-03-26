import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { excipientService } from '../services/excipient.service';

const createExcipientSchema = z.object({
  name: z.string().min(1, 'name is required').max(255),
  description: z.string().max(2000).optional(),
  isActive: z.boolean().optional(),
});

const updateExcipientSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  description: z.string().max(2000).optional(),
  isActive: z.boolean().optional(),
});

export const listExcipients = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const search = typeof req.query.search === 'string' ? req.query.search : undefined;
    const includeInactive = req.query.includeInactive === 'true';
    const forAdmin = req.query.scope === 'admin';

    const data = forAdmin
      ? await excipientService.listForAdmin(search, includeInactive)
      : await excipientService.listForPatients(search);

    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const searchExcipientsForPatient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const q = typeof req.query.q === 'string' ? req.query.q.trim() : '';
    if (!q) {
      res.status(400).json({ error: 'Query parameter "q" is required' });
      return;
    }

    const data = await excipientService.listForPatients(q);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getExcipientById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id < 1) {
      res.status(400).json({ error: 'Invalid excipient id' });
      return;
    }

    const forAdmin = req.query.scope === 'admin';
    const excipient = forAdmin
      ? await excipientService.getByIdForAdmin(id)
      : await excipientService.getByIdForPatients(id);

    if (!excipient) {
      res.status(404).json({ error: 'Excipient not found' });
      return;
    }

    res.json(excipient);
  } catch (error) {
    next(error);
  }
};

export const createExcipient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = createExcipientSchema.parse(req.body);
    const created = await excipientService.create(payload);
    res.status(201).json(created);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.issues });
      return;
    }
    if (error?.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
      return;
    }
    next(error);
  }
};

export const updateExcipient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id < 1) {
      res.status(400).json({ error: 'Invalid excipient id' });
      return;
    }

    const payload = updateExcipientSchema.parse(req.body);
    const updated = await excipientService.update(id, payload);
    res.json(updated);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.issues });
      return;
    }
    if (error?.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
      return;
    }
    next(error);
  }
};

export const deleteExcipient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id < 1) {
      res.status(400).json({ error: 'Invalid excipient id' });
      return;
    }

    await excipientService.softDelete(id);
    res.status(204).send();
  } catch (error: any) {
    if (error?.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
      return;
    }
    next(error);
  }
};
