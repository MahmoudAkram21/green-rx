"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const drugInteraction_service_1 = __importDefault(require("../services/drugInteraction.service"));
const prisma_1 = require("../lib/prisma");
class DrugInteractionAlertController {
    // Check drug safety before prescribing
    async checkDrugSafety(req, res, next) {
        try {
            const { patientId, activeSubstanceId, tradeNameId } = req.body;
            if (!patientId || !activeSubstanceId) {
                return res.status(400).json({
                    error: 'Patient ID and Active Substance ID are required'
                });
            }
            const safetyCheck = await drugInteraction_service_1.default.checkDrugSafety(Number(patientId), Number(activeSubstanceId), tradeNameId ? Number(tradeNameId) : undefined);
            res.json(safetyCheck);
        }
        catch (error) {
            next(error);
        }
    }
    // Get all drug interaction alerts for a prescription
    async getAlertsByPrescription(req, res, next) {
        try {
            const { prescriptionId } = req.params;
            const alerts = await prisma_1.prisma.drugInteractionAlert.findMany({
                where: { prescriptionId: Number(prescriptionId) },
                include: {
                    interactingMedicine: true
                },
                orderBy: { createdAt: 'desc' }
            });
            res.json(alerts);
        }
        catch (error) {
            next(error);
        }
    }
    // Acknowledge alert by doctor
    async acknowledgeByDoctor(req, res, next) {
        try {
            const { id } = req.params;
            const alert = await prisma_1.prisma.drugInteractionAlert.update({
                where: { id: Number(id) },
                data: { acknowledgedByDoctor: true }
            });
            res.json(alert);
        }
        catch (error) {
            next(error);
        }
    }
    // Acknowledge alert by patient
    async acknowledgeByPatient(req, res, next) {
        try {
            const { id } = req.params;
            const alert = await prisma_1.prisma.drugInteractionAlert.update({
                where: { id: Number(id) },
                data: { acknowledgedByPatient: true }
            });
            res.json(alert);
        }
        catch (error) {
            next(error);
        }
    }
    // Get all alerts for a patient
    async getPatientAlerts(req, res, next) {
        try {
            const { patientId } = req.params;
            const alerts = await prisma_1.prisma.drugInteractionAlert.findMany({
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
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = new DrugInteractionAlertController();
//# sourceMappingURL=drugInteractionAlert.controller.js.map