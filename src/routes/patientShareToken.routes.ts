import express from 'express';
import { generateShareToken, redeemShareToken, redeemShareTokenAsPharmacist } from '../controllers/patientShareToken.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../../generated/client/client';

const router = express.Router();

router.use(authenticate);

router.post('/generate', authorize([UserRole.Patient]), generateShareToken);
router.post('/redeem', authorize([UserRole.Doctor , UserRole.Pharmacist]), redeemShareToken);
router.post('/redeem-pharmacist', authorize([UserRole.Pharmacist]), redeemShareTokenAsPharmacist);

export default router;
