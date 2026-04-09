import express from 'express';
import {
    addPatientDisease,
    getPatientDiseases,
    getActivePatientDiseases,
    updatePatientDiseaseStatus,
    deletePatientDisease
} from '../controllers/patientDisease.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import {
    assertOwnPatientIdParam,
    requirePatientProfileForDiseases
} from '../middleware/patientDiseasePatientOnly.middleware';
import { UserRole } from '../../generated/client/client';

const router = express.Router();

router.use(authenticate);
router.use(authorize([UserRole.Patient]));
router.use(requirePatientProfileForDiseases);

// patientId must be `me` or the authenticated patient's id
router.post('/patient/:patientId', assertOwnPatientIdParam, addPatientDisease);
router.get('/patient/:patientId', assertOwnPatientIdParam, getPatientDiseases);
router.get('/patient/:patientId/active', assertOwnPatientIdParam, getActivePatientDiseases);

router.patch('/:id', updatePatientDiseaseStatus);
router.delete('/:id', deletePatientDisease);

export default router;
