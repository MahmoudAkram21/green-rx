import express from 'express';
import drugInteractionAlertController from '../controllers/drugInteractionAlert.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

router.use(authenticate);

router.post('/check', drugInteractionAlertController.checkDrugSafety);
router.get('/prescription/:prescriptionId', drugInteractionAlertController.getAlertsByPrescription);
router.get('/patient/:patientId', drugInteractionAlertController.getPatientAlerts);
router.patch('/:id/acknowledge-doctor', drugInteractionAlertController.acknowledgeByDoctor);
router.patch('/:id/acknowledge-patient', drugInteractionAlertController.acknowledgeByPatient);

export default router;
