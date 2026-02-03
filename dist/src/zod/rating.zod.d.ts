import { z } from "zod";
export declare const ratingSchema: z.ZodObject<{
    patientId: z.ZodNumber;
    ratedType: z.ZodEnum<{
        Doctor: "Doctor";
        Pharmacist: "Pharmacist";
    }>;
    doctorId: z.ZodOptional<z.ZodNumber>;
    pharmacistId: z.ZodOptional<z.ZodNumber>;
    rating: z.ZodNumber;
    review: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updateRatingSchema: z.ZodObject<{
    patientId: z.ZodOptional<z.ZodNumber>;
    ratedType: z.ZodOptional<z.ZodEnum<{
        Doctor: "Doctor";
        Pharmacist: "Pharmacist";
    }>>;
    doctorId: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    pharmacistId: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    rating: z.ZodOptional<z.ZodNumber>;
    review: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
//# sourceMappingURL=rating.zod.d.ts.map