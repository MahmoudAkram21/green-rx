import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

// Get all allergies for a patient (PatientAllergy with allergen, activeSubstance, tradeName)
export const getAllergiesByPatient = async (req: Request, res: Response) => {
    try {
        const { patientId } = req.params;

        const patientAllergies = await prisma.patientAllergyReport.findMany({
            where: { patientId: parseInt(patientId) },
            orderBy: { createdAt: 'desc' },
            include: {
                patientAllergies: { include: { allergen: { select: { id: true, name: true }, include: { allergenCategory: true } } } },
                activeSubstancePatientAllergies: { include: { activeSubstance: { select: { id: true, name: true, classificationId: true } } } },
                tradeName: { select: { id: true, tradeName: { select: { title: true, activeSubstanceId: true, activeSubstance: { select: { id: true, name: true, classificationId: true } } } } } },
            },
        });

        return res.json(patientAllergies);
    } catch (error) {
        console.error('Error fetching patient allergies:', error);
        return res.status(500).json({ message: 'Error fetching allergies', error });
    }
};

// Get critical allergies for a patient (those with "Anaphylaxis" reaction)
// export const getCriticalAllergies = async (req: Request, res: Response) => {
//     try {
//         const { patientId } = req.params;

//         const criticalAllergies = await prisma.patientAllergy.findMany({
//             where: {
//                 patientId: parseInt(patientId),
//                 reaction: { contains: 'Anaphylaxis', mode: 'insensitive' },
//             },
//             orderBy: { createdAt: 'desc' },
//             include: patientAllergyInclude,
//         });

//         return res.json({
//             count: criticalAllergies.length,
//             allergies: criticalAllergies,
//         });
//     } catch (error) {
//         console.error('Error fetching critical allergies:', error);
//         return res.status(500).json({ message: 'Error fetching critical allergies', error });
//     }
// };

// Check if a medicine conflicts with patient allergies
export const checkMedicineAllergies = async (req: Request, res: Response) => {
    try {
        const { patientId, medicineId } = req.params;
        const medicineIdNum = parseInt(medicineId);

        const patientAllergyReport = await prisma.patientAllergyReport.findUniqueOrThrow({
            where: { patientId: parseInt(patientId) },
            select: {
                id: true,
                patientId: true,
                tradeNameId: true,
                reaction: true,
                notes: true,
                createdAt: true,
                updatedAt: true,
                patientAllergies: true,
                tradeName: true,
                excipientPatientAllergies: true,
                activeSubstancePatientAllergies: { select: { id: true, activeSubstanceId: true, activeSubstance: true } },
                classificationPatientAllergies: true,
            },
        });

        if (!patientAllergyReport) {
            return res.json({
                hasConflict: false,
                message: 'No allergies recorded for this patient',
            });
        }

        const medicine = await prisma.tradeName.findUnique({
            where: { id: medicineIdNum },
            select: { id: true, title: true, activeSubstanceId: true, activeSubstance: { select: { id: true, name: true, classificationId: true } }, excipientTradeName: { include: { excipient: { select: { id: true, name: true } } } } },
        });

        if (!medicine) {
            return res.status(404).json({ message: 'Medicine not found' });
        }

        const conflicts: {
            actives: number[],
            excipients: number[],
            allergens: number[],
            classifications: number[],
        } = {
            actives: [],
            excipients: [],
            allergens: [],
            classifications: [],
        };
        patientAllergyReport.tradeName.map((tradeName) => {
            if (tradeName?.id === medicine.id) {
                conflicts.actives.push(medicine.activeSubstanceId);
                medicine.activeSubstance?.classificationId && conflicts.classifications.push(medicine.activeSubstance?.classificationId);
                medicine.excipientTradeName.forEach((et) => {
                    patientAllergyReport.excipientPatientAllergies.forEach((epa) => {
                        if (epa.excipientId === et.excipientId) conflicts.excipients.push(epa.excipientId);
                    });
                });
            }
        })
        patientAllergyReport.activeSubstancePatientAllergies.forEach((pa) => {
            if (pa.activeSubstanceId === medicine.activeSubstanceId) conflicts.actives.push(pa.activeSubstanceId);
            if (pa.activeSubstance.classificationId === medicine.activeSubstance.classificationId && medicine.activeSubstance.classificationId) conflicts.classifications.push(medicine.activeSubstance.classificationId);
        });
        patientAllergyReport.classificationPatientAllergies.forEach((cpa) => {
            if (cpa.classificationId === medicine.activeSubstance.classificationId && medicine.activeSubstance.classificationId) conflicts.classifications.push(cpa.classificationId);
        });



        if (conflicts.actives.length > 0 || conflicts.excipients.length > 0 || conflicts.classifications.length > 0) {
            return res.json({
                hasConflict: true,
                message: 'Allergy conflicts detected',
                conflicts,
            });
        }

        return res.json({
            hasConflict: false,
            message: 'No conflicts detected',
        });
    } catch (error) {
        console.error('Error checking medicine allergies:', error);
        return res.status(500).json({ message: 'Error checking allergies', error });
    }
};
