import express from 'express';
import drugInteractionAlertController from '../controllers/drugInteractionAlert.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../../generated/client/client';

const router = express.Router();

router.use(authenticate);

router.post('/check-by-trade-name', authorize([UserRole.Doctor, UserRole.Patient]), drugInteractionAlertController.checkByTradeName);
router.post('/check', drugInteractionAlertController.checkDrugSafety);
router.get('/prescription/:prescriptionId', drugInteractionAlertController.getAlertsByPrescription);
router.get('/patient/:patientId', drugInteractionAlertController.getPatientAlerts);
router.patch('/:id/acknowledge-doctor', drugInteractionAlertController.acknowledgeByDoctor);
router.patch('/:id/acknowledge-patient', drugInteractionAlertController.acknowledgeByPatient);

export default router;
