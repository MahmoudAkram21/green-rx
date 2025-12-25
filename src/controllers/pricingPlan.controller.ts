import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

// Get all pricing plans
export const getPricingPlans = async (req: Request, res: Response) => {
    try {
        const { activeOnly = 'true' } = req.query;

        const where: any = {};
        if (activeOnly === 'true') {
            where.isActive = true;
        }

        const plans = await prisma.pricingPlan.findMany({
            where,
            orderBy: [
                { isDefault: 'desc' }, // Default plan first
                { price: 'asc' } // Then by price
            ]
        });

        return res.json(plans);
    } catch (error) {
        console.error('Error fetching pricing plans:', error);
        return res.status(500).json({ message: 'Error fetching pricing plans', error });
    }
};

// Get pricing plan by ID
export const getPricingPlanById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const plan = await prisma.pricingPlan.findUnique({
            where: { id: parseInt(id) },
            include: {
                subscriptions: {
                    where: {
                        status: 'Active'
                    },
                    select: {
                        id: true,
                        userId: true
                    }
                }
            }
        });

        if (!plan) {
            return res.status(404).json({ message: 'Pricing plan not found' });
        }

        return res.json(plan);
    } catch (error) {
        console.error('Error fetching pricing plan:', error);
        return res.status(500).json({ message: 'Error fetching pricing plan', error });
    }
};

// Create pricing plan (Admin only)
export const createPricingPlan = async (req: Request, res: Response) => {
    try {
        const { title, price, salePrice, duration, features, isDefault } = req.body;

        // Validate required fields
        if (!title || price === undefined || !duration) {
            return res.status(400).json({
                message: 'Title, price, and duration are required'
            });
        }

        // If this is set as default, unset other defaults
        if (isDefault) {
            await prisma.pricingPlan.updateMany({
                where: { isDefault: true },
                data: { isDefault: false }
            });
        }

        const plan = await prisma.pricingPlan.create({
            data: {
                title,
                price,
                salePrice,
                duration,
                features: features || [],
                isDefault: isDefault || false
            }
        });

        return res.status(201).json({
            message: 'Pricing plan created successfully',
            plan
        });
    } catch (error) {
        console.error('Error creating pricing plan:', error);
        return res.status(500).json({ message: 'Error creating pricing plan', error });
    }
};

// Update pricing plan (Admin only)
export const updatePricingPlan = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, price, salePrice, duration, features, isDefault, isActive } = req.body;

        const existingPlan = await prisma.pricingPlan.findUnique({
            where: { id: parseInt(id) }
        });

        if (!existingPlan) {
            return res.status(404).json({ message: 'Pricing plan not found' });
        }

        // If this is set as default, unset other defaults
        if (isDefault && !existingPlan.isDefault) {
            await prisma.pricingPlan.updateMany({
                where: { isDefault: true },
                data: { isDefault: false }
            });
        }

        const plan = await prisma.pricingPlan.update({
            where: { id: parseInt(id) },
            data: {
                title,
                price,
                salePrice,
                duration,
                features,
                isDefault,
                isActive
            }
        });

        return res.json({
            message: 'Pricing plan updated successfully',
            plan
        });
    } catch (error) {
        console.error('Error updating pricing plan:', error);
        return res.status(500).json({ message: 'Error updating pricing plan', error });
    }
};

// Delete pricing plan (Admin only)
export const deletePricingPlan = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const plan = await prisma.pricingPlan.findUnique({
            where: { id: parseInt(id) },
            include: {
                subscriptions: true
            }
        });

        if (!plan) {
            return res.status(404).json({ message: 'Pricing plan not found' });
        }

        // Check if plan has active subscriptions
        const activeSubscriptions = plan.subscriptions.filter(s => s.status === 'Active');
        if (activeSubscriptions.length > 0) {
            return res.status(400).json({
                message: 'Cannot delete plan with active subscriptions',
                activeCount: activeSubscriptions.length
            });
        }

        // Don't delete, just deactivate
        await prisma.pricingPlan.update({
            where: { id: parseInt(id) },
            data: { isActive: false }
        });

        return res.json({ message: 'Pricing plan deactivated successfully' });
    } catch (error) {
        console.error('Error deleting pricing plan:', error);
        return res.status(500).json({ message: 'Error deleting pricing plan', error });
    }
};

// Get default pricing plan
export const getDefaultPricingPlan = async (_req: Request, res: Response) => {
    try {
        const defaultPlan = await prisma.pricingPlan.findFirst({
            where: {
                isDefault: true,
                isActive: true
            }
        });

        if (!defaultPlan) {
            return res.status(404).json({ message: 'No default pricing plan found' });
        }

        return res.json(defaultPlan);
    } catch (error) {
        console.error('Error fetching default pricing plan:', error);
        return res.status(500).json({ message: 'Error fetching default plan', error });
    }
};
