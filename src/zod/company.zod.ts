import { z } from "zod";

export const createCompanySchema = z.object({
  name: z.string().min(1),
  address: z.string().optional(),
  phoneNumber: z.string().optional(),
  email: z.string().email().optional(),
  website: z.string().url().optional(),
});

export const updateCompanySchema = createCompanySchema.partial();
