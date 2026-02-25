"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSurgicalHistory = exports.addSurgicalHistory = exports.getSurgicalHistories = void 0;
const zod_1 = require("zod");
const prisma_1 = require("../lib/prisma");
const createSurgicalHistorySchema = zod_1.z.object({
    operationName: zod_1.z.string().min(1),
    surgeryDate: zod_1.z.union([zod_1.z.string().datetime(), zod_1.z.coerce.date()]),
});
const getSurgicalHistories = async (req, res, next) => {
    try {
        const patientId = parseInt(req.params.patientId);
        const list = await prisma_1.prisma.surgicalHistory.findMany({
            where: { patientId },
            orderBy: { surgeryDate: 'desc' },
        });
        res.json(list);
    }
    catch (error) {
        next(error);
    }
};
exports.getSurgicalHistories = getSurgicalHistories;
const addSurgicalHistory = async (req, res, next) => {
    try {
        const patientId = parseInt(req.params.patientId);
        const validated = createSurgicalHistorySchema.parse(req.body);
        const patient = await prisma_1.prisma.patient.findUnique({ where: { id: patientId } });
        if (!patient) {
            res.status(404).json({ error: 'Patient not found' });
            return;
        }
        const surgeryDate = typeof validated.surgeryDate === 'string' ? new Date(validated.surgeryDate) : validated.surgeryDate;
        const record = await prisma_1.prisma.surgicalHistory.create({
            data: {
                patientId,
                operationName: validated.operationName,
                surgeryDate,
            },
        });
        res.status(201).json({ message: 'Surgical history added successfully', surgicalHistory: record });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({ error: error.issues });
            return;
        }
        next(error);
    }
};
exports.addSurgicalHistory = addSurgicalHistory;
const deleteSurgicalHistory = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        await prisma_1.prisma.surgicalHistory.delete({ where: { id } });
        res.json({ message: 'Surgical history deleted successfully' });
    }
    catch (error) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'Surgical history not found' });
            return;
        }
        next(error);
    }
};
exports.deleteSurgicalHistory = deleteSurgicalHistory;
//# sourceMappingURL=surgicalHistory.controller.js.map