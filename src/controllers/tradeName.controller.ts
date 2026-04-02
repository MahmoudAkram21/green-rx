import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { createTradeNameSchema, updateTradeNameSchema } from '../zod/tradeName.zod';
import { extractMedicineFromImage } from '../services/medicineImageExtraction.service';
import { evaluateDrugSafety, loadPatientContext } from '../services/pharmaSafetyEngine.service';

// Create Trade Name
export const createTradeName = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = createTradeNameSchema.parse(req.body);

        const tradeName = await prisma.tradeName.create({
            data: validatedData as any,
            include: {
                activeSubstance: {
                    select: { name: true }
                },
                company: {
                    select: { name: true }
                },
                companyInstructionsPdf: true
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
                    activeSubstance: { select: { name: true, id: true } },
                    company: { select: { name: true, id: true } },
                    companyInstructionsPdf: true
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
                },
                companyInstructionsPdf: true
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
                          activeSubstance: {
                              select: {
                                  id: true,
                                  name: true,
                                  classificationId: true,
                                  dosageForm: true
                              }
                          },
                          company: { select: { id: true, name: true } },
                          companyInstructionsPdf: true
                      }
                  })
                : Promise.resolve([]),
            extracted.activeSubstance
                ? prisma.activeSubstance.findMany({
                      where: {
                          name: { contains: extracted.activeSubstance, mode: 'insensitive' },
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
                    t.activeSubstance.name
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

// Search Trade Names — GET /trade-names/search?q=... Optional: activeSubstanceId, classification, dosageForm, companyId, isActive, availabilityStatus, patientId, page, limit.
export const searchTradeNames = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            q,
            search,
            activeSubstanceId,
            classification,
            dosageForm,
            concentration,
            companyId,
            isActive,
            availabilityStatus,
            patientId,
            page = '1',
            limit = '20'
        } = req.query;

        const query = (typeof q === 'string' ? q : typeof search === 'string' ? search : '').trim();
        const pageNum = Math.max(1, parseInt(String(page), 10) || 1);
        const limitNum = Math.min(100, Math.max(1, parseInt(String(limit), 10) || 20));
        const resolvedPatientId = patientId ? parseInt(String(patientId), 10) : null;

        const whereClause: any = { isActive: true };

        if (query) {
            whereClause.OR = [
                { title: { contains: query, mode: 'insensitive' } },
                {
                    activeSubstance: {
                        name: { contains: query, mode: 'insensitive' }
                    }
                }
            ];
        }

        if (activeSubstanceId !== undefined && activeSubstanceId !== '') {
            const id = parseInt(String(activeSubstanceId), 10);
            if (!Number.isNaN(id)) whereClause.activeSubstanceId = id;
        }

        if ((classification !== undefined && classification !== '') || (dosageForm !== undefined && dosageForm !== '') || (concentration !== undefined && concentration !== '')) {
            whereClause.activeSubstance = whereClause.activeSubstance || {};
            if (classification !== undefined && classification !== '') {
                whereClause.activeSubstance.classification = { is: { name: { contains: String(classification), mode: 'insensitive' } } };
            }
            if (dosageForm !== undefined && dosageForm !== '') {
                whereClause.activeSubstance.dosageForm = { equals: String(dosageForm), mode: 'insensitive' };
            }
            if (concentration !== undefined && concentration !== '') {
                whereClause.activeSubstance.concentration = { contains: String(concentration), mode: 'insensitive' };
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
                        select: { id: true, name: true, classificationId: true, dosageForm: true }
                    },
                    company: { select: { id: true, name: true } },
                    companyInstructionsPdf: true,
                    // Excipients needed for allergy check when patient context is present
                    ...(resolvedPatientId
                        ? {
                              excipientTradeName: {
                                  include: { excipient: { select: { id: true, name: true } } }
                              }
                          }
                        : {})
                },
                skip,
                take: limitNum,
                orderBy: { title: 'asc' }
            }),
            prisma.tradeName.count({ where: whereClause })
        ]);

        // Attach safety status per result when patientId is provided.
        // Patient context is loaded ONCE here and passed into every evaluateDrugSafety
        // call to avoid an N+1 query (one DB hit per trade name result).
        let tradeNamesWithSafety: any[] = tradeNames;
        if (resolvedPatientId && !Number.isNaN(resolvedPatientId)) {
            const preloadedPatient = await loadPatientContext(resolvedPatientId);
            tradeNamesWithSafety = await Promise.all(
                tradeNames.map(async (tn) => {
                    const safetyStatus = await evaluateDrugSafety({
                        patientId: resolvedPatientId,
                        tradeNameId: tn.id,
                        activeSubstanceId: (tn as any).activeSubstance?.id,
                        preloadedPatient,
                    });
                    return { ...tn, safetyStatus };
                })
            );
        } else {
            tradeNamesWithSafety = tradeNames.map((tn) => ({ ...tn, safetyStatus: null }));
        }

        res.json({
            tradeNames: tradeNamesWithSafety,
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

/**
 * View and increment the InstructionPdf view counter
 * POST /trade-names/:tradeNameId/instruction-pdf/view
 * Doctors call this endpoint to view the PDF and increment the views counter
 */
export const viewInstructionPdf = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { tradeNameId } = req.params;
        const id = parseInt(tradeNameId);

        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid trade name ID' });
            return;
        }

        // Get the instruction PDF and increment views
        const instructionPdf = await prisma.instructionPdf.findUnique({
            where: { tradeNameId: id }
        });

        if (!instructionPdf) {
            res.status(404).json({ error: 'Instruction PDF not found for this medicine' });
            return;
        }

        // Increment the views counter
        const updatedPdf = await prisma.instructionPdf.update({
            where: { tradeNameId: id },
            data: {
                views: {
                    increment: 1
                }
            },
            include: {
                tradeName: {
                    select: {
                        id: true,
                        title: true
                    }
                }
            }
        });

        res.json({
            success: true,
            instructionPdf: {
                id: updatedPdf.id,
                url: updatedPdf.url,
                views: updatedPdf.views,
                tradeNameId: updatedPdf.tradeNameId,
                tradeName: updatedPdf.tradeName,
                createdAt: updatedPdf.createdAt,
                updatedAt: updatedPdf.updatedAt
            }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Get InstructionPdf view count statistics
 * GET /trade-names/:tradeNameId/instruction-pdf/stats
 * Returns view count without incrementing
 */
export const getInstructionPdfStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { tradeNameId } = req.params;
        const id = parseInt(tradeNameId);

        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid trade name ID' });
            return;
        }

        const instructionPdf = await prisma.instructionPdf.findUnique({
            where: { tradeNameId: id },
            include: {
                tradeName: {
                    select: {
                        id: true,
                        title: true
                    }
                }
            }
        });

        if (!instructionPdf) {
            res.status(404).json({ error: 'Instruction PDF not found for this medicine' });
            return;
        }

        res.json({
            success: true,
            stats: {
                id: instructionPdf.id,
                views: instructionPdf.views,
                tradeNameId: instructionPdf.tradeNameId,
                tradeName: instructionPdf.tradeName,
                createdAt: instructionPdf.createdAt,
                updatedAt: instructionPdf.updatedAt
            }
        });
    } catch (error) {
        next(error);
    }
};
