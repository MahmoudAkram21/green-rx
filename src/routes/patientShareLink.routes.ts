import express from 'express';
import patientShareLinkController from '../controllers/patientShareLink.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

// Public: token-based shared data access (no auth required)
router.get('/shared/:token', patientShareLinkController.getSharedData);

// All remaining routes require authentication
router.post('/patient/:patientId', authenticate, patientShareLinkController.generateShareLink);
router.get('/patient/:patientId', authenticate, patientShareLinkController.getPatientShareLinks);
router.patch('/:id/revoke', authenticate, patientShareLinkController.revokeShareLink);
router.patch('/:id', authenticate, patientShareLinkController.updateShareLink);
router.delete('/:id', authenticate, patientShareLinkController.deleteShareLink);

export default router;
