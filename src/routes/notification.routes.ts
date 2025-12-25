import express from 'express';
import notificationController from '../controllers/notification.controller';

const router = express.Router();

// Create notification
router.post('/', notificationController.createNotification);

// Get all notifications for a user
router.get('/user/:userId', notificationController.getUserNotifications);

// Mark notification as read
router.patch('/:id/read', notificationController.markAsRead);

// Mark all as read for a user
router.patch('/user/:userId/read-all', notificationController.markAllAsRead);

// Delete notification
router.delete('/:id', notificationController.deleteNotification);

// Send appointment reminder
router.post('/appointment-reminders', notificationController.sendAppointmentReminders);

export default router;
