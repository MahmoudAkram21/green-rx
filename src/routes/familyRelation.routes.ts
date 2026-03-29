import express from 'express';
import { getFamilyRelations } from '../controllers/familyRelation.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../../generated/client/client';

const router = express.Router();

router.use(authenticate);
router.get('/', authorize([UserRole.Doctor, UserRole.Patient, UserRole.Admin, UserRole.SuperAdmin, UserRole.Pharmacist]), getFamilyRelations);

export default router;
