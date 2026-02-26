import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import prisma from '../config/database';
import { DiseaseSeverity, DiseaseStatus } from '../../generated/client/client';
import { addPatientDiseaseSchema } from '../zod/patient.zod';

/** Normalize body to array (accept single object or array of objects) */
function normalizeToArray<T>(raw: unknown): T[] {
    return Array.isArray(raw) ? (raw as T[]) : raw != null ? [raw as T] : [];
}

// Create or update patient disease(s) — accepts single object or array (batch)
export const addPatientDisease = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const patientId = parseInt(req.params.patientId);
        const raw = req.body;
        const items = normalizeToArray(raw);
        const validatedItems = z.array(addPatientDiseaseSchema).min(1).parse(items);

        const patient = await prisma.patient.findUnique({
            where: { id: patientId }
        });

        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        const results: Awaited<ReturnType<typeof prisma.patientDisease.create>>[] = [];

        for (const v of validatedItems) {
            const { diseaseId, diagnosisDate, severity, status, notes } = v;

            const disease = await prisma.disease.findUnique({
                where: { id: diseaseId }
            });
            if (!disease) {
                return res.status(404).json({ error: `Disease not found: ${diseaseId}` });
            }

            const existing = await prisma.patientDisease.findFirst({
                where: { patientId, diseaseId }
            });

            if (existing) {
                const updated = await prisma.patientDisease.update({
                    where: { id: existing.id },
                    data: {
                        diagnosisDate: diagnosisDate ? new Date(diagnosisDate) : existing.diagnosisDate,
                        severity: severity ?? existing.severity,
                        status: status ?? existing.status,
                        notes: notes !== undefined ? notes : existing.notes
                    },
                    include: { disease: true }
                });
                results.push(updated);
            } else {
                const created = await prisma.patientDisease.create({
                    data: {
                        patientId,
                        diseaseId,
                        diagnosisDate: diagnosisDate ? new Date(diagnosisDate) : new Date(),
                        severity: severity as DiseaseSeverity,
                        status: status as DiseaseStatus,
                        notes
                    },
                    include: { disease: true }
                });
                results.push(created);
            }
        }

        return res.status(201).json(
            results.length === 1
                ? results[0]
                : { message: `${results.length} diseases added/updated`, patientDiseases: results }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: error.issues });
        }
        console.error('Error adding patient disease:', error);
        return next(error);
    }
};

// Get all diseases for a patient
export const getPatientDiseases = async (req: Request, res: Response) => {
    try {
        const patientId = parseInt(req.params.patientId);
        const { status } = req.query;

        const where: any = { patientId };
        if (status) {
            where.status = status;
        }

        const diseases = await prisma.patientDisease.findMany({
            where,
            include: {
                disease: true
            },
            orderBy: {
                diagnosisDate: 'desc'
            }
        });

        return res.json(diseases);
    } catch (error) {
        console.error('Error fetching patient diseases:', error);
        return res.status(500).json({ error: 'Failed to fetch patient diseases' });
    }
};

// Get active diseases for a patient (for safety checks)
export const getActivePatientDiseases = async (req: Request, res: Response) => {
    try {
        const patientId = parseInt(req.params.patientId);

        const activeDiseases = await prisma.patientDisease.findMany({
            where: {
                patientId,
                status: {
                    in: ['Active', 'Chronic']
                }
            },
            include: {
                disease: true
            },
            orderBy: {
                severity: 'desc'
            }
        });

        return res.json(activeDiseases);
    } catch (error) {
        console.error('Error fetching active diseases:', error);
        return res.status(500).json({ error: 'Failed to fetch active diseases' });
    }
};

// Update patient disease status
export const updatePatientDiseaseStatus = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const { status, severity, notes } = req.body;

        const updated = await prisma.patientDisease.update({
            where: { id },
            data: {
                status: status || undefined,
                severity: severity || undefined,
                notes: notes !== undefined ? notes : undefined
            },
            include: {
                disease: true
            }
        });

        return res.json(updated);
    } catch (error) {
        console.error('Error updating patient disease:', error);
        return res.status(500).json({ error: 'Failed to update patient disease' });
    }
};

// Delete patient disease
export const deletePatientDisease = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);

        await prisma.patientDisease.delete({
            where: { id }
        });

        return res.json({ message: 'Patient disease removed successfully' });
    } catch (error) {
        console.error('Error deleting patient disease:', error);
        return res.status(500).json({ error: 'Failed to delete patient disease' });
    }
};
