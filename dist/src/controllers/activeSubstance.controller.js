"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDrugInteractions = exports.deleteActiveSubstance = exports.updateActiveSubstance = exports.searchActiveSubstances = exports.getActiveSubstanceById = exports.createActiveSubstance = void 0;
const zod_1 = require("zod");
const prisma_1 = require("../lib/prisma");
const createActiveSubstance_zod_1 = require("../zod/createActiveSubstance.zod");
// Create Active Substance
const createActiveSubstance = async (req, res, next) => {
    try {
        const validatedData = createActiveSubstance_zod_1.createActiveSubstanceSchema.parse(req.body);
        const activeSubstance = await prisma_1.prisma.activeSubstance.create({
            data: validatedData, // Cast due to 178 fields complexity
        });
        res.status(201).json({
            message: "Active substance created successfully",
            activeSubstance,
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({ error: error.issues });
            return;
        }
        if (error.code === "P2002") {
            res
                .status(409)
                .json({ error: "Active substance with this name already exists" });
            return;
        }
        next(error);
    }
};
exports.createActiveSubstance = createActiveSubstance;
// Get Active Substance by ID
const getActiveSubstanceById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const activeSubstance = await prisma_1.prisma.activeSubstance.findUnique({
            where: { id: parseInt(id) },
            include: {
                tradeNames: true,
                adverseReactions: {
                    take: 10,
                    orderBy: { createdAt: "desc" },
                },
            },
        });
        if (!activeSubstance) {
            res.status(404).json({ error: "Active substance not found" });
            return;
        }
        res.json(activeSubstance);
    }
    catch (error) {
        next(error);
    }
};
exports.getActiveSubstanceById = getActiveSubstanceById;
// Search Active Substances
const searchActiveSubstances = async (req, res, next) => {
    try {
        const { search, therapeuticClass, companyId, requiresPrescription, page = "1", limit = "20", } = req.query;
        const whereClause = {};
        if (search) {
            whereClause.OR = [
                {
                    activeSubstance: { contains: search, mode: "insensitive" },
                },
                { classification: { contains: search, mode: "insensitive" } },
            ];
        }
        if (therapeuticClass) {
            whereClause.classification = {
                contains: therapeuticClass,
                mode: "insensitive",
            };
        }
        if (companyId) {
            whereClause.companyId = parseInt(companyId);
        }
        if (requiresPrescription !== undefined) {
            whereClause.requiresPrescription = requiresPrescription === "true";
        }
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const take = parseInt(limit);
        const [substances, total] = await Promise.all([
            prisma_1.prisma.activeSubstance.findMany({
                where: whereClause,
                skip,
                take,
                orderBy: { activeSubstance: "asc" },
                include: {
                    _count: { select: { tradeNames: true } },
                },
            }),
            prisma_1.prisma.activeSubstance.count({ where: whereClause }),
        ]);
        res.json({
            substances,
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / parseInt(limit)),
            },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.searchActiveSubstances = searchActiveSubstances;
// Update Active Substance
const updateActiveSubstance = async (req, res, next) => {
    try {
        const { id } = req.params;
        const validatedData = createActiveSubstance_zod_1.updateActiveSubstanceSchema.parse(req.body);
        const activeSubstance = await prisma_1.prisma.activeSubstance.update({
            where: { id: parseInt(id) },
            data: validatedData,
        });
        res.json({
            message: "Active substance updated successfully",
            activeSubstance,
        });
    }
    catch (error) {
        if (error.code === "P2025") {
            res.status(404).json({ error: "Active substance not found" });
            return;
        }
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({ error: error.issues });
            return;
        }
        next(error);
    }
};
exports.updateActiveSubstance = updateActiveSubstance;
// Delete Active Substance
const deleteActiveSubstance = async (req, res, next) => {
    try {
        const { id } = req.params;
        await prisma_1.prisma.activeSubstance.delete({
            where: { id: parseInt(id) },
        });
        res.json({ message: "Active substance deleted successfully" });
    }
    catch (error) {
        if (error.code === "P2025") {
            res.status(404).json({ error: "Active substance not found" });
            return;
        }
        next(error);
    }
};
exports.deleteActiveSubstance = deleteActiveSubstance;
// Get Drug Interactions for Active Substance
const getDrugInteractions = async (req, res, next) => {
    try {
        const { id } = req.params;
        // Get all trade names for this active substance
        const tradeNames = await prisma_1.prisma.tradeName.findMany({
            where: { activeSubstanceId: parseInt(id) },
            select: { id: true },
        });
        const tradeNameIds = tradeNames.map((tn) => tn.id);
        if (tradeNameIds.length === 0) {
            res.json([]);
            return;
        }
        // Find all drug interaction alerts for prescriptions that use trade names of this active substance
        // or where the interacting medicine is a trade name of this active substance
        const interactions = await prisma_1.prisma.drugInteractionAlert.findMany({
            where: {
                OR: [
                    {
                        prescription: {
                            tradeNameId: {
                                in: tradeNameIds,
                            },
                        },
                    },
                    {
                        interactingMedicineId: {
                            in: tradeNameIds,
                        },
                    },
                ],
            },
            include: {
                prescription: {
                    include: {
                        tradeName: {
                            include: {
                                activeSubstance: {
                                    select: {
                                        id: true,
                                        activeSubstance: true,
                                    },
                                },
                            },
                        },
                    },
                },
                interactingMedicine: {
                    include: {
                        activeSubstance: {
                            select: {
                                id: true,
                                activeSubstance: true,
                            },
                        },
                    },
                },
            },
        });
        res.json(interactions);
    }
    catch (error) {
        next(error);
    }
};
exports.getDrugInteractions = getDrugInteractions;
//# sourceMappingURL=activeSubstance.controller.js.map