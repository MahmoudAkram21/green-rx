import express from 'express';
import {
    addPatientDisease,
    getPatientDiseases,
    getActivePatientDiseases,
    updatePatientDiseaseStatus,
    deletePatientDisease
} from '../controllers/patientDisease.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../generated/client';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Patient Disease Management
router.post('/patient/:patientId', authorize([UserRole.Patient, UserRole.Doctor, UserRole.Admin]), addPatientDisease);
router.get('/patient/:patientId', getPatientDiseases);
router.get('/patient/:patientId/active', getActivePatientDiseases);
router.patch('/:id', authorize([UserRole.Patient, UserRole.Doctor, UserRole.Admin]), updatePatientDiseaseStatus);
router.delete('/:id', authorize([UserRole.Patient, UserRole.Doctor, UserRole.Admin]), deletePatientDisease);

export default router;
