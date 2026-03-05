import express from 'express';
import {
    getAllergiesByPatient,
    getCriticalAllergies,
    checkMedicineAllergies,
} from '../controllers/allergy.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

router.use(authenticate);

// Patient's allergies (read-only here; add/remove via POST/DELETE under patient.routes)
router.get('/patient/:patientId', getAllergiesByPatient);
router.get('/patient/:patientId/critical', getCriticalAllergies);
router.get('/check/:patientId/:medicineId', checkMedicineAllergies);

export default router;
