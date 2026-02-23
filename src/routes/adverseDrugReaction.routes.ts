import express from 'express';
import adverseDrugReactionController from '../controllers/adverseDrugReaction.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../../generated/client/client';

const router = express.Router();

router.use(authenticate);

router.post('/', adverseDrugReactionController.reportADR);
router.get('/patient/:patientId', adverseDrugReactionController.getPatientADRs);
router.get('/drug/:drugType/:drugId', adverseDrugReactionController.getDrugADRs);
router.get('/', authorize([UserRole.Admin, UserRole.SuperAdmin]), adverseDrugReactionController.getAllADRs);
router.get('/statistics/summary', authorize([UserRole.Admin, UserRole.SuperAdmin]), adverseDrugReactionController.getADRStatistics);
router.get('/:id', adverseDrugReactionController.getADRById);
router.patch('/:id', adverseDrugReactionController.updateADR);

export default router;
