import { z } from 'zod';
import { SurgeryTimeframe } from '../../generated/client/enums';

export const updateSurgicalHistorySchema = z.object({
  organId: z.coerce.number().int().positive().optional(),
  surgeryTimeframe: z.nativeEnum(SurgeryTimeframe).optional(),
});

/**
 * POST /patients/:patientId/surgeries — full sync payload item.
 * Create: `organId` + `surgeryTimeframe` (no `id`). Update: `id` + at least one of `organId`, `surgeryTimeframe`.
 */
export const surgicalHistoryUpsertItemSchema = z
  .object({
    id: z.coerce.number().int().positive().optional(),
    organId: z.coerce.number().int().positive().optional(),
    surgeryTimeframe: z.nativeEnum(SurgeryTimeframe).optional(),
  })
  .superRefine((val, ctx) => {
    if (val.id != null) {
      if (val.organId === undefined && val.surgeryTimeframe === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'When id is provided, include at least one of organId or surgeryTimeframe',
        });
      }
    } else if (val.organId === undefined || val.surgeryTimeframe === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'For new entries, organId and surgeryTimeframe are required',
      });
    }
  });