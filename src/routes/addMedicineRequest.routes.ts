import { Router } from 'express';
import * as addMedicineRequestController from '../controllers/addMedicineRequest.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../../generated/client/client';

const router = Router();

router.use(authenticate);

router.get(
    '/',
    authorize([UserRole.Admin, UserRole.SuperAdmin]),
    addMedicineRequestController.listAddMedicineRequests
);

router.get(
    '/:id',
    authorize([UserRole.Admin, UserRole.SuperAdmin]),
    addMedicineRequestController.getAddMedicineRequestById
);

router.patch(
    '/:id/resolve',
    authorize([UserRole.Admin, UserRole.SuperAdmin]),
    addMedicineRequestController.resolveAddMedicineRequest
);

export default router;
