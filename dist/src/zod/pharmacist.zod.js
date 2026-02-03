"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePharmacistSchema = exports.createPharmacistSchema = void 0;
const zod_1 = require("zod");
exports.createPharmacistSchema = zod_1.z.object({
    userId: zod_1.z.number().int().positive(),
    name: zod_1.z.string().min(1),
    licenseNumber: zod_1.z.string().min(1),
    phoneNumber: zod_1.z.string().optional(),
    pharmacyName: zod_1.z.string().optional(),
    pharmacyAddress: zod_1.z.string().optional(),
});
exports.updatePharmacistSchema = exports.createPharmacistSchema.partial();
//# sourceMappingURL=pharmacist.zod.js.map