"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignPatientSchema = exports.verifyDoctorSchema = exports.updateDoctorSchema = exports.createDoctorSchema = void 0;
const zod_1 = require("zod");
const client_1 = require("../generated/client");
exports.createDoctorSchema = zod_1.z.object({
    userId: zod_1.z.number().int().positive(),
    name: zod_1.z.string().min(1),
    specialization: zod_1.z.string().min(1),
    licenseNumber: zod_1.z.string().min(1),
    phoneNumber: zod_1.z.string().optional(),
    clinicAddress: zod_1.z.string().optional(),
    yearsOfExperience: zod_1.z.number().int().nonnegative().optional(),
    qualifications: zod_1.z.string().optional(),
    consultationFee: zod_1.z.number().positive().optional(),
});
exports.updateDoctorSchema = exports.createDoctorSchema.partial();
exports.verifyDoctorSchema = zod_1.z.object({
    isVerified: zod_1.z.boolean(),
    verificationNotes: zod_1.z.string().optional(),
});
exports.assignPatientSchema = zod_1.z.object({
    patientId: zod_1.z.number().int().positive(),
    relationshipType: zod_1.z.nativeEnum(client_1.RelationshipType),
    startDate: zod_1.z.string().datetime().optional(),
    endDate: zod_1.z.string().datetime().optional(),
});
//# sourceMappingURL=doctor.zod.js.map