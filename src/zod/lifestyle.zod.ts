import { z } from 'zod';
import { ACTIVE_SUBSTANCE_LIFESTYLE_FIELDS } from '../enums/activeSubstanceLifestyleField';

const activeSubstanceFieldEnum = z.enum(ACTIVE_SUBSTANCE_LIFESTYLE_FIELDS);

export const createLifestyleSchema = z.object({
  question: z.string().min(1, 'Question is required'),
  activeSubstanceField: activeSubstanceFieldEnum,
});

export const updateLifestyleSchema = z.object({
  question: z.string().min(1).optional(),
  activeSubstanceField: activeSubstanceFieldEnum.optional(),
});

export type CreateLifestyleInput = z.infer<typeof createLifestyleSchema>;
export type UpdateLifestyleInput = z.infer<typeof updateLifestyleSchema>;
