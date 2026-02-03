"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVisitSchema = exports.visitSchema = void 0;
const zod_1 = require("zod");
exports.visitSchema = zod_1.z.object({
    patientId: zod_1.z.number(),
    doctorId: zod_1.z.number(),
    visitDate: zod_1.z.string().transform((str) => new Date(str)),
    visitType: zod_1.z
        .enum(["FirstVisit", "FollowUp", "Emergency", "Consultation"])
        .optional(),
    diagnosis: zod_1.z.string().optional(),
    treatmentPlan: zod_1.z.string().optional(),
    notes: zod_1.z.string().optional(),
});
exports.updateVisitSchema = exports.visitSchema.partial().extend({
    visitDate: zod_1.z
        .string()
        .transform((str) => new Date(str))
        .optional(),
});
//# sourceMappingURL=visit.zod.js.map