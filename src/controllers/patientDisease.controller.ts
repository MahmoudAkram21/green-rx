import { Request, Response } from 'express';
import prisma from '../config/database';
import { DiseaseSeverity, DiseaseStatus } from '../generated/client';

// Create or update patient disease
export const addPatientDisease = async (req: Request, res: Response) => {
    try {
        const patientId = parseInt(req.params.patientId);
        const { diseaseId, diagnosisDate, severity, status, notes } = req.body;

        // Validate patient exists
        const patient = await prisma.patient.findUnique({
            where: { id: patientId }
        });

        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        // Validate disease exists
        const disease = await prisma.disease.findUnique({
            where: { id: diseaseId }
        });

        if (!disease) {
            return res.status(404).json({ error: 'Disease not found' });
        }

        // Check if patient already has this disease
        const existing = await prisma.patientDisease.findFirst({
            where: {
                patientId,
                diseaseId
            }
        });

        if (existing) {
            // Update existing
            const updated = await prisma.patientDisease.update({
                where: { id: existing.id },
                data: {
                    diagnosisDate: diagnosisDate ? new Date(diagnosisDate) : existing.diagnosisDate,
                    severity: severity || existing.severity,
                    status: status || existing.status,
                    notes: notes !== undefined ? notes : existing.notes
                },
                include: {
                    disease: true
                }
            });

            return res.json(updated);
        }

        // Create new patient disease
        const patientDisease = await prisma.patientDisease.create({
            data: {
                patientId,
                diseaseId,
                diagnosisDate: new Date(diagnosisDate),
                severity: severity as DiseaseSeverity,
                status: status as DiseaseStatus,
                notes
            },
            include: {
                disease: true
            }
        });

        return res.status(201).json(patientDisease);
    } catch (error) {
        console.error('Error adding patient disease:', error);
        return res.status(500).json({ error: 'Failed to add patient disease' });
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
