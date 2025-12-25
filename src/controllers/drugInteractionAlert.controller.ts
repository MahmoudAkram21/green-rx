import { Request, Response, NextFunction } from 'express';
import drugInteractionService from '../services/drugInteraction.service';
import { prisma } from '../lib/prisma';

class DrugInteractionAlertController {
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
                        include: { tradeName: true }
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
