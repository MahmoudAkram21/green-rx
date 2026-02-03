import { z } from "zod";
export declare const adrSchema: z.ZodObject<{
    patientId: z.ZodNumber;
    tradeNameId: z.ZodNumber;
    companyId: z.ZodNumber;
    activeSubstanceId: z.ZodOptional<z.ZodNumber>;
    severity: z.ZodEnum<{
        Mild: "Mild";
        Moderate: "Moderate";
        Severe: "Severe";
        LifeThreatening: "LifeThreatening";
    }>;
    reaction: z.ZodString;
    startDate: z.ZodPipe<z.ZodString, z.ZodTransform<Date, string>>;
    endDate: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<Date, string>>>;
    isAnonymous: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export declare const updateAdrSchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodEnum<{
        Pending: "Pending";
        Confirmed: "Confirmed";
        UnderReview: "UnderReview";
        Rejected: "Rejected";
    }>>;
    adminNotes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
//# sourceMappingURL=adverseDrugReaction.zod.d.ts.map