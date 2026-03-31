"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLifestyle = exports.updateLifestyle = exports.createLifestyle = exports.getLifestyleById = exports.getAllLifestyles = void 0;
const prisma_1 = require("../lib/prisma");
const getAllLifestyles = async (_req, res, next) => {
    try {
        const lifestyles = await prisma_1.prisma.lifestyle.findMany({
            orderBy: { id: 'asc' }
        });
        res.json(lifestyles);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllLifestyles = getAllLifestyles;
const getLifestyleById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid lifestyle ID' });
            return;
        }
        const lifestyle = await prisma_1.prisma.lifestyle.findUnique({
            where: { id }
        });
        if (!lifestyle) {
            res.status(404).json({ error: 'Lifestyle not found' });
            return;
        }
        res.json(lifestyle);
    }
    catch (error) {
        next(error);
    }
};
exports.getLifestyleById = getLifestyleById;
const createLifestyle = async (req, res, next) => {
    try {
        const { question, activeSubstanceField } = req.body;
        if (!question || !activeSubstanceField) {
            res.status(400).json({ error: 'Question and activeSubstanceField are required' });
            return;
        }
        const newLifestyle = await prisma_1.prisma.lifestyle.create({
            data: { question, activeSubstanceField }
        });
        res.status(201).json(newLifestyle);
    }
    catch (error) {
        next(error);
    }
};
exports.createLifestyle = createLifestyle;
const updateLifestyle = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const { question, activeSubstanceField } = req.body;
        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid lifestyle ID' });
            return;
        }
        const existing = await prisma_1.prisma.lifestyle.findUnique({ where: { id } });
        if (!existing) {
            res.status(404).json({ error: 'Lifestyle not found' });
            return;
        }
        const updated = await prisma_1.prisma.lifestyle.update({
            where: { id },
            data: {
                ...(question && { question }),
                ...(activeSubstanceField && { activeSubstanceField }),
            }
        });
        res.json(updated);
    }
    catch (error) {
        next(error);
    }
};
exports.updateLifestyle = updateLifestyle;
const deleteLifestyle = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid lifestyle ID' });
            return;
        }
        const existing = await prisma_1.prisma.lifestyle.findUnique({ where: { id } });
        if (!existing) {
            res.status(404).json({ error: 'Lifestyle not found' });
            return;
        }
        await prisma_1.prisma.lifestyle.delete({ where: { id } });
        res.status(204).end();
    }
    catch (error) {
        next(error);
    }
};
exports.deleteLifestyle = deleteLifestyle;
//# sourceMappingURL=lifestyles.controller.js.map