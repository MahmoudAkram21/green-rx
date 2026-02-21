import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { createCompanySchema, updateCompanySchema } from '../zod/company.zod';

// Create Company
export const createCompany = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = createCompanySchema.parse(req.body);
        const { phoneNumber, email, website, ...rest } = validatedData as any;
        const contactInfo = [phoneNumber, email, website].some(Boolean)
            ? { ...(phoneNumber && { phoneNumber }), ...(email && { email }), ...(website && { website }) }
            : (rest.contactInfo ?? undefined);
        const data: any = { name: rest.name, address: rest.address, governorate: rest.governorate, country: rest.country };
        if (contactInfo) data.contactInfo = contactInfo;

        const company = await prisma.company.create({
            data
        });

        res.status(201).json({
            message: 'Company created successfully',
            company
        });
    } catch (error: any) {
        if (error instanceof z.ZodError) {
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

// Get Company by ID
export const getCompanyById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const company = await prisma.company.findUnique({
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
    } catch (error) {
        next(error);
    }
};

// Get All Companies
export const getAllCompanies = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            search,
            page = '1',
            limit = '20'
        } = req.query;

        const whereClause: any = {};

        if (search) {
            whereClause.name = {
                contains: search as string,
                mode: 'insensitive'
            };
        }

        const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
        const take = parseInt(limit as string);

        const [companies, total] = await Promise.all([
            prisma.company.findMany({
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
            prisma.company.count({ where: whereClause })
        ]);

        res.json({
            companies,
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

// Update Company
export const updateCompany = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const validatedData = updateCompanySchema.parse(req.body) as any;
        const { phoneNumber, email, website, contactInfo: ci, ...rest } = validatedData;
        const contactInfo = [phoneNumber, email, website].some(Boolean)
            ? { ...(phoneNumber != null && { phoneNumber }), ...(email != null && { email }), ...(website != null && { website }) }
            : ci;
        const data: any = {};
        if (rest.name != null) data.name = rest.name;
        if (rest.address != null) data.address = rest.address;
        if (rest.governorate != null) data.governorate = rest.governorate;
        if (rest.country != null) data.country = rest.country;
        if (contactInfo != null) data.contactInfo = contactInfo;

        const company = await prisma.company.update({
            where: { id: parseInt(id) },
            data
        });

        res.json({
            message: 'Company updated successfully',
            company
        });
    } catch (error: any) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'Company not found' });
            return;
        }
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.issues });
            return;
        }
        next(error);
    }
};

// Delete Company
export const deleteCompany = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        await prisma.company.delete({
            where: { id: parseInt(id) }
        });

        res.json({ message: 'Company deleted successfully' });
    } catch (error: any) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'Company not found' });
            return;
        }
        next(error);
    }
};
