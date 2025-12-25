import express from 'express';
import {
    getPricingPlans,
    getPricingPlanById,
    createPricingPlan,
    updatePricingPlan,
    deletePricingPlan,
    getDefaultPricingPlan
} from '../controllers/pricingPlan.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

// Public routes (no auth required for viewing plans)
router.get('/', getPricingPlans);
router.get('/default', getDefaultPricingPlan);
router.get('/:id', getPricingPlanById);

// Admin routes (require authentication and admin role)
router.post('/', authenticate, createPricingPlan); // TODO: Add admin role check
router.put('/:id', authenticate, updatePricingPlan); // TODO: Add admin role check
router.delete('/:id', authenticate, deletePricingPlan); // TODO: Add admin role check

export default router;
