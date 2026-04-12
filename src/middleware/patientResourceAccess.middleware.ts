import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { UserRole } from '../../generated/client/client';

/**
 * Ensures the caller may access data for `req.params[patientIdParam]`:
 * - Admin / SuperAdmin: any patient id (numeric; "me" is rejected unless resolved earlier).
 * - Patient: only own profile id or "me" (rewritten to numeric id).
 * - Doctor: only patients with an active PatientDoctor link.
 * - Pharmacist: forbidden (no patient linkage model; use Doctor/Admin paths).
 */
export function assertAccessToPatientData(patientIdParam = 'patientId') {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            if (!req.user) {
                res.status(401).json({ error: 'Unauthorized' });
                return;
            }

            const role = req.user.role;
            const raw = req.params[patientIdParam];

            if (raw === undefined || raw === '') {
                next();
                return;
            }

            if (role === UserRole.Admin || role === UserRole.SuperAdmin) {
                if (raw === 'me') {
                    res.status(400).json({ error: 'Invalid patientId for this role' });
                    return;
                }
                next();
                return;
            }

            if (role === UserRole.Pharmacist) {
                res.status(403).json({
                    error: 'Pharmacists cannot access patient records by id on this endpoint',
                });
                return;
            }

            if (role === UserRole.Patient) {
                const patient = await prisma.patient.findUnique({
                    where: { userId: req.user.userId },
                    select: { id: true },
                });
                if (!patient) {
                    res.status(404).json({ error: 'Patient profile not found' });
                    return;
                }
                if (raw === 'me' || raw === String(patient.id)) {
                    req.params[patientIdParam] = String(patient.id);
                    next();
                    return;
                }
                res.status(403).json({ error: 'You can only access your own patient record' });
                return;
            }

            if (role === UserRole.Doctor) {
                const doctor = await prisma.doctor.findUnique({
                    where: { userId: req.user.userId },
                    select: { id: true },
                });
                if (!doctor) {
                    res.status(404).json({ error: 'Doctor profile not found' });
                    return;
                }
                const patientId = parseInt(raw, 10);
                if (Number.isNaN(patientId)) {
                    res.status(400).json({ error: 'Invalid patientId' });
                    return;
                }
                const link = await prisma.patientDoctor.findFirst({
                    where: {
                        doctorId: doctor.id,
                        patientId,
                        isActive: true,
                    },
                    select: { id: true },
                });
                if (!link) {
                    res.status(403).json({ error: 'You are not linked to this patient' });
                    return;
                }
                next();
                return;
            }

            res.status(403).json({ error: 'Forbidden' });
        } catch (e) {
            next(e);
        }
    };
}
