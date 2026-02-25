"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUnverifiedMedicines = exports.verifyPatientMedicine = exports.deletePatientMedicine = exports.updatePatientMedicine = exports.addPatientMedicineByImage = exports.addPatientMedicine = exports.getPatientMedicineById = exports.getPatientMedicines = void 0;
const prisma_1 = require("../lib/prisma");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uploadsDir = path_1.default.join(__dirname, '../../uploads/patient-medicines');
if (!fs_1.default.existsSync(uploadsDir)) {
    fs_1.default.mkdirSync(uploadsDir, { recursive: true });
}
// ── GET /patient-medicines/patient/:patientId ─────────────────────────────────
const getPatientMedicines = async (req, res, next) => {
    try {
        const { patientId } = req.params;
        const { isOngoing } = req.query;
        const where = { patientId: Number(patientId) };
        if (isOngoing !== undefined) {
            where.isOngoing = isOngoing === 'true';
        }
        const medicines = await prisma_1.prisma.patientMedicine.findMany({
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
    }
    catch (error) {
        next(error);
    }
};
exports.getPatientMedicines = getPatientMedicines;
// ── GET /patient-medicines/:id ────────────────────────────────────────────────
const getPatientMedicineById = async (req, res, next) => {
    try {
        const medicine = await prisma_1.prisma.patientMedicine.findUnique({
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
    }
    catch (error) {
        next(error);
    }
};
exports.getPatientMedicineById = getPatientMedicineById;
// ── POST /patient-medicines/patient/:patientId ────────────────────────────────
// Patient picks a medicine that exists in the system (tradeNameId required)
const addPatientMedicine = async (req, res, next) => {
    try {
        const { patientId } = req.params;
        const { tradeNameId, medicineName, dosage, frequency, startDate, endDate, isOngoing, notes, } = req.body;
        if (!medicineName) {
            res.status(400).json({ message: 'medicineName is required' });
            return;
        }
        // If tradeNameId provided, pull activeSubstanceId automatically
        let activeSubstanceId;
        if (tradeNameId) {
            const tn = await prisma_1.prisma.tradeName.findUnique({
                where: { id: Number(tradeNameId) },
                select: { activeSubstanceId: true },
            });
            if (!tn) {
                res.status(404).json({ message: 'Trade name not found in system' });
                return;
            }
            activeSubstanceId = tn.activeSubstanceId;
        }
        const medicine = await prisma_1.prisma.patientMedicine.create({
            data: {
                patientId: Number(patientId),
                tradeNameId: tradeNameId ? Number(tradeNameId) : null,
                activeSubstanceId: activeSubstanceId ?? null,
                medicineName,
                dosage,
                frequency,
                startDate: startDate ? new Date(startDate) : null,
                endDate: endDate ? new Date(endDate) : null,
                isOngoing: isOngoing !== undefined ? Boolean(isOngoing) : true,
                notes,
            },
            include: {
                tradeName: { include: { activeSubstance: true, company: true } },
                activeSubstance: true,
            },
        });
        res.status(201).json(medicine);
    }
    catch (error) {
        next(error);
    }
};
exports.addPatientMedicine = addPatientMedicine;
// ── POST /patient-medicines/patient/:patientId/upload-image ───────────────────
// Patient does NOT find their medicine — uploads an image instead
const addPatientMedicineByImage = async (req, res, next) => {
    try {
        const { patientId } = req.params;
        const { medicineName, dosage, frequency, startDate, endDate, isOngoing, notes } = req.body;
        if (!req.file) {
            res.status(400).json({ message: 'Image file is required for unrecognised medicine upload' });
            return;
        }
        const imageUrl = `/uploads/patient-medicines/${req.file.filename}`;
        const medicine = await prisma_1.prisma.patientMedicine.create({
            data: {
                patientId: Number(patientId),
                medicineName: medicineName || req.file.originalname,
                dosage,
                frequency,
                startDate: startDate ? new Date(startDate) : null,
                endDate: endDate ? new Date(endDate) : null,
                isOngoing: isOngoing !== undefined ? Boolean(isOngoing) : true,
                notes,
                imageUrl,
                imageFileName: req.file.originalname,
                isVerified: false,
            },
        });
        res.status(201).json(medicine);
    }
    catch (error) {
        next(error);
    }
};
exports.addPatientMedicineByImage = addPatientMedicineByImage;
// ── PATCH /patient-medicines/:id ──────────────────────────────────────────────
const updatePatientMedicine = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { dosage, frequency, startDate, endDate, isOngoing, notes, medicineName } = req.body;
        const existing = await prisma_1.prisma.patientMedicine.findUnique({ where: { id: Number(id) } });
        if (!existing) {
            res.status(404).json({ message: 'Medicine record not found' });
            return;
        }
        const medicine = await prisma_1.prisma.patientMedicine.update({
            where: { id: Number(id) },
            data: {
                medicineName: medicineName ?? existing.medicineName,
                dosage,
                frequency,
                startDate: startDate ? new Date(startDate) : existing.startDate,
                endDate: endDate ? new Date(endDate) : existing.endDate,
                isOngoing: isOngoing !== undefined ? Boolean(isOngoing) : existing.isOngoing,
                notes,
            },
            include: {
                tradeName: { include: { activeSubstance: true } },
            },
        });
        res.json(medicine);
    }
    catch (error) {
        next(error);
    }
};
exports.updatePatientMedicine = updatePatientMedicine;
// ── DELETE /patient-medicines/:id ─────────────────────────────────────────────
const deletePatientMedicine = async (req, res, next) => {
    try {
        const { id } = req.params;
        const existing = await prisma_1.prisma.patientMedicine.findUnique({ where: { id: Number(id) } });
        if (!existing) {
            res.status(404).json({ message: 'Medicine record not found' });
            return;
        }
        // Delete uploaded image file if it exists
        if (existing.imageUrl) {
            const filePath = path_1.default.join(__dirname, '../..', existing.imageUrl);
            if (fs_1.default.existsSync(filePath))
                fs_1.default.unlinkSync(filePath);
        }
        await prisma_1.prisma.patientMedicine.delete({ where: { id: Number(id) } });
        res.json({ message: 'Medicine record deleted successfully' });
    }
    catch (error) {
        next(error);
    }
};
exports.deletePatientMedicine = deletePatientMedicine;
// ── PATCH /patient-medicines/:id/verify  (Admin/Doctor only) ──────────────────
// Links an image-uploaded medicine to a real TradeName in the system
const verifyPatientMedicine = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { tradeNameId } = req.body;
        const verifierId = req.user?.userId;
        if (!tradeNameId) {
            res.status(400).json({ message: 'tradeNameId is required to verify' });
            return;
        }
        const tn = await prisma_1.prisma.tradeName.findUnique({
            where: { id: Number(tradeNameId) },
            select: { id: true, title: true, activeSubstanceId: true },
        });
        if (!tn) {
            res.status(404).json({ message: 'Trade name not found' });
            return;
        }
        const medicine = await prisma_1.prisma.patientMedicine.update({
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
    }
    catch (error) {
        next(error);
    }
};
exports.verifyPatientMedicine = verifyPatientMedicine;
// ── GET /patient-medicines/unverified  (Admin only) ───────────────────────────
const getUnverifiedMedicines = async (req, res, next) => {
    try {
        const { page = '1', limit = '20' } = req.query;
        const [items, total] = await Promise.all([
            prisma_1.prisma.patientMedicine.findMany({
                where: { imageUrl: { not: null }, isVerified: false },
                include: {
                    patient: { select: { id: true, name: true } },
                },
                skip: (Number(page) - 1) * Number(limit),
                take: Number(limit),
                orderBy: { createdAt: 'desc' },
            }),
            prisma_1.prisma.patientMedicine.count({
                where: { imageUrl: { not: null }, isVerified: false },
            }),
        ]);
        res.json({ data: items, total, page: Number(page), limit: Number(limit) });
    }
    catch (error) {
        next(error);
    }
};
exports.getUnverifiedMedicines = getUnverifiedMedicines;
//# sourceMappingURL=patientMedicine.controller.js.map