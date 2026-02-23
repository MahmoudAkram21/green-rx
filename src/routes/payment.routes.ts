import express from 'express';
import {
    createPayment,
    getPaymentById,
    getPaymentsBySubscription,
    getAllPayments,
    updatePaymentStatus,
    processPayment,
    refundPayment
} from '../controllers/payment.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../../generated/client/client';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

router.post('/', createPayment);
router.get('/:id', getPaymentById);
router.get('/subscription/:subscriptionId', getPaymentsBySubscription);
router.get('/', authorize([UserRole.Admin, UserRole.SuperAdmin]), getAllPayments);
router.put('/:id/status', authorize([UserRole.Admin, UserRole.SuperAdmin]), updatePaymentStatus);
router.post('/:id/process', processPayment);
router.post('/:id/refund', authorize([UserRole.Admin, UserRole.SuperAdmin]), refundPayment);

export default router;
