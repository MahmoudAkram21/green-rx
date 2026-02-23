import express from 'express';
import importController from '../controllers/import.controller';
import { upload } from '../config/multer.config';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../../generated/client/client';

const router = express.Router();

router.use(authenticate);
router.use(authorize([UserRole.Admin, UserRole.SuperAdmin]));

router.post('/active-substances', upload.single('file'), importController.importActiveSubstances.bind(importController));
router.post('/:entityType', upload.single('file'), importController.importEntity.bind(importController));
router.get('/history', importController.getImportHistory.bind(importController));

export default router;
