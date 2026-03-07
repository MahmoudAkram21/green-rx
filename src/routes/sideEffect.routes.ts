import express from 'express';
import {
    getSideEffectsByMedication,
    addSideEffect,
} from '../controllers/sideEffect.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../../generated/client/client';

const router = express.Router();

router.use(authenticate);

router.get('/by-medication/:medicationId', authorize([UserRole.Patient, UserRole.Doctor, UserRole.Admin]), getSideEffectsByMedication);
router.post('/add', authorize([UserRole.Patient, UserRole.Admin]), addSideEffect);

export default router;
