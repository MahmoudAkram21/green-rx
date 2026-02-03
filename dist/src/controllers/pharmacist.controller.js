"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPharmacists = exports.getPharmacistByUserId = exports.getPharmacistById = exports.createOrUpdatePharmacist = void 0;
const zod_1 = require("zod");
const prisma_1 = require("../lib/prisma");
const pharmacist_zod_1 = require("../zod/pharmacist.zod");
// Create or Update Pharmacist Profile
const createOrUpdatePharmacist = async (req, res, next) => {
    try {
        const validatedData = pharmacist_zod_1.createPharmacistSchema.parse(req.body);
        const { userId, ...pharmacistData } = validatedData;
        // Check if pharmacist already exists for this user
        const existingPharmacist = await prisma_1.prisma.pharmacist.findUnique({
            where: { userId }
        });
        if (existingPharmacist) {
            // Update existing pharmacist
            const updated = await prisma_1.prisma.pharmacist.update({
                where: { userId },
                data: pharmacistData,
                include: {
                    user: {
                        select: { email: true, role: true }
                    }
                }
            });
            res.json({
                message: 'Pharmacist profile updated successfully',
                pharmacist: updated
            });
            return;
        }
        // Create new pharmacist
        const pharmacist = await prisma_1.prisma.pharmacist.create({
            data: {
                ...pharmacistData,
                userId
            },
            include: {
                user: {
                    select: { email: true, role: true }
                }
            }
        });
        res.status(201).json({
            message: 'Pharmacist profile created successfully',
            pharmacist
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
exports.createOrUpdatePharmacist = createOrUpdatePharmacist;
// Get Pharmacist by ID
const getPharmacistById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const pharmacist = await prisma_1.prisma.pharmacist.findUnique({
            where: { id: parseInt(id) },
            include: {
                user: {
                    select: { email: true, role: true, isActive: true }
                }
            }
        });
        if (!pharmacist) {
            res.status(404).json({ error: 'Pharmacist not found' });
            return;
        }
        res.json(pharmacist);
    }
    catch (error) {
        next(error);
    }
};
exports.getPharmacistById = getPharmacistById;
// Get Pharmacist by User ID
const getPharmacistByUserId = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const pharmacist = await prisma_1.prisma.pharmacist.findUnique({
            where: { userId: parseInt(userId) },
            include: {
                user: {
                    select: { email: true, role: true, isActive: true }
                }
            }
        });
        if (!pharmacist) {
            res.status(404).json({ error: 'Pharmacist not found' });
            return;
        }
        res.json(pharmacist);
    }
    catch (error) {
        next(error);
    }
};
exports.getPharmacistByUserId = getPharmacistByUserId;
// Get All Pharmacists
const getAllPharmacists = async (req, res, next) => {
    try {
        const { search, page = '1', limit = '20' } = req.query;
        const whereClause = {};
        if (search) {
            whereClause.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { pharmacyName: { contains: search, mode: 'insensitive' } }
            ];
        }
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const take = parseInt(limit);
        const [pharmacists, total] = await Promise.all([
            prisma_1.prisma.pharmacist.findMany({
                where: whereClause,
                include: {
                    user: {
                        select: { email: true, isActive: true }
                    }
                },
                skip,
                take,
                orderBy: { createdAt: 'desc' }
            }),
            prisma_1.prisma.pharmacist.count({ where: whereClause })
        ]);
        res.json({
            pharmacists,
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
exports.getAllPharmacists = getAllPharmacists;
//# sourceMappingURL=pharmacist.controller.js.map