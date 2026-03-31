import express from 'express';
import adminController from '../controllers/admin.controller';
import * as permissionController from '../controllers/permission.controller';
import * as adminSideEffectsController from '../controllers/admin.sideEffects.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../../generated/client/client';

const router = express.Router();
router.use(authenticate);
router.use(authorize([UserRole.Admin, UserRole.SuperAdmin]));

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

// Side Effects Management
router.get('/side-effects', adminSideEffectsController.getAllSideEffects);
router.get('/side-effects/pending', adminSideEffectsController.getPendingSideEffects);
router.post('/side-effects', adminSideEffectsController.createSideEffect);
router.put('/side-effects/:id', adminSideEffectsController.updateSideEffect);
router.post('/side-effects/:id/trade-names', adminSideEffectsController.attachTradeNames);
router.delete('/side-effects/:id/trade-names/:tradeNameId', adminSideEffectsController.removeTradeName);
router.patch('/side-effects/:id/approve', adminSideEffectsController.approveSideEffect);

export default router;
