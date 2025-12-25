import express from 'express';
import medicalReportController from '../controllers/medicalReport.controller';
import { upload } from '../config/multer.config';

const router = express.Router();

// Create medical report
router.post('/', medicalReportController.createReport);

// Get all reports for a patient
router.get('/patient/:patientId', medicalReportController.getPatientReports);

// Get single report
router.get('/:id', medicalReportController.getReport);

// Update medical report
router.patch('/:id', medicalReportController.updateReport);

// Delete medical report
router.delete('/:id', medicalReportController.deleteReport);

// Upload report file
router.post('/:id/upload', upload.single('file'), medicalReportController.uploadReportFile);

export default router;
