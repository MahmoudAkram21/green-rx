import express from 'express';
import visitController from '../controllers/visit.controller';

const router = express.Router();

// Create visit
router.post('/', visitController.createVisit);

// Get patient visits
router.get('/patient/:patientId', visitController.getPatientVisits);

// Get doctor visits
router.get('/doctor/:doctorId', visitController.getDoctorVisits);

// Get single visit
router.get('/:id', visitController.getVisit);

// Update visit
router.patch('/:id', visitController.updateVisit);

// Delete visit
router.delete('/:id', visitController.deleteVisit);

export default router;
