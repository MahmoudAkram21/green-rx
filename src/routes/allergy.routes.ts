import express from 'express';
import {
    getAllergiesByPatient,
    // getCriticalAllergies,
    checkMedicineAllergies,
} from '../controllers/allergy.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../../generated/client/client';

const router = express.Router();

router.use(authenticate);

// Patient's allergies (read-only here; add/remove via POST/DELETE under patient.routes)
router.get('/patient/:patientId',              authorize([UserRole.Doctor, UserRole.Patient, UserRole.Admin, UserRole.Pharmacist]), getAllergiesByPatient);
// router.get('/patient/:patientId/critical', getCriticalAllergies);
router.get('/check/:patientId/:medicineId',    authorize([UserRole.Doctor, UserRole.Patient, UserRole.Admin, UserRole.Pharmacist]), checkMedicineAllergies);

export default router;
