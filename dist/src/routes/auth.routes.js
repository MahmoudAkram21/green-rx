import express from 'express';
import { register, login, refresh, logout, getMe } from '../controllers/auth.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
const router = express.Router();
// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refresh);
// Protected routes
router.post('/logout', authenticate, logout);
router.get('/me', authenticate, getMe);
export default router;
//# sourceMappingURL=auth.routes.js.map