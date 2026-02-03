"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../lib/prisma");
const medicalReport_zod_1 = require("../zod/medicalReport.zod");
class MedicalReportController {
    // Create medical report
    async createReport(req, res, next) {
        try {
            const data = medicalReport_zod_1.medicalReportSchema.parse(req.body);
            const report = await prisma_1.prisma.medicalReport.create({
                data: {
                    ...data,
                    reportDate: data.reportDate ? new Date(data.reportDate) : undefined
                },
                include: {
                    patient: {
                        select: {
                            name: true,
                            user: { select: { email: true } }
                        }
                    }
                }
            });
            res.status(201).json(report);
        }
        catch (error) {
            next(error);
        }
    }
    // Get all reports for a patient
    async getPatientReports(req, res, next) {
        try {
            const { patientId } = req.params;
            const { reportType, page = '1', limit = '20' } = req.query;
            const where = { patientId: Number(patientId) };
            if (reportType) {
                where.reportType = reportType;
            }
            const [reports, total] = await Promise.all([
                prisma_1.prisma.medicalReport.findMany({
                    where,
                    skip: (Number(page) - 1) * Number(limit),
                    take: Number(limit),
                    orderBy: { createdAt: 'desc' }
                }),
                prisma_1.prisma.medicalReport.count({ where })
            ]);
            res.json({
                reports,
                pagination: {
                    total,
                    page: Number(page),
                    limit: Number(limit),
                    totalPages: Math.ceil(total / Number(limit))
                }
            });
        }
        catch (error) {
            next(error);
        }
    }
    // Get single report
    async getReport(req, res, next) {
        try {
            const { id } = req.params;
            const report = await prisma_1.prisma.medicalReport.findUnique({
                where: { id: Number(id) },
                include: {
                    patient: {
                        select: {
                            name: true,
                            age: true,
                            user: { select: { email: true } }
                        }
                    }
                }
            });
            if (!report) {
                return res.status(404).json({ error: 'Medical report not found' });
            }
            res.json(report);
        }
        catch (error) {
            next(error);
        }
    }
    // Update medical report
    async updateReport(req, res, next) {
        try {
            const { id } = req.params;
            const { notes, reportType, reportDate } = req.body;
            const report = await prisma_1.prisma.medicalReport.update({
                where: { id: Number(id) },
                data: {
                    notes,
                    reportType,
                    reportDate: reportDate ? new Date(reportDate) : undefined
                }
            });
            res.json(report);
        }
        catch (error) {
            next(error);
        }
    }
    // Delete medical report
    async deleteReport(req, res, next) {
        try {
            const { id } = req.params;
            await prisma_1.prisma.medicalReport.delete({
                where: { id: Number(id) }
            });
            res.json({ message: 'Medical report deleted successfully' });
        }
        catch (error) {
            next(error);
        }
    }
    // Upload report file
    async uploadReportFile(req, res, next) {
        try {
            const { id } = req.params;
            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }
            const report = await prisma_1.prisma.medicalReport.update({
                where: { id: Number(id) },
                data: {
                    fileName: req.file.originalname,
                    fileUrl: `/uploads/${req.file.filename}`,
                    fileType: req.file.mimetype,
                    fileSize: req.file.size
                }
            });
            res.json(report);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = new MedicalReportController();
//# sourceMappingURL=medicalReport.controller.js.map