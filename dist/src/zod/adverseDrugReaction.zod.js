"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAdrSchema = exports.adrSchema = void 0;
const zod_1 = require("zod");
exports.adrSchema = zod_1.z.object({
    patientId: zod_1.z.number(),
    tradeNameId: zod_1.z.number(),
    companyId: zod_1.z.number(),
    activeSubstanceId: zod_1.z.number().optional(),
    severity: zod_1.z.enum(["Mild", "Moderate", "Severe", "LifeThreatening"]),
    reaction: zod_1.z.string(),
    startDate: zod_1.z.string().transform((str) => new Date(str)),
    endDate: zod_1.z
        .string()
        .transform((str) => new Date(str))
        .optional(),
    isAnonymous: zod_1.z.boolean().optional(),
});
exports.updateAdrSchema = zod_1.z.object({
    status: zod_1.z
        .enum(["Pending", "UnderReview", "Confirmed", "Rejected"])
        .optional(),
    adminNotes: zod_1.z.string().optional(),
});
//# sourceMappingURL=adverseDrugReaction.zod.js.map