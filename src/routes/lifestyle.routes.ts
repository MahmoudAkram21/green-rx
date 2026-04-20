import express from 'express';
import {
  getAllLifestyles,
  getLifestyleActiveSubstanceFieldOptions,
  getLifestyleById,
  createLifestyle,
  updateLifestyle,
  deleteLifestyle,
} from '../controllers/lifestyle.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../../generated/client/client';

const router = express.Router();

router.use(authenticate);

router.get('/', getAllLifestyles);
router.get('/active-substance-field-options', getLifestyleActiveSubstanceFieldOptions);
router.get('/:id', getLifestyleById);
router.post('/', authorize([UserRole.Admin, UserRole.SuperAdmin]), createLifestyle);
router.put('/:id', authorize([UserRole.Admin, UserRole.SuperAdmin]), updateLifestyle);
router.delete('/:id', authorize([UserRole.Admin, UserRole.SuperAdmin]), deleteLifestyle);

export default router;
