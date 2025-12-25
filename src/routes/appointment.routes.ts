import express from 'express';
import {
    createAppointment,
    getAppointmentById,
    getAppointmentsByPatient,
    getAppointmentsByDoctor,
    updateAppointment,
    cancelAppointment,
    confirmAppointment,
    completeAppointment,
    getTodayAppointments
} from '../controllers/appointment.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Appointment routes
router.post('/', createAppointment);
router.get('/:id', getAppointmentById);
router.get('/patient/:patientId', getAppointmentsByPatient);
router.get('/doctor/:doctorId', getAppointmentsByDoctor);
router.get('/doctor/:doctorId/today', getTodayAppointments);
router.put('/:id', updateAppointment);
router.post('/:id/cancel', cancelAppointment);
router.post('/:id/confirm', confirmAppointment);
router.post('/:id/complete', completeAppointment);

export default router;
