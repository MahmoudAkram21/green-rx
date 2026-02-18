import express from 'express';
import adminController from '../controllers/admin.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../../generated/client/client';

const router = express.Router();
router.use(authenticate);
router.use(authorize([UserRole.Admin, UserRole.SuperAdmin]));

// Doctor verification
router.get('/doctors/pending', adminController.getPendingDoctors);
router.patch('/doctors/:id/verify', adminController.verifyDoctor);
router.patch('/doctors/:id/reject', adminController.rejectDoctor);

// Pharmacist verification
router.get('/pharmacists/pending', adminController.getPendingPharmacists);
router.patch('/pharmacists/:id/verify', adminController.verifyPharmacist);
router.patch('/pharmacists/:id/reject', adminController.rejectPharmacist);

// Statistics
router.get('/statistics', adminController.getStatistics);

// Audit logs
router.get('/audit-logs', adminController.getAuditLogs);

export default router;
