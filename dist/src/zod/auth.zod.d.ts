import { z } from "zod";
export declare const registerSchema: z.ZodObject<{
    email: z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>;
    password: z.ZodString;
    role: z.ZodDefault<z.ZodEnum<{
        readonly Patient: "Patient";
        readonly Doctor: "Doctor";
        readonly Pharmacist: "Pharmacist";
        readonly Admin: "Admin";
        readonly Company: "Company";
        readonly SuperAdmin: "SuperAdmin";
    }>>;
    name: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>;
    password: z.ZodString;
}, z.core.$strip>;
export declare const refreshTokenSchema: z.ZodObject<{
    refreshToken: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=auth.zod.d.ts.map