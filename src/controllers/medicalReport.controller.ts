import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { medicalReportSchema } from '../zod/medicalReport.zod';

class MedicalReportController {
    // Create medical report
    async createReport(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = medicalReportSchema.parse(req.body);

            const report = await prisma.medicalReport.create({
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
        } catch (error) {
            next(error);
        }
    }

    // Get all reports for a patient
    async getPatientReports(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { patientId } = req.params;
            const { reportType, page = '1', limit = '20' } = req.query;

            const where: any = { patientId: Number(patientId) };
            if (reportType) {
                where.reportType = reportType;
            }

            const [reports, total] = await Promise.all([
                prisma.medicalReport.findMany({
                    where,
                    skip: (Number(page) - 1) * Number(limit),
                    take: Number(limit),
                    orderBy: { createdAt: 'desc' }
                }),
                prisma.medicalReport.count({ where })
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
        } catch (error) {
            next(error);
        }
    }

    // Get single report
    async getReport(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;

            const report = await prisma.medicalReport.findUnique({
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
                return res.status(404).json({ error: 'Medical report not found' }) as any;
            }

            res.json(report);
        } catch (error) {
            next(error);
        }
    }

    // Update medical report
    async updateReport(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const { notes, reportType, reportDate } = req.body;

            const report = await prisma.medicalReport.update({
                where: { id: Number(id) },
                data: {
                    notes,
                    reportType,
                    reportDate: reportDate ? new Date(reportDate) : undefined
                }
            });

            res.json(report);
        } catch (error) {
            next(error);
        }
    }

    // Delete medical report
    async deleteReport(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;

            await prisma.medicalReport.delete({
                where: { id: Number(id) }
            });

            res.json({ message: 'Medical report deleted successfully' });
        } catch (error) {
            next(error);
        }
    }

    // Upload report file
    async uploadReportFile(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;

            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded' }) as any;
            }

            const report = await prisma.medicalReport.update({
                where: { id: Number(id) },
                data: {
                    fileName: req.file.originalname,
                    fileUrl: `/uploads/${req.file.filename}`,
                    fileType: req.file.mimetype,
                    fileSize: req.file.size
                }
            });

            res.json(report);
        } catch (error) {
            next(error);
        }
    }
}

export default new MedicalReportController();
