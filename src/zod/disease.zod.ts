import { z } from "zod";
import { WarningSeverity, DiseaseSeverity } from "../../generated/client/client";

export const createDiseaseSchema = z.object({
  name: z.string().min(1),
  severity: z.nativeEnum(DiseaseSeverity),
  description: z.string().optional(),
});

export const updateDiseaseSchema = createDiseaseSchema.partial();

export const createWarningSchema = z.object({
  diseaseId: z.number().int().positive(),
  activeSubstanceId: z.number().int().positive(),
  warningFieldName: z.string().min(1),
  warningMessage: z.string().min(1),
  severity: z.nativeEnum(WarningSeverity),
});

export const updateWarningSchema = createWarningSchema.partial();
