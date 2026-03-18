import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

// Get all allergies for a patient (PatientAllergy with allergen catalog info)
export const getAllergiesByPatient = async (req: Request, res: Response) => {
    try {
        const { patientId } = req.params;

        const patientAllergies = await prisma.patientAllergy.findMany({
            where: { patientId: parseInt(patientId) },
            orderBy: { createdAt: 'desc' },
            include: { allergen: { include: { allergenCategory: { select: { id: true, name: true } } } } },
        });

        return res.json(patientAllergies);
    } catch (error) {
        console.error('Error fetching patient allergies:', error);
        return res.status(500).json({ message: 'Error fetching allergies', error });
    }
};

// Get critical allergies for a patient (those with "Anaphylaxis" reaction or marked notes)
export const getCriticalAllergies = async (req: Request, res: Response) => {
    try {
        const { patientId } = req.params;

        const criticalAllergies = await prisma.patientAllergy.findMany({
            where: {
                patientId: parseInt(patientId),
                reaction: { contains: 'Anaphylaxis', mode: 'insensitive' },
            },
            orderBy: { createdAt: 'desc' },
            include: { allergen: { include: { allergenCategory: { select: { id: true, name: true } } } } },
        });

        return res.json({
            count: criticalAllergies.length,
            allergies: criticalAllergies,
        });
    } catch (error) {
        console.error('Error fetching critical allergies:', error);
        return res.status(500).json({ message: 'Error fetching critical allergies', error });
    }
};

// Check if a medicine conflicts with patient allergies
export const checkMedicineAllergies = async (req: Request, res: Response) => {
    try {
        const { patientId, medicineId } = req.params;

        const patientAllergies = await prisma.patientAllergy.findMany({
            where: { patientId: parseInt(patientId) },
            include: { allergen: true },
        });

        if (patientAllergies.length === 0) {
            return res.json({
                hasConflict: false,
                message: 'No allergies recorded for this patient',
            });
        }

        const medicine = await prisma.tradeName.findUnique({
            where: { id: parseInt(medicineId) },
            include: { activeSubstance: true },
        });

        if (!medicine) {
            return res.status(404).json({ message: 'Medicine not found' });
        }

        const conflicts = patientAllergies.filter((pa) => {
            const allergenLower = (pa.allergen.name || '').toLowerCase();
            const substanceLower = (medicine.activeSubstance?.activeSubstance || '').toLowerCase();
            const titleLower = (medicine.title || '').toLowerCase();
            return (
                substanceLower.includes(allergenLower) ||
                titleLower.includes(allergenLower) ||
                allergenLower.includes(substanceLower)
            );
        });

        if (conflicts.length > 0) {
            const criticalConflicts = conflicts.filter(
                (c) => c.reaction?.toLowerCase().includes('anaphylaxis')
            );
            return res.json({
                hasConflict: true,
                conflicts,
                criticalConflicts,
                recommendation:
                    criticalConflicts.length > 0
                        ? 'DO NOT PRESCRIBE - Critical allergy conflict'
                        : 'Caution advised - Monitor patient closely',
            });
        }

        return res.json({
            hasConflict: false,
            message: 'No allergy conflicts detected',
        });
    } catch (error) {
        console.error('Error checking medicine allergies:', error);
        return res.status(500).json({ message: 'Error checking allergies', error });
    }
};
