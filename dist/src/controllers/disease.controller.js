"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDiseaseWarnings = exports.createDiseaseWarning = exports.deleteDisease = exports.updateDisease = exports.getAllDiseases = exports.getDiseaseById = exports.createDisease = void 0;
const zod_1 = require("zod");
const prisma_1 = require("../lib/prisma");
const disease_zod_1 = require("../zod/disease.zod");
// Create Disease
const createDisease = async (req, res, next) => {
    try {
        const validatedData = disease_zod_1.createDiseaseSchema.parse(req.body);
        const disease = await prisma_1.prisma.disease.create({
            data: validatedData
        });
        res.status(201).json({
            message: 'Disease created successfully',
            disease
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({ error: error.issues });
            return;
        }
        next(error);
    }
};
exports.createDisease = createDisease;
// Get Disease by ID
const getDiseaseById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const disease = await prisma_1.prisma.disease.findUnique({
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
    }
    catch (error) {
        next(error);
    }
};
exports.getDiseaseById = getDiseaseById;
// Get All Diseases
const getAllDiseases = async (req, res, next) => {
    try {
        const { search, category, page = '1', limit = '50' } = req.query;
        const whereClause = {};
        if (search) {
            whereClause.name = {
                contains: search,
                mode: 'insensitive'
            };
        }
        if (category) {
            // Filter by severity if category parameter is provided
            whereClause.severity = category;
        }
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const take = parseInt(limit);
        const [diseases, total] = await Promise.all([
            prisma_1.prisma.disease.findMany({
                where: whereClause,
                skip,
                take,
                orderBy: { name: 'asc' }
            }),
            prisma_1.prisma.disease.count({ where: whereClause })
        ]);
        res.json({
            diseases,
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / parseInt(limit))
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllDiseases = getAllDiseases;
// Update Disease
const updateDisease = async (req, res, next) => {
    try {
        const { id } = req.params;
        const validatedData = disease_zod_1.updateDiseaseSchema.parse(req.body);
        const disease = await prisma_1.prisma.disease.update({
            where: { id: parseInt(id) },
            data: validatedData
        });
        res.json({
            message: 'Disease updated successfully',
            disease
        });
    }
    catch (error) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'Disease not found' });
            return;
        }
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({ error: error.issues });
            return;
        }
        next(error);
    }
};
exports.updateDisease = updateDisease;
// Delete Disease
const deleteDisease = async (req, res, next) => {
    try {
        const { id } = req.params;
        await prisma_1.prisma.disease.delete({
            where: { id: parseInt(id) }
        });
        res.json({ message: 'Disease deleted successfully' });
    }
    catch (error) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'Disease not found' });
            return;
        }
        next(error);
    }
};
exports.deleteDisease = deleteDisease;
// Create Disease-Drug Warning Mapping
const createDiseaseWarning = async (req, res, next) => {
    try {
        const validatedData = disease_zod_1.createWarningSchema.parse(req.body);
        const warning = await prisma_1.prisma.diseaseActiveSubstanceWarning.create({
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
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
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
exports.createDiseaseWarning = createDiseaseWarning;
// Get Warnings for a Disease
const getDiseaseWarnings = async (req, res, next) => {
    try {
        const { diseaseId } = req.params;
        const warnings = await prisma_1.prisma.diseaseActiveSubstanceWarning.findMany({
            where: { diseaseId: parseInt(diseaseId) },
            include: {
                activeSubstance: {
                    select: { id: true, activeSubstance: true }
                }
            },
            orderBy: { severity: 'desc' }
        });
        res.json(warnings);
    }
    catch (error) {
        next(error);
    }
};
exports.getDiseaseWarnings = getDiseaseWarnings;
//# sourceMappingURL=disease.controller.js.map