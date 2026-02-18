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

// Get ADR statistics (must be before /:id)
router.get('/statistics/summary', adverseDrugReactionController.getADRStatistics);

// Get one ADR by ID (admin)
router.get('/:id', adverseDrugReactionController.getADRById);

// Update ADR
router.patch('/:id', adverseDrugReactionController.updateADR);

export default router;
