import { z } from 'zod';

const lifestyleOptionTypeEnum = z.enum(['physical_activity', 'dietary_habits']);

export const createLifestyleOptionSchema = z.object({
  type: lifestyleOptionTypeEnum,
  label: z.string().min(1),
  value: z.string().optional().nullable(),
  sortOrder: z.number().int().optional(),
  isActive: z.boolean().optional(),
});

export const updateLifestyleOptionSchema = createLifestyleOptionSchema.partial();

export type CreateLifestyleOptionInput = z.infer<typeof createLifestyleOptionSchema>;
export type UpdateLifestyleOptionInput = z.infer<typeof updateLifestyleOptionSchema>;
