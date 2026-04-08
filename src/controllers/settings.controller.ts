import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

const LOGO_KEY = 'logo';
const NEARBY_DOCTORS_RADIUS_KM_KEY = 'nearbyDoctorsRadiusKm';
/** SuperAdmin-configured URL when in-app side effects are unavailable (e.g. trade name has no company). */
export const PATIENT_SIDE_EFFECTS_FALLBACK_REDIRECT_KEY = 'patientSideEffectsFallbackRedirectUrl';
const DEFAULT_SIDE_EFFECTS_FALLBACK_REDIRECT = 'https://edaegypt.gov.eg';
const DEFAULT_RADIUS_KM = 50;
const MIN_RADIUS_KM = 1;
const MAX_RADIUS_KM = 500;

/** Resolved URL shown to patients when side-effect features redirect them (no company / no contract). */
export async function getPatientSideEffectsFallbackRedirectUrl(): Promise<string> {
    const row = await prisma.appSetting.findUnique({
        where: { key: PATIENT_SIDE_EFFECTS_FALLBACK_REDIRECT_KEY },
        select: { valueText: true },
    });
    const raw = row?.valueText?.trim();
    if (!raw) return DEFAULT_SIDE_EFFECTS_FALLBACK_REDIRECT;
    try {
        const u = new URL(raw);
        if (u.protocol !== 'http:' && u.protocol !== 'https:') return DEFAULT_SIDE_EFFECTS_FALLBACK_REDIRECT;
        return raw;
    } catch {
        return DEFAULT_SIDE_EFFECTS_FALLBACK_REDIRECT;
    }
}

/** Read nearby doctors radius (km) from AppSetting; used by GET /doctors/nearby and GET /settings/nearby-doctors-radius */
export async function getNearbyDoctorsRadiusKm(): Promise<number> {
    const row = await prisma.appSetting.findUnique({
        where: { key: NEARBY_DOCTORS_RADIUS_KM_KEY },
        select: { valueText: true }
    });
    if (!row?.valueText) return DEFAULT_RADIUS_KM;
    const n = parseFloat(row.valueText);
    if (!Number.isFinite(n) || n < MIN_RADIUS_KM || n > MAX_RADIUS_KM) return DEFAULT_RADIUS_KM;
    return Math.round(n);
}

const LOGO_SET_HEADER = 'X-Logo-Set';

/** GET /settings/logo - Public. Returns logo image or 204 No Content with X-Logo-Set: false when no logo (avoids 404 in console). */
export async function getLogo(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const row = await prisma.appSetting.findUnique({
            where: { key: LOGO_KEY }
        });
        if (!row?.valueBytes) {
            res.setHeader(LOGO_SET_HEADER, 'false');
            res.status(204).end();
            return;
        }
        const buf = Buffer.isBuffer(row.valueBytes) ? row.valueBytes : Buffer.from(row.valueBytes as unknown as ArrayBuffer);
        if (!buf.length) {
            res.setHeader(LOGO_SET_HEADER, 'false');
            res.status(204).end();
            return;
        }
        const contentType = row.contentType || 'image/png';
        res.setHeader('Content-Type', contentType);
        res.setHeader('Cache-Control', 'public, max-age=60');
        res.setHeader(LOGO_SET_HEADER, 'true');
        res.send(buf);
    } catch (error) {
        next(error);
    }
}

/** POST /settings/logo - Admin only. Upload logo (multipart file "logo"). */
export async function uploadLogo(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const file = req.file;
        if (!file?.buffer?.length) {
            res.status(400).json({ error: 'No file uploaded. Use field name "logo".' });
            return;
        }
        const allowed = ['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/svg+xml'];
        const contentType = file.mimetype || 'image/png';
        if (!allowed.includes(contentType)) {
            res.status(400).json({ error: 'Invalid file type. Use PNG, JPEG, GIF, WebP, or SVG.' });
            return;
        }
        const maxSize = 2 * 1024 * 1024; // 2MB
        if (file.size > maxSize) {
            res.status(400).json({ error: 'File too large. Maximum size is 2MB.' });
            return;
        }

        await prisma.appSetting.upsert({
            where: { key: LOGO_KEY },
            create: {
                key: LOGO_KEY,
                valueBytes: Buffer.from(file.buffer),
                contentType
            },
            update: {
                valueBytes: Buffer.from(file.buffer),
                contentType
            }
        });

        res.json({ success: true, message: 'Logo updated.' });
    } catch (error) {
        next(error);
    }
}

const putNearbyDoctorsRadiusSchema = z.object({
    radiusKm: z.number().int().min(MIN_RADIUS_KM).max(MAX_RADIUS_KM)
});

/** GET /settings/nearby-doctors-radius - Admin. Returns current radius in km. */
export async function getNearbyDoctorsRadius(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const radiusKm = await getNearbyDoctorsRadiusKm();
        res.json({ radiusKm });
    } catch (error) {
        next(error);
    }
}

/** PUT /settings/nearby-doctors-radius - Admin. Set radius in km (1–500). */
export async function putNearbyDoctorsRadius(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const body = putNearbyDoctorsRadiusSchema.parse(req.body);
        await prisma.appSetting.upsert({
            where: { key: NEARBY_DOCTORS_RADIUS_KM_KEY },
            create: {
                key: NEARBY_DOCTORS_RADIUS_KM_KEY,
                valueText: String(body.radiusKm)
            },
            update: { valueText: String(body.radiusKm) }
        });
        res.json({ radiusKm: body.radiusKm, message: 'Nearby doctors radius updated.' });
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.issues });
            return;
        }
        next(error);
    }
}

const putPatientSideEffectsFallbackRedirectSchema = z.object({
    redirectUrl: z.string().trim().min(1).max(2048).refine((s) => {
        try {
            const u = new URL(s);
            return u.protocol === 'http:' || u.protocol === 'https:';
        } catch {
            return false;
        }
    }, 'Must be a valid http(s) URL'),
});

/** GET /settings/patient-side-effects-fallback-redirect — Admin / SuperAdmin. Effective URL (stored or default). */
export async function getPatientSideEffectsFallbackRedirectSetting(
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const redirectUrl = await getPatientSideEffectsFallbackRedirectUrl();
        res.json({ redirectUrl });
    } catch (error) {
        next(error);
    }
}

/** PUT /settings/patient-side-effects-fallback-redirect — SuperAdmin only. */
export async function putPatientSideEffectsFallbackRedirectSetting(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const body = putPatientSideEffectsFallbackRedirectSchema.parse(req.body);
        await prisma.appSetting.upsert({
            where: { key: PATIENT_SIDE_EFFECTS_FALLBACK_REDIRECT_KEY },
            create: {
                key: PATIENT_SIDE_EFFECTS_FALLBACK_REDIRECT_KEY,
                valueText: body.redirectUrl,
            },
            update: { valueText: body.redirectUrl },
        });
        res.json({
            redirectUrl: body.redirectUrl,
            message: 'Patient side-effects fallback redirect URL updated.',
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.issues });
            return;
        }
        next(error);
    }
}
