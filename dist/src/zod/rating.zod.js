"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRatingSchema = exports.ratingSchema = void 0;
const zod_1 = require("zod");
exports.ratingSchema = zod_1.z.object({
    patientId: zod_1.z.number(),
    ratedType: zod_1.z.enum(["Doctor", "Pharmacist"]),
    doctorId: zod_1.z.number().optional(),
    pharmacistId: zod_1.z.number().optional(),
    rating: zod_1.z.number().min(1).max(5),
    review: zod_1.z.string().optional(),
});
exports.updateRatingSchema = exports.ratingSchema.partial();
//# sourceMappingURL=rating.zod.js.map