import express from 'express';
import adminController from '../controllers/admin.controller';
import * as permissionController from '../controllers/permission.controller';
import * as adminSideEffectController from '../controllers/adminSideEffect.controller';
import * as adminAdrQuestionController from '../controllers/adminAdrQuestion.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../../generated/client/client';

const router = express.Router();
router.use(authenticate);
router.use(authorize([UserRole.Admin, UserRole.SuperAdmin]));

// Side Effects Management (more specific routes first)
router.post('/side-effects', adminSideEffectController.createSideEffect);
router.get('/side-effects', adminSideEffectController.listSideEffects);
router.get('/side-effects/pending', adminSideEffectController.listPendingSideEffects);
router.post('/side-effects/:id/trade-names', adminSideEffectController.attachTradeNames);
router.post('/side-effects/:id/medications', adminSideEffectController.attachTradeNames); // legacy alias
router.delete('/side-effects/:id/trade-names/:tradeNameId', adminSideEffectController.removeTradeName);
router.put('/side-effects/:id', adminSideEffectController.updateSideEffect);
router.patch('/side-effects/:id/approve', adminSideEffectController.approveSideEffect);

// ADR questionnaire (dashboard-managed)
router.get('/adr-questions', adminAdrQuestionController.listAdrQuestions);
router.put('/adr-questions/reorder', adminAdrQuestionController.reorderAdrQuestions);
router.post('/adr-questions', adminAdrQuestionController.createAdrQuestion);
router.put('/adr-questions/:id', adminAdrQuestionController.updateAdrQuestion);

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

// Ratings (admin dashboard)
router.get('/ratings', adminController.getRatings);
router.delete('/ratings/:id', adminController.deleteRating);

// Statistics
router.get('/statistics', adminController.getStatistics);

// Audit logs
router.get('/audit-logs', adminController.getAuditLogs);

export default router;
