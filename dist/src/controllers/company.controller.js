"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCompany = exports.updateCompany = exports.getAllCompanies = exports.getCompanyById = exports.createCompany = void 0;
const zod_1 = require("zod");
const prisma_1 = require("../lib/prisma");
const company_zod_1 = require("../zod/company.zod");
// Create Company
const createCompany = async (req, res, next) => {
    try {
        const validatedData = company_zod_1.createCompanySchema.parse(req.body);
        const company = await prisma_1.prisma.company.create({
            data: validatedData
        });
        res.status(201).json({
            message: 'Company created successfully',
            company
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({ error: error.issues });
            return;
        }
        if (error.code === 'P2002') {
            res.status(409).json({ error: 'Company with this name already exists' });
            return;
        }
        next(error);
    }
};
exports.createCompany = createCompany;
// Get Company by ID
const getCompanyById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const company = await prisma_1.prisma.company.findUnique({
            where: { id: parseInt(id) },
            include: {
                tradeNames: {
                    take: 10,
                    select: { id: true, title: true, activeSubstance: {
                            select: { id: true, activeSubstance: true }
                        } }
                },
                _count: {
                    select: {
                        tradeNames: true,
                        contractingCompanies: true,
                        adverseReactions: true
                    }
                }
            }
        });
        if (!company) {
            res.status(404).json({ error: 'Company not found' });
            return;
        }
        res.json(company);
    }
    catch (error) {
        next(error);
    }
};
exports.getCompanyById = getCompanyById;
// Get All Companies
const getAllCompanies = async (req, res, next) => {
    try {
        const { search, page = '1', limit = '20' } = req.query;
        const whereClause = {};
        if (search) {
            whereClause.name = {
                contains: search,
                mode: 'insensitive'
            };
        }
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const take = parseInt(limit);
        const [companies, total] = await Promise.all([
            prisma_1.prisma.company.findMany({
                where: whereClause,
                include: {
                    _count: {
                        select: {
                            tradeNames: true,
                            contractingCompanies: true,
                            adverseReactions: true
                        }
                    }
                },
                skip,
                take,
                orderBy: { name: 'asc' }
            }),
            prisma_1.prisma.company.count({ where: whereClause })
        ]);
        res.json({
            companies,
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
exports.getAllCompanies = getAllCompanies;
// Update Company
const updateCompany = async (req, res, next) => {
    try {
        const { id } = req.params;
        const validatedData = company_zod_1.updateCompanySchema.parse(req.body);
        const company = await prisma_1.prisma.company.update({
            where: { id: parseInt(id) },
            data: validatedData
        });
        res.json({
            message: 'Company updated successfully',
            company
        });
    }
    catch (error) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'Company not found' });
            return;
        }
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({ error: error.issues });
            return;
        }
        next(error);
    }
};
exports.updateCompany = updateCompany;
// Delete Company
const deleteCompany = async (req, res, next) => {
    try {
        const { id } = req.params;
        await prisma_1.prisma.company.delete({
            where: { id: parseInt(id) }
        });
        res.json({ message: 'Company deleted successfully' });
    }
    catch (error) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'Company not found' });
            return;
        }
        next(error);
    }
};
exports.deleteCompany = deleteCompany;
//# sourceMappingURL=company.controller.js.map