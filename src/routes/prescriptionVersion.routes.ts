import express from 'express';
import prescriptionVersionController from '../controllers/prescriptionVersion.controller';

const router = express.Router();

// Get all versions of a prescription
router.get('/prescription/:prescriptionId', prescriptionVersionController.getPrescriptionVersions);

// Get a specific version
router.get('/:id', prescriptionVersionController.getVersion);

// Create a new version
router.post('/prescription/:prescriptionId', prescriptionVersionController.createVersion);

// Compare two versions
router.get('/prescription/:prescriptionId/compare', prescriptionVersionController.compareVersions);

export default router;
