/** @format */

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
  weight: z
    .number()
    .positive({ message: "Weight must be greater than zero" })
    .optional(),
  height: z
    .number()
    .positive({ message: "Height must be greater than zero" })
    .optional(),
  pregnancyStatus: z.boolean().optional(),
  trimester: z.number().int().min(1).max(3).optional(),
  pregnancyWarning: z.boolean().optional(),
  lactation: z.boolean().optional(),
  contracipient: z.boolean().optional(),
  isContracipientHormonal: z.boolean().optional(),
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

export const batchPatientLifestyleSchema = z
  .array(patientLifestyleItemSchema)
  .min(1);

const allergenTypeEnum = z.enum([
  "Drug",
  "Food",
  "Pollen",
  "Dust",
  "Pet",
  "Fragrance",
  "Other",
]);

export const allergySchema = z.object({
  allergen: z.string().min(1),
  allergenType: allergenTypeEnum.optional().nullable(),
  reaction: z.string().optional(),
  severity: z.nativeEnum(AllergySeverity).optional(),
  notes: z.string().optional(),
});

/**
 * Patient allergy report payload (new relation model):
 * - One report row per patient, with optional tradeName link and metadata (reaction/notes)
 * - Related allergens/actives/excipients/classifications stored in join tables
 */
export const patientAllergyReportSchema = z
  .object({
    tradeNameIds: z.array(z.number().positive()).optional(),
    allergenIds: z.array(z.number().int().positive()).optional().default([]),
    activeSubstanceIds: z
      .array(z.number().int().positive())
      .optional()
      .default([]),
    excipientIds: z.array(z.number().int().positive()).optional().default([]),
    classificationIds: z
      .array(z.number().int().positive())
      .optional()
      .default([]),
    reaction: z.string().optional().nullable(),
    notes: z.string().optional().nullable(),
  })
  .refine(
    (d) =>
      Boolean(d.tradeNameIds) ||
      (d.allergenIds?.length ?? 0) > 0 ||
      (d.activeSubstanceIds?.length ?? 0) > 0 ||
      (d.excipientIds?.length ?? 0) > 0 ||
      (d.classificationIds?.length ?? 0) > 0,
    {
      message:
        "At least one of tradeNameId, allergenIds, activeSubstanceIds, excipientIds, or classificationIds must be provided",
    },
  );

export const batchAllergySchema = z.array(allergySchema);

export const childProfileSchema = z.object({
  name: z.string().min(1),
  dateOfBirth: z.string().datetime(),
  gender: z.nativeEnum(Gender),
  ageClassification: z.nativeEnum(AgeClassification),
  weight: z
    .number()
    .positive({ message: "Weight must be greater than zero" })
    .optional(),
  height: z
    .number()
    .positive({ message: "Height must be greater than zero" })
    .optional(),
  allergies: z.any().optional(), // JSON
  diseases: z.any().optional(), // JSON
  medicalHistory: z.any().optional(), // JSON
});
