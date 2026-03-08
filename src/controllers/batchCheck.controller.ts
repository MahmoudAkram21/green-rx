import { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import { prisma } from '../lib/prisma';
import { extractBatchNumberFromImage } from '../services/batchNumberExtraction.service';

const uploadsDir = path.join(__dirname, '../../uploads/patient-medicines');
const NOT_IN_DB_MESSAGE =
  'This batch number is not in our database. Some companies do not share batch data with us.';

/**
 * GET /batch-check/trade-name/:tradeNameId
 * List all batch numbers (BatchHistory) for a trade name. A trade name can have many batches.
 */
export async function listBatchesByTradeName(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const tradeNameId = Number(req.params.tradeNameId);
    if (!Number.isFinite(tradeNameId)) {
      res.status(400).json({ error: 'Invalid tradeNameId' });
      return;
    }
    const batches = await prisma.batchHistory.findMany({
      where: { tradeNameId },
      include: { tradeName: { select: { id: true, title: true } } },
      orderBy: [{ manufacturingDate: 'desc' }, { createdAt: 'desc' }],
    });
    res.json({ tradeNameId, count: batches.length, batches });
  } catch (error) {
    next(error);
  }
}

/**
 * POST /batch-check
 * Body (JSON): { batchNumber?: string }
 * Or multipart: image (file). If both, image extraction is tried first; body.batchNumber is fallback.
 * Returns: { status: 'approved' | 'recalled' | 'not_in_database', batchNumber, ... }
 */
export async function checkBatch(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    let batchNumber: string | undefined;

    if (req.file && fs.existsSync(path.join(uploadsDir, req.file.filename))) {
      const buffer = fs.readFileSync(path.join(uploadsDir, req.file.filename));
      const extracted = await extractBatchNumberFromImage(buffer, req.file.mimetype || 'image/jpeg');
      if (extracted) batchNumber = extracted;
      try { fs.unlinkSync(path.join(uploadsDir, req.file.filename)); } catch { /* ignore */ }
    }

    if (!batchNumber && req.body?.batchNumber != null) {
      batchNumber = typeof req.body.batchNumber === 'string' ? req.body.batchNumber.trim() : String(req.body.batchNumber).trim();
    }

    if (!batchNumber) {
      res.status(400).json({
        error: 'Batch number is required. Enter it manually or upload an image of the batch number on the package.',
        status: 'error',
      });
      return;
    }

    const normalized = batchNumber.trim();

    const batch = await prisma.batchHistory.findFirst({
      where: {
        batchNumber: { equals: normalized, mode: 'insensitive' },
      },
      include: {
        tradeName: { select: { id: true, title: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!batch) {
      res.json({
        status: 'not_in_database',
        batchNumber: normalized,
        message: NOT_IN_DB_MESSAGE,
      });
      return;
    }

    if (batch.isRecalled) {
      res.json({
        status: 'recalled',
        batchNumber: batch.batchNumber,
        tradeNameId: batch.tradeNameId,
        tradeName: batch.tradeName,
        expiryDate: batch.expiryDate,
        manufacturingDate: batch.manufacturingDate,
        isRecalled: true,
        recallReason: batch.recallReason ?? undefined,
        recallDate: batch.recallDate ?? undefined,
        message: batch.recallReason || 'This batch has been recalled.',
      });
      return;
    }

    res.json({
      status: 'approved',
      batchNumber: batch.batchNumber,
      tradeNameId: batch.tradeNameId,
      tradeName: batch.tradeName,
      expiryDate: batch.expiryDate,
      manufacturingDate: batch.manufacturingDate,
      isRecalled: false,
    });
  } catch (error) {
    next(error);
  }
}
