import express from 'express';
import drugInteractionAlertController from '../controllers/drugInteractionAlert.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { assertAccessToPatientData } from '../middleware/patientResourceAccess.middleware';
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

const enforceDrugAlertPatientAccess = assertAccessToPatientData('patientId');
router.param('patientId', (req, res, next) => {
    enforceDrugAlertPatientAccess(req, res, next);
});

router.post('/check-by-trade-name', authorize([UserRole.Doctor, UserRole.Patient]), drugInteractionAlertController.checkByTradeName);
router.post('/check', drugInteractionAlertController.checkDrugSafety);
router.get('/prescription/:prescriptionId', drugInteractionAlertController.getAlertsByPrescription);
router.get(
    '/patient/:patientId',
    authorize([UserRole.Patient, UserRole.Doctor, UserRole.Admin, UserRole.SuperAdmin]),
    drugInteractionAlertController.getPatientAlerts,
);
router.patch('/:id/acknowledge-doctor', drugInteractionAlertController.acknowledgeByDoctor);
router.patch('/:id/acknowledge-patient', drugInteractionAlertController.acknowledgeByPatient);

export default router;
