import express from 'express';
import visitController from '../controllers/visit.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

router.use(authenticate);

router.post('/', visitController.createVisit);
router.get('/patient/:patientId', visitController.getPatientVisits);
router.get('/doctor/:doctorId', visitController.getDoctorVisits);
router.get('/:id', visitController.getVisit);
router.patch('/:id', visitController.updateVisit);
router.delete('/:id', visitController.deleteVisit);

export default router;
