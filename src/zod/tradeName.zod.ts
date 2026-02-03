import { z } from "zod";

export const createTradeNameSchema = z.object({
  title: z.string().min(1),
  activeSubstanceId: z.number().int().positive(),
  companyId: z.number().int().positive(),
  batchNumber: z.string().optional(),
  barCode: z.string().optional(),
  warningNotification: z.string().optional(),
  availabilityStatus: z
    .enum(["InStock", "OutOfStock", "Discontinued", "Pending"])
    .optional(),
  stockQuantity: z.number().int().nonnegative().nullable().optional(),
  expiryDate: z.string().datetime().nullable().optional(),
});

export const updateTradeNameSchema = createTradeNameSchema.partial();
