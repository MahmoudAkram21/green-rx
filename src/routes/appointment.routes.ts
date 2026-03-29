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
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../../generated/client/client';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Appointment routes
router.post('/',                          authorize([UserRole.Doctor, UserRole.Patient]),                           createAppointment);
router.get('/patient/:patientId',         authorize([UserRole.Doctor, UserRole.Patient, UserRole.Admin]),           getAppointmentsByPatient);
router.get('/doctor/:doctorId/today',     authorize([UserRole.Doctor, UserRole.Admin]),                            getTodayAppointments);
router.get('/doctor/:doctorId',           authorize([UserRole.Doctor, UserRole.Admin]),                            getAppointmentsByDoctor);
router.get('/:id',                        authorize([UserRole.Doctor, UserRole.Patient, UserRole.Admin]),           getAppointmentById);
router.put('/:id',                        authorize([UserRole.Doctor, UserRole.Patient, UserRole.Admin]),           updateAppointment);
router.post('/:id/cancel',                authorize([UserRole.Doctor, UserRole.Patient, UserRole.Admin]),           cancelAppointment);
router.post('/:id/confirm',               authorize([UserRole.Doctor]),                                            confirmAppointment);
router.post('/:id/complete',              authorize([UserRole.Doctor]),                                            completeAppointment);

export default router;
