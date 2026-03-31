"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyMedicine = exports.deleteMedicine = exports.updateMedicine = exports.uploadImage = exports.addMedicine = exports.getById = exports.getByPatient = void 0;
const prisma_1 = require("../lib/prisma");
// Get all medicines a patient is taking
const getByPatient = async (req, res, next) => {
    try {
        const patientId = parseInt(req.params.patientId);
        const { isOngoing } = req.query;
        if (isNaN(patientId)) {
            res.status(400).json({ error: 'Invalid patient ID' });
            return;
        }
        const patientMedicines = await prisma_1.prisma.patientMedicine.findMany({
            where: {
                patientId,
                ...(isOngoing !== undefined && { isOngoing: isOngoing === 'true' })
            },
            include: {
                tradeName: true
            },
            orderBy: { createdAt: 'desc' }
        });
        res.json({ patientMedicines });
    }
    catch (error) {
        next(error);
    }
};
exports.getByPatient = getByPatient;
// Get single record
const getById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid ID' });
            return;
        }
        const patientMedicine = await prisma_1.prisma.patientMedicine.findUnique({
            where: { id },
            include: {
                tradeName: true
            }
        });
        if (!patientMedicine) {
            res.status(404).json({ error: 'Patient medicine not found' });
            return;
        }
        res.json({ patientMedicine });
    }
    catch (error) {
        next(error);
    }
};
exports.getById = getById;
// Add medicine known to system
const addMedicine = async (req, res, next) => {
    try {
        const patientId = parseInt(req.params.patientId);
        const data = req.body;
        if (isNaN(patientId)) {
            res.status(400).json({ error: 'Invalid patient ID' });
            return;
        }
        const newMedicine = await prisma_1.prisma.patientMedicine.create({
            data: {
                patientId,
                tradeNameId: data.tradeNameId || null,
                medicineName: data.medicineName,
                dosageAmount: data.dosageAmount ? Number(data.dosageAmount) : null,
                frequencyCount: data.frequencyCount ? Number(data.frequencyCount) : null,
                frequencyPeriod: data.frequencyPeriod ? Number(data.frequencyPeriod) : null,
                frequencyUnit: data.frequencyUnit,
                durationValue: data.durationValue ? Number(data.durationValue) : null,
                durationUnit: data.durationUnit,
                startDate: data.startDate ? new Date(data.startDate) : null,
                endDate: data.endDate ? new Date(data.endDate) : null,
                isOngoing: data.isOngoing !== undefined ? Boolean(data.isOngoing) : false,
                notes: data.notes,
                reminderEnabled: data.reminderEnabled !== undefined ? Boolean(data.reminderEnabled) : false,
                reminderTimes: data.reminderTimes ? data.reminderTimes : null,
                isVerified: data.tradeNameId ? true : false // Auto-verify if they picked from catalog
            },
            include: { tradeName: true }
        });
        res.status(201).json({ patientMedicine: newMedicine });
    }
    catch (error) {
        next(error);
    }
};
exports.addMedicine = addMedicine;
// Upload an image because medicine not found in system
const uploadImage = async (req, res, next) => {
    try {
        const patientId = parseInt(req.params.patientId);
        const data = req.body;
        const file = req.file;
        if (isNaN(patientId)) {
            res.status(400).json({ error: 'Invalid patient ID' });
            return;
        }
        const imageUrl = file ? `/uploads/patient-medicines/${file.filename}` : undefined;
        const newMedicine = await prisma_1.prisma.patientMedicine.create({
            data: {
                patientId,
                medicineName: data.medicineName || 'Unknown Upload',
                dosageAmount: data.dosageAmount ? Number(data.dosageAmount) : null,
                frequencyCount: data.frequencyCount ? Number(data.frequencyCount) : null,
                frequencyPeriod: data.frequencyPeriod ? Number(data.frequencyPeriod) : null,
                frequencyUnit: data.frequencyUnit,
                durationValue: data.durationValue ? Number(data.durationValue) : null,
                durationUnit: data.durationUnit,
                startDate: data.startDate ? new Date(data.startDate) : null,
                endDate: data.endDate ? new Date(data.endDate) : null,
                isOngoing: data.isOngoing !== undefined ? (data.isOngoing === 'true' || data.isOngoing === true) : false,
                notes: data.notes,
                reminderEnabled: data.reminderEnabled !== undefined ? (data.reminderEnabled === 'true' || data.reminderEnabled === true) : false,
                reminderTimes: data.reminderTimes ? (typeof data.reminderTimes === 'string' ? JSON.parse(data.reminderTimes) : data.reminderTimes) : null,
                imageUrl,
                isVerified: false
            }
        });
        // Automatically create an AddMedicineRequest to place this into the Admin Queue
        await prisma_1.prisma.addMedicineRequest.create({
            data: {
                patientId,
                patientMedicineId: newMedicine.id,
                imageUrl,
                extractedTradeName: data.medicineName || 'Unknown',
                extractedActiveSubstance: 'Pending Admin Review'
            }
        });
        res.status(201).json({ patientMedicine: newMedicine, message: 'Medicine submitted for administrative review' });
    }
    catch (error) {
        next(error);
    }
};
exports.uploadImage = uploadImage;
// Update medicine stats
const updateMedicine = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const data = req.body;
        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid ID' });
            return;
        }
        const updateData = {};
        if (data.medicineName !== undefined)
            updateData.medicineName = data.medicineName;
        if (data.dosageAmount !== undefined)
            updateData.dosageAmount = data.dosageAmount ? Number(data.dosageAmount) : null;
        if (data.frequencyCount !== undefined)
            updateData.frequencyCount = data.frequencyCount ? Number(data.frequencyCount) : null;
        if (data.frequencyPeriod !== undefined)
            updateData.frequencyPeriod = data.frequencyPeriod ? Number(data.frequencyPeriod) : null;
        if (data.frequencyUnit !== undefined)
            updateData.frequencyUnit = data.frequencyUnit;
        if (data.durationValue !== undefined)
            updateData.durationValue = data.durationValue ? Number(data.durationValue) : null;
        if (data.durationUnit !== undefined)
            updateData.durationUnit = data.durationUnit;
        if (data.startDate !== undefined)
            updateData.startDate = data.startDate ? new Date(data.startDate) : null;
        if (data.endDate !== undefined)
            updateData.endDate = data.endDate ? new Date(data.endDate) : null;
        if (data.isOngoing !== undefined)
            updateData.isOngoing = Boolean(data.isOngoing);
        if (data.notes !== undefined)
            updateData.notes = data.notes;
        if (data.reminderEnabled !== undefined)
            updateData.reminderEnabled = Boolean(data.reminderEnabled);
        if (data.reminderTimes !== undefined)
            updateData.reminderTimes = data.reminderTimes;
        const updated = await prisma_1.prisma.patientMedicine.update({
            where: { id },
            data: updateData
        });
        res.json({ patientMedicine: updated });
    }
    catch (error) {
        next(error);
    }
};
exports.updateMedicine = updateMedicine;
// Delete a record
const deleteMedicine = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid ID' });
            return;
        }
        await prisma_1.prisma.patientMedicine.delete({
            where: { id }
        });
        res.json({ message: 'Deleted successfully' });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteMedicine = deleteMedicine;
// Verify linking a TradeName by the admin
const verifyMedicine = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const { tradeNameId } = req.body;
        if (isNaN(id) || !tradeNameId) {
            res.status(400).json({ error: 'Invalid parameters' });
            return;
        }
        const updated = await prisma_1.prisma.patientMedicine.update({
            where: { id },
            data: {
                tradeNameId: parseInt(tradeNameId),
                isVerified: true
            }
        });
        res.json({
            message: 'Verified successfully',
            patientMedicine: updated
        });
    }
    catch (error) {
        next(error);
    }
};
exports.verifyMedicine = verifyMedicine;
//# sourceMappingURL=patientMedicines.controller.js.map