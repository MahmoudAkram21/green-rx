"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../lib/prisma");
class DiseaseWarningRuleController {
    // Get all warning rules for a disease
    async getWarningRulesForDisease(req, res, next) {
        try {
            const { diseaseId } = req.params;
            const rules = await prisma_1.prisma.diseaseWarningRule.findMany({
                where: { diseaseId: Number(diseaseId) },
                include: {
                    disease: {
                        select: {
                            id: true,
                            name: true,
                            severity: true
                        }
                    },
                    activeSubstance: {
                        select: {
                            id: true,
                            activeSubstance: true
                        }
                    },
                    creator: {
                        select: {
                            id: true,
                            email: true
                        }
                    }
                },
                orderBy: [
                    { severity: 'desc' },
                    { createdAt: 'desc' }
                ]
            });
            res.json(rules);
        }
        catch (error) {
            next(error);
        }
    }
    // Create a new warning rule
    async createWarningRule(req, res, next) {
        try {
            const { diseaseId, ruleType, targetActiveSubstanceId, targetDrugClass, severity, warningMessage, autoBlock, requiresOverride, requiredMonitoring } = req.body;
            const userId = req.user?.id;
            if (!userId) {
                res.status(401).json({ error: 'Unauthorized' });
                return;
            }
            // Validate disease exists
            const disease = await prisma_1.prisma.disease.findUnique({
                where: { id: diseaseId }
            });
            if (!disease) {
                res.status(404).json({ error: 'Disease not found' });
                return;
            }
            // Validate active substance if provided
            if (targetActiveSubstanceId) {
                const activeSubstance = await prisma_1.prisma.activeSubstance.findUnique({
                    where: { id: targetActiveSubstanceId }
                });
                if (!activeSubstance) {
                    res.status(404).json({ error: 'Active substance not found' });
                    return;
                }
            }
            const rule = await prisma_1.prisma.diseaseWarningRule.create({
                data: {
                    diseaseId,
                    ruleType,
                    targetActiveSubstanceId,
                    targetDrugClass,
                    severity,
                    warningMessage,
                    autoBlock: autoBlock || false,
                    requiresOverride: requiresOverride || false,
                    requiredMonitoring,
                    createdBy: userId
                },
                include: {
                    disease: true,
                    activeSubstance: true,
                    creator: {
                        select: {
                            id: true,
                            email: true
                        }
                    }
                }
            });
            res.status(201).json(rule);
        }
        catch (error) {
            next(error);
        }
    }
    // Get a single warning rule by ID
    async getWarningRuleById(req, res, next) {
        try {
            const { id } = req.params;
            const rule = await prisma_1.prisma.diseaseWarningRule.findUnique({
                where: { id: Number(id) },
                include: {
                    disease: true,
                    activeSubstance: true,
                    creator: {
                        select: {
                            id: true,
                            email: true
                        }
                    }
                }
            });
            if (!rule) {
                res.status(404).json({ error: 'Warning rule not found' });
                return;
            }
            res.json(rule);
        }
        catch (error) {
            next(error);
        }
    }
    // Update a warning rule
    async updateWarningRule(req, res, next) {
        try {
            const { id } = req.params;
            const { ruleType, targetActiveSubstanceId, targetDrugClass, severity, warningMessage, autoBlock, requiresOverride, requiredMonitoring } = req.body;
            const updateData = {};
            if (ruleType !== undefined)
                updateData.ruleType = ruleType;
            if (targetActiveSubstanceId !== undefined)
                updateData.targetActiveSubstanceId = targetActiveSubstanceId;
            if (targetDrugClass !== undefined)
                updateData.targetDrugClass = targetDrugClass;
            if (severity !== undefined)
                updateData.severity = severity;
            if (warningMessage !== undefined)
                updateData.warningMessage = warningMessage;
            if (autoBlock !== undefined)
                updateData.autoBlock = autoBlock;
            if (requiresOverride !== undefined)
                updateData.requiresOverride = requiresOverride;
            if (requiredMonitoring !== undefined)
                updateData.requiredMonitoring = requiredMonitoring;
            const rule = await prisma_1.prisma.diseaseWarningRule.update({
                where: { id: Number(id) },
                data: updateData,
                include: {
                    disease: true,
                    activeSubstance: true
                }
            });
            res.json(rule);
        }
        catch (error) {
            next(error);
        }
    }
    // Delete a warning rule
    async deleteWarningRule(req, res, next) {
        try {
            const { id } = req.params;
            await prisma_1.prisma.diseaseWarningRule.delete({
                where: { id: Number(id) }
            });
            res.json({ message: 'Warning rule deleted successfully' });
        }
        catch (error) {
            next(error);
        }
    }
    // Get all warning rules (with filters)
    async getAllWarningRules(req, res, next) {
        try {
            const { diseaseId, ruleType, severity } = req.query;
            const where = {};
            if (diseaseId)
                where.diseaseId = Number(diseaseId);
            if (ruleType)
                where.ruleType = ruleType;
            if (severity)
                where.severity = severity;
            const rules = await prisma_1.prisma.diseaseWarningRule.findMany({
                where,
                include: {
                    disease: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    activeSubstance: {
                        select: {
                            id: true,
                            activeSubstance: true
                        }
                    }
                },
                orderBy: [
                    { diseaseId: 'asc' },
                    { severity: 'desc' }
                ]
            });
            res.json(rules);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = new DiseaseWarningRuleController();
//# sourceMappingURL=diseaseWarningRule.controller.js.map