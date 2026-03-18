import express from 'express';
import {
  getAllAllergenCategories,
  getAllergenCategoryById,
  getAllergensByCategoryId,
  createAllergenCategory,
  updateAllergenCategory,
  deleteAllergenCategory,
} from '../controllers/allergenCategory.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../../generated/client/client';

const router = express.Router();

router.use(authenticate);

// List all categories and get allergens by category: any authenticated user (patient, doctor, admin)
router.get('/', getAllAllergenCategories);
router.get('/:id', getAllergenCategoryById);
router.get('/:id/allergens', getAllergensByCategoryId);

// Admin only: CRUD
router.post('/', authorize([UserRole.Admin, UserRole.SuperAdmin]), createAllergenCategory);
router.put('/:id', authorize([UserRole.Admin, UserRole.SuperAdmin]), updateAllergenCategory);
router.delete('/:id', authorize([UserRole.Admin, UserRole.SuperAdmin]), deleteAllergenCategory);

export default router;
