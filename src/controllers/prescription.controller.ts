import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { PrescriptionStatus, UserRole } from '../../generated/client/client';
import { generateWarnings } from '../services/warningService';
import drugInteractionService from '../services/drugInteraction.service';

async function resolveProfileIds(req: Request) {
    const { userId, role } = req.user!;
    const doctor = role === UserRole.Doctor
        ? await prisma.doctor.findUnique({ where: { userId }, select: { id: true } })
        : null;
    const patient = role === UserRole.Patient
        ? await prisma.patient.findUnique({ where: { userId }, select: { id: true } })
        : null;
    return { role, doctorId: doctor?.id ?? null, patientId: patient?.id ?? null };
}

const defaultValidFrom = () => new Date();
const defaultValidUntil = () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

/** Include for prescription with medicines (PrescriptionMedicine + PatientMedicine) and visit */
const prescriptionIncludeWithMedicinesAndVisit = {
    doctor: { include: { user: { select: { email: true, role: true } } } },
    patient: { include: { user: { select: { email: true } } } },
    visit: { select: { id: true, visitDate: true, visitType: true, isNewVisit: true } },
    prescriptionMedicines: {
        orderBy: { sortOrder: 'asc' as const },
        include: {
            patientMedicine: {
                include: {
                    tradeName: { include: { activeSubstance: true, company: true } },
                    activeSubstance: true
                }
            }
        }
    },
    drugInteractionAlerts: true,
    prescriptionVersions: { orderBy: { version: 'desc' as const } }
};

export type MedicationPlanItem = {
    medicineName: string;
    tradeNameId?: number | null;
    activeSubstanceId?: number | null;
    dosageAmount?: number | null;
    frequencyCount?: number | null;
    frequencyPeriod?: number | null;
    frequencyUnit?: string | null;
    durationValue?: number | null;
    durationUnit?: string | null;
    startDate?: string | null;
    endDate?: string | null;
    notes?: string | null;
};

// First Visit: medicationPlan or items = array of { medicineName, tradeNameId?, activeSubstanceId?, dosageAmount?, ... }
function normalizeMedicationItems(body: Record<string, unknown>): MedicationPlanItem[] | null {
    const items = body.items ?? body.medicationPlan;
    if (!Array.isArray(items) || items.length === 0) return null;
    const out: MedicationPlanItem[] = [];
    for (const item of items as any[]) {
        const name = item.medicineName != null ? String(item.medicineName).trim() : '';
        if (!name) continue;
        out.push({
            medicineName: name,
            tradeNameId: item.tradeNameId != null ? Number(item.tradeNameId) : null,
            activeSubstanceId: item.activeSubstanceId != null ? Number(item.activeSubstanceId) : null,
            dosageAmount: item.dosageAmount != null ? Number(item.dosageAmount) : null,
            frequencyCount: item.frequencyCount != null ? Number(item.frequencyCount) : null,
            frequencyPeriod: item.frequencyPeriod != null ? Number(item.frequencyPeriod) : null,
            frequencyUnit: item.frequencyUnit ?? null,
            durationValue: item.durationValue != null ? Number(item.durationValue) : null,
            durationUnit: item.durationUnit ?? null,
            startDate: item.startDate ?? null,
            endDate: item.endDate ?? null,
            notes: item.notes ?? null
        });
    }
    return out.length ? out : null;
}

// Create a new prescription (items/medicationPlan array required; First Visit fields optional)
export const createPrescription = async (req: Request, res: Response) => {
    try {
        const {
            doctorId: bodyDoctorId,
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

        const { role, doctorId: tokenDoctorId } = await resolveProfileIds(req);
        if (role === UserRole.Doctor && !tokenDoctorId) {
            return res.status(403).json({ message: 'Doctor profile not found' });
        }
        const doctorId = role === UserRole.Doctor ? tokenDoctorId! : Number(bodyDoctorId);

        if (!doctorId || !patientId) {
            return res.status(400).json({ message: 'Doctor ID and Patient ID are required' });
        }
        if (!hasItems) {
            return res.status(400).json({
                message: 'items or medicationPlan array with at least one item (medicineName required) is required'
            });
        }

        const pid = Number(patientId);

        // Resolve activeSubstanceId from tradeNameId where missing
        for (const item of bodyItems!) {
            if (item.activeSubstanceId == null && item.tradeNameId != null) {
                const tn = await prisma.tradeName.findUnique({
                    where: { id: item.tradeNameId },
                    select: { activeSubstanceId: true }
                });
                if (tn) item.activeSubstanceId = tn.activeSubstanceId;
            }
        }

        // Validate visitId if provided
        let visitId: number | undefined;
        if (bodyVisitId != null) {
            const visit = await prisma.visit.findFirst({
                where: { id: Number(bodyVisitId), doctorId: Number(doctorId), patientId: pid }
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
        for (let i = 0; i < bodyItems!.length; i++) {
            const item = bodyItems![i];
            if (item.tradeNameId != null) {
                const wr = await generateWarnings(pid, item.tradeNameId);
                allWarnings.push({ index: i, medicineName: item.medicineName, tradeNameId: item.tradeNameId, warnings: wr.warnings });
                if (wr.blocked) blocked = true;
            } else if (item.activeSubstanceId != null) {
                try {
                    const safety = await drugInteractionService.checkDrugSafety(pid, item.activeSubstanceId, undefined);
                    const critical = safety.warnings?.some((w: any) => w.severity === 'critical') || safety.hasAllergyConflicts;
                    allWarnings.push({ index: i, medicineName: item.medicineName, activeSubstanceId: item.activeSubstanceId, warnings: safety.warnings || [] });
                    if (critical) blocked = true;
                } catch {
                    allWarnings.push({ index: i, medicineName: item.medicineName, warnings: [] });
                }
            }
        }
        const tradeNameIds = bodyItems!.map((i) => i.tradeNameId).filter((id): id is number => id != null && Number.isFinite(id));
        if (tradeNameIds.length > 0) {
            const { checkBatchInteractions } = await import('../services/warningService');
            const batchWarnings = await checkBatchInteractions(tradeNameIds);
            if (batchWarnings.length) {
                allWarnings.push({ type: 'batch_interactions', warnings: batchWarnings });
                if (batchWarnings.some((w: any) => w.severity === 'Critical' || w.severity === 'High')) blocked = true;
            }
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
                doctorId: Number(doctorId),
                patientId: pid,
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
                followUpAppointmentDate: followUpAppointmentDate != null ? new Date(followUpAppointmentDate) : undefined
            }
        });

        for (let idx = 0; idx < bodyItems!.length; idx++) {
            const item = bodyItems![idx];
            const pm = await prisma.patientMedicine.create({
                data: {
                    patientId: pid,
                    tradeNameId: item.tradeNameId ?? undefined,
                    activeSubstanceId: item.activeSubstanceId ?? undefined,
                    medicineName: item.medicineName,
                    dosageAmount: item.dosageAmount ?? undefined,
                    frequencyCount: item.frequencyCount ?? undefined,
                    frequencyPeriod: item.frequencyPeriod ?? undefined,
                    frequencyUnit: item.frequencyUnit as any ?? undefined,
                    durationValue: item.durationValue ?? undefined,
                    durationUnit: item.durationUnit as any ?? undefined,
                    startDate: item.startDate ? new Date(item.startDate) : undefined,
                    endDate: item.endDate ? new Date(item.endDate) : undefined,
                    notes: item.notes ?? undefined,
                    isOngoing: true
                }
            });
            await prisma.prescriptionMedicine.create({
                data: { prescriptionId: prescription.id, patientMedicineId: pm.id, sortOrder: idx }
            });
        }

        const prescriptionWithMedicines = await prisma.prescription.findUnique({
            where: { id: prescription.id },
            include: prescriptionIncludeWithMedicinesAndVisit
        });

        return res.status(201).json({ prescription: prescriptionWithMedicines, warnings: allWarnings });
    } catch (error) {
        console.error('Error creating prescription:', error);
        return res.status(500).json({ message: 'Error creating prescription', error });
    }
};

// Create multiple prescriptions in a batch (same visit) with cross-interaction checking
export const createBatchPrescriptions = async (req: Request, res: Response) => {
    try {
        const {
            doctorId: bodyDoctorId,
            patientId,
            medicines, // Array of {tradeNameId, dosage, frequency, duration, instructions, notes}
            validFrom,
            validUntil,
            maxRefills
        } = req.body;

        const { role, doctorId: tokenDoctorId } = await resolveProfileIds(req);
        if (role === UserRole.Doctor && !tokenDoctorId) {
            return res.status(403).json({ message: 'Doctor profile not found' });
        }
        const doctorId = role === UserRole.Doctor ? tokenDoctorId! : Number(bodyDoctorId);

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

        // STEP 4: Create each prescription with one PatientMedicine + PrescriptionMedicine link
        const prescriptions: any[] = [];
        for (const med of medicines as any[]) {
            const prescription = await prisma.prescription.create({
                data: {
                    doctorId: Number(doctorId),
                    patientId: Number(patientId),
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
                    version: 1
                }
            });
            const tn = await prisma.tradeName.findUnique({
                where: { id: med.tradeNameId },
                select: { title: true, activeSubstanceId: true }
            });
            const pm = await prisma.patientMedicine.create({
                data: {
                    patientId: Number(patientId),
                    tradeNameId: med.tradeNameId,
                    activeSubstanceId: tn?.activeSubstanceId ?? undefined,
                    medicineName: tn?.title ?? `Medicine ${med.tradeNameId}`,
                    dosageAmount: med.dosage != null ? Number(med.dosage) : undefined,
                    notes: med.notes ?? undefined,
                    isOngoing: true
                }
            });
            await prisma.prescriptionMedicine.create({
                data: { prescriptionId: prescription.id, patientMedicineId: pm.id, sortOrder: 0 }
            });
            const full = await prisma.prescription.findUnique({
                where: { id: prescription.id },
                include: {
                    prescriptionMedicines: {
                        orderBy: { sortOrder: 'asc' },
                        include: {
                            patientMedicine: {
                                include: { tradeName: { include: { activeSubstance: true, company: true } } }
                            }
                        }
                    }
                }
            });
            prescriptions.push(full);
        }

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
        if (status) where.status = status as PrescriptionStatus;

        const { role, doctorId: tokenDoctorId, patientId: tokenPatientId } = await resolveProfileIds(req);
        if (role === UserRole.Doctor) {
            where.doctorId = tokenDoctorId!;
        } else if (role === UserRole.Patient) {
            where.patientId = tokenPatientId!;
        } else {
            // Admin / SuperAdmin: honour optional query params
            if (patientId) where.patientId = parseInt(patientId as string);
            if (doctorId) where.doctorId = parseInt(doctorId as string);
        }

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
                    prescriptionMedicines: {
                        orderBy: { sortOrder: 'asc' },
                        include: {
                            patientMedicine: {
                                include: { tradeName: { include: { activeSubstance: true, company: true } }, activeSubstance: true }
                            }
                        }
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
                        allergyReports: true,
                        patientDiseases: { include: { disease: true } }
                    }
                },
                visit: { select: { id: true, visitDate: true, visitType: true, isNewVisit: true } },
                prescriptionMedicines: {
                    orderBy: { sortOrder: 'asc' },
                    include: {
                        patientMedicine: {
                            include: { tradeName: { include: { activeSubstance: true, company: true } }, activeSubstance: true }
                        }
                    }
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

        const { role, doctorId, patientId } = await resolveProfileIds(req);
        if (role === UserRole.Doctor && prescription.doctorId !== doctorId) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        if (role === UserRole.Patient && prescription.patientId !== patientId) {
            return res.status(403).json({ message: 'Forbidden' });
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

        const { role: callerRole, doctorId: callerDoctorId } = await resolveProfileIds(req);
        if (callerRole === UserRole.Doctor && existingPrescription.doctorId !== callerDoctorId) {
            return res.status(403).json({ message: 'Forbidden' });
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
                prescriptionMedicines: {
                    orderBy: { sortOrder: 'asc' },
                    include: {
                        patientMedicine: {
                            include: { tradeName: { include: { activeSubstance: true, company: true } }, activeSubstance: true }
                        }
                    }
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

// Add one medicine to an existing prescription (e.g. draft First Visit)
export const addMedicineToPrescription = async (req: Request, res: Response) => {
    try {
        const { prescriptionId } = req.params;
        const body = req.body as Record<string, unknown>;
        const items = normalizeMedicationItems(body);
        if (!items || items.length === 0) {
            return res.status(400).json({ message: 'Request body must include medicineName (and optionally tradeNameId, activeSubstanceId, dosage/timing fields)' });
        }
        const item = items[0];
        const prescId = parseInt(prescriptionId, 10);
        if (!Number.isFinite(prescId)) {
            return res.status(400).json({ message: 'Invalid prescriptionId' });
        }
        const prescription = await prisma.prescription.findUnique({
            where: { id: prescId },
            select: { id: true, patientId: true, doctorId: true }
        });
        if (!prescription) {
            return res.status(404).json({ message: 'Prescription not found' });
        }
        const { doctorId: callerDoctorId } = await resolveProfileIds(req);
        if (prescription.doctorId !== callerDoctorId) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        if (item.activeSubstanceId == null && item.tradeNameId != null) {
            const tn = await prisma.tradeName.findUnique({
                where: { id: item.tradeNameId },
                select: { activeSubstanceId: true }
            });
            if (tn) item.activeSubstanceId = tn.activeSubstanceId;
        }
        let blocked = false;
        if (item.tradeNameId != null) {
            const wr = await generateWarnings(prescription.patientId, item.tradeNameId);
            if (wr.blocked) blocked = true;
        } else if (item.activeSubstanceId != null) {
            try {
                const safety = await drugInteractionService.checkDrugSafety(prescription.patientId, item.activeSubstanceId, undefined);
                if (safety.hasAllergyConflicts || (safety.warnings?.some((w: any) => w.severity === 'critical'))) blocked = true;
            } catch { /* ignore */ }
        }
        if (blocked) {
            return res.status(400).json({ message: 'Cannot add medicine: critical warnings detected', blocked: true });
        }
        const count = await prisma.prescriptionMedicine.count({ where: { prescriptionId: prescId } });
        const pm = await prisma.patientMedicine.create({
            data: {
                patientId: prescription.patientId,
                tradeNameId: item.tradeNameId ?? undefined,
                activeSubstanceId: item.activeSubstanceId ?? undefined,
                medicineName: item.medicineName,
                dosageAmount: item.dosageAmount ?? undefined,
                frequencyCount: item.frequencyCount ?? undefined,
                frequencyPeriod: item.frequencyPeriod ?? undefined,
                frequencyUnit: item.frequencyUnit as any ?? undefined,
                durationValue: item.durationValue ?? undefined,
                durationUnit: item.durationUnit as any ?? undefined,
                startDate: item.startDate ? new Date(item.startDate) : undefined,
                endDate: item.endDate ? new Date(item.endDate) : undefined,
                notes: item.notes ?? undefined,
                isOngoing: true
            }
        });
        await prisma.prescriptionMedicine.create({
            data: { prescriptionId: prescId, patientMedicineId: pm.id, sortOrder: count }
        });
        const updated = await prisma.prescription.findUnique({
            where: { id: prescId },
            include: prescriptionIncludeWithMedicinesAndVisit
        });
        return res.status(201).json(updated);
    } catch (error) {
        console.error('Error adding medicine to prescription:', error);
        return res.status(500).json({ message: 'Error adding medicine to prescription', error });
    }
};

// Delete prescription (soft delete)
export const deletePrescription = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const existing = await prisma.prescription.findUnique({ where: { id: parseInt(id) }, select: { doctorId: true } });
        if (!existing) {
            return res.status(404).json({ message: 'Prescription not found' });
        }
        const { role: callerRole, doctorId: callerDoctorId } = await resolveProfileIds(req);
        if (callerRole === UserRole.Doctor && existing.doctorId !== callerDoctorId) {
            return res.status(403).json({ message: 'Forbidden' });
        }

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

        const acknowledgedBy = req.user!.role === UserRole.Doctor ? 'doctor'
                             : req.user!.role === UserRole.Patient ? 'patient'
                             : null;

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
