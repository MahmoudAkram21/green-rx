"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renewSubscription = exports.cancelSubscription = exports.updateSubscription = exports.getAllSubscriptions = exports.getSubscriptionByUserId = exports.createSubscription = void 0;
const prisma_1 = require("../lib/prisma");
const client_1 = require("../generated/client");
// Create subscription for a user
const createSubscription = async (req, res) => {
    try {
        const { userId, pricingPlanId, autoRenew = true } = req.body;
        // Validate required fields
        if (!userId || !pricingPlanId) {
            return res.status(400).json({
                message: 'User ID and Pricing Plan ID are required'
            });
        }
        // Check if user exists
        const user = await prisma_1.prisma.user.findUnique({
            where: { id: userId }
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Check if pricing plan exists
        const plan = await prisma_1.prisma.pricingPlan.findUnique({
            where: { id: pricingPlanId }
        });
        if (!plan) {
            return res.status(404).json({ message: 'Pricing plan not found' });
        }
        // Check if user already has an active subscription
        const existingSubscription = await prisma_1.prisma.subscription.findUnique({
            where: { userId }
        });
        if (existingSubscription && existingSubscription.status === 'Active') {
            return res.status(400).json({
                message: 'User already has an active subscription',
                subscription: existingSubscription
            });
        }
        // Calculate dates
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + plan.duration);
        // Create or update subscription
        let subscription;
        if (existingSubscription) {
            subscription = await prisma_1.prisma.subscription.update({
                where: { userId },
                data: {
                    pricingPlanId,
                    status: client_1.SubscriptionStatus.Active,
                    startDate,
                    endDate,
                    autoRenew,
                    cancelledAt: null
                },
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
            });
        }
        else {
            subscription = await prisma_1.prisma.subscription.create({
                data: {
                    userId,
                    pricingPlanId,
                    status: client_1.SubscriptionStatus.Active,
                    startDate,
                    endDate,
                    autoRenew
                },
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
            });
        }
        return res.status(201).json({
            message: 'Subscription created successfully',
            subscription
        });
    }
    catch (error) {
        console.error('Error creating subscription:', error);
        return res.status(500).json({ message: 'Error creating subscription', error });
    }
};
exports.createSubscription = createSubscription;
// Get subscription by user ID
const getSubscriptionByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const subscription = await prisma_1.prisma.subscription.findUnique({
            where: { userId: parseInt(userId) },
            include: {
                pricingPlan: true,
                payments: {
                    orderBy: {
                        createdAt: 'desc'
                    },
                    take: 10
                }
            }
        });
        if (!subscription) {
            return res.status(404).json({ message: 'No subscription found for this user' });
        }
        // Check if subscription is expired
        const now = new Date();
        if (subscription.endDate < now && subscription.status === 'Active') {
            // Update to expired
            const updatedSubscription = await prisma_1.prisma.subscription.update({
                where: { userId: parseInt(userId) },
                data: { status: client_1.SubscriptionStatus.Expired },
                include: {
                    pricingPlan: true,
                    payments: {
                        orderBy: {
                            createdAt: 'desc'
                        },
                        take: 10
                    }
                }
            });
            return res.json(updatedSubscription);
        }
        return res.json(subscription);
    }
    catch (error) {
        console.error('Error fetching subscription:', error);
        return res.status(500).json({ message: 'Error fetching subscription', error });
    }
};
exports.getSubscriptionByUserId = getSubscriptionByUserId;
// Get all subscriptions (Admin only)
const getAllSubscriptions = async (req, res) => {
    try {
        const { status, page = 1, limit = 20 } = req.query;
        const where = {};
        if (status) {
            where.status = status;
        }
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const [subscriptions, total] = await Promise.all([
            prisma_1.prisma.subscription.findMany({
                where,
                skip,
                take: parseInt(limit),
                include: {
                    user: {
                        select: {
                            id: true,
                            email: true,
                            role: true
                        }
                    },
                    pricingPlan: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            }),
            prisma_1.prisma.subscription.count({ where })
        ]);
        return res.json({
            subscriptions,
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / parseInt(limit))
            }
        });
    }
    catch (error) {
        console.error('Error fetching subscriptions:', error);
        return res.status(500).json({ message: 'Error fetching subscriptions', error });
    }
};
exports.getAllSubscriptions = getAllSubscriptions;
// Update subscription
const updateSubscription = async (req, res) => {
    try {
        const { userId } = req.params;
        const { pricingPlanId, autoRenew, status } = req.body;
        const existingSubscription = await prisma_1.prisma.subscription.findUnique({
            where: { userId: parseInt(userId) }
        });
        if (!existingSubscription) {
            return res.status(404).json({ message: 'Subscription not found' });
        }
        const updateData = {};
        if (autoRenew !== undefined)
            updateData.autoRenew = autoRenew;
        if (status)
            updateData.status = status;
        // If changing plan, recalculate end date
        if (pricingPlanId && pricingPlanId !== existingSubscription.pricingPlanId) {
            const newPlan = await prisma_1.prisma.pricingPlan.findUnique({
                where: { id: pricingPlanId }
            });
            if (!newPlan) {
                return res.status(404).json({ message: 'Pricing plan not found' });
            }
            updateData.pricingPlanId = pricingPlanId;
            updateData.startDate = new Date();
            const endDate = new Date();
            endDate.setDate(endDate.getDate() + newPlan.duration);
            updateData.endDate = endDate;
        }
        const subscription = await prisma_1.prisma.subscription.update({
            where: { userId: parseInt(userId) },
            data: updateData,
            include: {
                pricingPlan: true,
                user: {
                    select: {
                        id: true,
                        email: true
                    }
                }
            }
        });
        return res.json({
            message: 'Subscription updated successfully',
            subscription
        });
    }
    catch (error) {
        console.error('Error updating subscription:', error);
        return res.status(500).json({ message: 'Error updating subscription', error });
    }
};
exports.updateSubscription = updateSubscription;
// Cancel subscription
const cancelSubscription = async (req, res) => {
    try {
        const { userId } = req.params;
        const subscription = await prisma_1.prisma.subscription.findUnique({
            where: { userId: parseInt(userId) }
        });
        if (!subscription) {
            return res.status(404).json({ message: 'Subscription not found' });
        }
        if (subscription.status === 'Cancelled') {
            return res.status(400).json({ message: 'Subscription is already cancelled' });
        }
        const updatedSubscription = await prisma_1.prisma.subscription.update({
            where: { userId: parseInt(userId) },
            data: {
                status: client_1.SubscriptionStatus.Cancelled,
                cancelledAt: new Date(),
                autoRenew: false
            },
            include: {
                pricingPlan: true
            }
        });
        return res.json({
            message: 'Subscription cancelled successfully',
            subscription: updatedSubscription
        });
    }
    catch (error) {
        console.error('Error cancelling subscription:', error);
        return res.status(500).json({ message: 'Error cancelling subscription', error });
    }
};
exports.cancelSubscription = cancelSubscription;
// Renew subscription
const renewSubscription = async (req, res) => {
    try {
        const { userId } = req.params;
        const subscription = await prisma_1.prisma.subscription.findUnique({
            where: { userId: parseInt(userId) },
            include: {
                pricingPlan: true
            }
        });
        if (!subscription) {
            return res.status(404).json({ message: 'Subscription not found' });
        }
        // Calculate new end date
        const newStartDate = subscription.endDate > new Date() ? subscription.endDate : new Date();
        const newEndDate = new Date(newStartDate);
        newEndDate.setDate(newEndDate.getDate() + subscription.pricingPlan.duration);
        const renewedSubscription = await prisma_1.prisma.subscription.update({
            where: { userId: parseInt(userId) },
            data: {
                status: client_1.SubscriptionStatus.Active,
                startDate: newStartDate,
                endDate: newEndDate,
                cancelledAt: null
            },
            include: {
                pricingPlan: true
            }
        });
        return res.json({
            message: 'Subscription renewed successfully',
            subscription: renewedSubscription
        });
    }
    catch (error) {
        console.error('Error renewing subscription:', error);
        return res.status(500).json({ message: 'Error renewing subscription', error });
    }
};
exports.renewSubscription = renewSubscription;
//# sourceMappingURL=subscription.controller.js.map