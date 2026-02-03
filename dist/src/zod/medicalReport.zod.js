"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMedicalReportSchema = exports.medicalReportSchema = void 0;
const zod_1 = require("zod");
exports.medicalReportSchema = zod_1.z.object({
    patientId: zod_1.z.number(),
    fileName: zod_1.z.string(),
    fileUrl: zod_1.z.string(),
    fileType: zod_1.z.string(),
    uploadedBy: zod_1.z.number(),
    reportType: zod_1.z
        .enum(["LabTest", "Imaging", "Consultation", "Procedure", "Other"])
        .optional(),
    reportDate: zod_1.z.string().optional(),
    notes: zod_1.z.string().optional(),
    fileSize: zod_1.z.number().optional(),
});
exports.updateMedicalReportSchema = exports.medicalReportSchema.partial();
//# sourceMappingURL=medicalReport.zod.js.map