import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { notificationSchema } from '../zod/notification.zod';

class NotificationController {
    // Create a notification
    async createNotification(req: Request, res: Response, next: NextFunction) {
        try {
            const data = notificationSchema.parse(req.body);

            const notification = await prisma.notification.create({
                data: {
                    ...data,
                    deliveryStatus: 'Pending'
                }
            });

            // TODO: Integrate with email service
            // await emailService.sendNotificationEmail(notification);

            res.json(notification);
        } catch (error) {
            next(error);
        }
    }

    // Get all notifications for a user
    async getUserNotifications(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;
            const { unreadOnly = 'false', page = '1', limit = '20' } = req.query;

            const where: any = { userId: Number(userId) };
            if (unreadOnly === 'true') {
                where.isRead = false;
            }

            const [notifications, total] = await Promise.all([
                prisma.notification.findMany({
                    where,
                    skip: (Number(page) - 1) * Number(limit),
                    take: Number(limit),
                    orderBy: { createdAt: 'desc' }
                }),
                prisma.notification.count({ where })
            ]);

            res.json({
                notifications,
                pagination: {
                    total,
                    page: Number(page),
                    limit: Number(limit),
                    totalPages: Math.ceil(total / Number(limit)),
                    unreadCount: await prisma.notification.count({
                        where: { userId: Number(userId), isRead: false }
                    })
                }
            });
        } catch (error) {
            next(error);
        }
    }

    // Mark notification as read
    async markAsRead(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const notification = await prisma.notification.update({
                where: { id: Number(id) },
                data: {
                    isRead: true,
                    readAt: new Date()
                }
            });

            res.json(notification);
        } catch (error) {
            next(error);
        }
    }

    // Mark all as read for a user
    async markAllAsRead(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;

            const updated = await prisma.notification.updateMany({
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
        } catch (error) {
            next(error);
        }
    }

    // Delete notification
    async deleteNotification(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            await prisma.notification.delete({
                where: { id: Number(id) }
            });

            res.json({ message: 'Notification deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
}

export default new NotificationController();
