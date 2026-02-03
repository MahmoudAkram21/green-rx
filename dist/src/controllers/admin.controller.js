"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../lib/prisma");
class AdminController {
    // Get all pending doctor verifications
    async getPendingDoctors(_req, res, next) {
        try {
            const pendingDoctors = await prisma_1.prisma.doctor.findMany({
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
        }
        catch (error) {
            next(error);
        }
    }
    // Verify a doctor
    async verifyDoctor(req, res, next) {
        try {
            const { id } = req.params;
            const { notes } = req.body;
            const doctor = await prisma_1.prisma.doctor.update({
                where: { id: Number(id) },
                data: {
                    isVerified: true,
                    verifiedAt: new Date()
                },
                include: { user: true }
            });
            // Create notification for doctor
            await prisma_1.prisma.notification.create({
                data: {
                    userId: doctor.userId,
                    type: 'SystemAlert',
                    title: 'Account Verified',
                    message: 'Your doctor account has been verified. You can now create prescriptions.',
                    deliveryStatus: 'Pending'
                }
            });
            // Create audit log
            await prisma_1.prisma.auditLog.create({
                data: {
                    userId: req.user?.id, // From auth middleware
                    action: 'DOCTOR_VERIFIED',
                    entityType: 'Doctor',
                    entityId: doctor.id,
                    changes: { notes, verifiedAt: new Date() }
                }
            });
            res.json(doctor);
        }
        catch (error) {
            next(error);
        }
    }
    // Reject doctor verification
    async rejectDoctor(req, res, next) {
        try {
            const { id } = req.params;
            const { reason } = req.body;
            const doctor = await prisma_1.prisma.doctor.findUnique({
                where: { id: Number(id) },
                include: { user: true }
            });
            if (doctor) {
                // Create notification for doctor
                await prisma_1.prisma.notification.create({
                    data: {
                        userId: doctor.userId,
                        type: 'SystemAlert',
                        title: 'Verification Rejected',
                        message: `Your verification was rejected. Reason: ${reason}`,
                        deliveryStatus: 'Pending'
                    }
                });
                // Create audit log
                await prisma_1.prisma.auditLog.create({
                    data: {
                        userId: req.user?.id,
                        action: 'DOCTOR_REJECTED',
                        entityType: 'Doctor',
                        entityId: doctor.id,
                        changes: { reason, rejectedAt: new Date() }
                    }
                });
            }
            res.json({ message: 'Doctor verification rejected', reason });
        }
        catch (error) {
            next(error);
        }
    }
    // Get system statistics
    async getStatistics(_req, res, next) {
        try {
            const [totalUsers, totalDoctors, verifiedDoctors, totalPatients, totalPrescriptions, activePrescriptions, totalAppointments, todayAppointments] = await Promise.all([
                prisma_1.prisma.user.count(),
                prisma_1.prisma.doctor.count(),
                prisma_1.prisma.doctor.count({ where: { isVerified: true } }),
                prisma_1.prisma.patient.count(),
                prisma_1.prisma.prescription.count(),
                prisma_1.prisma.prescription.count({ where: { status: { in: ['Approved', 'Filled'] } } }),
                prisma_1.prisma.appointment.count(),
                prisma_1.prisma.appointment.count({
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
        }
        catch (error) {
            next(error);
        }
    }
    // Get recent audit logs
    async getAuditLogs(req, res, next) {
        try {
            const { page = '1', limit = '50' } = req.query;
            const [logs, total] = await Promise.all([
                prisma_1.prisma.auditLog.findMany({
                    skip: (Number(page) - 1) * Number(limit),
                    take: Number(limit),
                    orderBy: { createdAt: 'desc' },
                    include: {
                        user: {
                            select: { email: true, role: true }
                        }
                    }
                }),
                prisma_1.prisma.auditLog.count()
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
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = new AdminController();
//# sourceMappingURL=admin.controller.js.map