import express from 'express';
import * as userController from '../controllers/user.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../../generated/client/client';

const router = express.Router();

router.use(authenticate);
router.use(authorize([UserRole.Admin, UserRole.SuperAdmin]));

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;
