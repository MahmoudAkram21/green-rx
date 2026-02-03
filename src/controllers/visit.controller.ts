import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { visitSchema, updateVisitSchema } from '../zod/visit.zod';

class VisitController {
    // Create a visit
    async createVisit(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = visitSchema.parse(req.body);

            const visit = await prisma.visit.create({
                data,
                include: {
                    patient: {
                        select: { name: true, age: true }
                    },
                    doctor: {
                        select: { name: true, specialization: true }
                    }
                }
            });

            // Create notification for patient
            await prisma.notification.create({
                data: {
                    userId: (await prisma.patient.findUnique({
                        where: { id: data.patientId },
                        select: { userId: true }
                    }))!.userId,
                    type: 'SystemAlert',
                    title: 'New Visit Recorded',
                    message: `A new visit has been recorded on ${data.visitDate.toLocaleDateString()}`,
                    deliveryStatus: 'Pending'
                }
            });

            res.status(201).json(visit);
        } catch (error) {
            next(error);
        }
    }

    // Get patient visits
    async getPatientVisits(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { patientId } = req.params;
            const { page = '1', limit = '20' } = req.query;

            const [visits, total] = await Promise.all([
                prisma.visit.findMany({
                    where: { patientId: Number(patientId) },
                    skip: (Number(page) - 1) * Number(limit),
                    take: Number(limit),
                    orderBy: { visitDate: 'desc' },
                    include: {
                        doctor: {
                            select: { name: true, specialization: true }
                        }
                    }
                }),
                prisma.visit.count({ where: { patientId: Number(patientId) } })
            ]);

            res.json({
                visits,
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

    // Get doctor visits
    async getDoctorVisits(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { doctorId } = req.params;
            const { page = '1', limit = '20' } = req.query;

            const [visits, total] = await Promise.all([
                prisma.visit.findMany({
                    where: { doctorId: Number(doctorId) },
                    skip: (Number(page) - 1) * Number(limit),
                    take: Number(limit),
                    orderBy: { visitDate: 'desc' },
                    include: {
                        patient: {
                            select: { name: true, age: true }
                        }
                    }
                }),
                prisma.visit.count({ where: { doctorId: Number(doctorId) } })
            ]);

            res.json({
                visits,
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

    // Get single visit
    async getVisit(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;

            const visit = await prisma.visit.findUnique({
                where: { id: Number(id) },
                include: {
                    patient: {
                        select: {
                            name: true,
                            age: true,
                            user: { select: { email: true } }
                        }
                    },
                    doctor: {
                        select: {
                            name: true,
                            specialization: true,
                            user: { select: { email: true } }
                        }
                    }
                }
            });

            if (!visit) {
                return res.status(404).json({ error: 'Visit not found' }) as any;
            }

            res.json(visit);
        } catch (error) {
            next(error);
        }
    }

    // Update visit
    async updateVisit(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const data = updateVisitSchema.parse(req.body);

            const visit = await prisma.visit.update({
                where: { id: Number(id) },
                data
            });

            res.json(visit);
        } catch (error) {
            next(error);
        }
    }

    // Delete visit
    async deleteVisit(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;

            await prisma.visit.delete({
                where: { id: Number(id) }
            });

            res.json({ message: 'Visit deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
}

export default new VisitController();
