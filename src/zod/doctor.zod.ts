import { z } from "zod";
import { RelationshipType } from "../../generated/client/client";

/** One slot: day (weekday e.g. "monday" or ISO date), startTime (e.g. "09:00"), endTime (e.g. "17:00"). */
export const workingHoursSlotSchema = z.object({
  day: z.string().min(1),
  startTime: z.string().min(1),
  endTime: z.string().min(1),
}).strict();

export const workingHoursSchema = z.array(workingHoursSlotSchema).optional();

export const createDoctorClinicSchema = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  workingHours: workingHoursSchema,
});

export const updateDoctorClinicSchema = createDoctorClinicSchema.partial();

export const createDoctorSchema = z.object({
  userId: z.number().int().positive(),
  name: z.string().min(1),
  specialization: z.string().min(1),
  licenseNumber: z.string().min(1),
  licenseImageUrl: z.string().min(1).optional(),
  phoneNumber: z.string().optional(),
  clinicAddress: z.string().optional(),
  yearsOfExperience: z.number().int().nonnegative().optional(),
  qualifications: z.string().optional(),
  consultationFee: z.number().positive().optional(),
});

export const updateDoctorSchema = createDoctorSchema.partial();

/** One clinic item for embedding in update profile (same shape as create; no id = create new). */
export const doctorClinicItemSchema = createDoctorClinicSchema;

/** For PATCH /doctors/me: all optional, no userId (from token). Optional clinics array to replace all doctor clinics. */
export const updateDoctorMeSchema = createDoctorSchema
  .omit({ userId: true })
  .partial()
  .extend({ clinics: z.array(doctorClinicItemSchema).optional() });

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
