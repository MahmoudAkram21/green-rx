import express from 'express';
import {
    getAllergiesByPatient,
    // getCriticalAllergies,
    checkMedicineAllergies,
} from '../controllers/allergy.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { assertAccessToPatientData } from '../middleware/patientResourceAccess.middleware';
import { UserRole } from '../../generated/client/client';

const router = express.Router();

router.use(authenticate);

const allergyReaders = [UserRole.Doctor, UserRole.Patient, UserRole.Admin, UserRole.SuperAdmin];

// Patient's allergies (read-only here; add/remove via POST/DELETE under patient.routes)
router.get(
    '/patient/:patientId',
    authorize(allergyReaders),
    assertAccessToPatientData('patientId'),
    getAllergiesByPatient,
);
// router.get('/patient/:patientId/critical', getCriticalAllergies);
router.get(
    '/check/:patientId/:medicineId',
    authorize(allergyReaders),
    assertAccessToPatientData('patientId'),
    checkMedicineAllergies,
);

export default router;
