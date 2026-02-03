import { z } from "zod";

export const adrSchema = z.object({
  patientId: z.number(),
  tradeNameId: z.number(),
  companyId: z.number(),
  activeSubstanceId: z.number().optional(),
  severity: z.enum(["Mild", "Moderate", "Severe", "LifeThreatening"]),
  reaction: z.string(),
  startDate: z.string().transform((str) => new Date(str)),
  endDate: z
    .string()
    .transform((str) => new Date(str))
    .optional(),
  isAnonymous: z.boolean().optional(),
});

export const updateAdrSchema = z.object({
  status: z
    .enum(["Pending", "UnderReview", "Confirmed", "Rejected"])
    .optional(),
  adminNotes: z.string().optional(),
});
