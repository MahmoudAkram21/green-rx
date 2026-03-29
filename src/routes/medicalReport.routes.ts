import express from 'express';
import medicalReportController from '../controllers/medicalReport.controller';
import { upload } from '../config/multer.config';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../../generated/client/client';

const router = express.Router();

router.use(authenticate);

router.post('/',                    authorize([UserRole.Doctor, UserRole.Patient, UserRole.Admin]),          medicalReportController.createReport);
router.get('/patient/:patientId',   authorize([UserRole.Doctor, UserRole.Patient, UserRole.Admin]),          medicalReportController.getPatientReports);
router.get('/:id',                  authorize([UserRole.Doctor, UserRole.Patient, UserRole.Admin]),          medicalReportController.getReport);
router.patch('/:id',                authorize([UserRole.Doctor, UserRole.Patient, UserRole.Admin]),          medicalReportController.updateReport);
router.delete('/:id',               authorize([UserRole.Doctor, UserRole.Patient, UserRole.Admin]),          medicalReportController.deleteReport);
router.post('/:id/upload',          authorize([UserRole.Doctor, UserRole.Patient, UserRole.Admin]),          upload.single('file'), medicalReportController.uploadReportFile);

export default router;
