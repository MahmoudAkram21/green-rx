import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';

class AdminController {
    // Get all pending doctor verifications
    async getPendingDoctors(_req: Request, res: Response, next: NextFunction) {
        try {
            const pendingDoctors = await prisma.doctor.findMany({
                where: { isVerified: false },
                include: {
                    user: {
                        select: {
                            id: true,
                            email: true,
                            createdAt: true
                        }
                    }
                },
                orderBy: { createdAt: 'desc' }
            });

            res.json(pendingDoctors);
        } catch (error) {
            next(error);
        }
    }

    // Verify a doctor
    async verifyDoctor(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { notes } = req.body;

            const doctor = await prisma.doctor.update({
                where: { id: Number(id) },
                data: {
                    isVerified: true,
                    verifiedAt: new Date()
                },
                include: { user: true }
            });

            // Create notification for doctor
            await prisma.notification.create({
                data: {
                    userId: doctor.userId,
                    type: 'SystemAlert',
                    title: 'Account Verified',
                    message: 'Your doctor account has been verified. You can now create prescriptions.',
                    deliveryStatus: 'Pending'
                }
            });

            // Create audit log
            await prisma.auditLog.create({
                data: {
                    userId: (req as any).user?.id, // From auth middleware
                    action: 'DOCTOR_VERIFIED',
                    entityType: 'Doctor',
                    entityId: doctor.id,
                    changes: { notes, verifiedAt: new Date() }
                }
            });

            res.json(doctor);
        } catch (error) {
            next(error);
        }
    }

    // Reject doctor verification
    async rejectDoctor(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { reason } = req.body;

            const doctor = await prisma.doctor.findUnique({
                where: { id: Number(id) },
                include: { user: true }
            });

            if (doctor) {
                // Create notification for doctor
                await prisma.notification.create({
                    data: {
                        userId: doctor.userId,
                        type: 'SystemAlert',
                        title: 'Verification Rejected',
                        message: `Your verification was rejected. Reason: ${reason}`,
                        deliveryStatus: 'Pending'
                    }
                });

                // Create audit log
                await prisma.auditLog.create({
                    data: {
                        userId: (req as any).user?.id,
                        action: 'DOCTOR_REJECTED',
                        entityType: 'Doctor',
                        entityId: doctor.id,
                        changes: { reason, rejectedAt: new Date() }
                    }
                });
            }

            res.json({ message: 'Doctor verification rejected', reason });
        } catch (error) {
            next(error);
        }
    }

    // Get system statistics
    async getStatistics(_req: Request, res: Response, next: NextFunction) {
        try {
            const [
                totalUsers,
                totalDoctors,
                verifiedDoctors,
                totalPatients,
                totalPrescriptions,
                activePrescriptions,
                totalAppointments,
                todayAppointments
            ] = await Promise.all([
                prisma.user.count(),
                prisma.doctor.count(),
                prisma.doctor.count({ where: { isVerified: true } }),
                prisma.patient.count(),
                prisma.prescription.count(),
                prisma.prescription.count({ where: { status: { in: ['Approved', 'Filled'] } } }),
                prisma.appointment.count(),
                prisma.appointment.count({
                    where: {
                        appointmentDate: {
                            gte: new Date(new Date().setHours(0, 0, 0, 0)),
                            lt: new Date(new Date().setHours(23, 59, 59, 999))
                        }
                    }
                })
            ]);

            res.json({
                users: { total: totalUsers },
                doctors: {
                    total: totalDoctors,
                    verified: verifiedDoctors,
                    pending: totalDoctors - verifiedDoctors
                },
                patients: { total: totalPatients },
                prescriptions: {
                    total: totalPrescriptions,
                    active: activePrescriptions
                },
                appointments: {
                    total: totalAppointments,
                    today: todayAppointments
                }
            });
        } catch (error) {
            next(error);
        }
    }

    // Get recent audit logs
    async getAuditLogs(req: Request, res: Response, next: NextFunction) {
        try {
            const { page = '1', limit = '50' } = req.query;

            const [logs, total] = await Promise.all([
                prisma.auditLog.findMany({
                    skip: (Number(page) - 1) * Number(limit),
                    take: Number(limit),
                    orderBy: { createdAt: 'desc' },
                    include: {
                        user: {
                            select: { email: true, role: true }
                        }
                    }
                }),
                prisma.auditLog.count()
            ]);

            res.json({
                logs,
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
}
//new controller for admin
export default new AdminController();
