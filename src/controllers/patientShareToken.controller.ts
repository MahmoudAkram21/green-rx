import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';
import QRCode from 'qrcode';
import { prisma } from '../lib/prisma';

const TOKEN_EXPIRY_MINUTES = 10;

export const generateShareToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user!.userId;

        const patient = await prisma.patient.findUnique({ where: { userId } });
        if (!patient) {
            res.status(404).json({ error: 'Patient profile not found' });
            return;
        }

        const token = randomUUID();
        const expiresAt = new Date(Date.now() + TOKEN_EXPIRY_MINUTES * 60 * 1000);

        const shareToken = await prisma.patientShareToken.create({
            data: {
                patientId: patient.id,
                token,
                expiresAt,
            },
        });

        const qrCodeDataUrl = await QRCode.toDataURL(token, {
            errorCorrectionLevel: 'H',
            width: 300,
            margin: 2,
        });

        res.status(201).json({
            message: 'Share token generated successfully',
            token: shareToken.token,
            expiresAt: shareToken.expiresAt,
            expiresInMinutes: TOKEN_EXPIRY_MINUTES,
            qrCode: qrCodeDataUrl,
        });
    } catch (error) {
        next(error);
    }
};

export const redeemShareToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token } = req.body;
        if (!token || typeof token !== 'string') {
            res.status(400).json({ error: 'Token is required' });
            return;
        }

        const userId = req.user!.userId;

        const doctor = await prisma.doctor.findUnique({ where: { userId } });
        if (!doctor) {
            res.status(404).json({ error: 'Doctor profile not found' });
            return;
        }

        const shareToken = await prisma.patientShareToken.findUnique({ where: { token } });

        if (!shareToken) {
            res.status(404).json({ error: 'Invalid token' });
            return;
        }

        if (shareToken.used) {
            res.status(410).json({ error: 'Token has already been used' });
            return;
        }

        if (new Date() > shareToken.expiresAt) {
            res.status(410).json({ error: 'Token has expired' });
            return;
        }

        const existingRelation = await prisma.patientDoctor.findUnique({
            where: {
                patientId_doctorId: {
                    patientId: shareToken.patientId,
                    doctorId: doctor.id,
                },
            },
        });

        if (existingRelation) {
            await prisma.patientShareToken.update({
                where: { id: shareToken.id },
                data: { used: true, usedAt: new Date(), usedByDoctorId: doctor.id },
            });

            res.status(409).json({ error: 'Patient is already linked to this doctor' });
            return;
        }

        const [patientDoctor, , patient] = await prisma.$transaction([
            prisma.patientDoctor.create({
                data: {
                    patientId: shareToken.patientId,
                    doctorId: doctor.id,
                    relationshipType: 'PrimaryCare',
                    startDate: new Date(),
                },
            }),
            prisma.patientShareToken.update({
                where: { id: shareToken.id },
                data: { used: true, usedAt: new Date(), usedByDoctorId: doctor.id },
            }),
            prisma.patient.findUnique({
                where: { id: shareToken.patientId },
                include: {
                    user: { select: { id: true, name: true, email: true } },
                    patientDiseases: { include: { disease: true } },
                    allergyReports: true,
                },
            }),
        ]);

        await prisma.notification.create({
            data: {
                userId: doctor.userId,
                type: 'SystemAlert',
                title: 'New Patient Linked',
                message: `Patient "${patient?.user.name || 'Unknown'}" has shared their profile with you via QR code.`,
                deliveryStatus: 'Sent',
            },
        });

        if (patient?.user.id) {
            await prisma.notification.create({
                data: {
                    userId: patient.user.id,
                    type: 'SystemAlert',
                    title: 'Profile Shared Successfully',
                    message: `Your profile has been shared with Dr. ${doctor.name}.`,
                    deliveryStatus: 'Sent',
                },
            });
        }

        res.status(201).json({
            message: 'Patient linked to doctor successfully',
            relationship: patientDoctor,
            patient: patient
                ? {
                      id: patient.id,
                      name: patient.user.name,
                      email: patient.user.email,
                      age: patient.age,
                      gender: patient.gender,
                      bloodType: patient.bloodType,
                      diseases: patient.patientDiseases,
                      allergies: patient.allergyReports,
                  }
                : null,
        });
    } catch (error) {
        next(error);
    }
};
