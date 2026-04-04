import express from 'express';
import {
    createPrescription,
    createBatchPrescriptions,
    getPrescriptions,
    getLatestPrescriptionForPatient,
    getPrescriptionById,
    updatePrescription,
    deletePrescription,
    addMedicineToPrescription,
    acknowledgeDrugInteraction,
    getDrugInteractionAlerts
} from '../controllers/prescription.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../../generated/client/client';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Prescription routes
router.post('/', authorize([UserRole.Doctor]), createPrescription);
router.post('/batch', authorize([UserRole.Doctor]), createBatchPrescriptions);
router.get('/', authorize([UserRole.Doctor, UserRole.Patient, UserRole.Admin]), getPrescriptions);
router.get(
    '/patient/:patientId/latest',
    authorize([UserRole.Doctor]),
    getLatestPrescriptionForPatient
);
router.put('/interactions/:alertId/acknowledge', authorize([UserRole.Doctor, UserRole.Patient]), acknowledgeDrugInteraction);
router.post('/:prescriptionId/medicines', authorize([UserRole.Doctor]), addMedicineToPrescription);
router.get('/:prescriptionId/interactions', authorize([UserRole.Doctor, UserRole.Patient, UserRole.Admin]), getDrugInteractionAlerts);
router.get('/:id', authorize([UserRole.Doctor, UserRole.Patient, UserRole.Admin]), getPrescriptionById);
router.put('/:id', authorize([UserRole.Doctor, UserRole.Admin]), updatePrescription);
router.delete('/:id', authorize([UserRole.Doctor, UserRole.Admin]), deletePrescription);

export default router;
