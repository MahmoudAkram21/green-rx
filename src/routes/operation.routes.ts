import express from 'express';
import {
  getAllOperations,
  getOperationById,
  createOperation,
  updateOperation,
  deleteOperation,
  getOperationWarningFieldOptions,
  getOperationWarningMappings,
  setOperationWarningMappings,
} from '../controllers/operation.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../../generated/client/client';

const router = express.Router();

router.use(authenticate);

// List and get by ID: any authenticated user (Patient, Doctor, Admin) for dropdown / display
router.get('/', getAllOperations);
router.get('/warning-field-options', authorize([UserRole.Admin, UserRole.SuperAdmin]), getOperationWarningFieldOptions);
router.get('/:id/warning-field-mappings', authorize([UserRole.Admin, UserRole.SuperAdmin]), getOperationWarningMappings);
router.put('/:id/warning-field-mappings', authorize([UserRole.Admin, UserRole.SuperAdmin]), setOperationWarningMappings);
router.get('/:id', getOperationById);

// Admin only: CRUD
router.post('/', authorize([UserRole.Admin, UserRole.SuperAdmin]), createOperation);
router.put('/:id', authorize([UserRole.Admin, UserRole.SuperAdmin]), updateOperation);
router.delete('/:id', authorize([UserRole.Admin, UserRole.SuperAdmin]), deleteOperation);

export default router;
