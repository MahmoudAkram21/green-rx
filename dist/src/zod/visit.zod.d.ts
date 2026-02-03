import { z } from "zod";
export declare const visitSchema: z.ZodObject<{
    patientId: z.ZodNumber;
    doctorId: z.ZodNumber;
    visitDate: z.ZodPipe<z.ZodString, z.ZodTransform<Date, string>>;
    visitType: z.ZodOptional<z.ZodEnum<{
        Consultation: "Consultation";
        FirstVisit: "FirstVisit";
        FollowUp: "FollowUp";
        Emergency: "Emergency";
    }>>;
    diagnosis: z.ZodOptional<z.ZodString>;
    treatmentPlan: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updateVisitSchema: z.ZodObject<{
    patientId: z.ZodOptional<z.ZodNumber>;
    doctorId: z.ZodOptional<z.ZodNumber>;
    visitType: z.ZodOptional<z.ZodOptional<z.ZodEnum<{
        Consultation: "Consultation";
        FirstVisit: "FirstVisit";
        FollowUp: "FollowUp";
        Emergency: "Emergency";
    }>>>;
    diagnosis: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    treatmentPlan: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    notes: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    visitDate: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<Date, string>>>;
}, z.core.$strip>;
//# sourceMappingURL=visit.zod.d.ts.map