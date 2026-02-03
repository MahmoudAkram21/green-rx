import { z } from "zod";

export const createPharmacistSchema = z.object({
  userId: z.number().int().positive(),
  name: z.string().min(1),
  licenseNumber: z.string().min(1),
  phoneNumber: z.string().optional(),
  pharmacyName: z.string().optional(),
  pharmacyAddress: z.string().optional(),
});

export const updatePharmacistSchema = createPharmacistSchema.partial();
