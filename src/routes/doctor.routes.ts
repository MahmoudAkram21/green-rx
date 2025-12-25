import express from 'express';
import {
    createOrUpdateDoctor,
    getDoctorById,
    getDoctorByUserId,
    verifyDoctor,
    getAllDoctors,
    assignPatient,
    getDoctorPatients,
    removePatient
} from '../controllers/doctor.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../generated/client';

const router = express.Router();

// All doctor routes require authentication
router.use(authenticate);

// Doctor Profile
router.post('/', authorize([UserRole.Doctor, UserRole.Admin]), createOrUpdateDoctor);
router.get('/search', getAllDoctors); // Public search for patients to find doctors
router.get('/:id', getDoctorById);
router.get('/user/:userId', getDoctorByUserId);

// Doctor Verification (Admin only)
router.put('/:id/verify', authorize([UserRole.Admin, UserRole.SuperAdmin]), verifyDoctor);

// Patient-Doctor Relationships
router.post('/:doctorId/patients', authorize([UserRole.Doctor, UserRole.Admin]), assignPatient);
router.get('/:doctorId/patients', authorize([UserRole.Doctor, UserRole.Admin]), getDoctorPatients);
router.delete('/:doctorId/patients/:patientId', authorize([UserRole.Doctor, UserRole.Admin]), removePatient);

export default router;
