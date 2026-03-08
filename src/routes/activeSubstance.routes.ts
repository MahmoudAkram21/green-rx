import express from 'express';
import {
    createActiveSubstance,
    getActiveSubstanceById,
    listClassifications,
    listDosageForms,
    searchActiveSubstances,
    updateActiveSubstance,
    deleteActiveSubstance,
    getDrugInteractions
} from '../controllers/activeSubstance.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../../generated/client/client';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Active Substance CRUD (static paths before /:id)
router.post('/', authorize([UserRole.Admin, UserRole.SuperAdmin, UserRole.Company]), createActiveSubstance);
router.get('/search', searchActiveSubstances);
router.get('/classifications', listClassifications);
router.get('/dosage-forms', listDosageForms);
router.get('/:id', getActiveSubstanceById);
router.put('/:id', authorize([UserRole.Admin, UserRole.SuperAdmin, UserRole.Company]), updateActiveSubstance);
router.delete('/:id', authorize([UserRole.Admin, UserRole.SuperAdmin]), deleteActiveSubstance);

// Drug Interactions
router.get('/:id/interactions', getDrugInteractions);

export default router;
