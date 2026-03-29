import express from 'express';
import patientShareLinkController from '../controllers/patientShareLink.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../../generated/client/client';

const router = express.Router();

// Public: token-based shared data access (no auth required)
router.get('/shared/:token', patientShareLinkController.getSharedData);

// All remaining routes require authentication + authorization
router.post('/patient/:patientId',  authenticate, authorize([UserRole.Patient]),                              patientShareLinkController.generateShareLink);
router.get('/patient/:patientId',   authenticate, authorize([UserRole.Patient, UserRole.Doctor, UserRole.Admin]), patientShareLinkController.getPatientShareLinks);
router.patch('/:id/revoke',         authenticate, authorize([UserRole.Patient, UserRole.Admin]),              patientShareLinkController.revokeShareLink);
router.patch('/:id',                authenticate, authorize([UserRole.Patient, UserRole.Admin]),              patientShareLinkController.updateShareLink);
router.delete('/:id',               authenticate, authorize([UserRole.Patient, UserRole.Admin]),              patientShareLinkController.deleteShareLink);

export default router;
