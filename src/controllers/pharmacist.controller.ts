import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { createPharmacistSchema } from '../zod/pharmacist.zod';

// Create or Update Pharmacist Profile
export const createOrUpdatePharmacist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = createPharmacistSchema.parse(req.body);
        const { userId, ...pharmacistData } = validatedData;

        // Check if pharmacist already exists for this user
        const existingPharmacist = await prisma.pharmacist.findUnique({
            where: { userId }
        });

        if (existingPharmacist) {
            // Update existing pharmacist
            const updated = await prisma.pharmacist.update({
                where: { userId },
                data: pharmacistData,
                include: {
                    user: {
                        select: { email: true, role: true }
                    }
                }
            });

            res.json({
                message: 'Pharmacist profile updated successfully',
                pharmacist: updated
            });
            return;
        }

        // Create new pharmacist
        const pharmacist = await prisma.pharmacist.create({
            data: {
                ...pharmacistData,
                userId
            },
            include: {
                user: {
                    select: { email: true, role: true }
                }
            }
        });

        res.status(201).json({
            message: 'Pharmacist profile created successfully',
            pharmacist
        });
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.issues });
            return;
        }
        next(error);
    }
};

// Get Pharmacist by ID
export const getPharmacistById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const pharmacist = await prisma.pharmacist.findUnique({
            where: { id: parseInt(id) },
            include: {
                user: {
                    select: { email: true, role: true, isActive: true }
                }
            }
        });

        if (!pharmacist) {
            res.status(404).json({ error: 'Pharmacist not found' });
            return;
        }

        res.json(pharmacist);
    } catch (error) {
        next(error);
    }
};

// Get Pharmacist by User ID
export const getPharmacistByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;

        const pharmacist = await prisma.pharmacist.findUnique({
            where: { userId: parseInt(userId) },
            include: {
                user: {
                    select: { email: true, role: true, isActive: true }
                }
            }
        });

        if (!pharmacist) {
            res.status(404).json({ error: 'Pharmacist not found' });
            return;
        }

        res.json(pharmacist);
    } catch (error) {
        next(error);
    }
};

// Get All Pharmacists
export const getAllPharmacists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            search,
            page = '1',
            limit = '20'
        } = req.query;

        const whereClause: any = {};

        if (search) {
            whereClause.OR = [
                { name: { contains: search as string, mode: 'insensitive' } },
                { pharmacyName: { contains: search as string, mode: 'insensitive' } }
            ];
        }

        const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
        const take = parseInt(limit as string);

        const [pharmacists, total] = await Promise.all([
            prisma.pharmacist.findMany({
                where: whereClause,
                include: {
                    user: {
                        select: { email: true, isActive: true }
                    }
                },
                skip,
                take,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.pharmacist.count({ where: whereClause })
        ]);

        res.json({
            pharmacists,
            pagination: {
                total,
                page: parseInt(page as string),
                limit: parseInt(limit as string),
                totalPages: Math.ceil(total / parseInt(limit as string))
            }
        });
    } catch (error) {
        next(error);
    }
};
