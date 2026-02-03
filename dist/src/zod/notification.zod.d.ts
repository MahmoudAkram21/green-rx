import { z } from "zod";
export declare const notificationSchema: z.ZodObject<{
    userId: z.ZodNumber;
    type: z.ZodEnum<{
        DrugInteraction: "DrugInteraction";
        PrescriptionReady: "PrescriptionReady";
        AppointmentReminder: "AppointmentReminder";
        SystemAlert: "SystemAlert";
    }>;
    title: z.ZodString;
    message: z.ZodString;
}, z.core.$strip>;
export declare const updateNotificationSchema: z.ZodObject<{
    deliveryStatus: z.ZodOptional<z.ZodEnum<{
        Pending: "Pending";
        Failed: "Failed";
        Delivered: "Delivered";
        Read: "Read";
    }>>;
    readAt: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
//# sourceMappingURL=notification.zod.d.ts.map