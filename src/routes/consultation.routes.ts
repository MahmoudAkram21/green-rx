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
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Consultation routes
router.post('/', createConsultation);
router.get('/:id', getConsultationById);
router.get('/patient/:patientId', getConsultationsByPatient);
router.get('/doctor/:doctorId', getConsultationsByDoctor);
router.get('/doctor/:doctorId/followups', getUpcomingFollowUps);
router.put('/:id', updateConsultation);
router.delete('/:id', deleteConsultation);

export default router;
