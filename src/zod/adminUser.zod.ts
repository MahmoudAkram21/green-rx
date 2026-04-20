import { z } from 'zod';
import { AgeClassification, Gender, UserRole } from '../../generated/client/client';

const nullableString = z.union([z.string(), z.null()]).optional();

/** Accept number or numeric string for Prisma Decimal fields */
const optionalDecimal = z.union([z.string(), z.number(), z.null()]).optional();

export const adminUpdateUserSchema = z.object({
  email: z.string().email().optional(),
  name: z.union([z.string(), z.null()]).optional(),
  phone: z.union([z.string(), z.null()]).optional(),
  isActive: z.boolean().optional(),
  isEmailVerified: z.boolean().optional(),
  role: z.nativeEnum(UserRole).optional(),
  /** Plain text; hashed server-side */
  password: z.string().min(8).max(128).optional(),
  patientProfile: z
    .object({
      age: z.coerce.number().int().min(0).max(150).optional(),
      ageClassification: z.nativeEnum(AgeClassification).optional(),
      dateOfBirth: nullableString,
      weight: optionalDecimal,
      height: optionalDecimal,
      gender: z.nativeEnum(Gender).optional(),
      pregnancyWarning: z.boolean().optional(),
      pregnancyStatus: z.boolean().nullable().optional(),
      trimester: z.union([z.coerce.number().int().min(1).max(3), z.null()]).optional(),
      lactation: z.boolean().optional(),
      contracipient: z.boolean().nullable().optional(),
      isContracipientHormonal: z.boolean().nullable().optional(),
      bloodType: nullableString,
      profileCompleteness: z.coerce.number().int().min(0).max(100).optional(),
    })
    .optional(),
  doctorProfile: z
    .object({
      name: z.string().min(1).optional(),
      licenseNumber: z.string().min(1).optional(),
      licenseImageUrl: nullableString,
      specialization: z.string().min(1).optional(),
      phoneNumber: nullableString,
      address: nullableString,
      city: nullableString,
      latitude: optionalDecimal,
      longitude: optionalDecimal,
      consultationFee: optionalDecimal,
      workingHours: z.unknown().optional().nullable(),
      isVerified: z.boolean().optional(),
      verifiedAt: nullableString,
      verifiedBy: z.union([z.coerce.number().int(), z.null()]).optional(),
      verificationNotes: nullableString,
    })
    .optional(),
  pharmacistProfile: z
    .object({
      name: z.string().min(1).optional(),
      licenseNumber: z.string().min(1).optional(),
      licenseImageUrl: nullableString,
      pharmacyName: nullableString,
      phoneNumber: nullableString,
      address: nullableString,
      city: nullableString,
      isVerified: z.boolean().optional(),
      verifiedAt: nullableString,
      verifiedBy: z.union([z.coerce.number().int(), z.null()]).optional(),
      verificationNotes: nullableString,
    })
    .optional(),
});

export type AdminUpdateUserInput = z.infer<typeof adminUpdateUserSchema>;
