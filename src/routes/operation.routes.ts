import express from 'express';
import {
  getAllOperations,
  getOperationById,
  createOperation,
  updateOperation,
  deleteOperation,
} from '../controllers/operation.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../../generated/client/client';

const router = express.Router();

router.use(authenticate);

// List and get by ID: any authenticated user (Patient, Doctor, Admin) for dropdown / display
router.get('/', getAllOperations);
router.get('/:id', getOperationById);

// Admin only: CRUD
router.post('/', authorize([UserRole.Admin, UserRole.SuperAdmin]), createOperation);
router.put('/:id', authorize([UserRole.Admin, UserRole.SuperAdmin]), updateOperation);
router.delete('/:id', authorize([UserRole.Admin, UserRole.SuperAdmin]), deleteOperation);

export default router;
