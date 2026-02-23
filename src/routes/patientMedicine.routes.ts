import express from 'express';
import {
    getPatientMedicines,
    getPatientMedicineById,
    addPatientMedicine,
    addPatientMedicineByImage,
    updatePatientMedicine,
    deletePatientMedicine,
    verifyPatientMedicine,
    getUnverifiedMedicines,
} from '../controllers/patientMedicine.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { uploadMedicineImage } from '../config/multer.config';
import { UserRole } from '../../generated/client/client';

const router = express.Router();

router.use(authenticate);

// Admin: list all unverified image-uploaded medicines
router.get(
    '/unverified',
    authorize([UserRole.Admin, UserRole.SuperAdmin]),
    getUnverifiedMedicines
);

// Get a single record
router.get('/:id', getPatientMedicineById);

// List all medicines for a patient
router.get('/patient/:patientId', getPatientMedicines);

// Patient adds a medicine that exists in the system
router.post(
    '/patient/:patientId',
    authorize([UserRole.Patient, UserRole.Doctor, UserRole.Admin, UserRole.SuperAdmin]),
    addPatientMedicine
);

// Patient uploads an image because medicine is NOT in system
router.post(
    '/patient/:patientId/upload-image',
    authorize([UserRole.Patient]),
    uploadMedicineImage.single('image'),
    addPatientMedicineByImage
);

// Update dosage/frequency/status
router.patch(
    '/:id',
    authorize([UserRole.Patient, UserRole.Doctor, UserRole.Admin, UserRole.SuperAdmin]),
    updatePatientMedicine
);

// Admin/Doctor verifies an image-uploaded medicine by linking it to a TradeName
router.patch(
    '/:id/verify',
    authorize([UserRole.Doctor, UserRole.Admin, UserRole.SuperAdmin]),
    verifyPatientMedicine
);

// Delete
router.delete(
    '/:id',
    authorize([UserRole.Patient, UserRole.Doctor, UserRole.Admin, UserRole.SuperAdmin]),
    deletePatientMedicine
);

export default router;
