import express from 'express';
import notificationController from '../controllers/notification.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../../generated/client/client';

const router = express.Router();

router.use(authenticate);

router.post('/appointment-reminders',       authorize([UserRole.Admin, UserRole.SuperAdmin]),                                                                            notificationController.sendAppointmentReminders);
router.post('/',                            authorize([UserRole.Admin, UserRole.SuperAdmin]),                                                                            notificationController.createNotification);
router.get('/user/:userId',                 authorize([UserRole.Doctor, UserRole.Patient, UserRole.Admin, UserRole.SuperAdmin, UserRole.Pharmacist]),                    notificationController.getUserNotifications);
router.patch('/user/:userId/read-all',      authorize([UserRole.Doctor, UserRole.Patient, UserRole.Admin, UserRole.SuperAdmin, UserRole.Pharmacist]),                    notificationController.markAllAsRead);
router.patch('/:id/read',                   authorize([UserRole.Doctor, UserRole.Patient, UserRole.Admin, UserRole.SuperAdmin, UserRole.Pharmacist]),                    notificationController.markAsRead);
router.delete('/:id',                       authorize([UserRole.Doctor, UserRole.Patient, UserRole.Admin, UserRole.SuperAdmin, UserRole.Pharmacist]),                    notificationController.deleteNotification);

export default router;
