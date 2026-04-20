import { z } from 'zod';
import { ActiveSubstanceWarningField } from '../../generated/client/client';

export const createOperationSchema = z.object({
  name: z.string().min(1, 'Operation name is required'),
});

export const updateOperationSchema = z.object({
  name: z.string().min(1).optional(),
});

export const setOperationWarningMappingsSchema = z.object({
  fieldNames: z.array(z.nativeEnum(ActiveSubstanceWarningField)).min(1),
});

export type CreateOperationInput = z.infer<typeof createOperationSchema>;
export type UpdateOperationInput = z.infer<typeof updateOperationSchema>;
