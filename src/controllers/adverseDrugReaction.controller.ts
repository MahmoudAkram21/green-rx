import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { z } from 'zod';

const adrSchema = z.object({
    patientId: z.number(),
    tradeNameId: z.number(),
    companyId: z.number(),
    activeSubstanceId: z.number().optional(),
    severity: z.enum(['Mild', 'Moderate', 'Severe', 'LifeThreatening']),
    reaction: z.string(),
    startDate: z.string().transform(str => new Date(str)),
    endDate: z.string().transform(str => new Date(str)).optional(),
    isAnonymous: z.boolean().optional()
});

class AdverseDrugReactionController {
    // Report an ADR
    async reportADR(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = adrSchema.parse(req.body);
            const reportedBy = (req as any).user?.id;

            const adr = await prisma.adverseDrugReaction.create({
                data: {
                    ...data
                },
                include: {
                    patient: {
                        select: { name: true, age: true }
                    },
                    tradeName: {
                        select: { title: true }
                    },
                    activeSubstance: {
                        select: { activeSubstance: true }
                    }
                }
            });

            // Notify admins and relevant doctors about severe ADRs
            if (data.severity === 'Severe' || data.severity === 'LifeThreatening') {
                const admins = await prisma.user.findMany({
                    where: { role: { in: ['SuperAdmin', 'Admin'] } }
                });

                for (const admin of admins) {
                    await prisma.notification.create({
                        data: {
                            userId: admin.id,
                            type: 'SystemAlert',
                            title: 'Severe ADR Reported',
                            message: `A ${data.severity} adverse drug reaction has been reported for patient ${data.patientId}`,
                            deliveryStatus: 'Pending'
                        }
                    });
                }
            }

            // Create audit log
            await prisma.auditLog.create({
                data: {
                    userId: reportedBy,
                    action: 'ADR_REPORTED',
                    entityType: 'AdverseDrugReaction',
                    entityId: adr.id,
                    changes: { severity: data.severity, reaction: data.reaction }
                }
            });

            res.status(201).json(adr);
        } catch (error) {
            next(error);
        }
    }

    // Get all ADRs for a patient
    async getPatientADRs(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { patientId } = req.params;
            const { page = '1', limit = '20' } = req.query;

            const [adrs, total] = await Promise.all([
                prisma.adverseDrugReaction.findMany({
                    where: { patientId: Number(patientId) },
                    skip: (Number(page) - 1) * Number(limit),
                    take: Number(limit),
                    orderBy: { startDate: 'desc' },
                    include: {
                        tradeName: true,
                        activeSubstance: true
                    }
                }),
                prisma.adverseDrugReaction.count({ where: { patientId: Number(patientId) } })
            ]);

            res.json({
                adrs,
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

    // Get ADRs for a specific drug
    async getDrugADRs(req: Request, res: Response, next: NextFunction) {
        try {
            const { drugType, drugId } = req.params;
            const { page = '1', limit = '20' } = req.query;

            const where: any = {};
            if (drugType === 'tradeName') {
                where.tradeNameId = Number(drugId);
            } else if (drugType === 'activeSubstance') {
                where.activeSubstanceId = Number(drugId);
            }

            const [adrs, total] = await Promise.all([
                prisma.adverseDrugReaction.findMany({
                    where,
                    skip: (Number(page) - 1) * Number(limit),
                    take: Number(limit),
                    orderBy: { startDate: 'desc' },
                    include: {
                        patient: {
                            select: { name: true, age: true }
                        }
                    }
                }),
                prisma.adverseDrugReaction.count({ where })
            ]);

            // Calculate severity distribution
            const severityStats = await prisma.adverseDrugReaction.groupBy({
                by: ['severity'],
                where,
                _count: true
            });

            res.json({
                adrs,
                severityStats,
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

    // Get all ADRs (for admin review)
    async getAllADRs(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { severity, page = '1', limit = '20' } = req.query;

            const where: any = {};
            if (severity) {
                where.severity = severity;
            }

            const [adrs, total] = await Promise.all([
                prisma.adverseDrugReaction.findMany({
                    where,
                    skip: (Number(page) - 1) * Number(limit),
                    take: Number(limit),
                    orderBy: { createdAt: 'desc' },
                    include: {
                        patient: {
                            select: { name: true, age: true }
                        },
                        tradeName: true,
                        activeSubstance: true
                    }
                }),
                prisma.adverseDrugReaction.count({ where })
            ]);

            res.json({
                adrs,
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

    // Update ADR (mark as reviewed, update outcome, etc.)
    async updateADR(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const { status, adminNotes } = req.body;

            const adr = await prisma.adverseDrugReaction.update({
                where: { id: Number(id) },
                data: {
                    status,
                    adminNotes
                }
            });

            res.json(adr);
        } catch (error) {
            next(error);
        }
    }

    // Get ADR statistics
    async getADRStatistics(_req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const [
                totalADRs,
                severeCases,
                pendingCases,
                bySeverity,
                byStatus
            ] = await Promise.all([
                prisma.adverseDrugReaction.count(),
                prisma.adverseDrugReaction.count({
                    where: { severity: { in: ['Severe', 'LifeThreatening'] } }
                }),
                prisma.adverseDrugReaction.count({
                    where: { status: 'Pending' }
                }),
                prisma.adverseDrugReaction.groupBy({
                    by: ['severity'],
                    _count: true
                }),
                prisma.adverseDrugReaction.groupBy({
                    by: ['status'],
                    _count: true
                })
            ]);

            res.json({
                total: totalADRs,
                severeCases,
                pendingCases,
                bySeverity,
                byStatus
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new AdverseDrugReactionController();
