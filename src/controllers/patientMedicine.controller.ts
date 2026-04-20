import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import path from 'path';
import fs from 'fs';
import { AddMedicineRequestStatus } from '../../generated/client/client';
import { extractMedicineFromImage } from '../services/medicineImageExtraction.service';
import { generateWarnings } from '../services/warningService';
import drugInteractionService from '../services/drugInteraction.service';
import { checkAllergyConflicts } from '../services/allergyCheck.service';

const uploadsDir = path.join(__dirname, '../../uploads/patient-medicines');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// ── GET /patient-medicines/patient/:patientId ─────────────────────────────────
export const getPatientMedicines = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { patientId } = req.params;
        const { isOngoing } = req.query;

        const where: any = { patientId: Number(patientId) };
        if (isOngoing !== undefined) {
            where.isOngoing = isOngoing === 'true';
        }

        const medicines = await prisma.patientMedicine.findMany({
            where,
            include: {
                tradeName: {
                    include: { activeSubstance: true, company: true }
                },
                activeSubstance: true,
            },
            orderBy: { createdAt: 'desc' },
        });

        res.json(medicines);
    } catch (error) {
        next(error);
    }
};

// ── GET /patient-medicines/:id ────────────────────────────────────────────────
export const getPatientMedicineById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const medicine = await prisma.patientMedicine.findUnique({
            where: { id: Number(req.params.id) },
            include: {
                tradeName: { include: { activeSubstance: true, company: true } },
                activeSubstance: true,
            },
        });

        if (!medicine) {
            res.status(404).json({ message: 'Medicine record not found' });
            return;
        }

        res.json(medicine);
    } catch (error) {
        next(error);
    }
};

// ── POST /patient-medicines/patient/:patientId ────────────────────────────────
// Patient picks a medicine that exists in the system (tradeNameId required)
export const addPatientMedicine = async (req: Request, res: Response, next: NextFunction): Promise<void> => { 
    try {
        const { patientId } = req.params;
        const {
            tradeNameId,
            medicineName,
            dosageAmount,
            frequencyCount,
            frequencyPeriod,
            frequencyUnit,
            durationValue,
            durationUnit,
            startDate,
            endDate,
            isOngoing,
            notes,
            reminderEnabled,
            reminderTimes,
        } = req.body;

        if (!medicineName) {
            res.status(400).json({ message: 'medicineName is required' });
            return;
        }

        // If tradeNameId provided, pull activeSubstanceId automatically
        let activeSubstanceId: number | undefined;
        if (tradeNameId) {
            const tn = await prisma.tradeName.findUnique({
                where: { id: Number(tradeNameId) },
                select: { activeSubstanceId: true },
            });
            if (!tn) {
                res.status(404).json({ message: 'Trade name not found in system' });
                return;
            }
            activeSubstanceId = tn.activeSubstanceId;
        }

        const medicine = await prisma.patientMedicine.create({
            data: {
                patientId: Number(patientId),
                tradeNameId: tradeNameId ? Number(tradeNameId) : null,
                activeSubstanceId: activeSubstanceId ?? null,
                medicineName,
                dosageAmount: dosageAmount != null ? Number(dosageAmount) : null,
                frequencyCount: frequencyCount != null ? Number(frequencyCount) : null,
                frequencyPeriod: frequencyPeriod != null ? Number(frequencyPeriod) : null,
                frequencyUnit: frequencyUnit ?? null,
                durationValue: durationValue != null ? Number(durationValue) : null,
                durationUnit: durationUnit ?? null,
                startDate: startDate ? new Date(startDate) : null,
                endDate: endDate ? new Date(endDate) : null,
                isOngoing: isOngoing !== undefined ? Boolean(isOngoing) : true,
                notes,
                reminderEnabled: reminderEnabled !== undefined ? Boolean(reminderEnabled) : false,
                reminderTimes: Array.isArray(reminderTimes) ? reminderTimes.filter((t: unknown) => typeof t === 'string' && /^\d{1,2}:\d{2}$/.test(t)) : [],
            },
            include: {
                tradeName: { include: { activeSubstance: true, company: true } },
                activeSubstance: true,
            },
        });

        const payload: Record<string, unknown> = { ...medicine };
        if (medicine.tradeNameId != null) {
            try {
                const warningResult = await generateWarnings(Number(patientId), medicine.tradeNameId);
                payload.warnings = warningResult.warnings;
                payload.blocked = warningResult.blocked;
            } catch (_) {
                payload.warnings = [];
                payload.blocked = false;
            }
        } else if (medicine.activeSubstanceId != null) {
            try {
                const safetyCheck = await drugInteractionService.checkDrugSafety(Number(patientId), medicine.activeSubstanceId, undefined);
                payload.warnings = safetyCheck.warnings;
                payload.blocked = safetyCheck.hasAllergyConflicts || (safetyCheck.warnings.some((w: any) => w.severity === 'critical'));
            } catch (_) {
                payload.warnings = [];
                payload.blocked = false;
            }
        } else {
            payload.warnings = [];
            payload.blocked = false;
        }

        res.status(201).json(payload);
    } catch (error) {
        next(error);
    }
};

// ── POST /patient-medicines/patient/:patientId/upload-image ───────────────────
// Patient uploads medicine image: AI extracts data, we search DB; if found add to patient, else create AddMedicineRequest
export const addPatientMedicineByImage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { patientId } = req.params;
        let { medicineName, dosageAmount, frequencyCount, frequencyPeriod, frequencyUnit, durationValue, durationUnit, startDate, endDate, isOngoing, notes, reminderEnabled, reminderTimes } = req.body;
        if (typeof reminderTimes === 'string') {
            try { reminderTimes = JSON.parse(reminderTimes); } catch { reminderTimes = []; }
        }
        const pid = Number(patientId);

        const patient = await prisma.patient.findUnique({ where: { id: pid }, select: { id: true } });
        if (!patient) {
            res.status(404).json({ message: 'Patient not found' });
            return;
        }

        if (!req.file) {
            res.status(400).json({ message: 'Image file is required for unrecognised medicine upload' });
            return;
        }

        const imageUrl = `/uploads/patient-medicines/${req.file.filename}`;
        const medicineNameFallback = medicineName || req.file.originalname;

        // Read file for AI extraction (multer saved to disk)
        const filePath = path.join(uploadsDir, req.file.filename);
        let extracted: Awaited<ReturnType<typeof extractMedicineFromImage>> = null;
        if (fs.existsSync(filePath)) {
            const buffer = fs.readFileSync(filePath);
            extracted = await extractMedicineFromImage(buffer, req.file.mimetype || 'image/jpeg');
            console.log("extracted", extracted);
        }

        let matchedTradeNameId: number | null = null;
        let matchedActiveSubstanceId: number | null = null;
        let matchedTradeNameTitle: string | null = null;

        if (extracted && (extracted.tradeName || extracted.activeSubstance)) {
            const [tradeNames, activeSubstances] = await Promise.all([
                extracted.tradeName
                    ? prisma.tradeName.findMany({
                          where: {
                              title: { contains: extracted!.tradeName, mode: 'insensitive' },
                              isActive: true,
                          },
                          take: 5,
                          include: { activeSubstance: true },
                      })
                    : Promise.resolve([]),
                extracted.activeSubstance
                    ? prisma.activeSubstance.findMany({
                          where: {
                              name: { contains: extracted!.activeSubstance, mode: 'insensitive' },
                              isActive: true,
                          },
                          take: 5,
                      })
                    : Promise.resolve([]),
            ]);

            if (tradeNames.length > 0) {
                const chosen =
                    tradeNames.find((t) =>
                        t.activeSubstance.name
                            .toLowerCase()
                            .includes((extracted!.activeSubstance || '').toLowerCase())
                    ) ?? tradeNames[0];
                matchedTradeNameId = chosen.id;
                matchedActiveSubstanceId = chosen.activeSubstanceId;
                matchedTradeNameTitle = chosen.title;
            } else if (activeSubstances.length > 0) {
                matchedActiveSubstanceId = activeSubstances[0].id;
            }
        }

        const bothFound = matchedTradeNameId != null && matchedActiveSubstanceId != null;

        // ── Allergy Gate (block before persist) ───────────────────────────────
        if (matchedTradeNameId != null || matchedActiveSubstanceId != null) {
            const allergyResult = await checkAllergyConflicts({
                patientId: pid,
                tradeNameId: matchedTradeNameId,
                activeSubstanceId: matchedActiveSubstanceId,
            });

            if (allergyResult.blocked) {
                res.status(409).json({
                    blocked: true,
                    reason: 'allergy_conflict',
                    conflicts: allergyResult.conflicts,
                    warnings: allergyResult.warnings,
                    message: 'This medicine cannot be added because of a documented allergy conflict.',
                });
                return;
            }
        }

        const medicine = await prisma.patientMedicine.create({
            data: {
                patientId: pid,
                tradeNameId: matchedTradeNameId,
                activeSubstanceId: matchedActiveSubstanceId,
                medicineName: bothFound ? matchedTradeNameTitle! : (extracted?.tradeName || medicineNameFallback),
                dosageAmount: dosageAmount != null ? Number(dosageAmount) : null,
                frequencyCount: frequencyCount != null ? Number(frequencyCount) : null,
                frequencyPeriod: frequencyPeriod != null ? Number(frequencyPeriod) : null,
                frequencyUnit: frequencyUnit ?? null,
                durationValue: durationValue != null ? Number(durationValue) : null,
                durationUnit: durationUnit ?? null,
                startDate: startDate ? new Date(startDate) : null,
                endDate: endDate ? new Date(endDate) : null,
                isOngoing: isOngoing !== undefined ? Boolean(isOngoing) : true,
                notes,
                imageUrl,
                imageFileName: req.file.originalname,
                isVerified: bothFound,
                reminderEnabled: reminderEnabled !== undefined ? Boolean(reminderEnabled) : false,
                reminderTimes: Array.isArray(reminderTimes) ? reminderTimes.filter((t: unknown) => typeof t === 'string' && /^\d{1,2}:\d{2}$/.test(t)) : [],
            },
            include: {
                tradeName: { include: { activeSubstance: true, company: true } },
                activeSubstance: true,
            },
        });

        let addMedicineRequestId: number | undefined;
        if (!bothFound) {
            const request = await prisma.addMedicineRequest.create({
                data: {
                    patientId: pid,
                    patientMedicineId: medicine.id,
                    imageUrl,
                    extractedTradeName: extracted?.tradeName ?? '',
                    extractedActiveSubstance: extracted?.activeSubstance ?? '',
                    extractedConcentration: extracted?.concentration ?? null,
                    extractedDosageForm: extracted?.dosageForm ?? null,
                    matchedTradeNameId,
                    matchedActiveSubstanceId,
                    status: AddMedicineRequestStatus.Pending,
                },
            });
            addMedicineRequestId = request.id;
        }

        // Build response with all detection data: extracted from image + matched drug details from DB
        const payload: Record<string, unknown> = {
            ...medicine,
            addedToPatient: bothFound,
            // What was detected from the image (trade name, active substance, concentration, dosage form)
            extracted: {
                tradeName: extracted?.tradeName ?? '',
                activeSubstance: extracted?.activeSubstance ?? '',
                concentration: extracted?.concentration ?? null,
                dosageForm: extracted?.dosageForm ?? null,
            },
            // Full matched drug data from DB (when found): trade name with active substance and company, and/or active substance alone
            matchedTradeName: medicine.tradeName
                ? {
                      id: medicine.tradeName.id,
                      title: medicine.tradeName.title,
                      barCode: medicine.tradeName.barCode,
                      warningNotification: medicine.tradeName.warningNotification,
                      activeSubstance: medicine.tradeName.activeSubstance
                          ? {
                                id: medicine.tradeName.activeSubstance.id,
                                activeSubstance: medicine.tradeName.activeSubstance.name,
                                concentration: medicine.tradeName.activeSubstance.concentration,
                                dosageForm: medicine.tradeName.activeSubstance.dosageForm,
                                classificationId: medicine.tradeName.activeSubstance.classificationId,
                                indication: medicine.tradeName.activeSubstance.indication,
                            }
                          : null,
                      company: medicine.tradeName.company
                          ? { id: medicine.tradeName.company.id, name: (medicine.tradeName.company as { name?: string }).name }
                          : null,
                  }
                : null,
            matchedActiveSubstance:
                medicine.activeSubstance && !medicine.tradeName
                    ? {
                          id: medicine.activeSubstance.id,
                          activeSubstance: medicine.activeSubstance.name,
                          concentration: medicine.activeSubstance.concentration,
                          dosageForm: medicine.activeSubstance.dosageForm,
                          classificationId: medicine.activeSubstance.classificationId,
                          indication: medicine.activeSubstance.indication,
                      }
                    : null,
        };
        if (addMedicineRequestId != null) {
            payload.addMedicineRequestId = addMedicineRequestId;
            payload.requestCreatedForMissingData = true;
        }

        if (medicine.tradeNameId != null) {
            try {
                const warningResult = await generateWarnings(pid, medicine.tradeNameId);
                payload.warnings = warningResult.warnings;
                payload.blocked = warningResult.blocked;
            } catch (_) {
                payload.warnings = [];
                payload.blocked = false;
            }
        } else if (medicine.activeSubstanceId != null) {
            try {
                const safetyCheck = await drugInteractionService.checkDrugSafety(pid, medicine.activeSubstanceId, undefined);
                payload.warnings = safetyCheck.warnings;
                payload.blocked = safetyCheck.hasAllergyConflicts || (safetyCheck.warnings.some((w: any) => w.severity === 'critical'));
            } catch (_) {
                payload.warnings = [];
                payload.blocked = false;
            }
        } else {
            payload.warnings = [];
            payload.blocked = false;
        }

        res.status(201).json(payload);
    } catch (error) {
        next(error);
    }
};

// ── PATCH /patient-medicines/:id ──────────────────────────────────────────────
export const updatePatientMedicine = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const { dosageAmount, frequencyCount, frequencyPeriod, frequencyUnit, durationValue, durationUnit, startDate, endDate, isOngoing, notes, medicineName, reminderEnabled, reminderTimes } = req.body;

        const existing = await prisma.patientMedicine.findUnique({ where: { id: Number(id) } });
        if (!existing) {
            res.status(404).json({ message: 'Medicine record not found' });
            return;
        }

        const medicine = await prisma.patientMedicine.update({
            where: { id: Number(id) },
            data: {
                medicineName: medicineName ?? existing.medicineName,
                ...(dosageAmount !== undefined && { dosageAmount: dosageAmount != null ? Number(dosageAmount) : null }),
                ...(frequencyCount !== undefined && { frequencyCount: frequencyCount != null ? Number(frequencyCount) : null }),
                ...(frequencyPeriod !== undefined && { frequencyPeriod: frequencyPeriod != null ? Number(frequencyPeriod) : null }),
                ...(frequencyUnit !== undefined && { frequencyUnit: frequencyUnit }),
                ...(durationValue !== undefined && { durationValue: durationValue != null ? Number(durationValue) : null }),
                ...(durationUnit !== undefined && { durationUnit: durationUnit }),
                startDate: startDate !== undefined ? (startDate ? new Date(startDate) : null) : existing.startDate,
                endDate: endDate !== undefined ? (endDate ? new Date(endDate) : null) : existing.endDate,
                isOngoing: isOngoing !== undefined ? Boolean(isOngoing) : existing.isOngoing,
                notes: notes !== undefined ? notes : existing.notes,
                ...(reminderEnabled !== undefined && { reminderEnabled: Boolean(reminderEnabled) }),
                ...(reminderTimes !== undefined && { reminderTimes: Array.isArray(reminderTimes) ? reminderTimes.filter((t: unknown) => typeof t === 'string' && /^\d{1,2}:\d{2}$/.test(t)) : existing.reminderTimes }),
            },
            include: {
                tradeName: { include: { activeSubstance: true } },
            },
        });

        res.json(medicine);
    } catch (error) {
        next(error);
    }
};

// ── DELETE /patient-medicines/:id ─────────────────────────────────────────────
export const deletePatientMedicine = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;

        const existing = await prisma.patientMedicine.findUnique({ where: { id: Number(id) } });
        if (!existing) {
            res.status(404).json({ message: 'Medicine record not found' });
            return;
        }

        // Delete uploaded image file if it exists
        if (existing.imageUrl) {
            const filePath = path.join(__dirname, '../..', existing.imageUrl);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }

        await prisma.patientMedicine.delete({ where: { id: Number(id) } });
        res.json({ message: 'Medicine record deleted successfully' });
    } catch (error) {
        next(error);
    }
};

// ── PATCH /patient-medicines/:id/verify  (Admin/Doctor only) ──────────────────
// Links an image-uploaded medicine to a real TradeName in the system
export const verifyPatientMedicine = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const { tradeNameId } = req.body;
        const verifierId = (req as any).user?.userId;

        if (!tradeNameId) {
            res.status(400).json({ message: 'tradeNameId is required to verify' });
            return;
        }

        const tn = await prisma.tradeName.findUnique({
            where: { id: Number(tradeNameId) },
            select: { id: true, title: true, activeSubstanceId: true },
        });
        if (!tn) {
            res.status(404).json({ message: 'Trade name not found' });
            return;
        }

        const medicine = await prisma.patientMedicine.update({
            where: { id: Number(id) },
            data: {
                tradeNameId: tn.id,
                activeSubstanceId: tn.activeSubstanceId,
                medicineName: tn.title,
                isVerified: true,
                verifiedBy: verifierId,
                verifiedAt: new Date(),
            },
            include: {
                tradeName: { include: { activeSubstance: true, company: true } },
            },
        });

        res.json(medicine);
    } catch (error) {
        next(error);
    }
};

// ── GET /patient-medicines/unverified  (Admin only) ───────────────────────────
export const getUnverifiedMedicines = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { page = '1', limit = '20' } = req.query;

        const [items, total] = await Promise.all([
            prisma.patientMedicine.findMany({
                where: { imageUrl: { not: null }, isVerified: false },
                include: {
                    patient: { select: { id: true, user: { select: { name: true } } } },
                },
                skip: (Number(page) - 1) * Number(limit),
                take: Number(limit),
                orderBy: { createdAt: 'desc' },
            }),
            prisma.patientMedicine.count({
                where: { imageUrl: { not: null }, isVerified: false },
            }),
        ]);

        res.json({ data: items, total, page: Number(page), limit: Number(limit) });
    } catch (error) {
        next(error);
    }
};
