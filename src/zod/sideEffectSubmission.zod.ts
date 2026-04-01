import { z } from "zod";

// Single side effect submission with severity and notes
export const submitSideEffectItemSchema = z.object({
  sideEffectId: z.number().int().positive("Invalid side effect ID"),
  severity: z.enum(["Mild", "Moderate", "Severe"], {
    message: "Severity must be Mild, Moderate, or Severe",
  }),
  notes: z
    .string()
    .max(500, "Notes cannot exceed 500 characters")
    .optional()
    .nullable(),
});

// Batch submission (patient selects multiple side effects at once)
export const submitBatchSideEffectsSchema = z.object({
  medicationId: z.number().int().positive("Invalid medication ID"),
  sideEffects: z
    .array(submitSideEffectItemSchema)
    .min(1, "Select at least one side effect")
    .max(50, "Cannot submit more than 50 side effects at once"),
});

// Retrieve patient submissions
export const getPatientSideEffectsSchema = z.object({
  status: z.enum(["Approved", "Pending"]).optional(),
  medicationId: z.number().int().optional(),
});
