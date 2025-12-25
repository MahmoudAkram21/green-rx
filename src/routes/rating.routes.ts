import express from 'express';
import ratingController from '../controllers/rating.controller';

const router = express.Router();

// Create/Update a rating
router.post('/', ratingController.createRating);

// Get ratings for a doctor
router.get('/doctor/:doctorId', ratingController.getDoctorRatings);

// Get ratings for a pharmacist
router.get('/pharmacist/:pharmacistId', ratingController.getPharmacistRatings);

// Get patient's ratings
router.get('/patient/:patientId', ratingController.getPatientRatings);

// Delete a rating
router.delete('/:id', ratingController.deleteRating);

export default router;
