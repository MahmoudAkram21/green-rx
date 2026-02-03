import { z } from "zod";
export declare const createPatientSchema: z.ZodObject<{
    userId: z.ZodNumber;
    name: z.ZodString;
    age: z.ZodNumber;
    ageClassification: z.ZodEnum<{
        readonly Neonates: "Neonates";
        readonly Infants: "Infants";
        readonly Toddlers: "Toddlers";
        readonly Children: "Children";
        readonly Adolescents: "Adolescents";
        readonly Adults: "Adults";
        readonly Elderly: "Elderly";
    }>;
    gender: z.ZodEnum<{
        readonly Male: "Male";
        readonly Female: "Female";
        readonly Other: "Other";
    }>;
    weight: z.ZodOptional<z.ZodNumber>;
    height: z.ZodOptional<z.ZodNumber>;
    smoking: z.ZodOptional<z.ZodBoolean>;
    pregnancyWarning: z.ZodOptional<z.ZodBoolean>;
    lactation: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export declare const medicalHistorySchema: z.ZodObject<{
    diseaseId: z.ZodNumber;
    severity: z.ZodEnum<{
        readonly None: "None";
        readonly Mild: "Mild";
        readonly Moderate: "Moderate";
        readonly Severe: "Severe";
        readonly Critical: "Critical";
    }>;
    diagnosisDate: z.ZodOptional<z.ZodString>;
    treatment: z.ZodOptional<z.ZodString>;
    status: z.ZodEnum<{
        readonly Active: "Active";
        readonly Resolved: "Resolved";
        readonly Chronic: "Chronic";
    }>;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const familyHistorySchema: z.ZodObject<{
    relation: z.ZodString;
    diseaseId: z.ZodNumber;
    severity: z.ZodEnum<{
        readonly None: "None";
        readonly Mild: "Mild";
        readonly Moderate: "Moderate";
        readonly Severe: "Severe";
        readonly Critical: "Critical";
    }>;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const lifestyleSchema: z.ZodObject<{
    noGlasses: z.ZodOptional<z.ZodBoolean>;
    alcoholAbuse: z.ZodOptional<z.ZodBoolean>;
    excessCaffeine: z.ZodOptional<z.ZodBoolean>;
    waterDaily: z.ZodOptional<z.ZodNumber>;
    travellerAbroad: z.ZodOptional<z.ZodBoolean>;
    annualVaccination: z.ZodOptional<z.ZodBoolean>;
    noiseExposure: z.ZodOptional<z.ZodBoolean>;
    chemicalExposure: z.ZodOptional<z.ZodBoolean>;
    radiationExposure: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export declare const allergySchema: z.ZodObject<{
    allergen: z.ZodString;
    reaction: z.ZodString;
    severity: z.ZodEnum<{
        readonly Mild: "Mild";
        readonly Moderate: "Moderate";
        readonly Severe: "Severe";
        readonly LifeThreatening: "LifeThreatening";
    }>;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const childProfileSchema: z.ZodObject<{
    name: z.ZodString;
    dateOfBirth: z.ZodString;
    gender: z.ZodEnum<{
        readonly Male: "Male";
        readonly Female: "Female";
        readonly Other: "Other";
    }>;
    ageClassification: z.ZodEnum<{
        readonly Neonates: "Neonates";
        readonly Infants: "Infants";
        readonly Toddlers: "Toddlers";
        readonly Children: "Children";
        readonly Adolescents: "Adolescents";
        readonly Adults: "Adults";
        readonly Elderly: "Elderly";
    }>;
    weight: z.ZodOptional<z.ZodNumber>;
    height: z.ZodOptional<z.ZodNumber>;
    allergies: z.ZodOptional<z.ZodAny>;
    diseases: z.ZodOptional<z.ZodAny>;
    medicalHistory: z.ZodOptional<z.ZodAny>;
}, z.core.$strip>;
//# sourceMappingURL=patient.zod.d.ts.map