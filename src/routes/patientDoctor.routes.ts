import express from 'express';
import {
    createPatientDoctor,
    getRelationshipsByPatient,
    getRelationshipsByDoctor,
    getRelationshipById,
    updatePatientDoctor,
    endRelationship
} from '../controllers/patientDoctor.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../../generated/client/client';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Patient-Doctor relationship routes
router.post('/',                     authorize([UserRole.Doctor, UserRole.Admin]),                            createPatientDoctor);
router.get('/patient/:patientId',    authorize([UserRole.Doctor, UserRole.Patient, UserRole.Admin]),           getRelationshipsByPatient);
router.get('/doctor/:doctorId',      authorize([UserRole.Doctor, UserRole.Admin]),                            getRelationshipsByDoctor);
router.get('/:id',                   authorize([UserRole.Doctor, UserRole.Patient, UserRole.Admin]),           getRelationshipById);
router.put('/:id',                   authorize([UserRole.Doctor, UserRole.Admin]),                            updatePatientDoctor);
router.post('/:id/end',              authorize([UserRole.Doctor, UserRole.Admin]),                            endRelationship);

export default router;
