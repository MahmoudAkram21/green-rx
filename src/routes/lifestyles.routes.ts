import { Router } from 'express';
import * as lifestylesController from '../controllers/lifestyles.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../../generated/client/client';

const router = Router();

// Everyone authenticated can view lifestyle questions (e.g. for patient form rendering)
router.get('/', authenticate, lifestylesController.getAllLifestyles);
router.get('/:id', authenticate, lifestylesController.getLifestyleById);

// Only admins can manage lifestyle metadata
router.post(
    '/',
    authenticate,
    authorize([UserRole.Admin, UserRole.SuperAdmin]),
    lifestylesController.createLifestyle
);
router.put(
    '/:id',
    authenticate,
    authorize([UserRole.Admin, UserRole.SuperAdmin]),
    lifestylesController.updateLifestyle
);
router.delete(
    '/:id',
    authenticate,
    authorize([UserRole.Admin, UserRole.SuperAdmin]),
    lifestylesController.deleteLifestyle
);

export default router;
