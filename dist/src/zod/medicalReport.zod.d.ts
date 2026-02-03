import { z } from "zod";
export declare const medicalReportSchema: z.ZodObject<{
    patientId: z.ZodNumber;
    fileName: z.ZodString;
    fileUrl: z.ZodString;
    fileType: z.ZodString;
    uploadedBy: z.ZodNumber;
    reportType: z.ZodOptional<z.ZodEnum<{
        Other: "Other";
        Consultation: "Consultation";
        LabTest: "LabTest";
        Imaging: "Imaging";
        Procedure: "Procedure";
    }>>;
    reportDate: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
    fileSize: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const updateMedicalReportSchema: z.ZodObject<{
    patientId: z.ZodOptional<z.ZodNumber>;
    fileName: z.ZodOptional<z.ZodString>;
    fileUrl: z.ZodOptional<z.ZodString>;
    fileType: z.ZodOptional<z.ZodString>;
    uploadedBy: z.ZodOptional<z.ZodNumber>;
    reportType: z.ZodOptional<z.ZodOptional<z.ZodEnum<{
        Other: "Other";
        Consultation: "Consultation";
        LabTest: "LabTest";
        Imaging: "Imaging";
        Procedure: "Procedure";
    }>>>;
    reportDate: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    notes: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    fileSize: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
}, z.core.$strip>;
//# sourceMappingURL=medicalReport.zod.d.ts.map