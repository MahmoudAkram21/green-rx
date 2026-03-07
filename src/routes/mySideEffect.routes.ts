import express from 'express';
import {
    reportSideEffects,
    getMySideEffects,
    getMySideEffectsByMedication,
} from '../controllers/sideEffect.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../../generated/client/client';

const router = express.Router();

router.use(authenticate);
router.use(authorize([UserRole.Patient]));

router.post('/', reportSideEffects);
router.get('/', getMySideEffects);
router.get('/by-medication/:medicationId', getMySideEffectsByMedication);

export default router;
