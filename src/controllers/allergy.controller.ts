import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { AllergySeverity } from '../../generated/client/client';

// Create allergy
export const createAllergy = async (req: Request, res: Response) => {
    try {
        const { patientId, allergen, severity, reactionType, notes } = req.body;

        // Validate required fields
        if (!patientId || !allergen || !severity) {
            return res.status(400).json({
                message: 'Patient ID, allergen, and severity are required'
            });
        }

        // Check if patient exists
        const patient = await prisma.patient.findUnique({
            where: { id: patientId }
        });

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Check if allergy already exists for this patient
        const existingAllergy = await prisma.allergy.findFirst({
            where: {
                patientId,
                allergen: {
                    equals: allergen,
                    mode: 'insensitive'
                }
            }
        });

        if (existingAllergy) {
            return res.status(400).json({
                message: 'This allergy is already recorded for this patient',
                existingAllergy
            });
        }

        const allergy = await prisma.allergy.create({
            data: {
                patientId,
                allergen,
                severity: severity as AllergySeverity,
                reactionType,
                notes
            },
            include: {
                patient: {
                    select: {
                        id: true,
                        name: true,
                        age: true
                    }
                }
            }
        });

        return res.status(201).json({
            message: 'Allergy added successfully',
            allergy
        });
    } catch (error) {
        console.error('Error creating allergy:', error);
        return res.status(500).json({ message: 'Error creating allergy', error });
    }
};

// Get all allergies for a patient
export const getAllergiesByPatient = async (req: Request, res: Response) => {
    try {
        const { patientId } = req.params;

        const allergies = await prisma.allergy.findMany({
            where: { patientId: parseInt(patientId) },
            orderBy: [
                { severity: 'desc' }, // Critical allergies first
                { createdAt: 'desc' }
            ]
        });

        return res.json(allergies);
    } catch (error) {
        console.error('Error fetching allergies:', error);
        return res.status(500).json({ message: 'Error fetching allergies', error });
    }
};

// Get allergy by ID
export const getAllergyById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const allergy = await prisma.allergy.findUnique({
            where: { id: parseInt(id) },
            include: {
                patient: {
                    select: {
                        id: true,
                        name: true,
                        age: true,
                        gender: true
                    }
                }
            }
        });

        if (!allergy) {
            return res.status(404).json({ message: 'Allergy not found' });
        }

        return res.json(allergy);
    } catch (error) {
        console.error('Error fetching allergy:', error);
        return res.status(500).json({ message: 'Error fetching allergy', error });
    }
};

// Update allergy
export const updateAllergy = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { allergen, severity, reactionType, notes } = req.body;

        const existingAllergy = await prisma.allergy.findUnique({
            where: { id: parseInt(id) }
        });

        if (!existingAllergy) {
            return res.status(404).json({ message: 'Allergy not found' });
        }

        const allergy = await prisma.allergy.update({
            where: { id: parseInt(id) },
            data: {
                allergen,
                severity: severity as AllergySeverity,
                reactionType,
                notes
            },
            include: {
                patient: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });

        return res.json({
            message: 'Allergy updated successfully',
            allergy
        });
    } catch (error) {
        console.error('Error updating allergy:', error);
        return res.status(500).json({ message: 'Error updating allergy', error });
    }
};

// Delete allergy
export const deleteAllergy = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const allergy = await prisma.allergy.findUnique({
            where: { id: parseInt(id) }
        });

        if (!allergy) {
            return res.status(404).json({ message: 'Allergy not found' });
        }

        await prisma.allergy.delete({
            where: { id: parseInt(id) }
        });

        return res.json({ message: 'Allergy deleted successfully' });
    } catch (error) {
        console.error('Error deleting allergy:', error);
        return res.status(500).json({ message: 'Error deleting allergy', error });
    }
};

// Check if a medicine conflicts with patient allergies
export const checkMedicineAllergies = async (req: Request, res: Response) => {
    try {
        const { patientId, medicineId } = req.params;

        // Get patient allergies
        const allergies = await prisma.allergy.findMany({
            where: { patientId: parseInt(patientId) }
        });

        if (allergies.length === 0) {
            return res.json({
                hasConflict: false,
                message: 'No allergies recorded for this patient'
            });
        }

        // Get medicine details
        const medicine = await prisma.tradeName.findUnique({
            where: { id: parseInt(medicineId) },
            include: {
                activeSubstance: true
            }
        });

        if (!medicine) {
            return res.status(404).json({ message: 'Medicine not found' });
        }

        // Check for conflicts
        const conflicts = allergies.filter(allergy => {
            const allergenLower = allergy.allergen.toLowerCase();
            const substanceLower = medicine.activeSubstance.activeSubstance.toLowerCase();
            const titleLower = medicine.title.toLowerCase();

            return (
                substanceLower.includes(allergenLower) ||
                titleLower.includes(allergenLower) ||
                allergenLower.includes(substanceLower)
            );
        });

        if (conflicts.length > 0) {
            const criticalConflicts = conflicts.filter(
                c => c.severity === 'LifeThreatening' || c.severity === 'Severe'
            );

            return res.json({
                hasConflict: true,
                conflicts,
                criticalConflicts,
                recommendation: criticalConflicts.length > 0
                    ? 'DO NOT PRESCRIBE - Critical allergy conflict'
                    : 'Caution advised - Monitor patient closely'
            });
        }

        return res.json({
            hasConflict: false,
            message: 'No allergy conflicts detected'
        });
    } catch (error) {
        console.error('Error checking medicine allergies:', error);
        return res.status(500).json({ message: 'Error checking allergies', error });
    }
};

// Get critical allergies for a patient (Severe or LifeThreatening)
export const getCriticalAllergies = async (req: Request, res: Response) => {
    try {
        const { patientId } = req.params;

        const criticalAllergies = await prisma.allergy.findMany({
            where: {
                patientId: parseInt(patientId),
                severity: {
                    in: ['Severe', 'LifeThreatening']
                }
            },
            orderBy: {
                severity: 'desc'
            }
        });

        return res.json({
            count: criticalAllergies.length,
            allergies: criticalAllergies
        });
    } catch (error) {
        console.error('Error fetching critical allergies:', error);
        return res.status(500).json({ message: 'Error fetching critical allergies', error });
    }
};
