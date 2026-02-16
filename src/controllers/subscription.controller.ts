import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { SubscriptionStatus } from '../../generated/client/client';

// Create subscription for a user
export const createSubscription = async (req: Request, res: Response) => {
    try {
        const { userId, pricingPlanId, autoRenew = true } = req.body;

        // Validate required fields
        if (!userId || !pricingPlanId) {
            return res.status(400).json({
                message: 'User ID and Pricing Plan ID are required'
            });
        }

        // Check if user exists
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if pricing plan exists
        const plan = await prisma.pricingPlan.findUnique({
            where: { id: pricingPlanId }
        });

        if (!plan) {
            return res.status(404).json({ message: 'Pricing plan not found' });
        }

        // Check if user already has an active subscription
        const existingSubscription = await prisma.subscription.findUnique({
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
            subscription = await prisma.subscription.update({
                where: { userId },
                data: {
                    pricingPlanId,
                    status: SubscriptionStatus.Active,
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
        } else {
            subscription = await prisma.subscription.create({
                data: {
                    userId,
                    pricingPlanId,
                    status: SubscriptionStatus.Active,
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
    } catch (error) {
        console.error('Error creating subscription:', error);
        return res.status(500).json({ message: 'Error creating subscription', error });
    }
};

// Get subscription by user ID
export const getSubscriptionByUserId = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const subscription = await prisma.subscription.findUnique({
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
            const updatedSubscription = await prisma.subscription.update({
                where: { userId: parseInt(userId) },
                data: { status: SubscriptionStatus.Expired },
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
    } catch (error) {
        console.error('Error fetching subscription:', error);
        return res.status(500).json({ message: 'Error fetching subscription', error });
    }
};

// Get all subscriptions (Admin only)
export const getAllSubscriptions = async (req: Request, res: Response) => {
    try {
        const { status, page = 1, limit = 20 } = req.query;

        const where: any = {};
        if (status) {
            where.status = status as SubscriptionStatus;
        }

        const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

        const [subscriptions, total] = await Promise.all([
            prisma.subscription.findMany({
                where,
                skip,
                take: parseInt(limit as string),
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
            prisma.subscription.count({ where })
        ]);

        return res.json({
            subscriptions,
            pagination: {
                total,
                page: parseInt(page as string),
                limit: parseInt(limit as string),
                totalPages: Math.ceil(total / parseInt(limit as string))
            }
        });
    } catch (error) {
        console.error('Error fetching subscriptions:', error);
        return res.status(500).json({ message: 'Error fetching subscriptions', error });
    }
};

// Update subscription
export const updateSubscription = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const { pricingPlanId, autoRenew, status } = req.body;

        const existingSubscription = await prisma.subscription.findUnique({
            where: { userId: parseInt(userId) }
        });

        if (!existingSubscription) {
            return res.status(404).json({ message: 'Subscription not found' });
        }

        const updateData: any = {};
        if (autoRenew !== undefined) updateData.autoRenew = autoRenew;
        if (status) updateData.status = status as SubscriptionStatus;

        // If changing plan, recalculate end date
        if (pricingPlanId && pricingPlanId !== existingSubscription.pricingPlanId) {
            const newPlan = await prisma.pricingPlan.findUnique({
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

        const subscription = await prisma.subscription.update({
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
    } catch (error) {
        console.error('Error updating subscription:', error);
        return res.status(500).json({ message: 'Error updating subscription', error });
    }
};

// Cancel subscription
export const cancelSubscription = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const subscription = await prisma.subscription.findUnique({
            where: { userId: parseInt(userId) }
        });

        if (!subscription) {
            return res.status(404).json({ message: 'Subscription not found' });
        }

        if (subscription.status === 'Cancelled') {
            return res.status(400).json({ message: 'Subscription is already cancelled' });
        }

        const updatedSubscription = await prisma.subscription.update({
            where: { userId: parseInt(userId) },
            data: {
                status: SubscriptionStatus.Cancelled,
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
    } catch (error) {
        console.error('Error cancelling subscription:', error);
        return res.status(500).json({ message: 'Error cancelling subscription', error });
    }
};

// Renew subscription
export const renewSubscription = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const subscription = await prisma.subscription.findUnique({
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

        const renewedSubscription = await prisma.subscription.update({
            where: { userId: parseInt(userId) },
            data: {
                status: SubscriptionStatus.Active,
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
    } catch (error) {
        console.error('Error renewing subscription:', error);
        return res.status(500).json({ message: 'Error renewing subscription', error });
    }
};
