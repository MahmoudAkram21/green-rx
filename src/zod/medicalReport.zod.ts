import { z } from "zod";

export const medicalReportSchema = z.object({
  patientId: z.number(),
  fileName: z.string(),
  fileUrl: z.string(),
  fileType: z.string(),
  uploadedBy: z.number(),
  reportType: z
    .enum(["LabTest", "Imaging", "Consultation", "Procedure", "Other"])
    .optional(),
  reportDate: z.string().optional(),
  notes: z.string().optional(),
  fileSize: z.number().optional(),
});

export const updateMedicalReportSchema = medicalReportSchema.partial();

