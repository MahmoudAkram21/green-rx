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
  gender: z.nativeEnum(Gender),
  dateOfBirth: z.string().datetime().optional(), // when provided, age and ageClassification are computed by backend
  age: z.number().int().min(0).max(150).optional(), // optional; ignored if dateOfBirth provided
  ageClassification: z.nativeEnum(AgeClassification).optional(), // optional; computed from dateOfBirth when provided
  weight: z.number().positive({ message: "Weight must be greater than zero" }).optional(),
  height: z.number().positive({ message: "Height must be greater than zero" }).optional(),
  pregnancyStatus: z.boolean().optional(),
  trimester: z.number().int().min(1).max(3).optional(),
  pregnancyWarning: z.boolean().optional(),
  lactation: z.boolean().optional(),
  bloodType: z.string().trim().optional(), // e.g. A+, A-, B+, B-, AB+, AB-, O+, O-
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
  diseaseId: z.number().int().positive(),
  severity: z.nativeEnum(DiseaseSeverity),
  notes: z.string().optional(),
});

export const addPatientDiseaseSchema = z.object({
  diseaseId: z.number().int().positive(),
  severity: z.nativeEnum(DiseaseSeverity),
  diagnosisDate: z.string().datetime().optional(),
  notes: z.string().optional(),
});

/** One patient lifestyle answer (lifestyleId from GET /lifestyles, value = boolean) */
export const patientLifestyleItemSchema = z.object({
  lifestyleId: z.number().int().positive(),
  value: z.boolean().default(false),
});

export const batchPatientLifestyleSchema = z.array(patientLifestyleItemSchema).min(1);

const allergenTypeEnum = z.enum(["Drug", "Food", "Pollen", "Dust", "Pet", "Fragrance", "Other"]);

export const allergySchema = z.object({
  allergen: z.string().min(1),
  allergenType: allergenTypeEnum.optional().nullable(),
  reaction: z.string().optional(),
  severity: z.nativeEnum(AllergySeverity).optional(),
  notes: z.string().optional(),
});

/**
 * For adding an allergy to a patient. Exactly one of allergenId, activeSubstanceId, tradeNameId is required.
 * - allergenId: from GET /allergens or GET /allergen-categories/:id/allergens (Food, Respiratory, Skin, Insect Stings, or Medication catalog allergen)
 * - activeSubstanceId: from GET /active-substances/search (Medication: patient chose specific active substance)
 * - tradeNameId: from GET /trade-names/search (Medication: patient chose specific trade name)
 */
export const patientAllergySchema = z
  .object({
    allergenId:        z.number().int().positive().optional(),
    activeSubstanceId: z.number().int().positive().optional(),
    tradeNameId:       z.number().int().positive().optional(),
    reaction:          z.string().optional().nullable(),
    notes:             z.string().optional().nullable(),
  })
  .refine(
    (d) => {
      const set = [d.allergenId, d.activeSubstanceId, d.tradeNameId].filter((v) => v !== undefined);
      return set.length === 1;
    },
    { message: 'Exactly one of allergenId, activeSubstanceId, or tradeNameId must be provided' }
  );

export const batchAllergySchema = z.array(allergySchema);
export const batchPatientAllergySchema = z.array(patientAllergySchema);

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
