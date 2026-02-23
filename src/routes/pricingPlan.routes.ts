import express from 'express';
import {
    getPricingPlans,
    getPricingPlanById,
    createPricingPlan,
    updatePricingPlan,
    deletePricingPlan,
    getDefaultPricingPlan
} from '../controllers/pricingPlan.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../../generated/client/client';

const router = express.Router();

// Public routes (no auth required for viewing plans)
router.get('/', getPricingPlans);
router.get('/default', getDefaultPricingPlan);
router.get('/:id', getPricingPlanById);

// Admin-only routes
router.post('/', authenticate, authorize([UserRole.Admin, UserRole.SuperAdmin]), createPricingPlan);
router.put('/:id', authenticate, authorize([UserRole.Admin, UserRole.SuperAdmin]), updatePricingPlan);
router.delete('/:id', authenticate, authorize([UserRole.Admin, UserRole.SuperAdmin]), deletePricingPlan);

export default router;
