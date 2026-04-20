import { z } from "zod";
import { WarningSeverity, DiseaseSeverity, ActiveSubstanceWarningField } from "../../generated/client/client";

export const createDiseaseSchema = z.object({
  name: z.string().min(1),
  severity: z.nativeEnum(DiseaseSeverity).optional().default(DiseaseSeverity.None),
  description: z.string().optional(),
  triggersCancerCheck: z.boolean().optional().default(false),
  contraindicationKeywords: z.array(z.string().min(1)).optional().default([]),
});

export const updateDiseaseSchema = createDiseaseSchema.partial();

export const createBodySystemMappingSchema = z.object({
  diseaseId: z.number().int().positive(),
  fieldName: z.nativeEnum(ActiveSubstanceWarningField),
});

export const bulkBodySystemMappingSchema = z.object({
  diseaseId: z.number().int().positive(),
  fieldNames: z.array(z.nativeEnum(ActiveSubstanceWarningField)).min(1),
});

export const createWarningSchema = z.object({
  diseaseId: z.number().int().positive(),
  activeSubstanceId: z.number().int().positive(),
  warningFieldName: z.string().min(1),
  warningMessage: z.string().min(1),
  severity: z.nativeEnum(WarningSeverity),
});

export const updateWarningSchema = createWarningSchema.partial();
