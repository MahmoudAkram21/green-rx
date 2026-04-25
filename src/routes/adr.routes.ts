import express from 'express';
import { getAdrQuestionsTemplate } from '../controllers/sideEffect.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../../generated/client/client';

const router = express.Router();

router.use(authenticate);
router.use(authorize([UserRole.Patient, UserRole.Admin, UserRole.Doctor]));

router.get('/questions-template', getAdrQuestionsTemplate);

export default router;
