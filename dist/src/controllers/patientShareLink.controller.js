"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../lib/prisma");
const crypto_1 = require("crypto");
class PatientShareLinkController {
    // Generate a shareable link for patient data
    async generateShareLink(req, res, next) {
        try {
            const { patientId } = req.params;
            const { expiresInDays = 7 } = req.body;
            // Generate unique token
            const shareToken = (0, crypto_1.randomBytes)(32).toString('hex');
            const expiresAt = new Date();
            expiresAt.setDate(expiresAt.getDate() + Number(expiresInDays));
            const shareLink = await prisma_1.prisma.patientShareLink.create({
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
        }
        catch (error) {
            next(error);
        }
    }
    // Get patient data via share link
    async getSharedData(req, res, next) {
        try {
            const { token } = req.params;
            const shareLink = await prisma_1.prisma.patientShareLink.findUnique({
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
                return res.status(404).json({ error: 'Share link not found' });
            }
            // Check if expired
            if (shareLink.expiresAt && shareLink.expiresAt < new Date()) {
                return res.status(410).json({ error: 'Share link has expired' });
            }
            // Check if active
            if (!shareLink.isActive) {
                return res.status(403).json({ error: 'Share link has been revoked' });
            }
            // Increment access count
            await prisma_1.prisma.patientShareLink.update({
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
        }
        catch (error) {
            next(error);
        }
    }
    // Get all share links for a patient
    async getPatientShareLinks(req, res, next) {
        try {
            const { patientId } = req.params;
            const shareLinks = await prisma_1.prisma.patientShareLink.findMany({
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
        }
        catch (error) {
            next(error);
        }
    }
    // Revoke a share link
    async revokeShareLink(req, res, next) {
        try {
            const { id } = req.params;
            const shareLink = await prisma_1.prisma.patientShareLink.update({
                where: { id: Number(id) },
                data: { isActive: false }
            });
            res.json(shareLink);
        }
        catch (error) {
            next(error);
        }
    }
    // Delete a share link
    async deleteShareLink(req, res, next) {
        try {
            const { id } = req.params;
            await prisma_1.prisma.patientShareLink.delete({
                where: { id: Number(id) }
            });
            res.json({ message: 'Share link deleted successfully' });
        }
        catch (error) {
            next(error);
        }
    }
    // Update share link settings
    async updateShareLink(req, res, next) {
        try {
            const { id } = req.params;
            const { expiresAt } = req.body;
            const updateData = {};
            if (expiresAt) {
                updateData.expiresAt = new Date(expiresAt);
            }
            const shareLink = await prisma_1.prisma.patientShareLink.update({
                where: { id: Number(id) },
                data: updateData
            });
            res.json(shareLink);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = new PatientShareLinkController();
//# sourceMappingURL=patientShareLink.controller.js.map