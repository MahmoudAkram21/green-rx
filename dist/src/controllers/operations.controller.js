"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOperation = exports.updateOperation = exports.createOperation = exports.getOperationById = exports.getAllOperations = void 0;
const prisma_1 = require("../lib/prisma");
const getAllOperations = async (_req, res, next) => {
    try {
        const operations = await prisma_1.prisma.operation.findMany({
            orderBy: { name: 'asc' }
        });
        res.json(operations);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllOperations = getAllOperations;
const getOperationById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid operation ID' });
            return;
        }
        const operation = await prisma_1.prisma.operation.findUnique({
            where: { id }
        });
        if (!operation) {
            res.status(404).json({ error: 'Operation not found' });
            return;
        }
        res.json(operation);
    }
    catch (error) {
        next(error);
    }
};
exports.getOperationById = getOperationById;
const createOperation = async (req, res, next) => {
    try {
        const { name } = req.body;
        if (!name) {
            res.status(400).json({ error: 'Name is required' });
            return;
        }
        const exactMatch = await prisma_1.prisma.operation.findUnique({
            where: { name }
        });
        if (exactMatch) {
            res.status(400).json({ error: 'Operation with this name already exists' });
            return;
        }
        const newOperation = await prisma_1.prisma.operation.create({
            data: { name }
        });
        res.status(201).json(newOperation);
    }
    catch (error) {
        next(error);
    }
};
exports.createOperation = createOperation;
const updateOperation = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const { name, isActive } = req.body;
        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid operation ID' });
            return;
        }
        const existing = await prisma_1.prisma.operation.findUnique({ where: { id } });
        if (!existing) {
            res.status(404).json({ error: 'Operation not found' });
            return;
        }
        if (name && name !== existing.name) {
            const exactMatch = await prisma_1.prisma.operation.findUnique({ where: { name } });
            if (exactMatch) {
                res.status(400).json({ error: 'Operation with this name already exists' });
                return;
            }
        }
        const updated = await prisma_1.prisma.operation.update({
            where: { id },
            data: {
                ...(name && { name }),
                ...(isActive !== undefined && { isActive }),
            }
        });
        res.json(updated);
    }
    catch (error) {
        next(error);
    }
};
exports.updateOperation = updateOperation;
const deleteOperation = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid operation ID' });
            return;
        }
        const existing = await prisma_1.prisma.operation.findUnique({ where: { id } });
        if (!existing) {
            res.status(404).json({ error: 'Operation not found' });
            return;
        }
        await prisma_1.prisma.operation.delete({ where: { id } });
        res.status(204).end();
    }
    catch (error) {
        next(error);
    }
};
exports.deleteOperation = deleteOperation;
//# sourceMappingURL=operations.controller.js.map