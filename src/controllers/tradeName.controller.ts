import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { createTradeNameSchema, updateTradeNameSchema } from '../zod/tradeName.zod';
import { extractMedicineFromImage } from '../services/medicineImageExtraction.service';

// Create Trade Name
export const createTradeName = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = createTradeNameSchema.parse(req.body);

        const tradeName = await prisma.tradeName.create({
            data: validatedData as any,
            include: {
                activeSubstance: {
                    select: { activeSubstance: true }
                },
                company: {
                    select: { name: true }
                }
            }
        });

        res.status(201).json({
            message: 'Trade name created successfully',
            tradeName
        });
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.issues });
            return;
        }
        if (error.code === 'P2002') {
            res.status(409).json({ error: 'Trade name already exists' });
            return;
        }
        next(error);
    }
};

// List Trade Names (for dropdowns, PatientTest, etc.)
export const listTradeNames = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { page = '1', limit = '100' } = req.query;
        const pageNum = Math.max(1, parseInt(page as string) || 1);
        const limitNum = Math.min(1000, Math.max(1, parseInt(limit as string) || 100));
        const skip = (pageNum - 1) * limitNum;

        const [tradeNames, total] = await Promise.all([
            prisma.tradeName.findMany({
                include: {
                    activeSubstance: { select: { activeSubstance: true, id: true } },
                    company: { select: { name: true, id: true } }
                },
                orderBy: { title: 'asc' },
                skip,
                take: limitNum
            }),
            prisma.tradeName.count()
        ]);

        res.json({
            tradeNames,
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
};

// Get Trade Name by ID
export const getTradeNameById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const tradeName = await prisma.tradeName.findUnique({
            where: { id: parseInt(id) },
            include: {
                activeSubstance: {
                    include: {
                        medicationSideEffects: {
                            include: {
                                sideEffect: { select: { id: true, name: true, nameAr: true } }
                            },
                            orderBy: { sideEffect: { name: 'asc' } }
                        }
                    }
                },
                company: true,
                adverseReactions: {
                    take: 10,
                    orderBy: { createdAt: 'desc' }
                }
            }
        });

        if (!tradeName) {
            res.status(404).json({ error: 'Trade name not found' });
            return;
        }

        res.json(tradeName);
    } catch (error) {
        next(error);
    }
};

/**
 * Search for trade names by image. AI extracts medicine data from the image, then we search the DB.
 * POST /trade-names/search-by-image with multipart/form-data field "image".
 */
export const searchTradeNamesByImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.file) {
            res.status(400).json({ error: 'Image file is required. Send as multipart/form-data with field "image".' });
            return;
        }
        const buffer = req.file.buffer as Buffer;
        const mimeType = req.file.mimetype || 'image/jpeg';

        const extracted = await extractMedicineFromImage(buffer, mimeType);
        if (!extracted || (!extracted.tradeName && !extracted.activeSubstance)) {
            res.json({
                extracted: extracted ?? null,
                tradeNames: [],
                activeSubstances: [],
                message: 'Could not extract medicine details from the image, or image did not contain trade name or active substance.'
            });
            return;
        }

        const [tradeNames, activeSubstances] = await Promise.all([
            extracted.tradeName
                ? prisma.tradeName.findMany({
                      where: {
                          title: { contains: extracted.tradeName, mode: 'insensitive' },
                          isActive: true
                      },
                      take: 20,
                      include: {
                          activeSubstance: { select: { id: true, activeSubstance: true, classification: true, dosageForm: true } },
                          company: { select: { id: true, name: true } }
                      }
                  })
                : Promise.resolve([]),
            extracted.activeSubstance
                ? prisma.activeSubstance.findMany({
                      where: {
                          activeSubstance: { contains: extracted.activeSubstance, mode: 'insensitive' },
                          isActive: true
                      },
                      take: 10
                  })
                : Promise.resolve([])
        ]);

        // If we have both trade name and active substance from AI, prefer trade name results that match the active substance
        let matchedTradeNames = tradeNames;
        if (tradeNames.length > 0 && extracted.activeSubstance) {
            const withMatchingSubstance = tradeNames.filter(
                (t) =>
                    t.activeSubstance.activeSubstance
                        .toLowerCase()
                        .includes(extracted.activeSubstance!.toLowerCase())
            );
            if (withMatchingSubstance.length > 0) {
                matchedTradeNames = withMatchingSubstance;
            }
        }

        res.json({
            extracted: {
                tradeName: extracted.tradeName,
                activeSubstance: extracted.activeSubstance,
                concentration: extracted.concentration ?? null,
                dosageForm: extracted.dosageForm ?? null
            },
            tradeNames: matchedTradeNames,
            activeSubstances: activeSubstances.length > 0 ? activeSubstances : undefined
        });
    } catch (error) {
        next(error);
    }
};

// Search Trade Names — GET /trade-names/search?q=... Optional: activeSubstanceId, classification, dosageForm, companyId, isActive, availabilityStatus, page, limit.
export const searchTradeNames = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            q,
            search,
            activeSubstanceId,
            classification,
            dosageForm,
            companyId,
            isActive,
            availabilityStatus,
            page = '1',
            limit = '20'
        } = req.query;

        const query = (typeof q === 'string' ? q : typeof search === 'string' ? search : '').trim();
        const pageNum = Math.max(1, parseInt(String(page), 10) || 1);
        const limitNum = Math.min(100, Math.max(1, parseInt(String(limit), 10) || 20));

        const whereClause: any = { isActive: true };

        if (query) {
            whereClause.OR = [
                { title: { contains: query, mode: 'insensitive' } },
                {
                    activeSubstance: {
                        activeSubstance: { contains: query, mode: 'insensitive' }
                    }
                }
            ];
        }

        if (activeSubstanceId !== undefined && activeSubstanceId !== '') {
            const id = parseInt(String(activeSubstanceId), 10);
            if (!Number.isNaN(id)) whereClause.activeSubstanceId = id;
        }

        if ((classification !== undefined && classification !== '') || (dosageForm !== undefined && dosageForm !== '')) {
            whereClause.activeSubstance = whereClause.activeSubstance || {};
            if (classification !== undefined && classification !== '') {
                whereClause.activeSubstance.classification = { contains: String(classification), mode: 'insensitive' };
            }
            if (dosageForm !== undefined && dosageForm !== '') {
                whereClause.activeSubstance.dosageForm = { equals: String(dosageForm), mode: 'insensitive' };
            }
        }

        if (companyId !== undefined && companyId !== '') {
            const id = parseInt(String(companyId), 10);
            if (!Number.isNaN(id)) whereClause.companyId = id;
        }

        if (isActive !== undefined && isActive !== '') {
            whereClause.isActive = isActive === 'true' || isActive === '1';
        }

        if (availabilityStatus !== undefined && availabilityStatus !== '') {
            const status = String(availabilityStatus);
            if (['InStock', 'OutOfStock', 'Discontinued', 'Pending'].includes(status)) {
                whereClause.availabilityStatus = status;
            }
        }

        const skip = (pageNum - 1) * limitNum;

        const [tradeNames, total] = await Promise.all([
            prisma.tradeName.findMany({
                where: whereClause,
                include: {
                    activeSubstance: {
                        select: { id: true, activeSubstance: true, classification: true, dosageForm: true }
                    },
                    company: {
                        select: { id: true, name: true }
                    }
                },
                skip,
                take: limitNum,
                orderBy: { title: 'asc' }
            }),
            prisma.tradeName.count({ where: whereClause })
        ]);

        res.json({
            tradeNames,
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
};

// Update Trade Name
export const updateTradeName = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const validatedData = updateTradeNameSchema.parse(req.body);

        const tradeName = await prisma.tradeName.update({
            where: { id: parseInt(id) },
            data: validatedData as any,
            include: {
                activeSubstance: true,
                company: true
            }
        });

        res.json({
            message: 'Trade name updated successfully',
            tradeName
        });
    } catch (error: any) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'Trade name not found' });
            return;
        }
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.issues });
            return;
        }
        next(error);
    }
};

// Delete Trade Name
export const deleteTradeName = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        await prisma.tradeName.delete({
            where: { id: parseInt(id) }
        });

        res.json({ message: 'Trade name deleted successfully' });
    } catch (error: any) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'Trade name not found' });
            return;
        }
        next(error);
    }
};
