import express from 'express';
import drugInteractionAlertController from '../controllers/drugInteractionAlert.controller';

const router = express.Router();

// Check drug safety (before prescribing)
router.post('/check', drugInteractionAlertController.checkDrugSafety);

// Get alerts for a prescription
router.get('/prescription/:prescriptionId', drugInteractionAlertController.getAlertsByPrescription);

// Get alerts for a patient
router.get('/patient/:patientId', drugInteractionAlertController.getPatientAlerts);

// Acknowledge alert by doctor
router.patch('/:id/acknowledge-doctor', drugInteractionAlertController.acknowledgeByDoctor);

// Acknowledge alert by patient
router.patch('/:id/acknowledge-patient', drugInteractionAlertController.acknowledgeByPatient);

export default router;
