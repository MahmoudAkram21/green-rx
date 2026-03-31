import { Router } from 'express';
import * as operationsController from '../controllers/operations.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../../generated/client/client';

const router = Router();

// Everyone authenticated can query operations (e.g., doctors looking up an operation for a patient's medical history)
router.get('/', authenticate, operationsController.getAllOperations);
router.get('/:id', authenticate, operationsController.getOperationById);

// Only admins can manage operations
router.post(
    '/',
    authenticate,
    authorize([UserRole.Admin, UserRole.SuperAdmin]),
    operationsController.createOperation
);
router.put(
    '/:id',
    authenticate,
    authorize([UserRole.Admin, UserRole.SuperAdmin]),
    operationsController.updateOperation
);
router.delete(
    '/:id',
    authenticate,
    authorize([UserRole.Admin, UserRole.SuperAdmin]),
    operationsController.deleteOperation
);

export default router;
