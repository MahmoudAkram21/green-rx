import { z } from "zod";

export const createCompanySchema = z.object({
  name: z.string().min(1),
  address: z.string().optional(),
  governorate: z.string().optional(),
  country: z.string().optional(),
  contactInfo: z.record(z.string(), z.unknown()).optional(),
  phoneNumber: z.string().optional(),
  email: z.string().email().optional(),
  website: z.string().url().optional(),
});

export const updateCompanySchema = createCompanySchema.partial();
