import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';

const LOGO_KEY = 'logo';

/** GET /settings/logo - Public. Returns logo image or 404. */
export async function getLogo(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const row = await prisma.appSetting.findUnique({
            where: { key: LOGO_KEY }
        });
        if (!row?.valueBytes) {
            res.status(404).end();
            return;
        }
        const buf = Buffer.isBuffer(row.valueBytes) ? row.valueBytes : Buffer.from(row.valueBytes as unknown as ArrayBuffer);
        if (!buf.length) {
            res.status(404).end();
            return;
        }
        const contentType = row.contentType || 'image/png';
        res.setHeader('Content-Type', contentType);
        res.setHeader('Cache-Control', 'public, max-age=60');
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
