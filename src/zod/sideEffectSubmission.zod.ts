import { z } from 'zod';

const optionalSeverity = z
  .enum(['Mild', 'Moderate', 'Severe'], {
    message: 'Severity must be Mild, Moderate, or Severe',
  })
  .optional()
  .nullable();

const optionalNotes = z
  .string()
  .max(500, 'Notes cannot exceed 500 characters')
  .optional()
  .nullable();

/**
 * POST /my-side-effects item: exactly one of sideEffectId (approved catalog) or name
 * (e.g. from extracted medicine side effects with no id).
 */
export const submitSideEffectItemSchema = z
  .object({
    sideEffectId: z.number().int().positive().optional(),
    name: z.string().min(1).max(200).optional(),
    severity: optionalSeverity,
    notes: optionalNotes,
  })
  .refine(
    (d) => {
      const hasId = d.sideEffectId !== undefined && d.sideEffectId !== null;
      const hasName = d.name !== undefined && String(d.name).trim().length > 0;
      return hasId !== hasName;
    },
    { message: 'Provide exactly one of sideEffectId or name' }
  );

// Batch submission (patient selects multiple side effects at once)
export const submitBatchSideEffectsSchema = z.object({
  medicationId: z.number().int().positive('Invalid medication ID'),
  sideEffects: z
    .array(submitSideEffectItemSchema)
    .min(1, 'Select at least one side effect')
    .max(50, 'Cannot submit more than 50 side effects at once'),
});

// Retrieve patient submissions
export const getPatientSideEffectsSchema = z.object({
  status: z.enum(['Approved', 'Pending']).optional(),
  medicationId: z.number().int().optional(),
});
