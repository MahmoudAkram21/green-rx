import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { z } from 'zod';

const ratingSchema = z.object({
    patientId: z.number(),
    ratedType: z.enum(['Doctor', 'Pharmacist']),
    doctorId: z.number().optional(),
    pharmacistId: z.number().optional(),
    rating: z.number().min(1).max(5),
    review: z.string().optional()
});

class RatingController {
    // Create a rating
    async createRating(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = ratingSchema.parse(req.body);

            // Validate that doctorId or pharmacistId is provided based on ratedType
            if (data.ratedType === 'Doctor' && !data.doctorId) {
                return res.status(400).json({ error: 'doctorId is required for Doctor ratings' }) as any;
            }
            if (data.ratedType === 'Pharmacist' && !data.pharmacistId) {
                return res.status(400).json({ error: 'pharmacistId is required for Pharmacist ratings' }) as any;
            }

            // Check if user already rated this entity
            const where: any = { patientId: data.patientId };
            if (data.doctorId) where.doctorId = data.doctorId;
            if (data.pharmacistId) where.pharmacistId = data.pharmacistId;

            const existingRating = await prisma.rating.findFirst({ where });

            if (existingRating) {
                // Update existing rating
                const updatedRating = await prisma.rating.update({
                    where: { id: existingRating.id },
                    data: {
                        rating: data.rating,
                        review: data.review
                    }
                });
                return res.json(updatedRating) as any;
            }

            // Create new rating
            const rating = await prisma.rating.create({
                data: {
                    patientId: data.patientId,
                    doctorId: data.doctorId || null,
                    pharmacistId: data.pharmacistId || null,
                    ratedType: data.ratedType,
                    rating: data.rating,
                    review: data.review || null
                },
                include: {
                    patient: {
                        select: {
                            name: true,
                            user: { select: { email: true } }
                        }
                    }
                }
            });

            res.status(201).json(rating);
        } catch (error) {
            next(error);
        }
    }

    // Get ratings for a doctor
    async getDoctorRatings(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { doctorId } = req.params;
            const { page = '1', limit = '20' } = req.query;

            const where = { doctorId: Number(doctorId) };

            const [ratings, total] = await Promise.all([
                prisma.rating.findMany({
                    where,
                    skip: (Number(page) - 1) * Number(limit),
                    take: Number(limit),
                    orderBy: { createdAt: 'desc' },
                    include: {
                        patient: {
                            select: {
                                name: true
                            }
                        }
                    }
                }),
                prisma.rating.count({ where })
            ]);

            // Calculate average rating
            const sumRating = await prisma.rating.aggregate({
                where,
                _avg: {
                    rating: true
                },
                _count: true
            });

            res.json({
                ratings,
                averageRating: sumRating._avg?.rating || 0,
                totalRatings: sumRating._count,
                pagination: {
                    total,
                    page: Number(page),
                    limit: Number(limit),
                    totalPages: Math.ceil(total / Number(limit))
                }
            });
        } catch (error) {
            next(error);
        }
    }

    // Get ratings for a pharmacist
    async getPharmacistRatings(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { pharmacistId } = req.params;
            const { page = '1', limit = '20' } = req.query;

            const where = { pharmacistId: Number(pharmacistId) };

            const [ratings, total] = await Promise.all([
                prisma.rating.findMany({
                    where,
                    skip: (Number(page) - 1) * Number(limit),
                    take: Number(limit),
                    orderBy: { createdAt: 'desc' },
                    include: {
                        patient: {
                            select: {
                                name: true
                            }
                        }
                    }
                }),
                prisma.rating.count({ where })
            ]);

            // Calculate average rating
            const sumRating = await prisma.rating.aggregate({
                where,
                _avg: {
                    rating: true
                },
                _count: true
            });

            res.json({
                ratings,
                averageRating: sumRating._avg?.rating || 0,
                totalRatings: sumRating._count,
                pagination: {
                    total,
                    page: Number(page),
                    limit: Number(limit),
                    totalPages: Math.ceil(total / Number(limit))
                }
            });
        } catch (error) {
            next(error);
        }
    }

    // Get patient's ratings
    async getPatientRatings(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { patientId } = req.params;

            const ratings = await prisma.rating.findMany({
                where: { patientId: Number(patientId) },
                orderBy: { createdAt: 'desc' },
                include: {
                    doctor: {
                        select: { name: true }
                    },
                    pharmacist: {
                        select: { name: true }
                    }
                }
            });

            res.json(ratings);
        } catch (error) {
            next(error);
        }
    }

    // Delete a rating
    async deleteRating(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const patientId = (req as any).user?.patientId; // From auth middleware

            // Verify ownership
            const rating = await prisma.rating.findUnique({
                where: { id: Number(id) }
            });

            if (!rating) {
                return res.status(404).json({ error: 'Rating not found' }) as any;
            }

            if (rating.patientId !== patientId) {
                return res.status(403).json({ error: 'Not authorized to delete this rating' }) as any;
            }

            await prisma.rating.delete({
                where: { id: Number(id) }
            });

            res.json({ message: 'Rating deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
}

export default new RatingController();
