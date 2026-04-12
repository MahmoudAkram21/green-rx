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
import { assertAccessToPatientData } from '../middleware/patientResourceAccess.middleware';
import { uploadMedicineImage } from '../config/multer.config';
import { UserRole } from '../../generated/client/client';
import { prisma } from '../lib/prisma';

const router = express.Router();

router.use(authenticate);

router.use(async (req, res, next) => {
    const patientId = req.params.patientId;
    const isMe = patientId === 'me';
    const isOwnUserId = req.user?.role === 'Patient' && String(req.user.userId) === patientId;
    if ((isMe || isOwnUserId) && req.user?.role === 'Patient') {
        try {
            const patient = await prisma.patient.findUnique({ where: { userId: req.user!.userId } });
            if (!patient) {
                res.status(404).json({ error: 'Patient not found' });
                return;
            }
            req.params.patientId = String(patient.id);
        } catch (e) {
            next(e);
            return;
        }
    }
    next();
});

const enforcePatientMedicinePatientAccess = assertAccessToPatientData('patientId');
router.param('patientId', (req, res, next) => {
    enforcePatientMedicinePatientAccess(req, res, next);
});

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

// Update dosage, frequency, duration, or other fields
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
