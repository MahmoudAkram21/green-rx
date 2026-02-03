"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePatientDisease = exports.updatePatientDiseaseStatus = exports.getActivePatientDiseases = exports.getPatientDiseases = exports.addPatientDisease = void 0;
const database_1 = __importDefault(require("../config/database"));
// Create or update patient disease
const addPatientDisease = async (req, res) => {
    try {
        const patientId = parseInt(req.params.patientId);
        const { diseaseId, diagnosisDate, severity, status, notes } = req.body;
        // Validate patient exists
        const patient = await database_1.default.patient.findUnique({
            where: { id: patientId }
        });
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        // Validate disease exists
        const disease = await database_1.default.disease.findUnique({
            where: { id: diseaseId }
        });
        if (!disease) {
            return res.status(404).json({ error: 'Disease not found' });
        }
        // Check if patient already has this disease
        const existing = await database_1.default.patientDisease.findFirst({
            where: {
                patientId,
                diseaseId
            }
        });
        if (existing) {
            // Update existing
            const updated = await database_1.default.patientDisease.update({
                where: { id: existing.id },
                data: {
                    diagnosisDate: diagnosisDate ? new Date(diagnosisDate) : existing.diagnosisDate,
                    severity: severity || existing.severity,
                    status: status || existing.status,
                    notes: notes !== undefined ? notes : existing.notes
                },
                include: {
                    disease: true
                }
            });
            return res.json(updated);
        }
        // Create new patient disease
        const patientDisease = await database_1.default.patientDisease.create({
            data: {
                patientId,
                diseaseId,
                diagnosisDate: new Date(diagnosisDate),
                severity: severity,
                status: status,
                notes
            },
            include: {
                disease: true
            }
        });
        return res.status(201).json(patientDisease);
    }
    catch (error) {
        console.error('Error adding patient disease:', error);
        return res.status(500).json({ error: 'Failed to add patient disease' });
    }
};
exports.addPatientDisease = addPatientDisease;
// Get all diseases for a patient
const getPatientDiseases = async (req, res) => {
    try {
        const patientId = parseInt(req.params.patientId);
        const { status } = req.query;
        const where = { patientId };
        if (status) {
            where.status = status;
        }
        const diseases = await database_1.default.patientDisease.findMany({
            where,
            include: {
                disease: true
            },
            orderBy: {
                diagnosisDate: 'desc'
            }
        });
        return res.json(diseases);
    }
    catch (error) {
        console.error('Error fetching patient diseases:', error);
        return res.status(500).json({ error: 'Failed to fetch patient diseases' });
    }
};
exports.getPatientDiseases = getPatientDiseases;
// Get active diseases for a patient (for safety checks)
const getActivePatientDiseases = async (req, res) => {
    try {
        const patientId = parseInt(req.params.patientId);
        const activeDiseases = await database_1.default.patientDisease.findMany({
            where: {
                patientId,
                status: {
                    in: ['Active', 'Chronic']
                }
            },
            include: {
                disease: true
            },
            orderBy: {
                severity: 'desc'
            }
        });
        return res.json(activeDiseases);
    }
    catch (error) {
        console.error('Error fetching active diseases:', error);
        return res.status(500).json({ error: 'Failed to fetch active diseases' });
    }
};
exports.getActivePatientDiseases = getActivePatientDiseases;
// Update patient disease status
const updatePatientDiseaseStatus = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { status, severity, notes } = req.body;
        const updated = await database_1.default.patientDisease.update({
            where: { id },
            data: {
                status: status || undefined,
                severity: severity || undefined,
                notes: notes !== undefined ? notes : undefined
            },
            include: {
                disease: true
            }
        });
        return res.json(updated);
    }
    catch (error) {
        console.error('Error updating patient disease:', error);
        return res.status(500).json({ error: 'Failed to update patient disease' });
    }
};
exports.updatePatientDiseaseStatus = updatePatientDiseaseStatus;
// Delete patient disease
const deletePatientDisease = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await database_1.default.patientDisease.delete({
            where: { id }
        });
        return res.json({ message: 'Patient disease removed successfully' });
    }
    catch (error) {
        console.error('Error deleting patient disease:', error);
        return res.status(500).json({ error: 'Failed to delete patient disease' });
    }
};
exports.deletePatientDisease = deletePatientDisease;
//# sourceMappingURL=patientDisease.controller.js.map