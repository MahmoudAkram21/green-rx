import { z } from 'zod';

const categoryNameSchema = z.object({
  en: z.string().min(1, 'English name is required'),
  ar: z.string().optional(),
});

export const createAllergenCategorySchema = z.object({
  name: categoryNameSchema,
});

export const updateAllergenCategorySchema = z.object({
  name: categoryNameSchema.optional(),
});

export type CreateAllergenCategoryInput = z.infer<typeof createAllergenCategorySchema>;
export type UpdateAllergenCategoryInput = z.infer<typeof updateAllergenCategorySchema>;
