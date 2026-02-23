import express from 'express';
import prescriptionVersionController from '../controllers/prescriptionVersion.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

router.use(authenticate);

router.get('/prescription/:prescriptionId', prescriptionVersionController.getPrescriptionVersions);
router.get('/:id', prescriptionVersionController.getVersion);
router.post('/prescription/:prescriptionId', prescriptionVersionController.createVersion);
router.get('/prescription/:prescriptionId/compare', prescriptionVersionController.compareVersions);

export default router;
