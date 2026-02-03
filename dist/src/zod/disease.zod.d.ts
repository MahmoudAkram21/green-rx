import { z } from "zod";
export declare const createDiseaseSchema: z.ZodObject<{
    name: z.ZodString;
    severity: z.ZodEnum<{
        readonly None: "None";
        readonly Mild: "Mild";
        readonly Moderate: "Moderate";
        readonly Severe: "Severe";
        readonly Critical: "Critical";
    }>;
    description: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updateDiseaseSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    severity: z.ZodOptional<z.ZodEnum<{
        readonly None: "None";
        readonly Mild: "Mild";
        readonly Moderate: "Moderate";
        readonly Severe: "Severe";
        readonly Critical: "Critical";
    }>>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export declare const createWarningSchema: z.ZodObject<{
    diseaseId: z.ZodNumber;
    activeSubstanceId: z.ZodNumber;
    warningFieldName: z.ZodString;
    warningMessage: z.ZodString;
    severity: z.ZodEnum<{
        readonly Info: "Info";
        readonly Low: "Low";
        readonly Medium: "Medium";
        readonly High: "High";
        readonly Critical: "Critical";
    }>;
}, z.core.$strip>;
export declare const updateWarningSchema: z.ZodObject<{
    diseaseId: z.ZodOptional<z.ZodNumber>;
    activeSubstanceId: z.ZodOptional<z.ZodNumber>;
    warningFieldName: z.ZodOptional<z.ZodString>;
    warningMessage: z.ZodOptional<z.ZodString>;
    severity: z.ZodOptional<z.ZodEnum<{
        readonly Info: "Info";
        readonly Low: "Low";
        readonly Medium: "Medium";
        readonly High: "High";
        readonly Critical: "Critical";
    }>>;
}, z.core.$strip>;
//# sourceMappingURL=disease.zod.d.ts.map