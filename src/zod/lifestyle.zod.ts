import { z } from 'zod';
import { ActiveSubstanceLifestyleField } from '../../generated/client/client';

export const createLifestyleSchema = z.object({
  question: z.string().min(1, 'Question is required'),
  activeSubstanceField: z.nativeEnum(ActiveSubstanceLifestyleField),
});

export const updateLifestyleSchema = z.object({
  question: z.string().min(1).optional(),
  activeSubstanceField: z.nativeEnum(ActiveSubstanceLifestyleField).optional(),
});

export type CreateLifestyleInput = z.infer<typeof createLifestyleSchema>;
export type UpdateLifestyleInput = z.infer<typeof updateLifestyleSchema>;
