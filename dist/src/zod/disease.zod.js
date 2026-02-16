"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWarningSchema = exports.createWarningSchema = exports.updateDiseaseSchema = exports.createDiseaseSchema = void 0;
const zod_1 = require("zod");
const client_1 = require("../../generated/client/client");
exports.createDiseaseSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    severity: zod_1.z.nativeEnum(client_1.DiseaseSeverity),
    description: zod_1.z.string().optional(),
});
exports.updateDiseaseSchema = exports.createDiseaseSchema.partial();
exports.createWarningSchema = zod_1.z.object({
    diseaseId: zod_1.z.number().int().positive(),
    activeSubstanceId: zod_1.z.number().int().positive(),
    warningFieldName: zod_1.z.string().min(1),
    warningMessage: zod_1.z.string().min(1),
    severity: zod_1.z.nativeEnum(client_1.WarningSeverity),
});
exports.updateWarningSchema = exports.createWarningSchema.partial();
//# sourceMappingURL=disease.zod.js.map