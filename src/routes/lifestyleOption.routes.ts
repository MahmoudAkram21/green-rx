import express from 'express';
import {
  getLifestyleOptions,
  getAllLifestyleOptionsAdmin,
  getLifestyleOptionById,
  createLifestyleOption,
  updateLifestyleOption,
  deleteLifestyleOption,
} from '../controllers/lifestyleOption.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../../generated/client/client';

const router = express.Router();

router.use(authenticate);

// App / Patient: list active options (optional ?type=physical_activity|dietary_habits)
router.get('/', getLifestyleOptions);
// Admin: list all options including inactive
router.get('/all', authorize([UserRole.Admin, UserRole.SuperAdmin]), getAllLifestyleOptionsAdmin);
router.get('/:id', getLifestyleOptionById);

// Admin only: CRUD
router.post('/', authorize([UserRole.Admin, UserRole.SuperAdmin]), createLifestyleOption);
router.put('/:id', authorize([UserRole.Admin, UserRole.SuperAdmin]), updateLifestyleOption);
router.delete('/:id', authorize([UserRole.Admin, UserRole.SuperAdmin]), deleteLifestyleOption);

export default router;
