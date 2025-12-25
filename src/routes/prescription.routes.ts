import express from 'express';
import {
    createPrescription,
    createBatchPrescriptions,
    getPrescriptions,
    getPrescriptionById,
    updatePrescription,
    deletePrescription,
    acknowledgeDrugInteraction,
    getDrugInteractionAlerts
} from '../controllers/prescription.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Prescription routes
router.post('/', createPrescription);
router.post('/batch', createBatchPrescriptions); // NEW: Batch prescription creation
router.get('/', getPrescriptions);
router.get('/:id', getPrescriptionById);
router.put('/:id', updatePrescription);
router.delete('/:id', deletePrescription);

// Drug interaction routes
router.get('/:prescriptionId/interactions', getDrugInteractionAlerts);
router.put('/interactions/:alertId/acknowledge', acknowledgeDrugInteraction);

export default router;
