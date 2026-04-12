import { z } from 'zod';
import { SurgeryTimeframe } from '../../generated/client/enums';

export const updateSurgicalHistorySchema = z.object({
  organId: z.coerce.number().int().positive().optional(),
  surgeryTimeframe: z.nativeEnum(SurgeryTimeframe).optional(),
});

/** POST /patients/:patientId/surgeries — create without `id`, update with `id` + at least one field to change. */
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