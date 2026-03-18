import { z } from 'zod';

const allergenTypeEnum = z.enum(['Drug', 'Food', 'Pollen', 'Dust', 'Pet', 'Fragrance', 'Other']);

export const createAllergenSchema = z.object({
  name: z.string().min(1, 'Allergen name is required'),
  allergenType: allergenTypeEnum.optional().nullable(),
  allergenCategoryId: z.number().int().positive({ message: 'allergenCategoryId is required' }),
});

export const updateAllergenSchema = z.object({
  name: z.string().min(1).optional(),
  allergenType: allergenTypeEnum.optional().nullable(),
  allergenCategoryId: z.number().int().positive().optional(),
});

export type CreateAllergenInput = z.infer<typeof createAllergenSchema>;
export type UpdateAllergenInput = z.infer<typeof updateAllergenSchema>;
