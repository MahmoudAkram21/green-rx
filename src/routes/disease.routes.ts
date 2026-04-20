import express from 'express';
import {
    createDisease,
    getDiseaseById,
    getAllDiseases,
    updateDisease,
    deleteDisease,
    createDiseaseWarning,
    getDiseaseWarnings,
    getBodySystemMappings,
    addBodySystemMapping,
    setBodySystemMappings,
    removeBodySystemMapping,
    getBodySystemFieldOptions,
} from '../controllers/disease.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../../generated/client/client';

const router = express.Router();

router.use(authenticate);

// Disease CRUD
router.post('/', authorize([UserRole.Admin, UserRole.SuperAdmin]), createDisease);
router.get('/', getAllDiseases);
router.get('/body-system-field-options', authorize([UserRole.Admin, UserRole.SuperAdmin]), getBodySystemFieldOptions);
router.get('/:id', getDiseaseById);
router.put('/:id', authorize([UserRole.Admin, UserRole.SuperAdmin]), updateDisease);
router.delete('/:id', authorize([UserRole.Admin, UserRole.SuperAdmin]), deleteDisease);

// Disease Warnings (disease-drug warning mappings)
router.post('/warnings', authorize([UserRole.Admin, UserRole.SuperAdmin]), createDiseaseWarning);
router.get('/:diseaseId/warnings', getDiseaseWarnings);

// Body System Mappings (engine configuration per disease)
router.get('/:diseaseId/body-system-mappings', getBodySystemMappings);
router.post('/body-system-mappings', authorize([UserRole.Admin, UserRole.SuperAdmin]), addBodySystemMapping);
router.put('/body-system-mappings/bulk', authorize([UserRole.Admin, UserRole.SuperAdmin]), setBodySystemMappings);
router.delete('/body-system-mappings/:id', authorize([UserRole.Admin, UserRole.SuperAdmin]), removeBodySystemMapping);

export default router;
