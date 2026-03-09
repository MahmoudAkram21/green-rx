import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { PrescriptionStatus } from '../../generated/client/client';
import { generateWarnings } from '../services/warningService';

const defaultValidFrom = () => new Date();
const defaultValidUntil = () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

/** Include for prescription with items and visit; used by create/get/list */
const prescriptionIncludeWithItemsAndVisit = {
    doctor: { include: { user: { select: { email: true, role: true } } } },
    patient: { include: { user: { select: { email: true } } } },
    visit: { select: { id: true, visitDate: true, visitType: true, isNewVisit: true } },
    prescriptionItems: {
        orderBy: { sortOrder: 'asc' as const },
        include: { tradeName: { include: { activeSubstance: true, company: true } } }
    },
    drugInteractionAlerts: true,
    prescriptionVersions: { orderBy: { version: 'desc' as const } }
};

// First Visit / prescription body: medicationPlan or items = array of { tradeNameId, dosage?, frequency?, duration?, instructions? }
function normalizeMedicationItems(body: Record<string, unknown>): Array<{ tradeNameId: number; dosage?: string; frequency?: string; duration?: string; instructions?: string }> | null {
    const items = body.items ?? body.medicationPlan;
    if (!Array.isArray(items) || items.length === 0) return null;
    return items.map((item: any) => ({
        tradeNameId: Number(item.tradeNameId),
        dosage: item.dosage != null ? String(item.dosage) : undefined,
        frequency: item.frequency != null ? String(item.frequency) : undefined,
        duration: item.duration != null ? String(item.duration) : undefined,
        instructions: item.instructions != null ? String(item.instructions) : undefined
    })).filter((i: { tradeNameId: number }) => Number.isFinite(i.tradeNameId));
}

// Create a new prescription (items/medicationPlan array required; First Visit fields optional)
export const createPrescription = async (req: Request, res: Response) => {
    try {
        const {
            doctorId,
            patientId,
            validFrom,
            validUntil,
            maxRefills,
            notes,
            visitId: bodyVisitId,
            conditionDiagnosis,
            initialCheckUp,
            testResultsOrScans,
            followUpAppointmentDate
        } = req.body;

        const bodyItems = normalizeMedicationItems(req.body);
        const hasItems = bodyItems != null && bodyItems.length > 0;

        if (!doctorId || !patientId) {
            return res.status(400).json({ message: 'Doctor ID and Patient ID are required' });
        }
        if (!hasItems) {
            return res.status(400).json({
                message: 'items or medicationPlan array with at least one { tradeNameId } is required'
            });
        }

        // Validate visitId if provided
        let visitId: number | undefined;
        if (bodyVisitId != null) {
            const visit = await prisma.visit.findFirst({
                where: { id: Number(bodyVisitId), doctorId: Number(doctorId), patientId: Number(patientId) }
            });
            if (!visit) {
                return res.status(400).json({ message: 'Visit not found or does not belong to this doctor and patient' });
            }
            visitId = visit.id;
        }

        const validFromDate = validFrom ? new Date(validFrom) : defaultValidFrom();
        const validUntilDate = validUntil ? new Date(validUntil) : defaultValidUntil();

        const allWarnings: any[] = [];
        let blocked = false;
        for (const item of bodyItems!) {
            const wr = await generateWarnings(patientId, item.tradeNameId);
            allWarnings.push({ tradeNameId: item.tradeNameId, warnings: wr.warnings });
            if (wr.blocked) blocked = true;
        }
        const { checkBatchInteractions } = await import('../services/warningService');
        const batchWarnings = await checkBatchInteractions(bodyItems!.map((i) => i.tradeNameId));
        if (batchWarnings.length) {
            allWarnings.push({ type: 'batch_interactions', warnings: batchWarnings });
            if (batchWarnings.some((w: any) => w.severity === 'Critical' || w.severity === 'High')) blocked = true;
        }
        if (blocked) {
            return res.status(400).json({
                message: 'Cannot prescribe: Critical warnings detected',
                blocked: true,
                warnings: allWarnings
            });
        }

        const prescription = await prisma.prescription.create({
            data: {
                doctorId,
                patientId,
                visitId: visitId ?? undefined,
                status: PrescriptionStatus.Draft,
                prescriptionDate: new Date(),
                validFrom: validFromDate,
                validUntil: validUntilDate,
                maxRefills: maxRefills ?? 0,
                notes: notes ?? undefined,
                version: 1,
                conditionDiagnosis: conditionDiagnosis != null ? String(conditionDiagnosis) : undefined,
                initialCheckUp: initialCheckUp != null && typeof initialCheckUp === 'object' ? initialCheckUp : undefined,
                testResultsOrScans: Array.isArray(testResultsOrScans) ? testResultsOrScans : (typeof testResultsOrScans === 'string' ? [testResultsOrScans] : undefined),
                followUpAppointmentDate: followUpAppointmentDate != null ? new Date(followUpAppointmentDate) : undefined,
                prescriptionItems: {
                    create: bodyItems!.map((item, idx) => ({
                        tradeNameId: item.tradeNameId,
                        dosage: item.dosage ?? undefined,
                        frequency: item.frequency ?? undefined,
                        duration: item.duration ?? undefined,
                        instructions: item.instructions ?? undefined,
                        sortOrder: idx
                    }))
                }
            },
            include: prescriptionIncludeWithItemsAndVisit
        });

        return res.status(201).json({ prescription, warnings: allWarnings });
    } catch (error) {
        console.error('Error creating prescription:', error);
        return res.status(500).json({ message: 'Error creating prescription', error });
    }
};

// Create multiple prescriptions in a batch (same visit) with cross-interaction checking
export const createBatchPrescriptions = async (req: Request, res: Response) => {
    try {
        const {
            doctorId,
            patientId,
            medicines, // Array of {tradeNameId, dosage, frequency, duration, instructions, notes}
            validFrom,
            validUntil,
            maxRefills
        } = req.body;

        // Validate required fields
        if (!doctorId || !patientId || !Array.isArray(medicines) || medicines.length === 0) {
            return res.status(400).json({
                message: 'Doctor ID, Patient ID, and at least one medicine are required'
            });
        }

        const allWarnings: any[] = [];
        let blocked = false;

        // STEP 1: Check each medicine against patient's existing prescriptions
        for (const med of medicines) {
            const warningResult = await generateWarnings(patientId, med.tradeNameId);
            allWarnings.push({
                tradeNameId: med.tradeNameId,
                warnings: warningResult.warnings
            });
            if (warningResult.blocked) {
                blocked = true;
            }
        }

        // STEP 2: Check interactions BETWEEN medicines in this batch
        const { checkBatchInteractions } = await import('../services/warningService');
        const batchInteractionWarnings = await checkBatchInteractions(
            medicines.map((m: any) => m.tradeNameId)
        );

        if (batchInteractionWarnings.length > 0) {
            allWarnings.push({
                type: 'batch_interactions',
                warnings: batchInteractionWarnings
            });

            // Check if any batch interactions are critical/high severity
            const hasCriticalBatchInteraction = batchInteractionWarnings.some(
                (w: any) => w.severity === 'Critical' || w.severity === 'High'
            );
            if (hasCriticalBatchInteraction) {
                blocked = true;
            }
        }

        // STEP 3: Block if critical warnings detected
        if (blocked) {
            return res.status(400).json({
                message: 'Cannot prescribe: Critical warnings detected',
                blocked: true,
                warnings: allWarnings,
                batchInteractionWarnings
            });
        }

        // STEP 4: Create all prescriptions in a transaction (each with one PrescriptionItem)
        const prescriptions = await prisma.$transaction(
            medicines.map((med: any, idx: number) =>
                prisma.prescription.create({
                    data: {
                        doctorId,
                        patientId,
                        status: PrescriptionStatus.Draft,
                        prescriptionDate: new Date(),
                        validFrom: validFrom ? new Date(validFrom) : new Date(),
                        validUntil: validUntil ? new Date(validUntil) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                        dosage: med.dosage,
                        frequency: med.frequency,
                        duration: med.duration,
                        instructions: med.instructions,
                        maxRefills: maxRefills || 0,
                        notes: med.notes,
                        version: 1,
                        prescriptionItems: {
                            create: [{ tradeNameId: med.tradeNameId, dosage: med.dosage, frequency: med.frequency, duration: med.duration, instructions: med.instructions, sortOrder: idx }]
                        }
                    },
                    include: {
                        prescriptionItems: { include: { tradeName: { include: { activeSubstance: true, company: true } } } }
                    }
                })
            )
        );

        return res.status(201).json({
            prescriptions,
            warnings: allWarnings,
            batchInteractionWarnings,
            message: `Successfully created ${prescriptions.length} prescriptions`
        });
    } catch (error) {
        console.error('Error creating batch prescriptions:', error);
        return res.status(500).json({ message: 'Error creating batch prescriptions', error });
    }
};

// Get all prescriptions (with filters)
export const getPrescriptions = async (req: Request, res: Response) => {
    try {
        const { patientId, doctorId, status, page = 1, limit = 20 } = req.query;

        const where: any = {};
        if (patientId) where.patientId = parseInt(patientId as string);
        if (doctorId) where.doctorId = parseInt(doctorId as string);
        if (status) where.status = status as PrescriptionStatus;

        const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

        const [prescriptionsRaw, total] = await Promise.all([
            prisma.prescription.findMany({
                where,
                skip,
                take: parseInt(limit as string),
                include: {
                    doctor: { select: { id: true, name: true, specialization: true } },
                    patient: { select: { id: true, age: true, user: { select: { name: true } } } },
                    visit: { select: { id: true, visitDate: true, visitType: true, isNewVisit: true } },
                    prescriptionItems: {
                        orderBy: { sortOrder: 'asc' },
                        include: { tradeName: { include: { activeSubstance: true, company: true } } }
                    },
                    drugInteractionAlerts: true
                },
                orderBy: { prescriptionDate: 'desc' }
            }),
            prisma.prescription.count({ where })
        ]);

        const prescriptions = prescriptionsRaw;

        return res.json({
            prescriptions,
            pagination: {
                total,
                page: parseInt(page as string),
                limit: parseInt(limit as string),
                totalPages: Math.ceil(total / parseInt(limit as string))
            }
        });
    } catch (error) {
        console.error('Error fetching prescriptions:', error);
        return res.status(500).json({ message: 'Error fetching prescriptions', error });
    }
};

// Get prescription by ID
export const getPrescriptionById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const prescription = await prisma.prescription.findUnique({
            where: { id: parseInt(id) },
            include: {
                doctor: { include: { user: { select: { email: true, role: true } } } },
                patient: {
                    include: {
                        user: { select: { email: true } },
                        patientAllergies: { include: { allergen: true } },
                        patientDiseases: { include: { disease: true } }
                    }
                },
                visit: { select: { id: true, visitDate: true, visitType: true, isNewVisit: true } },
                prescriptionItems: {
                    orderBy: { sortOrder: 'asc' },
                    include: { tradeName: { include: { activeSubstance: true, company: true } } }
                },
                drugInteractionAlerts: {
                    include: { interactingMedicine: { include: { activeSubstance: true } } }
                },
                prescriptionVersions: { orderBy: { version: 'desc' } }
            }
        });

        if (!prescription) {
            return res.status(404).json({ message: 'Prescription not found' });
        }

        return res.json(prescription);
    } catch (error) {
        console.error('Error fetching prescription:', error);
        return res.status(500).json({ message: 'Error fetching prescription', error });
    }
};

// Update prescription
export const updatePrescription = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status, dosage, frequency, duration, instructions, notes, changedBy, conditionDiagnosis, initialCheckUp, testResultsOrScans, followUpAppointmentDate } = req.body;

        const existingPrescription = await prisma.prescription.findUnique({
            where: { id: parseInt(id) }
        });

        if (!existingPrescription) {
            return res.status(404).json({ message: 'Prescription not found' });
        }

        // Track version if significant changes
        const shouldVersion = dosage !== existingPrescription.dosage ||
            frequency !== existingPrescription.frequency ||
            duration !== existingPrescription.duration;

        const updateData: Record<string, unknown> = {
            status,
            dosage,
            frequency,
            duration,
            instructions,
            notes,
            version: shouldVersion ? existingPrescription.version + 1 : existingPrescription.version
        };
        if (conditionDiagnosis !== undefined) updateData.conditionDiagnosis = conditionDiagnosis == null ? null : String(conditionDiagnosis);
        if (initialCheckUp !== undefined) updateData.initialCheckUp = initialCheckUp == null ? null : (typeof initialCheckUp === 'object' ? initialCheckUp : undefined);
        if (testResultsOrScans !== undefined) updateData.testResultsOrScans = Array.isArray(testResultsOrScans) ? testResultsOrScans : (typeof testResultsOrScans === 'string' ? [testResultsOrScans] : null);
        if (followUpAppointmentDate !== undefined) updateData.followUpAppointmentDate = followUpAppointmentDate == null ? null : new Date(followUpAppointmentDate);

        const prescription = await prisma.prescription.update({
            where: { id: parseInt(id) },
            data: updateData as any,
            include: {
                doctor: true,
                patient: true,
                prescriptionItems: {
                    orderBy: { sortOrder: 'asc' },
                    include: { tradeName: { include: { activeSubstance: true, company: true } } }
                }
            }
        });

        // Create version entry if needed
        if (shouldVersion && changedBy) {
            await prisma.prescriptionVersion.create({
                data: {
                    prescriptionId: prescription.id,
                    version: prescription.version,
                    changes: {
                        dosage: { old: existingPrescription.dosage, new: dosage },
                        frequency: { old: existingPrescription.frequency, new: frequency },
                        duration: { old: existingPrescription.duration, new: duration }
                    },
                    changedBy: parseInt(changedBy)
                }
            });
        }

        return res.json(prescription);
    } catch (error) {
        console.error('Error updating prescription:', error);
        return res.status(500).json({ message: 'Error updating prescription', error });
    }
};

// Delete prescription (soft delete)
export const deletePrescription = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const prescription = await prisma.prescription.update({
            where: { id: parseInt(id) },
            data: {
                deletedAt: new Date(),
                status: PrescriptionStatus.Cancelled
            }
        });

        return res.json({ message: 'Prescription deleted successfully', prescription });
    } catch (error) {
        console.error('Error deleting prescription:', error);
        return res.status(500).json({ message: 'Error deleting prescription', error });
    }
};

// Acknowledge drug interaction alert
export const acknowledgeDrugInteraction = async (req: Request, res: Response) => {
    try {
        const { alertId } = req.params;
        const { acknowledgedBy } = req.body; // 'doctor' or 'patient'

        const updateData: any = { acknowledgedAt: new Date() };
        if (acknowledgedBy === 'doctor') {
            updateData.acknowledgedByDoctor = true;
        } else if (acknowledgedBy === 'patient') {
            updateData.acknowledgedByPatient = true;
        }

        const alert = await prisma.drugInteractionAlert.update({
            where: { id: parseInt(alertId) },
            data: updateData
        });

        return res.json(alert);
    } catch (error) {
        console.error('Error acknowledging interaction:', error);
        return res.status(500).json({ message: 'Error acknowledging interaction', error });
    }
};

// Get drug interaction alerts for a prescription
export const getDrugInteractionAlerts = async (req: Request, res: Response) => {
    try {
        const { prescriptionId } = req.params;

        const alerts = await prisma.drugInteractionAlert.findMany({
            where: { prescriptionId: parseInt(prescriptionId) },
            include: {
                interactingMedicine: {
                    include: {
                        activeSubstance: true
                    }
                }
            },
            orderBy: {
                severity: 'desc'
            }
        });

        return res.json(alerts);
    } catch (error) {
        console.error('Error fetching drug interaction alerts:', error);
        return res.status(500).json({ message: 'Error fetching alerts', error });
    }
};
