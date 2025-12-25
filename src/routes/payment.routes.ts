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
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Payment routes
router.post('/', createPayment);
router.get('/:id', getPaymentById);
router.get('/subscription/:subscriptionId', getPaymentsBySubscription);
router.get('/', getAllPayments); // Admin only - TODO: Add admin check
router.put('/:id/status', updatePaymentStatus); // Admin only - TODO: Add admin check
router.post('/:id/process', processPayment);
router.post('/:id/refund', refundPayment); // Admin only - TODO: Add admin check

export default router;
