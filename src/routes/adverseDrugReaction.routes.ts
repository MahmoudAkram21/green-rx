import express from 'express';
import adverseDrugReactionController from '../controllers/adverseDrugReaction.controller';

const router = express.Router();

// Report an ADR
router.post('/', adverseDrugReactionController.reportADR);

// Get all ADRs for a patient
router.get('/patient/:patientId', adverseDrugReactionController.getPatientADRs);

// Get ADRs for a specific drug
router.get('/drug/:drugType/:drugId', adverseDrugReactionController.getDrugADRs);

// Get all ADRs (admin)
router.get('/', adverseDrugReactionController.getAllADRs);

// Update ADR
router.patch('/:id', adverseDrugReactionController.updateADR);

// Get ADR statistics
router.get('/statistics/summary', adverseDrugReactionController.getADRStatistics);

export default router;
