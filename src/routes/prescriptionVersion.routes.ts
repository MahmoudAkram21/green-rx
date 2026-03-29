import express from 'express';
import prescriptionVersionController from '../controllers/prescriptionVersion.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../../generated/client/client';

const router = express.Router();

router.use(authenticate);

router.get('/prescription/:prescriptionId/compare',  authorize([UserRole.Doctor, UserRole.Patient, UserRole.Admin]), prescriptionVersionController.compareVersions);
router.get('/prescription/:prescriptionId',          authorize([UserRole.Doctor, UserRole.Patient, UserRole.Admin]), prescriptionVersionController.getPrescriptionVersions);
router.post('/prescription/:prescriptionId',         authorize([UserRole.Doctor, UserRole.Admin]),                  prescriptionVersionController.createVersion);
router.get('/:id',                                   authorize([UserRole.Doctor, UserRole.Patient, UserRole.Admin]), prescriptionVersionController.getVersion);

export default router;
