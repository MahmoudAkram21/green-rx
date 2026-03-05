import { z } from 'zod';

export const createOperationSchema = z.object({
  name: z.string().min(1, 'Operation name is required'),
});

export const updateOperationSchema = z.object({
  name: z.string().min(1).optional(),
});

export type CreateOperationInput = z.infer<typeof createOperationSchema>;
export type UpdateOperationInput = z.infer<typeof updateOperationSchema>;
