import express from 'express';
import {
  getAllAllergens,
  getAllergenById,
  createAllergen,
  updateAllergen,
  deleteAllergen,
} from '../controllers/allergen.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../../generated/client/client';

const router = express.Router();

router.use(authenticate);

// List and get by ID: any authenticated user (for patient dropdown / display)
router.get('/', getAllAllergens);
router.get('/:id', getAllergenById);

// Admin only: CRUD
router.post('/', authorize([UserRole.Admin, UserRole.SuperAdmin]), createAllergen);
router.put('/:id', authorize([UserRole.Admin, UserRole.SuperAdmin]), updateAllergen);
router.delete('/:id', authorize([UserRole.Admin, UserRole.SuperAdmin]), deleteAllergen);

export default router;
