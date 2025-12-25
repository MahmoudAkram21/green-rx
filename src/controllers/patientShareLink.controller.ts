import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { randomBytes } from 'crypto';

class PatientShareLinkController {
    // Generate a shareable link for patient data
    async generateShareLink(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { patientId } = req.params;
            const { expiresInDays = 7 } = req.body;

            // Generate unique token
            const shareToken = randomBytes(32).toString('hex');

            const expiresAt = new Date();
            expiresAt.setDate(expiresAt.getDate() + Number(expiresInDays));

            const shareLink = await prisma.patientShareLink.create({
                data: {
                    patientId: Number(patientId),
                    shareToken,
                    expiresAt
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

            // Generate full URL
            const shareUrl = `${process.env.APP_URL || 'http://localhost:3000'}/shared/${shareToken}`;

            res.status(201).json({
                ...shareLink,
                shareUrl
            });
        } catch (error) {
            next(error);
        }
    }

    // Get patient data via share link
    async getSharedData(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { token } = req.params;

            const shareLink = await prisma.patientShareLink.findUnique({
                where: { shareToken: token },
                include: {
                    patient: {
                        include: {
                            allergies: true,
                            prescriptions: {
                                include: {
                                    tradeName: {
                                        include: { activeSubstance: true }
                                    }
                                }
                            }
                        }
                    }
                }
            });

            if (!shareLink) {
                return res.status(404).json({ error: 'Share link not found' }) as any;
            }

            // Check if expired
            if (shareLink.expiresAt && shareLink.expiresAt < new Date()) {
                return res.status(410).json({ error: 'Share link has expired' }) as any;
            }

            // Check if active
            if (!shareLink.isActive) {
                return res.status(403).json({ error: 'Share link has been revoked' }) as any;
            }

            // Increment access count
            await prisma.patientShareLink.update({
                where: { id: shareLink.id },
                data: {
                    accessCount: { increment: 1 },
                    lastAccessedAt: new Date()
                }
            });

            res.json({
                patient: shareLink.patient,
                sharedAt: shareLink.createdAt,
                expiresAt: shareLink.expiresAt
            });
        } catch (error) {
            next(error);
        }
    }

    // Get all share links for a patient
    async getPatientShareLinks(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { patientId } = req.params;

            const shareLinks = await prisma.patientShareLink.findMany({
                where: { patientId: Number(patientId) },
                orderBy: { createdAt: 'desc' }
            });

            // Add full URLs
            const linksWithUrls = shareLinks.map(link => ({
                ...link,
                shareUrl: `${process.env.APP_URL || 'http://localhost:3000'}/shared/${link.shareToken}`,
                isExpired: link.expiresAt ? link.expiresAt < new Date() : false,
                isRevoked: !link.isActive
            }));

            res.json(linksWithUrls);
        } catch (error) {
            next(error);
        }
    }

    // Revoke a share link
    async revokeShareLink(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;

            const shareLink = await prisma.patientShareLink.update({
                where: { id: Number(id) },
                data: { isActive: false }
            });

            res.json(shareLink);
        } catch (error) {
            next(error);
        }
    }

    // Delete a share link
    async deleteShareLink(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;

            await prisma.patientShareLink.delete({
                where: { id: Number(id) }
            });

            res.json({ message: 'Share link deleted successfully' });
        } catch (error) {
            next(error);
        }
    }

    // Update share link settings
    async updateShareLink(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const { expiresAt } = req.body;

            const updateData: any = {};
            if (expiresAt) {
                updateData.expiresAt = new Date(expiresAt);
            }

            const shareLink = await prisma.patientShareLink.update({
                where: { id: Number(id) },
                data: updateData
            });

            res.json(shareLink);
        } catch (error) {
            next(error);
        }
    }
}

export default new PatientShareLinkController();
