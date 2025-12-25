import express from 'express';
import {
    createDisease,
    getDiseaseById,
    getAllDiseases,
    updateDisease,
    deleteDisease,
    createDiseaseWarning,
    getDiseaseWarnings
} from '../controllers/disease.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../generated/client';

const router = express.Router();

router.use(authenticate);

// Disease CRUD
router.post('/', authorize([UserRole.Admin, UserRole.SuperAdmin]), createDisease);
router.get('/', getAllDiseases);
router.get('/:id', getDiseaseById);
router.put('/:id', authorize([UserRole.Admin, UserRole.SuperAdmin]), updateDisease);
router.delete('/:id', authorize([UserRole.Admin, UserRole.SuperAdmin]), deleteDisease);

// Disease Warnings
router.post('/warnings', authorize([UserRole.Admin, UserRole.SuperAdmin]), createDiseaseWarning);
router.get('/:diseaseId/warnings', getDiseaseWarnings);

export default router;
