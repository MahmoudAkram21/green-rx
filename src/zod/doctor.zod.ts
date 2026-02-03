import { z } from "zod";
import { RelationshipType } from "../generated/client";

export const createDoctorSchema = z.object({
  userId: z.number().int().positive(),
  name: z.string().min(1),
  specialization: z.string().min(1),
  licenseNumber: z.string().min(1),
  phoneNumber: z.string().optional(),
  clinicAddress: z.string().optional(),
  yearsOfExperience: z.number().int().nonnegative().optional(),
  qualifications: z.string().optional(),
  consultationFee: z.number().positive().optional(),
});

export const updateDoctorSchema = createDoctorSchema.partial();

export const verifyDoctorSchema = z.object({
  isVerified: z.boolean(),
  verificationNotes: z.string().optional(),
});

export const assignPatientSchema = z.object({
  patientId: z.number().int().positive(),
  relationshipType: z.nativeEnum(RelationshipType),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
});
