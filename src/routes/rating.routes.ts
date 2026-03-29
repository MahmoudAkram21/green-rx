import express from 'express';
import ratingController from '../controllers/rating.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../../generated/client/client';

const router = express.Router();

router.use(authenticate);

router.post('/',                        authorize([UserRole.Patient]),                                            ratingController.createRating);
router.get('/doctor/:doctorId',         authorize([UserRole.Doctor, UserRole.Patient, UserRole.Admin]),           ratingController.getDoctorRatings);
router.get('/pharmacist/:pharmacistId', authorize([UserRole.Patient, UserRole.Admin, UserRole.Pharmacist]),       ratingController.getPharmacistRatings);
router.get('/patient/:patientId',       authorize([UserRole.Patient, UserRole.Doctor, UserRole.Admin]),           ratingController.getPatientRatings);
router.delete('/:id',                   authorize([UserRole.Patient, UserRole.Admin]),                            ratingController.deleteRating);

export default router;
