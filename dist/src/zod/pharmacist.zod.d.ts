import { z } from "zod";
export declare const createPharmacistSchema: z.ZodObject<{
    userId: z.ZodNumber;
    name: z.ZodString;
    licenseNumber: z.ZodString;
    phoneNumber: z.ZodOptional<z.ZodString>;
    pharmacyName: z.ZodOptional<z.ZodString>;
    pharmacyAddress: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updatePharmacistSchema: z.ZodObject<{
    userId: z.ZodOptional<z.ZodNumber>;
    name: z.ZodOptional<z.ZodString>;
    licenseNumber: z.ZodOptional<z.ZodString>;
    phoneNumber: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    pharmacyName: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    pharmacyAddress: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
//# sourceMappingURL=pharmacist.zod.d.ts.map