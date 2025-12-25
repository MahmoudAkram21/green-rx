import express from 'express';
import {
    createAllergy,
    getAllergiesByPatient,
    getAllergyById,
    updateAllergy,
    deleteAllergy,
    checkMedicineAllergies,
    getCriticalAllergies
} from '../controllers/allergy.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Allergy CRUD routes
router.post('/', createAllergy);
router.get('/patient/:patientId', getAllergiesByPatient);
router.get('/patient/:patientId/critical', getCriticalAllergies);
router.get('/:id', getAllergyById);
router.put('/:id', updateAllergy);
router.delete('/:id', deleteAllergy);

// Medicine conflict checking
router.get('/check/:patientId/:medicineId', checkMedicineAllergies);

export default router;
