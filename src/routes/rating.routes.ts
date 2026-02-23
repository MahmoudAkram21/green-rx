import express from 'express';
import ratingController from '../controllers/rating.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

router.use(authenticate);

router.post('/', ratingController.createRating);
router.get('/doctor/:doctorId', ratingController.getDoctorRatings);
router.get('/pharmacist/:pharmacistId', ratingController.getPharmacistRatings);
router.get('/patient/:patientId', ratingController.getPatientRatings);
router.delete('/:id', ratingController.deleteRating);

export default router;
