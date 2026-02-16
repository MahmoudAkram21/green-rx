import express from 'express';
import {
    createOrUpdatePatient,
    getPatientById,
    getPatientByUserId,
    addMedicalHistory,
    getMedicalHistories,
    addFamilyHistory,
    updateLifestyle,
    addAllergy,
    deleteAllergy,
    addChildProfile,
    getChildProfiles,
    deleteChildProfile
} from '../controllers/patient.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../../generated/client/client';

const router = express.Router();

// All patient routes require authentication
router.use(authenticate);

// Patient Profile
router.post('/', authorize([UserRole.Patient, UserRole.Admin]), createOrUpdatePatient);
router.get('/:id', getPatientById);
router.get('/user/:userId', getPatientByUserId);

// Medical History
router.post('/:patientId/medical-history', authorize([UserRole.Patient, UserRole.Doctor, UserRole.Admin]), addMedicalHistory);
router.get('/:patientId/medical-history', getMedicalHistories);

// Family History
router.post('/:patientId/family-history', authorize([UserRole.Patient, UserRole.Doctor, UserRole.Admin]), addFamilyHistory);

// Lifestyle
router.put('/:patientId/lifestyle', authorize([UserRole.Patient, UserRole.Doctor, UserRole.Admin]), updateLifestyle);

// Allergies
router.post('/:patientId/allergies', authorize([UserRole.Patient, UserRole.Doctor, UserRole.Admin]), addAllergy);
router.delete('/allergies/:allergyId', authorize([UserRole.Patient, UserRole.Doctor, UserRole.Admin]), deleteAllergy);

// Child Profiles
router.get('/:patientId/children', getChildProfiles);
router.post('/:patientId/children', authorize([UserRole.Patient, UserRole.Admin]), addChildProfile);
router.delete('/children/:childId', authorize([UserRole.Patient, UserRole.Admin]), deleteChildProfile);

export default router;
