"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refundPayment = exports.processPayment = exports.updatePaymentStatus = exports.getAllPayments = exports.getPaymentsBySubscription = exports.getPaymentById = exports.createPayment = void 0;
const prisma_1 = require("../lib/prisma");
const client_1 = require("../../generated/client/client");
// Create payment
const createPayment = async (req, res) => {
    try {
        const { subscriptionId, amount, currency = 'USD', paymentMethod, transactionId } = req.body;
        // Validate required fields
        if (!subscriptionId || !amount) {
            return res.status(400).json({
                message: 'Subscription ID and amount are required'
            });
        }
        // Check if subscription exists
        const subscription = await prisma_1.prisma.subscription.findUnique({
            where: { id: subscriptionId },
            include: {
                pricingPlan: true
            }
        });
        if (!subscription) {
            return res.status(404).json({ message: 'Subscription not found' });
        }
        const payment = await prisma_1.prisma.payment.create({
            data: {
                subscriptionId,
                amount,
                currency,
                paymentMethod,
                transactionId,
                status: client_1.PaymentStatus.Pending
            },
            include: {
                subscription: {
                    include: {
                        pricingPlan: true,
                        user: {
                            select: {
                                id: true,
                                email: true
                            }
                        }
                    }
                }
            }
        });
        return res.status(201).json({
            message: 'Payment created successfully',
            payment
        });
    }
    catch (error) {
        console.error('Error creating payment:', error);
        return res.status(500).json({ message: 'Error creating payment', error });
    }
};
exports.createPayment = createPayment;
// Get payment by ID
const getPaymentById = async (req, res) => {
    try {
        const { id } = req.params;
        const payment = await prisma_1.prisma.payment.findUnique({
            where: { id: parseInt(id) },
            include: {
                subscription: {
                    include: {
                        pricingPlan: true,
                        user: {
                            select: {
                                id: true,
                                email: true,
                                role: true
                            }
                        }
                    }
                }
            }
        });
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        return res.json(payment);
    }
    catch (error) {
        console.error('Error fetching payment:', error);
        return res.status(500).json({ message: 'Error fetching payment', error });
    }
};
exports.getPaymentById = getPaymentById;
// Get payments by subscription
const getPaymentsBySubscription = async (req, res) => {
    try {
        const { subscriptionId } = req.params;
        const payments = await prisma_1.prisma.payment.findMany({
            where: { subscriptionId: parseInt(subscriptionId) },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return res.json(payments);
    }
    catch (error) {
        console.error('Error fetching payments:', error);
        return res.status(500).json({ message: 'Error fetching payments', error });
    }
};
exports.getPaymentsBySubscription = getPaymentsBySubscription;
// Get all payments (Admin only)
const getAllPayments = async (req, res) => {
    try {
        const { status, page = 1, limit = 20 } = req.query;
        const where = {};
        if (status) {
            where.status = status;
        }
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const [payments, total] = await Promise.all([
            prisma_1.prisma.payment.findMany({
                where,
                skip,
                take: parseInt(limit),
                include: {
                    subscription: {
                        include: {
                            user: {
                                select: {
                                    id: true,
                                    email: true
                                }
                            },
                            pricingPlan: {
                                select: {
                                    id: true,
                                    title: true
                                }
                            }
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            }),
            prisma_1.prisma.payment.count({ where })
        ]);
        return res.json({
            payments,
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / parseInt(limit))
            }
        });
    }
    catch (error) {
        console.error('Error fetching payments:', error);
        return res.status(500).json({ message: 'Error fetching payments', error });
    }
};
exports.getAllPayments = getAllPayments;
// Update payment status
const updatePaymentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, transactionId } = req.body;
        const existingPayment = await prisma_1.prisma.payment.findUnique({
            where: { id: parseInt(id) }
        });
        if (!existingPayment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        const updateData = { status: status };
        if (transactionId) {
            updateData.transactionId = transactionId;
        }
        if (status === client_1.PaymentStatus.Completed) {
            updateData.paidAt = new Date();
        }
        const payment = await prisma_1.prisma.payment.update({
            where: { id: parseInt(id) },
            data: updateData,
            include: {
                subscription: {
                    include: {
                        pricingPlan: true
                    }
                }
            }
        });
        return res.json({
            message: 'Payment status updated successfully',
            payment
        });
    }
    catch (error) {
        console.error('Error updating payment status:', error);
        return res.status(500).json({ message: 'Error updating payment status', error });
    }
};
exports.updatePaymentStatus = updatePaymentStatus;
// Process payment (simulate payment gateway integration)
const processPayment = async (req, res) => {
    try {
        const { id } = req.params;
        const { gatewayResponse } = req.body; // Simulated gateway response
        const payment = await prisma_1.prisma.payment.findUnique({
            where: { id: parseInt(id) },
            include: {
                subscription: true
            }
        });
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        if (payment.status !== client_1.PaymentStatus.Pending) {
            return res.status(400).json({
                message: 'Payment has already been processed',
                currentStatus: payment.status
            });
        }
        // In production, this would integrate with actual payment gateway
        // For now, simulate success/failure
        const isSuccess = gatewayResponse?.success !== false;
        const updatedPayment = await prisma_1.prisma.payment.update({
            where: { id: parseInt(id) },
            data: {
                status: isSuccess ? client_1.PaymentStatus.Completed : client_1.PaymentStatus.Failed,
                paidAt: isSuccess ? new Date() : null,
                transactionId: gatewayResponse?.transactionId || payment.transactionId
            },
            include: {
                subscription: {
                    include: {
                        pricingPlan: true,
                        user: {
                            select: {
                                id: true,
                                email: true
                            }
                        }
                    }
                }
            }
        });
        // If payment successful, ensure subscription is active
        if (isSuccess) {
            await prisma_1.prisma.subscription.update({
                where: { id: payment.subscriptionId },
                data: {
                    status: 'Active'
                }
            });
        }
        return res.json({
            message: isSuccess ? 'Payment processed successfully' : 'Payment failed',
            payment: updatedPayment
        });
    }
    catch (error) {
        console.error('Error processing payment:', error);
        return res.status(500).json({ message: 'Error processing payment', error });
    }
};
exports.processPayment = processPayment;
// Refund payment
const refundPayment = async (req, res) => {
    try {
        const { id } = req.params;
        const { reason } = req.body;
        const payment = await prisma_1.prisma.payment.findUnique({
            where: { id: parseInt(id) }
        });
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        if (payment.status !== client_1.PaymentStatus.Completed) {
            return res.status(400).json({
                message: 'Only completed payments can be refunded',
                currentStatus: payment.status
            });
        }
        const refundedPayment = await prisma_1.prisma.payment.update({
            where: { id: parseInt(id) },
            data: {
                status: client_1.PaymentStatus.Refunded
            },
            include: {
                subscription: true
            }
        });
        // In production, this would trigger actual refund with payment gateway
        return res.json({
            message: 'Payment refunded successfully',
            payment: refundedPayment,
            refundReason: reason
        });
    }
    catch (error) {
        console.error('Error refunding payment:', error);
        return res.status(500).json({ message: 'Error refunding payment', error });
    }
};
exports.refundPayment = refundPayment;
//# sourceMappingURL=payment.controller.js.map