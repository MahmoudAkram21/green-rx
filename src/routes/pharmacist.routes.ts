import express from 'express';
import {
    createOrUpdatePharmacist,
    getPharmacistById,
    getPharmacistByUserId,
    getAllPharmacists
} from '../controllers/pharmacist.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../generated/client';

const router = express.Router();

// All pharmacist routes require authentication
router.use(authenticate);

// Pharmacist Profile
router.post('/', authorize([UserRole.Pharmacist, UserRole.Admin]), createOrUpdatePharmacist);
router.get('/search', getAllPharmacists);
router.get('/:id', getPharmacistById);
router.get('/user/:userId', getPharmacistByUserId);

export default router;
