import { z } from "zod";

export const createTradeNameSchema = z.object({
  title: z.string().min(1),
  activeSubstanceId: z.number().int().positive(),
  companyId: z.number().int().positive(),
  barCode: z.string().optional(),
  warningNotification: z.string().optional(),
});

export const updateTradeNameSchema = createTradeNameSchema.partial();
