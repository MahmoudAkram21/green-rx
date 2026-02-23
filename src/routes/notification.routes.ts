import express from 'express';
import notificationController from '../controllers/notification.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

router.use(authenticate);

router.post('/', notificationController.createNotification);
router.get('/user/:userId', notificationController.getUserNotifications);
router.patch('/:id/read', notificationController.markAsRead);
router.patch('/user/:userId/read-all', notificationController.markAllAsRead);
router.delete('/:id', notificationController.deleteNotification);
router.post('/appointment-reminders', notificationController.sendAppointmentReminders);

export default router;
