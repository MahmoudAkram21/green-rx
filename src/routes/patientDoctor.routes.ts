import express from 'express';
import {
    createPatientDoctor,
    getRelationshipsByPatient,
    getRelationshipsByDoctor,
    getRelationshipById,
    updatePatientDoctor,
    endRelationship
} from '../controllers/patientDoctor.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Patient-Doctor relationship routes
router.post('/', createPatientDoctor);
router.get('/patient/:patientId', getRelationshipsByPatient);
router.get('/doctor/:doctorId', getRelationshipsByDoctor);
router.get('/:id', getRelationshipById);
router.put('/:id', updatePatientDoctor);
router.post('/:id/end', endRelationship);

export default router;
