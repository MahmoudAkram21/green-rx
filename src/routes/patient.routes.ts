import express from 'express';
import {
    createOrUpdatePatient,
    getAllPatients,
    getPatientById,
    getPatientByUserId,
    getMyFullDetails,
    addMedicalHistory,
    getMedicalHistories,
    addFamilyHistory,
    getFamilyHistories,
    getPatientLifestyles,
    addOrUpdatePatientLifestyles,
    deletePatientLifestyle,
    addAllergy,
    addAllergiesBatch,
    deleteAllergy,
    addChildProfile,
    getChildProfiles,
    deleteChildProfile,
    getPatientWarnings
} from '../controllers/patient.controller';
import {
    getSurgicalHistories,
    addSurgicalHistory,
    deleteSurgicalHistory,
    updateSurgicalHistory
} from '../controllers/surgicalHistory.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { assertAccessToPatientData } from '../middleware/patientResourceAccess.middleware';
import { UserRole } from '../../generated/client/client';
import { prisma } from '../lib/prisma';

const router = express.Router();

// All patient routes require authentication
router.use(authenticate);

// Resolve "me" or the current user's userId (when role is Patient) to the actual patient id
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

const enforcePatientResourceAccess = assertAccessToPatientData('patientId');
router.param('patientId', (req, res, next) => {
    enforcePatientResourceAccess(req, res, next);
});

// Patient Profile
router.get('/', authorize([UserRole.Admin, UserRole.SuperAdmin]), getAllPatients);
router.post('/', authorize([UserRole.Patient, UserRole.Admin, UserRole.SuperAdmin]), createOrUpdatePatient);
router.get('/me/full', authorize([UserRole.Patient]), getMyFullDetails);
router.get('/:id', getPatientById);
router.get('/user/:userId', getPatientByUserId);

// Medical History
router.post('/:patientId/medical-history', authorize([UserRole.Patient, UserRole.Doctor, UserRole.Admin, UserRole.SuperAdmin]), addMedicalHistory);
router.get('/:patientId/medical-history', getMedicalHistories);

// Family History
router.get('/:patientId/family-history', getFamilyHistories);
router.post('/:patientId/family-history', authorize([UserRole.Patient, UserRole.Doctor, UserRole.Admin, UserRole.SuperAdmin]), addFamilyHistory);

// Surgical History
router.get('/:patientId/surgeries', getSurgicalHistories);
router.post('/:patientId/surgeries', authorize([UserRole.Patient, UserRole.Doctor, UserRole.Admin, UserRole.SuperAdmin]), addSurgicalHistory);
router.put('/:patientId/surgeries/:id', authorize([UserRole.Patient, UserRole.Doctor, UserRole.Admin, UserRole.SuperAdmin]), updateSurgicalHistory);
router.delete('/surgeries/:id', authorize([UserRole.Patient, UserRole.Doctor, UserRole.Admin, UserRole.SuperAdmin]), deleteSurgicalHistory);

// Lifestyle (catalog: GET /lifestyles; patient answers below)
router.get('/:patientId/lifestyle', getPatientLifestyles);
router.post('/:patientId/lifestyle', authorize([UserRole.Patient, UserRole.Doctor, UserRole.Admin, UserRole.SuperAdmin]), addOrUpdatePatientLifestyles);
router.delete('/lifestyle/:patientLifestyleId', authorize([UserRole.Patient, UserRole.Doctor, UserRole.Admin, UserRole.SuperAdmin]), deletePatientLifestyle);

// Allergies
router.post('/:patientId/allergies', authorize([UserRole.Patient, UserRole.Doctor, UserRole.Admin, UserRole.SuperAdmin]), addAllergy);
router.post('/:patientId/allergies/batch', authorize([UserRole.Patient, UserRole.Doctor, UserRole.Admin, UserRole.SuperAdmin]), addAllergiesBatch);
router.delete('/allergies/:allergyId', authorize([UserRole.Patient, UserRole.Doctor, UserRole.Admin, UserRole.SuperAdmin]), deleteAllergy);

// Child Profiles
router.get('/:patientId/children', getChildProfiles);
router.post('/:patientId/children', authorize([UserRole.Patient, UserRole.Admin, UserRole.SuperAdmin]), addChildProfile);
router.delete('/children/:childId', authorize([UserRole.Patient, UserRole.Admin, UserRole.SuperAdmin]), deleteChildProfile);

// All warnings for patient (prescriptions + self-reported medicines)
router.get('/:patientId/warnings', authorize([UserRole.Patient, UserRole.Doctor, UserRole.Admin, UserRole.SuperAdmin]), getPatientWarnings);

export default router;
