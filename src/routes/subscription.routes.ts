import express from 'express';
import {
    createSubscription,
    getSubscriptionByUserId,
    getAllSubscriptions,
    updateSubscription,
    cancelSubscription,
    renewSubscription
} from '../controllers/subscription.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../../generated/client/client';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

router.post('/', createSubscription);
router.get('/user/:userId', getSubscriptionByUserId);
router.get('/', authorize([UserRole.Admin, UserRole.SuperAdmin]), getAllSubscriptions);
router.put('/:userId', updateSubscription);
router.post('/:userId/cancel', cancelSubscription);
router.post('/:userId/renew', renewSubscription);

export default router;
