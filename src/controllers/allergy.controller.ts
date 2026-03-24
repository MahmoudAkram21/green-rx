import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { patientAllergyInclude } from '../utils/allergyInclude.util';

// Get all allergies for a patient (PatientAllergy with allergen, activeSubstance, tradeName)
export const getAllergiesByPatient = async (req: Request, res: Response) => {
    try {
        const { patientId } = req.params;

        const patientAllergies = await prisma.patientAllergy.findMany({
            where: { patientId: parseInt(patientId) },
            orderBy: { createdAt: 'desc' },
            include: patientAllergyInclude,
        });

        return res.json(patientAllergies);
    } catch (error) {
        console.error('Error fetching patient allergies:', error);
        return res.status(500).json({ message: 'Error fetching allergies', error });
    }
};

// Get critical allergies for a patient (those with "Anaphylaxis" reaction)
export const getCriticalAllergies = async (req: Request, res: Response) => {
    try {
        const { patientId } = req.params;

        const criticalAllergies = await prisma.patientAllergy.findMany({
            where: {
                patientId: parseInt(patientId),
                reaction: { contains: 'Anaphylaxis', mode: 'insensitive' },
            },
            orderBy: { createdAt: 'desc' },
            include: patientAllergyInclude,
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
        const medicineIdNum = parseInt(medicineId);

        const patientAllergies = await prisma.patientAllergy.findMany({
            where: { patientId: parseInt(patientId) },
            include: patientAllergyInclude,
        });

        if (patientAllergies.length === 0) {
            return res.json({
                hasConflict: false,
                message: 'No allergies recorded for this patient',
            });
        }

        const medicine = await prisma.tradeName.findUnique({
            where: { id: medicineIdNum },
            include: { activeSubstance: true },
        });

        if (!medicine) {
            return res.status(404).json({ message: 'Medicine not found' });
        }

        const substanceLower = (medicine.activeSubstance?.activeSubstance || '').toLowerCase();
        const titleLower = (medicine.title || '').toLowerCase();

        const conflicts = patientAllergies.filter((pa) => {
            // Direct FK match: trade name or active substance
            if (pa.tradeNameId === medicineIdNum) return true;
            if (pa.activeSubstanceId !== null && pa.activeSubstanceId === medicine.activeSubstanceId) return true;
            // Catalog allergen name string match
            if (pa.allergen) {
                const allergenLower = (pa.allergen.name || '').toLowerCase();
                if (allergenLower && (substanceLower.includes(allergenLower) || titleLower.includes(allergenLower) || allergenLower.includes(substanceLower))) return true;
            }
            // Active substance string match
            if (pa.activeSubstance) {
                const asLower = (pa.activeSubstance.activeSubstance || '').toLowerCase();
                if (asLower && (substanceLower.includes(asLower) || asLower.includes(substanceLower))) return true;
            }
            // Trade name string match
            if (pa.tradeName) {
                const tnLower = (pa.tradeName.title || '').toLowerCase();
                if (tnLower && titleLower.includes(tnLower)) return true;
            }
            return false;
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
