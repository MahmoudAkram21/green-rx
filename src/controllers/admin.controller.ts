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
                    userId: (req as any).user?.userId,
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
userId: (req as any).user?.userId,
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
            const todayStart = new Date(new Date().setHours(0, 0, 0, 0));
            const todayEnd = new Date(new Date().setHours(23, 59, 59, 999));

            const [
                totalUsers,
                totalDoctors,
                verifiedDoctors,
                totalPharmacists,
                verifiedPharmacists,
                totalPatients,
                totalPrescriptions,
                activePrescriptions,
                totalVisits,
                todayVisits,
                totalCompanies,
                totalActiveSubstances,
                totalTradeNames,
                totalDiseases,
                totalSubscriptions,
                activeSubscriptions,
                totalAdverseDrugReactions,
                adrPendingReview,
                medicineSuggestionsPending
            ] = await Promise.all([
                prisma.user.count(),
                prisma.doctor.count(),
                prisma.doctor.count({ where: { isVerified: true } }),
                prisma.pharmacist.count(),
                prisma.pharmacist.count({ where: { isVerified: true } }),
                prisma.patient.count(),
                prisma.prescription.count(),
                prisma.prescription.count({ where: { status: { in: ['Approved', 'Filled'] } } }),
                prisma.visit.count(),
                prisma.visit.count({
                    where: {
                        visitDate: { gte: todayStart, lte: todayEnd }
                    }
                }),
                prisma.company.count(),
                prisma.activeSubstance.count({ where: { isActive: true } }),
                prisma.tradeName.count({ where: { isActive: true } }),
                prisma.disease.count({ where: { isActive: true } }),
                prisma.subscription.count(),
                prisma.subscription.count({ where: { status: 'Active' } }),
                prisma.adverseDrugReaction.count(),
                prisma.adverseDrugReaction.count({ where: { status: 'Submitted' } }),
                prisma.medicineSuggestion.count({ where: { status: 'Pending' } })
            ]);

            res.json({
                users: { total: totalUsers },
                doctors: {
                    total: totalDoctors,
                    verified: verifiedDoctors,
                    pending: totalDoctors - verifiedDoctors
                },
                pharmacists: {
                    total: totalPharmacists,
                    verified: verifiedPharmacists,
                    pending: totalPharmacists - verifiedPharmacists
                },
                patients: { total: totalPatients },
                prescriptions: {
                    total: totalPrescriptions,
                    active: activePrescriptions
                },
                visits: {
                    total: totalVisits,
                    today: todayVisits
                },
                companies: { total: totalCompanies },
                activeSubstances: { total: totalActiveSubstances },
                tradeNames: { total: totalTradeNames },
                diseases: { total: totalDiseases },
                subscriptions: {
                    total: totalSubscriptions,
                    active: activeSubscriptions
                },
                adverseDrugReactions: {
                    total: totalAdverseDrugReactions,
                    pendingReview: adrPendingReview
                },
                medicineSuggestions: { pending: medicineSuggestionsPending }
            });
        } catch (error) {
            next(error);
        }
    }

    // Pharmacist verification
    async getPendingPharmacists(_req: Request, res: Response, next: NextFunction) {
        try {
            const pending = await prisma.pharmacist.findMany({
                where: { isVerified: false },
                include: {
                    user: {
                        select: { id: true, email: true, createdAt: true }
                    }
                },
                orderBy: { createdAt: 'desc' }
            });
            res.json(pending);
        } catch (error) {
            next(error);
        }
    }

    async verifyPharmacist(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { notes } = req.body;

            const pharmacist = await prisma.pharmacist.update({
                where: { id: Number(id) },
                data: { isVerified: true, verifiedAt: new Date() },
                include: { user: true }
            });

            await prisma.notification.create({
                data: {
                    userId: pharmacist.userId,
                    type: 'SystemAlert',
                    title: 'Account Verified',
                    message: 'Your pharmacist account has been verified.',
                    deliveryStatus: 'Pending'
                }
            });

            await prisma.auditLog.create({
                data: {
                    userId: (req as any).user?.userId,
                    action: 'PHARMACIST_VERIFIED',
                    entityType: 'Pharmacist',
                    entityId: pharmacist.id,
                    changes: { notes, verifiedAt: new Date() }
                }
            });

            res.json(pharmacist);
        } catch (error) {
            next(error);
        }
    }

    async rejectPharmacist(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { reason } = req.body;

            const pharmacist = await prisma.pharmacist.findUnique({
                where: { id: Number(id) },
                include: { user: true }
            });

            if (pharmacist) {
                await prisma.notification.create({
                    data: {
                        userId: pharmacist.userId,
                        type: 'SystemAlert',
                        title: 'Verification Rejected',
                        message: `Your verification was rejected. Reason: ${reason}`,
                        deliveryStatus: 'Pending'
                    }
                });
                await prisma.auditLog.create({
                    data: {
                        userId: (req as any).user?.userId,
                        action: 'PHARMACIST_REJECTED',
                        entityType: 'Pharmacist',
                        entityId: pharmacist.id,
                        changes: { reason, rejectedAt: new Date() }
                    }
                });
            }

            res.json({ message: 'Pharmacist verification rejected', reason });
        } catch (error) {
            next(error);
        }
    }

    // Get recent audit logs
    /** All ratings for admin dashboard (doctors + pharmacists), with display names */
    async getRatings(req: Request, res: Response, next: NextFunction) {
        try {
            const page = Math.max(1, Number(req.query.page) || 1);
            const limit = Math.min(500, Math.max(1, Number(req.query.limit) || 200));

            const [items, total, agg] = await Promise.all([
                prisma.rating.findMany({
                    skip: (page - 1) * limit,
                    take: limit,
                    orderBy: { createdAt: 'desc' },
                    include: {
                        patient: {
                            select: {
                                id: true,
                                user: { select: { name: true, email: true } },
                            },
                        },
                        doctor: { select: { id: true, name: true } },
                        pharmacist: { select: { id: true, name: true } },
                    },
                }),
                prisma.rating.count(),
                prisma.rating.aggregate({
                    _avg: { rating: true },
                }),
            ]);

            const ratings = items.map((r) => ({
                id: r.id,
                patientId: r.patientId,
                doctorId: r.doctorId ?? undefined,
                pharmacistId: r.pharmacistId ?? undefined,
                ratedType: r.ratedType,
                rating: r.rating,
                review: r.review ?? undefined,
                createdAt: r.createdAt.toISOString(),
                patientName:
                    r.patient.user?.name?.trim() ||
                    r.patient.user?.email ||
                    `Patient #${r.patientId}`,
                doctorName: r.doctor?.name ?? r.pharmacist?.name ?? '—',
            }));

            res.json({
                ratings,
                averageRating: agg._avg.rating ?? 0,
                totalRatings: total,
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit) || 1,
                },
            });
        } catch (error) {
            next(error);
        }
    }

    async deleteRating(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id)) {
                res.status(400).json({ error: 'Invalid rating id' });
                return;
            }
            const existing = await prisma.rating.findUnique({ where: { id } });
            if (!existing) {
                res.status(404).json({ error: 'Rating not found' });
                return;
            }
            await prisma.rating.delete({ where: { id } });
            res.json({ message: 'Rating deleted successfully' });
        } catch (error) {
            next(error);
        }
    }

    async getAuditLogs(req: Request, res: Response, next: NextFunction) {
        try {
            const { page = '1', limit = '50', action, entityType, userId } = req.query;
            const pageNum = Math.max(1, Number(page) || 1);
            const limitNum = Math.min(100, Math.max(1, Number(limit) || 50));

            const where: { action?: string; entityType?: string; userId?: number } = {};
            if (action && typeof action === 'string') where.action = action;
            if (entityType && typeof entityType === 'string') where.entityType = entityType;
            if (userId && typeof userId === 'string' && userId.trim() !== '') {
                const id = Number(userId);
                if (!Number.isNaN(id)) where.userId = id;
            }

            const [logs, total] = await Promise.all([
                prisma.auditLog.findMany({
                    where,
                    skip: (pageNum - 1) * limitNum,
                    take: limitNum,
                    orderBy: { createdAt: 'desc' },
                    include: {
                        user: {
                            select: { email: true, role: true }
                        }
                    }
                }),
                prisma.auditLog.count({ where })
            ]);

            res.json({
                logs,
                pagination: {
                    total,
                    page: pageNum,
                    limit: limitNum,
                    totalPages: Math.ceil(total / limitNum) || 1
                }
            });
        } catch (error) {
            next(error);
        }
    }
}
//new controller for admin
export default new AdminController();
