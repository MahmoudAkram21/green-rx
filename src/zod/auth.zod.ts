import { z } from "zod";
import { UserRole } from "../../generated/client/client";

export const registerSchema = z.object({
  email: z.string().email().transform((v) => v.trim().toLowerCase()),
  password: z.string().min(6),
  role: z.nativeEnum(UserRole).default(UserRole.Patient),
  name: z.string().min(2).optional(), // For creating patient/doctor profile stub
});

export const loginSchema = z.object({
  email: z.string().email().transform((v) => v.trim().toLowerCase()),
  password: z.string(),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string(),
});
