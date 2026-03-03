import express from 'express';
import { register, login, refresh, logout, getMe, devResetSuperAdminPassword } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';
import { uploadDoctorLicense } from '../config/multer.config';

const router = express.Router();

// Public routes
router.post('/register', uploadDoctorLicense.single('licenseImage'), register);
router.post('/login', login);
router.post('/refresh', refresh);
// Dev only: reset superadmin password (server-side hash so login works)
router.post('/dev-reset-superadmin-password', devResetSuperAdminPassword);

// Protected routes
router.post('/logout', authenticate, logout);
router.get('/me', authenticate, getMe);

export default router;
