"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.childProfileSchema = exports.allergySchema = exports.lifestyleSchema = exports.familyHistorySchema = exports.medicalHistorySchema = exports.createPatientSchema = void 0;
const zod_1 = require("zod");
const client_1 = require("../../generated/client/client");
exports.createPatientSchema = zod_1.z.object({
    userId: zod_1.z.number().int().positive(),
    name: zod_1.z.string().min(1),
    age: zod_1.z.number().int().positive(),
    ageClassification: zod_1.z.nativeEnum(client_1.AgeClassification),
    gender: zod_1.z.nativeEnum(client_1.Gender),
    weight: zod_1.z.number().positive().optional(),
    height: zod_1.z.number().positive().optional(),
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
exports.lifestyleSchema = zod_1.z.object({
    noGlasses: zod_1.z.boolean().optional(),
    alcoholAbuse: zod_1.z.boolean().optional(),
    excessCaffeine: zod_1.z.boolean().optional(),
    waterDaily: zod_1.z.number().positive().optional(),
    travellerAbroad: zod_1.z.boolean().optional(),
    annualVaccination: zod_1.z.boolean().optional(),
    noiseExposure: zod_1.z.boolean().optional(),
    chemicalExposure: zod_1.z.boolean().optional(),
    radiationExposure: zod_1.z.boolean().optional(),
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
    weight: zod_1.z.number().positive().optional(),
    height: zod_1.z.number().positive().optional(),
    allergies: zod_1.z.any().optional(), // JSON
    diseases: zod_1.z.any().optional(), // JSON
    medicalHistory: zod_1.z.any().optional(), // JSON
});
//# sourceMappingURL=patient.zod.js.map