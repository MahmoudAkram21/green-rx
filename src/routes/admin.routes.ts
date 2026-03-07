import express from 'express';
import adminController from '../controllers/admin.controller';
import * as permissionController from '../controllers/permission.controller';
import * as adminSideEffectController from '../controllers/adminSideEffect.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../../generated/client/client';

const router = express.Router();
router.use(authenticate);
router.use(authorize([UserRole.Admin, UserRole.SuperAdmin]));

// Side Effects Management
router.post('/side-effects', adminSideEffectController.createSideEffect);
router.get('/side-effects', adminSideEffectController.listSideEffects);
router.get('/side-effects/pending', adminSideEffectController.listPendingSideEffects);
router.put('/side-effects/:id', adminSideEffectController.updateSideEffect);
router.post('/side-effects/:id/medications', adminSideEffectController.attachMedications);
router.delete('/side-effects/:id/medications/:medicationId', adminSideEffectController.removeMedication);
router.patch('/side-effects/:id/approve', adminSideEffectController.approveSideEffect);

// Permissions & role-permissions
router.get('/permissions', permissionController.listPermissions);
router.post('/permissions', permissionController.createPermission);
router.delete('/permissions/:id', permissionController.deletePermission);
router.get('/roles/:role/permissions', permissionController.getRolePermissions);
router.post('/roles/:role/permissions', permissionController.addPermissionToRole);
router.delete('/roles/:role/permissions/:permissionId', permissionController.removePermissionFromRole);

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
