import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';

/** After authenticate + authorize(Patient): resolve profile and expose `res.locals.ownPatientId`. */
export async function requirePatientProfileForDiseases(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const patient = await prisma.patient.findUnique({
            where: { userId: req.user!.userId },
            select: { id: true },
        });
        if (!patient) {
            res.status(404).json({ error: 'Patient profile not found' });
            return;
        }
        res.locals.ownPatientId = patient.id;
        next();
    } catch (e) {
        next(e);
    }
}

/** `patientId` path must be `me` or the caller's own numeric patient id. Normalizes `me` → id string in params. */
export function assertOwnPatientIdParam(req: Request, res: Response, next: NextFunction): void {
    const ownId = res.locals.ownPatientId as number;
    const raw = req.params.patientId;

    if (raw === 'me' || raw === String(ownId)) {
        req.params.patientId = String(ownId);
        next();
        return;
    }

    const parsed = parseInt(raw, 10);
    if (!Number.isNaN(parsed) && parsed === ownId) {
        next();
        return;
    }

    res.status(403).json({ error: 'You can only access your own diseases' });
}
