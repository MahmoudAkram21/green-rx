import express from 'express';
import * as settingsController from '../controllers/settings.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../../generated/client/client';
import { uploadLogo } from '../config/multer.config';

const router = express.Router();

// Public: get logo (no auth - used on login page)
router.get('/logo', settingsController.getLogo);

// Admin only: upload/update logo
router.post(
    '/logo',
    authenticate,
    authorize([UserRole.Admin, UserRole.SuperAdmin]),
    uploadLogo.single('logo'),
    settingsController.uploadLogo
);

export default router;
