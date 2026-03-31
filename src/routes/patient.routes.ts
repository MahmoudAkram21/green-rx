import express from 'express';
import {
    createOrUpdatePatient,
    getAllPatients,
    getPatientById,
    getPatientByUserId,
    addMedicalHistory,
    getMedicalHistories,
    addFamilyHistory,
    addOrUpdatePatientLifestyles,
    getPatientLifestyles,
    deletePatientLifestyle,
    addAllergy,
    deleteAllergy,
    addChildProfile,
    getChildProfiles,
    deleteChildProfile,
    getSurgeries,
    addSurgeries,
    deleteSurgery
} from '../controllers/patient.controller';
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
router.post('/:patientId/family-history', authorize([UserRole.Patient, UserRole.Doctor, UserRole.Admin, UserRole.SuperAdmin]), addFamilyHistory);

// Lifestyle
router.get('/:patientId/lifestyle', getPatientLifestyles);
router.post('/:patientId/lifestyle', authorize([UserRole.Patient, UserRole.Doctor, UserRole.Admin, UserRole.SuperAdmin]), addOrUpdatePatientLifestyles);
router.delete('/lifestyle/:patientLifestyleId', authorize([UserRole.Patient, UserRole.Doctor, UserRole.Admin, UserRole.SuperAdmin]), deletePatientLifestyle);

// Allergies
router.post('/:patientId/allergies', authorize([UserRole.Patient, UserRole.Doctor, UserRole.Admin, UserRole.SuperAdmin]), addAllergy);
router.delete('/allergies/:allergyId', authorize([UserRole.Patient, UserRole.Doctor, UserRole.Admin, UserRole.SuperAdmin]), deleteAllergy);

// Child Profiles
router.get('/:patientId/children', getChildProfiles);
router.post('/:patientId/children', authorize([UserRole.Patient, UserRole.Admin, UserRole.SuperAdmin]), addChildProfile);
router.delete('/children/:childId', authorize([UserRole.Patient, UserRole.Admin, UserRole.SuperAdmin]), deleteChildProfile);

// Surgeries
router.get('/:patientId/surgeries', getSurgeries);
router.post('/:patientId/surgeries', authorize([UserRole.Patient, UserRole.Doctor, UserRole.Admin, UserRole.SuperAdmin]), addSurgeries);
router.delete('/surgeries/:surgeryId', authorize([UserRole.Patient, UserRole.Doctor, UserRole.Admin, UserRole.SuperAdmin]), deleteSurgery);

export default router;
