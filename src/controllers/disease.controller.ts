import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { ActiveSubstanceWarningField, DiseaseSeverity } from '../../generated/client/client';
import {
    createDiseaseSchema,
    updateDiseaseSchema,
    createWarningSchema,
    createBodySystemMappingSchema,
    bulkBodySystemMappingSchema,
} from '../zod/disease.zod';

// Create Disease
export const createDisease = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = createDiseaseSchema.parse(req.body);

        const disease = await prisma.disease.create({
            data: validatedData
        });

        res.status(201).json({
            message: 'Disease created successfully',
            disease
        });
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.issues });
            return;
        }
        next(error);
    }
};

// Get Disease by ID
export const getDiseaseById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const disease = await prisma.disease.findUnique({
            where: { id: parseInt(id) },
            include: {
                diseaseActiveSubstanceWarnings: {
                    include: {
                        activeSubstance: {
                            select: { id: true, name: true }
                        }
                    }
                },
                bodySystemMappings: {
                    orderBy: { fieldName: 'asc' }
                },
                _count: {
                    select: {
                        patientDiseases: true,
                        diseaseActiveSubstanceWarnings: true,
                        bodySystemMappings: true
                    }
                }
            }
        });

        if (!disease) {
            res.status(404).json({ error: 'Disease not found' });
            return;
        }

        res.json(disease);
    } catch (error) {
        next(error);
    }
};

// Get All Diseases
export const getAllDiseases = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            search,
            category,
            page = '1',
            limit = '50'
        } = req.query;

        const whereClause: any = {};

        if (search) {
            whereClause.name = {
                contains: search as string,
                mode: 'insensitive'
            };
        }

        if (category) {
            // Filter by severity if category parameter is provided
            whereClause.severity = category as DiseaseSeverity;
        }

        const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
        const take = parseInt(limit as string);

        const [diseases, total] = await Promise.all([
            prisma.disease.findMany({
                where: whereClause,
                skip,
                take,
                orderBy: { name: 'asc' },
                include: {
                    bodySystemMappings: {
                        orderBy: { fieldName: 'asc' },
                        select: { id: true, fieldName: true },
                    },
                },
            }),
            prisma.disease.count({ where: whereClause })
        ]);

        res.json({
            diseases,
            pagination: {
                total,
                page: parseInt(page as string),
                limit: parseInt(limit as string),
                totalPages: Math.ceil(total / parseInt(limit as string))
            }
        });
    } catch (error) {
        next(error);
    }
};

// Update Disease
export const updateDisease = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const validatedData = updateDiseaseSchema.parse(req.body);

        const disease = await prisma.disease.update({
            where: { id: parseInt(id) },
            data: validatedData
        });

        res.json({
            message: 'Disease updated successfully',
            disease
        });
    } catch (error: any) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'Disease not found' });
            return;
        }
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.issues });
            return;
        }
        next(error);
    }
};

// Delete Disease
export const deleteDisease = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        await prisma.disease.delete({
            where: { id: parseInt(id) }
        });

        res.json({ message: 'Disease deleted successfully' });
    } catch (error: any) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'Disease not found' });
            return;
        }
        next(error);
    }
};

// Create Disease-Drug Warning Mapping
export const createDiseaseWarning = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = createWarningSchema.parse(req.body);

        const warning = await prisma.diseaseActiveSubstanceWarning.create({
            data: validatedData,
            include: {
                disease: { select: { name: true } },
                activeSubstance: { select: { name: true } }
            }
        });

        res.status(201).json({
            message: 'Disease warning created successfully',
            warning
        });
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.issues });
            return;
        }
        if (error.code === 'P2002') {
            res.status(409).json({ error: 'Warning mapping already exists' });
            return;
        }
        next(error);
    }
};

// Get Warnings for a Disease
export const getDiseaseWarnings = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { diseaseId } = req.params;

        const warnings = await prisma.diseaseActiveSubstanceWarning.findMany({
            where: { diseaseId: parseInt(diseaseId) },
            include: {
                activeSubstance: {
                    select: { id: true, name: true }
                }
            },
            orderBy: { severity: 'desc' }
        });

        res.json(warnings);
    } catch (error) {
        next(error);
    }
};

// ── Body System Mappings ──────────────────────────────────────────────────────

// Get all body system mappings for a disease
export const getBodySystemMappings = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { diseaseId } = req.params;

        const mappings = await prisma.diseaseBodySystemMapping.findMany({
            where: { diseaseId: parseInt(diseaseId) },
            orderBy: { fieldName: 'asc' }
        });

        res.json(mappings);
    } catch (error) {
        next(error);
    }
};

// Add a single body system mapping to a disease
export const addBodySystemMapping = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = createBodySystemMappingSchema.parse(req.body);

        const disease = await prisma.disease.findUnique({ where: { id: validatedData.diseaseId } });
        if (!disease) {
            res.status(404).json({ error: 'Disease not found' });
            return;
        }

        const mapping = await prisma.diseaseBodySystemMapping.create({
            data: validatedData
        });

        res.status(201).json({ message: 'Body system mapping created', mapping });
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.issues });
            return;
        }
        if (error.code === 'P2002') {
            res.status(409).json({ error: 'Mapping already exists for this disease and field' });
            return;
        }
        next(error);
    }
};

// Bulk set body system mappings for a disease (replaces all existing ones)
export const setBodySystemMappings = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = bulkBodySystemMappingSchema.parse(req.body);
        const { diseaseId, fieldNames } = validatedData;

        const disease = await prisma.disease.findUnique({ where: { id: diseaseId } });
        if (!disease) {
            res.status(404).json({ error: 'Disease not found' });
            return;
        }

        // Replace all mappings for this disease atomically
        const [, mappings] = await prisma.$transaction([
            prisma.diseaseBodySystemMapping.deleteMany({ where: { diseaseId } }),
            prisma.diseaseBodySystemMapping.createManyAndReturn({
                data: fieldNames.map((fieldName) => ({ diseaseId, fieldName }))
            })
        ]);

        res.json({
            message: `${mappings.length} body system mappings set for disease ${diseaseId}`,
            mappings
        });
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.issues });
            return;
        }
        next(error);
    }
};

// Remove a single body system mapping by its ID
export const removeBodySystemMapping = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        await prisma.diseaseBodySystemMapping.delete({ where: { id: parseInt(id) } });

        res.json({ message: 'Body system mapping removed' });
    } catch (error: any) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'Body system mapping not found' });
            return;
        }
        next(error);
    }
};

// Get allowed body-system field options
export const getBodySystemFieldOptions = async (_req: Request, res: Response) => {
    res.json({
        fieldOptions: Object.values(ActiveSubstanceWarningField),
    });
};
