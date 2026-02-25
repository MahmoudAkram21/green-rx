"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
const client_1 = require("../../generated/client/client");
exports.registerSchema = zod_1.z.object({
    email: zod_1.z.string().email().transform((v) => v.trim().toLowerCase()),
    password: zod_1.z.string().min(6),
    role: zod_1.z.nativeEnum(client_1.UserRole).default(client_1.UserRole.Patient),
    name: zod_1.z.string().min(2).optional(), // For creating patient/doctor profile stub
    phone: zod_1.z.string().trim().optional(), // e.g. E.164: +201145441141
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email().transform((v) => v.trim().toLowerCase()),
    password: zod_1.z.string(),
});
exports.refreshTokenSchema = zod_1.z.object({
    refreshToken: zod_1.z.string(),
});
//# sourceMappingURL=auth.zod.js.map