import { z } from "zod";
import { UserRole } from "../../generated/client/client";

export const registerSchema = z
  .object({
    email: z.string().email().transform((v) => v.trim().toLowerCase()),
    password: z.string().min(6),
    role: z.nativeEnum(UserRole).default(UserRole.Patient),
    name: z.string().min(2).optional(),
    phone: z.string().trim().optional(),
    licenseNumber: z.string().trim().optional(),
    specialization: z.string().trim().optional(),
  })
  .refine(
    (data) => {
      if (data.role !== UserRole.Doctor) return true;
      return (
        data.name != null &&
        data.name.length >= 2 &&
        data.licenseNumber != null &&
        data.licenseNumber.length > 0 &&
        data.specialization != null &&
        data.specialization.length > 0
      );
    },
    {
      message:
        'When role is Doctor, name, licenseNumber (professional license number), and specialization are required.',
      path: ['role'],
    }
  );

export const loginSchema = z.object({
  email: z.string().email().transform((v) => v.trim().toLowerCase()),
  password: z.string(),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string(),
});
