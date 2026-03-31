"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.childProfileSchema = exports.allergySchema = exports.patientLifestyleSchema = exports.familyHistorySchema = exports.medicalHistorySchema = exports.createPatientSchema = void 0;
const zod_1 = require("zod");
const client_1 = require("../../generated/client/client");
exports.createPatientSchema = zod_1.z.object({
    userId: zod_1.z.number().int().positive(),
    name: zod_1.z.string().min(1),
    age: zod_1.z.number().int().positive(),
    ageClassification: zod_1.z.nativeEnum(client_1.AgeClassification),
    gender: zod_1.z.nativeEnum(client_1.Gender),
    weight: zod_1.z.number().positive({ message: "Weight must be greater than zero" }).optional(),
    height: zod_1.z.number().positive({ message: "Height must be greater than zero" }).optional(),
    dateOfBirth: zod_1.z.string().datetime().optional(),
    pregnancyStatus: zod_1.z.boolean().optional(),
    trimester: zod_1.z.number().int().min(1).max(3).optional(),
    smoking: zod_1.z.boolean().optional(),
    pregnancyWarning: zod_1.z.boolean().optional(),
    lactation: zod_1.z.boolean().optional(),
});
exports.medicalHistorySchema = zod_1.z.object({
    diseaseId: zod_1.z.number().int().positive(),
    severity: zod_1.z.nativeEnum(client_1.DiseaseSeverity),
    diagnosisDate: zod_1.z.string().datetime().optional(),
    treatment: zod_1.z.string().optional(),
    status: zod_1.z.nativeEnum(client_1.DiseaseStatus),
    notes: zod_1.z.string().optional(),
});
exports.familyHistorySchema = zod_1.z.object({
    relation: zod_1.z.string().min(1), // e.g., "Father", "Mother", "Sibling"
    diseaseId: zod_1.z.number().int().positive(),
    severity: zod_1.z.nativeEnum(client_1.DiseaseSeverity),
    notes: zod_1.z.string().optional(),
});
exports.patientLifestyleSchema = zod_1.z.object({
    lifestyleId: zod_1.z.number().int().positive(),
    value: zod_1.z.boolean(),
});
exports.allergySchema = zod_1.z.object({
    allergen: zod_1.z.string().min(1),
    reaction: zod_1.z.string(),
    severity: zod_1.z.nativeEnum(client_1.AllergySeverity),
    notes: zod_1.z.string().optional(),
});
exports.childProfileSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    dateOfBirth: zod_1.z.string().datetime(),
    gender: zod_1.z.nativeEnum(client_1.Gender),
    ageClassification: zod_1.z.nativeEnum(client_1.AgeClassification),
    weight: zod_1.z.number().positive({ message: "Weight must be greater than zero" }).optional(),
    height: zod_1.z.number().positive({ message: "Height must be greater than zero" }).optional(),
    allergies: zod_1.z.any().optional(), // JSON
    diseases: zod_1.z.any().optional(), // JSON
    medicalHistory: zod_1.z.any().optional(), // JSON
});
//# sourceMappingURL=patient.zod.js.map