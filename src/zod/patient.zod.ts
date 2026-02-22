import { z } from "zod";
import {
  Gender,
  AgeClassification,
  AllergySeverity,
  DiseaseStatus,
  DiseaseSeverity,
} from "../../generated/client/client";

export const createPatientSchema = z.object({
  userId: z.number().int().positive(),
  name: z.string().min(1),
  age: z.number().int().positive(),
  ageClassification: z.nativeEnum(AgeClassification),
  gender: z.nativeEnum(Gender),
  weight: z.number().positive({ message: "Weight must be greater than zero" }).optional(),
  height: z.number().positive({ message: "Height must be greater than zero" }).optional(),
  dateOfBirth: z.string().datetime().optional(),
  pregnancyStatus: z.boolean().optional(),
  trimester: z.number().int().min(1).max(3).optional(),
  smoking: z.boolean().optional(),
  pregnancyWarning: z.boolean().optional(),
  lactation: z.boolean().optional(),
});

export const medicalHistorySchema = z.object({
  diseaseId: z.number().int().positive(),
  severity: z.nativeEnum(DiseaseSeverity),
  diagnosisDate: z.string().datetime().optional(),
  treatment: z.string().optional(),
  status: z.nativeEnum(DiseaseStatus),
  notes: z.string().optional(),
});

export const familyHistorySchema = z.object({
  relation: z.string().min(1), // e.g., "Father", "Mother", "Sibling"
  diseaseId: z.number().int().positive(),
  severity: z.nativeEnum(DiseaseSeverity),
  notes: z.string().optional(),
});

export const lifestyleSchema = z.object({
  noGlasses: z.boolean().optional(),
  alcoholAbuse: z.boolean().optional(),
  excessCaffeine: z.boolean().optional(),
  waterDaily: z.number().positive().optional(),
  travellerAbroad: z.boolean().optional(),
  annualVaccination: z.boolean().optional(),
  noiseExposure: z.boolean().optional(),
  chemicalExposure: z.boolean().optional(),
  radiationExposure: z.boolean().optional(),
});

export const allergySchema = z.object({
  allergen: z.string().min(1),
  reaction: z.string(),
  severity: z.nativeEnum(AllergySeverity),
  notes: z.string().optional(),
});

export const childProfileSchema = z.object({
  name: z.string().min(1),
  dateOfBirth: z.string().datetime(),
  gender: z.nativeEnum(Gender),
  ageClassification: z.nativeEnum(AgeClassification),
  weight: z.number().positive({ message: "Weight must be greater than zero" }).optional(),
  height: z.number().positive({ message: "Height must be greater than zero" }).optional(),
  allergies: z.any().optional(), // JSON
  diseases: z.any().optional(), // JSON
  medicalHistory: z.any().optional(), // JSON
});
