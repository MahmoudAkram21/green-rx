import z from "zod";
import { SurgeryTimeframe } from "../../generated/client/enums";

export const updateSurgicalHistorySchema = z.object({
  organId: z.coerce.number().int().positive().optional(),
  surgeryTimeframe: z.enum(SurgeryTimeframe).optional(),
});