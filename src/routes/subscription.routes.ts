import express from 'express';
import {
    createSubscription,
    getSubscriptionByUserId,
    getAllSubscriptions,
    updateSubscription,
    cancelSubscription,
    renewSubscription
} from '../controllers/subscription.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Subscription routes
router.post('/', createSubscription);
router.get('/user/:userId', getSubscriptionByUserId);
router.get('/', getAllSubscriptions); // Admin only - TODO: Add admin check
router.put('/:userId', updateSubscription);
router.post('/:userId/cancel', cancelSubscription);
router.post('/:userId/renew', renewSubscription);

export default router;
