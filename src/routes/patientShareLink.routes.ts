import express from 'express';
import patientShareLinkController from '../controllers/patientShareLink.controller';

const router = express.Router();

// Generate a share link
router.post('/patient/:patientId', patientShareLinkController.generateShareLink);

// Access shared data (public endpoint)
router.get('/shared/:token', patientShareLinkController.getSharedData);

// Get all share links for a patient
router.get('/patient/:patientId', patientShareLinkController.getPatientShareLinks);

// Revoke a share link
router.patch('/:id/revoke', patientShareLinkController.revokeShareLink);

// Update share link settings
router.patch('/:id', patientShareLinkController.updateShareLink);

// Delete a share link
router.delete('/:id', patientShareLinkController.deleteShareLink);

export default router;
