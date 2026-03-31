import express from 'express';
import * as addMedicineRequestsController from '../controllers/addMedicineRequests.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();
router.use(authenticate);

router.get('/', addMedicineRequestsController.getRequests);
router.get('/:id', addMedicineRequestsController.getRequestById);
router.patch('/:id/resolve', addMedicineRequestsController.resolveRequest);

export default router;
