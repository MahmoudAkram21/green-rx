import { z } from "zod";

export const visitSchema = z.object({
  patientId: z.number(),
  doctorId: z.number(),
  visitDate: z.string().transform((str) => new Date(str)),
  visitType: z
    .enum(["FirstVisit", "FollowUp", "Emergency", "Consultation"])
    .optional(),
  diagnosis: z.string().optional(),
  treatmentPlan: z.string().optional(),
  notes: z.string().optional(),
});

export const updateVisitSchema = visitSchema.partial().extend({
  visitDate: z
    .string()
    .transform((str) => new Date(str))
    .optional(),
});
