import express from 'express';
import {
    createOrUpdatePharmacist,
    getPharmacistById,
    getPharmacistByUserId,
    getAllPharmacists
} from '../controllers/pharmacist.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../../generated/client/client';
import { getMyFullDetailsForPharmacist } from '../controllers/patient.controller';

const router = express.Router();

// All pharmacist routes require authentication
router.use(authenticate);

// Pharmacist Profile
router.post('/', authorize([UserRole.Pharmacist, UserRole.Admin]), createOrUpdatePharmacist);
router.post("/patients/:patientId", getMyFullDetailsForPharmacist)
router.get('/search', getAllPharmacists);
router.get('/:id', getPharmacistById);
router.get('/user/:userId', getPharmacistByUserId);

export default router;
