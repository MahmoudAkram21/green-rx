"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../lib/prisma");
const notification_zod_1 = require("../zod/notification.zod");
class NotificationController {
    // Create a notification
    async createNotification(req, res, next) {
        try {
            const data = notification_zod_1.notificationSchema.parse(req.body);
            const notification = await prisma_1.prisma.notification.create({
                data: {
                    ...data,
                    deliveryStatus: 'Pending'
                }
            });
            // TODO: Integrate with email service
            // await emailService.sendNotificationEmail(notification);
            res.json(notification);
        }
        catch (error) {
            next(error);
        }
    }
    // Get all notifications for a user
    async getUserNotifications(req, res, next) {
        try {
            const { userId } = req.params;
            const { unreadOnly = 'false', page = '1', limit = '20' } = req.query;
            const where = { userId: Number(userId) };
            if (unreadOnly === 'true') {
                where.isRead = false;
            }
            const [notifications, total] = await Promise.all([
                prisma_1.prisma.notification.findMany({
                    where,
                    skip: (Number(page) - 1) * Number(limit),
                    take: Number(limit),
                    orderBy: { createdAt: 'desc' }
                }),
                prisma_1.prisma.notification.count({ where })
            ]);
            res.json({
                notifications,
                pagination: {
                    total,
                    page: Number(page),
                    limit: Number(limit),
                    totalPages: Math.ceil(total / Number(limit)),
                    unreadCount: await prisma_1.prisma.notification.count({
                        where: { userId: Number(userId), isRead: false }
                    })
                }
            });
        }
        catch (error) {
            next(error);
        }
    }
    // Mark notification as read
    async markAsRead(req, res, next) {
        try {
            const { id } = req.params;
            const notification = await prisma_1.prisma.notification.update({
                where: { id: Number(id) },
                data: {
                    isRead: true,
                    readAt: new Date()
                }
            });
            res.json(notification);
        }
        catch (error) {
            next(error);
        }
    }
    // Mark all as read for a user
    async markAllAsRead(req, res, next) {
        try {
            const { userId } = req.params;
            const updated = await prisma_1.prisma.notification.updateMany({
                where: {
                    userId: Number(userId),
                    isRead: false
                },
                data: {
                    isRead: true,
                    readAt: new Date()
                }
            });
            res.json({ message: `Marked ${updated.count} notifications as read` });
        }
        catch (error) {
            next(error);
        }
    }
    // Delete notification
    async deleteNotification(req, res, next) {
        try {
            const { id } = req.params;
            await prisma_1.prisma.notification.delete({
                where: { id: Number(id) }
            });
            res.json({ message: 'Notification deleted successfully' });
        }
        catch (error) {
            next(error);
        }
    }
    // Create appointment reminder notifications
    async sendAppointmentReminders(_req, res, next) {
        try {
            // Find appointments in the next 24 hours that haven't been reminded
            const tomorrow = new Date();
            tomorrow.setHours(tomorrow.getHours() + 24);
            const appointments = await prisma_1.prisma.appointment.findMany({
                where: {
                    appointmentDate: {
                        gte: new Date(),
                        lte: tomorrow
                    },
                    status: 'Scheduled',
                    reminderSent: false
                },
                include: {
                    patient: { include: { user: true } },
                    doctor: { include: { user: true } }
                }
            });
            const notificationsCreated = [];
            for (const appointment of appointments) {
                // Notify patient
                const patientNotification = await prisma_1.prisma.notification.create({
                    data: {
                        userId: appointment.patient.userId,
                        type: 'AppointmentReminder',
                        title: 'Upcoming Appointment Reminder',
                        message: `You have an appointment with ${appointment.doctor.name} on ${appointment.appointmentDate.toLocaleString()}`,
                        deliveryStatus: 'Pending'
                    }
                });
                // Mark appointment as reminded
                await prisma_1.prisma.appointment.update({
                    where: { id: appointment.id },
                    data: { reminderSent: true }
                });
                notificationsCreated.push(patientNotification);
            }
            res.json({
                message: `Sent ${notificationsCreated.length} appointment reminders`,
                notifications: notificationsCreated
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = new NotificationController();
//# sourceMappingURL=notification.controller.js.map