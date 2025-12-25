import express from 'express';
import importController from '../controllers/import.controller';
import { upload } from '../config/multer.config';

const router = express.Router();

// Import Active Substances from Excel/CSV
router.post(
    '/active-substances',
    upload.single('file'),
    importController.importActiveSubstances.bind(importController)
);

// Generic entity import
router.post(
    '/:entityType',
    upload.single('file'),
    importController.importEntity.bind(importController)
);

// Get import history
router.get(
    '/history',
    importController.getImportHistory.bind(importController)
);

export default router;
