import express from 'express';
import {
    createConsultation,
    getConsultationById,
    getConsultationsByPatient,
    getConsultationsByDoctor,
    updateConsultation,
    deleteConsultation,
    getUpcomingFollowUps
} from '../controllers/consultation.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../../generated/client/client';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Consultation routes
router.post('/',                              authorize([UserRole.Doctor]),                                  createConsultation);
router.get('/patient/:patientId',             authorize([UserRole.Doctor, UserRole.Patient, UserRole.Admin]), getConsultationsByPatient);
router.get('/doctor/:doctorId/followups',     authorize([UserRole.Doctor, UserRole.Admin]),                  getUpcomingFollowUps);
router.get('/doctor/:doctorId',               authorize([UserRole.Doctor, UserRole.Admin]),                  getConsultationsByDoctor);
router.get('/:id',                            authorize([UserRole.Doctor, UserRole.Patient, UserRole.Admin]), getConsultationById);
router.put('/:id',                            authorize([UserRole.Doctor, UserRole.Admin]),                  updateConsultation);
router.delete('/:id',                         authorize([UserRole.Doctor, UserRole.Admin]),                  deleteConsultation);

export default router;
