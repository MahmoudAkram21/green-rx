import { Request, Response, NextFunction } from 'express';
import drugInteractionService from '../services/drugInteraction.service';
import { generateWarnings } from '../services/warningService';
import { prisma } from '../lib/prisma';

class DrugInteractionAlertController {
    // Check drug by trade name ID: run full warning check and return all feedback (blocked + warnings)
    async checkByTradeName(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const patientId = req.body?.patientId != null ? Number(req.body.patientId) : NaN;
            const tradeNameId = req.body?.tradeNameId != null ? Number(req.body.tradeNameId) : NaN;

            if (!Number.isInteger(patientId) || patientId < 1 || !Number.isInteger(tradeNameId) || tradeNameId < 1) {
                res.status(400).json({ error: 'patientId and tradeNameId are required and must be positive integers' });
                return;
            }

            if (req.user?.role === 'Patient') {
                const patientRecord = await prisma.patient.findUnique({ where: { userId: req.user.userId }, select: { id: true } });
                if (!patientRecord || patientRecord.id !== patientId) {
                    res.status(403).json({ error: 'Forbidden: Patients may only run the check for their own profile' });
                    return;
                }
            }

            const [patient, tradeName] = await Promise.all([
                prisma.patient.findUnique({ where: { id: patientId }, select: { id: true } }),
                prisma.tradeName.findUnique({
                    where: { id: tradeNameId },
                    select: { id: true, title: true, activeSubstance: { select: { activeSubstance: true } } }
                })
            ]);

            if (!patient) {
                res.status(404).json({ error: 'Patient not found' });
                return;
            }
            if (!tradeName) {
                res.status(404).json({ error: 'Trade name not found' });
                return;
            }

            const result = await generateWarnings(patientId, tradeNameId);

            res.json({
                blocked: result.blocked,
                warnings: result.warnings,
                tradeName: {
                    id: tradeName.id,
                    title: tradeName.title,
                    activeSubstanceName: tradeName.activeSubstance?.activeSubstance ?? null
                }
            });
        } catch (error) {
            next(error);
        }
    }

    // Check drug safety before prescribing
    async checkDrugSafety(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { patientId, activeSubstanceId, tradeNameId } = req.body;

            if (!patientId || !activeSubstanceId) {
                return res.status(400).json({
                    error: 'Patient ID and Active Substance ID are required'
                }) as any;
            }

            const safetyCheck = await drugInteractionService.checkDrugSafety(
                Number(patientId),
                Number(activeSubstanceId),
                tradeNameId ? Number(tradeNameId) : undefined
            );

            res.json(safetyCheck);
        } catch (error) {
            next(error);
        }
    }

    // Get all drug interaction alerts for a prescription
    async getAlertsByPrescription(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { prescriptionId } = req.params;

            const alerts = await prisma.drugInteractionAlert.findMany({
                where: { prescriptionId: Number(prescriptionId) },
                include: {
                    interactingMedicine: true
                },
                orderBy: { createdAt: 'desc' }
            });

            res.json(alerts);
        } catch (error) {
            next(error);
        }
    }

    // Acknowledge alert by doctor
    async acknowledgeByDoctor(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;

            const alert = await prisma.drugInteractionAlert.update({
                where: { id: Number(id) },
                data: { acknowledgedByDoctor: true }
            });

            res.json(alert);
        } catch (error) {
            next(error);
        }
    }

    // Acknowledge alert by patient
    async acknowledgeByPatient(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;

            const alert = await prisma.drugInteractionAlert.update({
                where: { id: Number(id) },
                data: { acknowledgedByPatient: true }
            });

            res.json(alert);
        } catch (error) {
            next(error);
        }
    }

    // Get all alerts for a patient
    async getPatientAlerts(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { patientId } = req.params;

            const alerts = await prisma.drugInteractionAlert.findMany({
                where: {
                    prescription: { patientId: Number(patientId) }
                },
                include: {
                    prescription: {
                        include: {
                            prescriptionItems: { include: { tradeName: true } }
                        }
                    },
                    interactingMedicine: true
                },
                orderBy: { createdAt: 'desc' }
            });

            res.json(alerts);
        } catch (error) {
            next(error);
        }
    }
}

export default new DrugInteractionAlertController();
