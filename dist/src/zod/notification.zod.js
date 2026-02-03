"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNotificationSchema = exports.notificationSchema = void 0;
const zod_1 = require("zod");
exports.notificationSchema = zod_1.z.object({
    userId: zod_1.z.number(),
    type: zod_1.z.enum([
        "PrescriptionReady",
        "DrugInteraction",
        "AppointmentReminder",
        "SystemAlert",
    ]),
    title: zod_1.z.string(),
    message: zod_1.z.string(),
});
exports.updateNotificationSchema = zod_1.z.object({
    deliveryStatus: zod_1.z
        .enum(["Pending", "Delivered", "Failed", "Read"])
        .optional(),
    readAt: zod_1.z.string().datetime().optional(),
});
//# sourceMappingURL=notification.zod.js.map