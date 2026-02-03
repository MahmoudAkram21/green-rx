import { z } from "zod";

export const notificationSchema = z.object({
  userId: z.number(),
  type: z.enum([
    "PrescriptionReady",
    "DrugInteraction",
    "AppointmentReminder",
    "SystemAlert",
  ]),
  title: z.string(),
  message: z.string(),
});

export const updateNotificationSchema = z.object({
  deliveryStatus: z
    .enum(["Pending", "Delivered", "Failed", "Read"])
    .optional(),
  readAt: z.string().datetime().optional(),
});

