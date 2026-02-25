import express from 'express';
import {
    createOrUpdatePatient,
    getAllPatients,
    getPatientById,
    getPatientByUserId,
    addMedicalHistory,
    getMedicalHistories,
    addFamilyHistory,
    getFamilyHistories,
    updateLifestyle,
    addAllergy,
    addAllergiesBatch,
    deleteAllergy,
    addChildProfile,
    getChildProfiles,
    deleteChildProfile
} from '../controllers/patient.controller';
import {
    getSurgicalHistories,
    addSurgicalHistory,
    deleteSurgicalHistory
} from '../controllers/surgicalHistory.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../../generated/client/client';

const router = express.Router();

// All patient routes require authentication
router.use(authenticate);

// Patient Profile
router.get('/', authorize([UserRole.Admin, UserRole.SuperAdmin]), getAllPatients);
router.post('/', authorize([UserRole.Patient, UserRole.Admin, UserRole.SuperAdmin]), createOrUpdatePatient);
router.get('/:id', getPatientById);
router.get('/user/:userId', getPatientByUserId);

// Medical History
router.post('/:patientId/medical-history', authorize([UserRole.Patient, UserRole.Doctor, UserRole.Admin, UserRole.SuperAdmin]), addMedicalHistory);
router.get('/:patientId/medical-history', getMedicalHistories);

// Family History
router.get('/:patientId/family-history', getFamilyHistories);
router.post('/:patientId/family-history', authorize([UserRole.Patient, UserRole.Doctor, UserRole.Admin, UserRole.SuperAdmin]), addFamilyHistory);

// Surgical History
router.get('/:patientId/surgeries', getSurgicalHistories);
router.post('/:patientId/surgeries', authorize([UserRole.Patient, UserRole.Doctor, UserRole.Admin, UserRole.SuperAdmin]), addSurgicalHistory);
router.delete('/surgeries/:id', authorize([UserRole.Patient, UserRole.Doctor, UserRole.Admin, UserRole.SuperAdmin]), deleteSurgicalHistory);

// Lifestyle
router.put('/:patientId/lifestyle', authorize([UserRole.Patient, UserRole.Doctor, UserRole.Admin, UserRole.SuperAdmin]), updateLifestyle);

// Allergies
router.post('/:patientId/allergies', authorize([UserRole.Patient, UserRole.Doctor, UserRole.Admin, UserRole.SuperAdmin]), addAllergy);
router.post('/:patientId/allergies/batch', authorize([UserRole.Patient, UserRole.Doctor, UserRole.Admin, UserRole.SuperAdmin]), addAllergiesBatch);
router.delete('/allergies/:allergyId', authorize([UserRole.Patient, UserRole.Doctor, UserRole.Admin, UserRole.SuperAdmin]), deleteAllergy);

// Child Profiles
router.get('/:patientId/children', getChildProfiles);
router.post('/:patientId/children', authorize([UserRole.Patient, UserRole.Admin, UserRole.SuperAdmin]), addChildProfile);
router.delete('/children/:childId', authorize([UserRole.Patient, UserRole.Admin, UserRole.SuperAdmin]), deleteChildProfile);

export default router;
