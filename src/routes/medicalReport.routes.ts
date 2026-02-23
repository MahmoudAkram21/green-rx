import express from 'express';
import medicalReportController from '../controllers/medicalReport.controller';
import { upload } from '../config/multer.config';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

router.use(authenticate);

router.post('/', medicalReportController.createReport);
router.get('/patient/:patientId', medicalReportController.getPatientReports);
router.get('/:id', medicalReportController.getReport);
router.patch('/:id', medicalReportController.updateReport);
router.delete('/:id', medicalReportController.deleteReport);
router.post('/:id/upload', upload.single('file'), medicalReportController.uploadReportFile);

export default router;
