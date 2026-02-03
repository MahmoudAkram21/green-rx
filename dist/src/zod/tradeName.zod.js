"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTradeNameSchema = exports.createTradeNameSchema = void 0;
const zod_1 = require("zod");
exports.createTradeNameSchema = zod_1.z.object({
    title: zod_1.z.string().min(1),
    activeSubstanceId: zod_1.z.number().int().positive(),
    companyId: zod_1.z.number().int().positive(),
    batchNumber: zod_1.z.string().optional(),
    barCode: zod_1.z.string().optional(),
    warningNotification: zod_1.z.string().optional(),
    availabilityStatus: zod_1.z
        .enum(["InStock", "OutOfStock", "Discontinued", "Pending"])
        .optional(),
    stockQuantity: zod_1.z.number().int().nonnegative().nullable().optional(),
    expiryDate: zod_1.z.string().datetime().nullable().optional(),
});
exports.updateTradeNameSchema = exports.createTradeNameSchema.partial();
//# sourceMappingURL=tradeName.zod.js.map