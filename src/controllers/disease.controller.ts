import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { WarningSeverity, DiseaseSeverity } from '../generated/client';

// Validation Schemas
const createDiseaseSchema = z.object({
    name: z.string().min(1),
    severity: z.nativeEnum(DiseaseSeverity),
    description: z.string().optional()
});

const updateDiseaseSchema = createDiseaseSchema.partial();

const createWarningSchema = z.object({
    diseaseId: z.number().int().positive(),
    activeSubstanceId: z.number().int().positive(),
    warningFieldName: z.string().min(1),
    warningMessage: z.string().min(1),
    severity: z.nativeEnum(WarningSeverity)
});

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
                            select: { id: true, activeSubstance: true }
                        }
                    }
                },
                _count: {
                    select: {
                        patientDiseases: true,
                        diseaseActiveSubstanceWarnings: true
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
                orderBy: { name: 'asc' }
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
                activeSubstance: { select: { activeSubstance: true } }
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
                    select: { id: true, activeSubstance: true }
                }
            },
            orderBy: { severity: 'desc' }
        });

        res.json(warnings);
    } catch (error) {
        next(error);
    }
};
