import express from 'express';
import visitController from '../controllers/visit.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../../generated/client/client';

const router = express.Router();

router.use(authenticate);

router.post('/',                         authorize([UserRole.Doctor]),                                             visitController.createVisit);
router.get('/patient/:patientId',        authorize([UserRole.Doctor, UserRole.Patient, UserRole.Admin]),           visitController.getPatientVisits);
router.get('/doctor/:doctorId',          authorize([UserRole.Doctor, UserRole.Admin]),                            visitController.getDoctorVisits);
router.get('/:id',                       authorize([UserRole.Doctor, UserRole.Patient, UserRole.Admin]),           visitController.getVisit);
router.patch('/:id',                     authorize([UserRole.Doctor, UserRole.Admin]),                            visitController.updateVisit);
router.delete('/:id',                    authorize([UserRole.Doctor, UserRole.Admin]),                            visitController.deleteVisit);

export default router;
