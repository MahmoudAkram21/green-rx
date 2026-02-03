"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDrugInteractionAlerts = exports.acknowledgeDrugInteraction = exports.deletePrescription = exports.updatePrescription = exports.getPrescriptionById = exports.getPrescriptions = exports.createBatchPrescriptions = exports.createPrescription = void 0;
const prisma_1 = require("../lib/prisma");
const client_1 = require("../generated/client");
const warningService_1 = require("../services/warningService");
// Create a new prescription
const createPrescription = async (req, res) => {
    try {
        const { doctorId, patientId, tradeNameId, dosage, frequency, duration, instructions, validFrom, validUntil, maxRefills, notes } = req.body;
        // Validate required fields
        if (!doctorId || !patientId || !tradeNameId) {
            return res.status(400).json({
                message: 'Doctor ID, Patient ID, and Trade Name ID are required'
            });
        }
        // COMPREHENSIVE WARNING CHECK - All 8 Types
        const warningResult = await (0, warningService_1.generateWarnings)(patientId, tradeNameId);
        // Block prescription if critical warnings
        if (warningResult.blocked) {
            return res.status(400).json({
                message: 'Cannot prescribe: Critical warnings detected',
                blocked: true,
                warnings: warningResult.warnings
            });
        }
        // Create prescription
        const prescription = await prisma_1.prisma.prescription.create({
            data: {
                doctorId,
                patientId,
                tradeNameId,
                status: client_1.PrescriptionStatus.Draft,
                prescriptionDate: new Date(),
                validFrom: validFrom ? new Date(validFrom) : new Date(),
                validUntil: validUntil ? new Date(validUntil) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days default
                dosage,
                frequency,
                duration,
                instructions,
                maxRefills: maxRefills || 0,
                notes,
                version: 1
            },
            include: {
                doctor: {
                    include: {
                        user: {
                            select: { email: true }
                        }
                    }
                },
                patient: {
                    include: {
                        user: {
                            select: { email: true }
                        }
                    }
                },
                tradeName: {
                    include: {
                        activeSubstance: true,
                        company: true
                    }
                }
            }
        });
        // Return prescription WITH warnings
        return res.status(201).json({
            prescription,
            warnings: warningResult.warnings
        });
    }
    catch (error) {
        console.error('Error creating prescription:', error);
        return res.status(500).json({ message: 'Error creating prescription', error });
    }
};
exports.createPrescription = createPrescription;
// Create multiple prescriptions in a batch (same visit) with cross-interaction checking
const createBatchPrescriptions = async (req, res) => {
    try {
        const { doctorId, patientId, medicines, // Array of {tradeNameId, dosage, frequency, duration, instructions, notes}
        validFrom, validUntil, maxRefills } = req.body;
        // Validate required fields
        if (!doctorId || !patientId || !Array.isArray(medicines) || medicines.length === 0) {
            return res.status(400).json({
                message: 'Doctor ID, Patient ID, and at least one medicine are required'
            });
        }
        const allWarnings = [];
        let blocked = false;
        // STEP 1: Check each medicine against patient's existing prescriptions
        for (const med of medicines) {
            const warningResult = await (0, warningService_1.generateWarnings)(patientId, med.tradeNameId);
            allWarnings.push({
                tradeNameId: med.tradeNameId,
                warnings: warningResult.warnings
            });
            if (warningResult.blocked) {
                blocked = true;
            }
        }
        // STEP 2: Check interactions BETWEEN medicines in this batch
        const { checkBatchInteractions } = await Promise.resolve().then(() => __importStar(require('../services/warningService')));
        const batchInteractionWarnings = await checkBatchInteractions(medicines.map((m) => m.tradeNameId));
        if (batchInteractionWarnings.length > 0) {
            allWarnings.push({
                type: 'batch_interactions',
                warnings: batchInteractionWarnings
            });
            // Check if any batch interactions are critical/high severity
            const hasCriticalBatchInteraction = batchInteractionWarnings.some((w) => w.severity === 'Critical' || w.severity === 'High');
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
        // STEP 4: Create all prescriptions in a transaction
        const prescriptions = await prisma_1.prisma.$transaction(medicines.map((med) => prisma_1.prisma.prescription.create({
            data: {
                doctorId,
                patientId,
                tradeNameId: med.tradeNameId,
                status: client_1.PrescriptionStatus.Draft,
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
            },
            include: {
                tradeName: {
                    include: {
                        activeSubstance: true,
                        company: true
                    }
                }
            }
        })));
        return res.status(201).json({
            prescriptions,
            warnings: allWarnings,
            batchInteractionWarnings,
            message: `Successfully created ${prescriptions.length} prescriptions`
        });
    }
    catch (error) {
        console.error('Error creating batch prescriptions:', error);
        return res.status(500).json({ message: 'Error creating batch prescriptions', error });
    }
};
exports.createBatchPrescriptions = createBatchPrescriptions;
// Get all prescriptions (with filters)
const getPrescriptions = async (req, res) => {
    try {
        const { patientId, doctorId, status, page = 1, limit = 20 } = req.query;
        const where = {};
        if (patientId)
            where.patientId = parseInt(patientId);
        if (doctorId)
            where.doctorId = parseInt(doctorId);
        if (status)
            where.status = status;
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const [prescriptions, total] = await Promise.all([
            prisma_1.prisma.prescription.findMany({
                where,
                skip,
                take: parseInt(limit),
                include: {
                    doctor: {
                        select: {
                            id: true,
                            name: true,
                            specialization: true
                        }
                    },
                    patient: {
                        select: {
                            id: true,
                            name: true,
                            age: true
                        }
                    },
                    tradeName: {
                        include: {
                            activeSubstance: true,
                            company: true
                        }
                    },
                    drugInteractionAlerts: true
                },
                orderBy: {
                    prescriptionDate: 'desc'
                }
            }),
            prisma_1.prisma.prescription.count({ where })
        ]);
        return res.json({
            prescriptions,
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / parseInt(limit))
            }
        });
    }
    catch (error) {
        console.error('Error fetching prescriptions:', error);
        return res.status(500).json({ message: 'Error fetching prescriptions', error });
    }
};
exports.getPrescriptions = getPrescriptions;
// Get prescription by ID
const getPrescriptionById = async (req, res) => {
    try {
        const { id } = req.params;
        const prescription = await prisma_1.prisma.prescription.findUnique({
            where: { id: parseInt(id) },
            include: {
                doctor: {
                    include: {
                        user: {
                            select: { email: true, role: true }
                        }
                    }
                },
                patient: {
                    include: {
                        user: {
                            select: { email: true }
                        },
                        allergies: true,
                        patientDiseases: {
                            include: {
                                disease: true
                            }
                        }
                    }
                },
                tradeName: {
                    include: {
                        activeSubstance: true,
                        company: true
                    }
                },
                drugInteractionAlerts: {
                    include: {
                        interactingMedicine: {
                            include: {
                                activeSubstance: true
                            }
                        }
                    }
                },
                prescriptionVersions: {
                    orderBy: {
                        version: 'desc'
                    }
                }
            }
        });
        if (!prescription) {
            return res.status(404).json({ message: 'Prescription not found' });
        }
        return res.json(prescription);
    }
    catch (error) {
        console.error('Error fetching prescription:', error);
        return res.status(500).json({ message: 'Error fetching prescription', error });
    }
};
exports.getPrescriptionById = getPrescriptionById;
// Update prescription
const updatePrescription = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, dosage, frequency, duration, instructions, notes, changedBy } = req.body;
        const existingPrescription = await prisma_1.prisma.prescription.findUnique({
            where: { id: parseInt(id) }
        });
        if (!existingPrescription) {
            return res.status(404).json({ message: 'Prescription not found' });
        }
        // Track version if significant changes
        const shouldVersion = dosage !== existingPrescription.dosage ||
            frequency !== existingPrescription.frequency ||
            duration !== existingPrescription.duration;
        const prescription = await prisma_1.prisma.prescription.update({
            where: { id: parseInt(id) },
            data: {
                status,
                dosage,
                frequency,
                duration,
                instructions,
                notes,
                version: shouldVersion ? existingPrescription.version + 1 : existingPrescription.version
            },
            include: {
                doctor: true,
                patient: true,
                tradeName: {
                    include: {
                        activeSubstance: true
                    }
                }
            }
        });
        // Create version entry if needed
        if (shouldVersion && changedBy) {
            await prisma_1.prisma.prescriptionVersion.create({
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
    }
    catch (error) {
        console.error('Error updating prescription:', error);
        return res.status(500).json({ message: 'Error updating prescription', error });
    }
};
exports.updatePrescription = updatePrescription;
// Delete prescription (soft delete)
const deletePrescription = async (req, res) => {
    try {
        const { id } = req.params;
        const prescription = await prisma_1.prisma.prescription.update({
            where: { id: parseInt(id) },
            data: {
                deletedAt: new Date(),
                status: client_1.PrescriptionStatus.Cancelled
            }
        });
        return res.json({ message: 'Prescription deleted successfully', prescription });
    }
    catch (error) {
        console.error('Error deleting prescription:', error);
        return res.status(500).json({ message: 'Error deleting prescription', error });
    }
};
exports.deletePrescription = deletePrescription;
// Acknowledge drug interaction alert
const acknowledgeDrugInteraction = async (req, res) => {
    try {
        const { alertId } = req.params;
        const { acknowledgedBy } = req.body; // 'doctor' or 'patient'
        const updateData = { acknowledgedAt: new Date() };
        if (acknowledgedBy === 'doctor') {
            updateData.acknowledgedByDoctor = true;
        }
        else if (acknowledgedBy === 'patient') {
            updateData.acknowledgedByPatient = true;
        }
        const alert = await prisma_1.prisma.drugInteractionAlert.update({
            where: { id: parseInt(alertId) },
            data: updateData
        });
        return res.json(alert);
    }
    catch (error) {
        console.error('Error acknowledging interaction:', error);
        return res.status(500).json({ message: 'Error acknowledging interaction', error });
    }
};
exports.acknowledgeDrugInteraction = acknowledgeDrugInteraction;
// Get drug interaction alerts for a prescription
const getDrugInteractionAlerts = async (req, res) => {
    try {
        const { prescriptionId } = req.params;
        const alerts = await prisma_1.prisma.drugInteractionAlert.findMany({
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
    }
    catch (error) {
        console.error('Error fetching drug interaction alerts:', error);
        return res.status(500).json({ message: 'Error fetching alerts', error });
    }
};
exports.getDrugInteractionAlerts = getDrugInteractionAlerts;
//# sourceMappingURL=prescription.controller.js.map