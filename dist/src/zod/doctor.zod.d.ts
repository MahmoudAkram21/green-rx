import { z } from "zod";
export declare const createDoctorSchema: z.ZodObject<{
    userId: z.ZodNumber;
    name: z.ZodString;
    specialization: z.ZodString;
    licenseNumber: z.ZodString;
    phoneNumber: z.ZodOptional<z.ZodString>;
    clinicAddress: z.ZodOptional<z.ZodString>;
    yearsOfExperience: z.ZodOptional<z.ZodNumber>;
    qualifications: z.ZodOptional<z.ZodString>;
    consultationFee: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const updateDoctorSchema: z.ZodObject<{
    userId: z.ZodOptional<z.ZodNumber>;
    name: z.ZodOptional<z.ZodString>;
    specialization: z.ZodOptional<z.ZodString>;
    licenseNumber: z.ZodOptional<z.ZodString>;
    phoneNumber: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    clinicAddress: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    yearsOfExperience: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    qualifications: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    consultationFee: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
}, z.core.$strip>;
export declare const verifyDoctorSchema: z.ZodObject<{
    isVerified: z.ZodBoolean;
    verificationNotes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const assignPatientSchema: z.ZodObject<{
    patientId: z.ZodNumber;
    relationshipType: z.ZodEnum<{
        readonly PrimaryCare: "PrimaryCare";
        readonly Specialist: "Specialist";
        readonly Consultant: "Consultant";
    }>;
    startDate: z.ZodOptional<z.ZodString>;
    endDate: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
//# sourceMappingURL=doctor.zod.d.ts.map