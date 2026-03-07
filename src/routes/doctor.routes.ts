import express from 'express';
import {
    createOrUpdateDoctor,
    getDoctorById,
    getDoctorByUserId,
    getDoctorMe,
    getDoctorMeStats,
    updateDoctorMe,
    getAllDoctors,
    getNearbyDoctors,
    verifyDoctor,
    getDoctorClinics,
    createDoctorClinic,
    updateDoctorClinic,
    deleteDoctorClinic,
    assignPatient,
    getDoctorPatients,
    getPatientDetailsForDoctor,
    removePatient,
    searchDoctorPatientsByName
} from '../controllers/doctor.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../../generated/client/client';

const router = express.Router();

// All doctor routes require authentication
router.use(authenticate);

// Doctor Profile
router.post('/', authorize([UserRole.Doctor, UserRole.Admin]), createOrUpdateDoctor);
router.get('/search', getAllDoctors); // Public search for patients to find doctors
// Mobile: current doctor by token (must be before /:id); /me/stats before /me so it matches first
router.get('/me/stats', authorize([UserRole.Doctor]), getDoctorMeStats);
router.get('/me', authorize([UserRole.Doctor]), getDoctorMe);
router.patch('/me', authorize([UserRole.Doctor]), updateDoctorMe);
router.get('/nearby', authorize([UserRole.Patient, UserRole.Doctor, UserRole.Admin, UserRole.SuperAdmin]), getNearbyDoctors);
router.get('/:id', getDoctorById);
router.get('/user/:userId', getDoctorByUserId);

// Doctor Verification (Admin only)
router.put('/:id/verify', authorize([UserRole.Admin, UserRole.SuperAdmin]), verifyDoctor);

// Doctor Clinics (multiple clinics per doctor; routes before /:doctorId/patients so "clinics" is not a patientId)
router.get('/:doctorId/clinics', authorize([UserRole.Doctor, UserRole.Admin, UserRole.SuperAdmin]), getDoctorClinics);
router.post('/:doctorId/clinics', authorize([UserRole.Doctor, UserRole.Admin, UserRole.SuperAdmin]), createDoctorClinic);
router.patch('/:doctorId/clinics/:clinicId', authorize([UserRole.Doctor, UserRole.Admin, UserRole.SuperAdmin]), updateDoctorClinic);
router.delete('/:doctorId/clinics/:clinicId', authorize([UserRole.Doctor, UserRole.Admin, UserRole.SuperAdmin]), deleteDoctorClinic);

// Patient-Doctor Relationships (search route must come before /:doctorId/patients to avoid "search" as patientId)
router.get('/:doctorId/patients/search', authorize([UserRole.Doctor, UserRole.Admin]), searchDoctorPatientsByName);
router.get('/:doctorId/patients/:patientId', authorize([UserRole.Doctor, UserRole.Admin]), getPatientDetailsForDoctor);
router.post('/:doctorId/patients', authorize([UserRole.Doctor, UserRole.Admin]), assignPatient);
router.get('/:doctorId/patients', authorize([UserRole.Doctor, UserRole.Admin]), getDoctorPatients);
router.delete('/:doctorId/patients/:patientId', authorize([UserRole.Doctor, UserRole.Admin]), removePatient);

export default router;
