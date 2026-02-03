"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteChildProfile = exports.getChildProfiles = exports.addChildProfile = exports.deleteAllergy = exports.addAllergy = exports.updateLifestyle = exports.addFamilyHistory = exports.getMedicalHistories = exports.addMedicalHistory = exports.getPatientByUserId = exports.getPatientById = exports.createOrUpdatePatient = void 0;
const zod_1 = require("zod");
const prisma_1 = require("../lib/prisma");
const patient_zod_1 = require("../zod/patient.zod");
// Create or Update Patient Profile
const createOrUpdatePatient = async (req, res, next) => {
    try {
        const validatedData = patient_zod_1.createPatientSchema.parse(req.body);
        const { userId, ...patientData } = validatedData;
        // Check if patient already exists for this user
        const existingPatient = await prisma_1.prisma.patient.findUnique({
            where: { userId }
        });
        if (existingPatient) {
            // Update existing patient
            const updated = await prisma_1.prisma.patient.update({
                where: { userId },
                data: patientData,
                include: {
                    user: {
                        select: { email: true, role: true }
                    }
                }
            });
            res.json({
                message: 'Patient profile updated successfully',
                patient: updated
            });
            return;
        }
        // Create new patient
        const patient = await prisma_1.prisma.patient.create({
            data: {
                ...patientData,
                userId
            },
            include: {
                user: {
                    select: { email: true, role: true }
                }
            }
        });
        res.status(201).json({
            message: 'Patient profile created successfully',
            patient
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({ error: error.issues });
            return;
        }
        next(error);
    }
};
exports.createOrUpdatePatient = createOrUpdatePatient;
// Get Patient by ID
const getPatientById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const patient = await prisma_1.prisma.patient.findUnique({
            where: { id: parseInt(id) },
            include: {
                user: {
                    select: { email: true, role: true, isActive: true }
                },
                medicalHistories: true,
                familyHistories: true,
                lifestyle: true,
                allergies: true,
                childrenProfiles: true,
                patientDiseases: {
                    include: {
                        disease: true
                    }
                }
            }
        });
        if (!patient) {
            res.status(404).json({ error: 'Patient not found' });
            return;
        }
        res.json(patient);
    }
    catch (error) {
        next(error);
    }
};
exports.getPatientById = getPatientById;
// Get Patient by User ID
const getPatientByUserId = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const patient = await prisma_1.prisma.patient.findUnique({
            where: { userId: parseInt(userId) },
            include: {
                user: {
                    select: { email: true, role: true, isActive: true }
                },
                medicalHistories: true,
                familyHistories: true,
                lifestyle: true,
                allergies: true,
                childrenProfiles: true
            }
        });
        if (!patient) {
            res.status(404).json({ error: 'Patient not found' });
            return;
        }
        res.json(patient);
    }
    catch (error) {
        next(error);
    }
};
exports.getPatientByUserId = getPatientByUserId;
// Add Medical History Entry
const addMedicalHistory = async (req, res, next) => {
    try {
        const { patientId } = req.params;
        const validatedData = patient_zod_1.medicalHistorySchema.parse(req.body);
        // Check if patient exists
        const patient = await prisma_1.prisma.patient.findUnique({
            where: { id: parseInt(patientId) }
        });
        if (!patient) {
            res.status(404).json({ error: 'Patient not found' });
            return;
        }
        const medicalHistory = await prisma_1.prisma.medicalHistory.create({
            data: {
                patientId: parseInt(patientId),
                ...validatedData,
                diagnosisDate: validatedData.diagnosisDate ? new Date(validatedData.diagnosisDate) : undefined
            }
        });
        res.status(201).json({
            message: 'Medical history added successfully',
            medicalHistory
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({ error: error.issues });
            return;
        }
        next(error);
    }
};
exports.addMedicalHistory = addMedicalHistory;
// Get All Medical Histories for a Patient
const getMedicalHistories = async (req, res, next) => {
    try {
        const { patientId } = req.params;
        const histories = await prisma_1.prisma.medicalHistory.findMany({
            where: { patientId: parseInt(patientId) },
            include: { disease: true },
            orderBy: { createdAt: 'desc' }
        });
        res.json(histories);
    }
    catch (error) {
        next(error);
    }
};
exports.getMedicalHistories = getMedicalHistories;
// Add Family History Entry
const addFamilyHistory = async (req, res, next) => {
    try {
        const { patientId } = req.params;
        const validatedData = patient_zod_1.familyHistorySchema.parse(req.body);
        // Check if patient exists
        const patient = await prisma_1.prisma.patient.findUnique({
            where: { id: parseInt(patientId) }
        });
        if (!patient) {
            res.status(404).json({ error: 'Patient not found' });
            return;
        }
        const familyHistory = await prisma_1.prisma.familyHistory.create({
            data: {
                patientId: parseInt(patientId),
                ...validatedData
            }
        });
        res.status(201).json({
            message: 'Family history added successfully',
            familyHistory
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({ error: error.issues });
            return;
        }
        next(error);
    }
};
exports.addFamilyHistory = addFamilyHistory;
// Update or Create Lifestyle
const updateLifestyle = async (req, res, next) => {
    try {
        const { patientId } = req.params;
        const validatedData = patient_zod_1.lifestyleSchema.parse(req.body);
        // Check if patient exists
        const patient = await prisma_1.prisma.patient.findUnique({
            where: { id: parseInt(patientId) }
        });
        if (!patient) {
            res.status(404).json({ error: 'Patient not found' });
            return;
        }
        // Check if lifestyle exists
        const existingLifestyle = await prisma_1.prisma.lifestyle.findUnique({
            where: { patientId: parseInt(patientId) }
        });
        let lifestyle;
        if (existingLifestyle) {
            lifestyle = await prisma_1.prisma.lifestyle.update({
                where: { patientId: parseInt(patientId) },
                data: validatedData
            });
        }
        else {
            lifestyle = await prisma_1.prisma.lifestyle.create({
                data: {
                    patientId: parseInt(patientId),
                    ...validatedData
                }
            });
        }
        res.json({
            message: 'Lifestyle updated successfully',
            lifestyle
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({ error: error.issues });
            return;
        }
        next(error);
    }
};
exports.updateLifestyle = updateLifestyle;
// Add Allergy
const addAllergy = async (req, res, next) => {
    try {
        const { patientId } = req.params;
        const validatedData = patient_zod_1.allergySchema.parse(req.body);
        // Check if patient exists
        const patient = await prisma_1.prisma.patient.findUnique({
            where: { id: parseInt(patientId) }
        });
        if (!patient) {
            res.status(404).json({ error: 'Patient not found' });
            return;
        }
        const allergy = await prisma_1.prisma.allergy.create({
            data: {
                patientId: parseInt(patientId),
                ...validatedData
            }
        });
        res.status(201).json({
            message: 'Allergy added successfully',
            allergy
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({ error: error.issues });
            return;
        }
        next(error);
    }
};
exports.addAllergy = addAllergy;
// Delete Allergy
const deleteAllergy = async (req, res, next) => {
    try {
        const { allergyId } = req.params;
        await prisma_1.prisma.allergy.delete({
            where: { id: parseInt(allergyId) }
        });
        res.json({ message: 'Allergy deleted successfully' });
    }
    catch (error) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'Allergy not found' });
            return;
        }
        next(error);
    }
};
exports.deleteAllergy = deleteAllergy;
// Add Child Profile
const addChildProfile = async (req, res, next) => {
    try {
        const { patientId } = req.params;
        const validatedData = patient_zod_1.childProfileSchema.parse(req.body);
        // Check if patient exists
        const patient = await prisma_1.prisma.patient.findUnique({
            where: { id: parseInt(patientId) }
        });
        if (!patient) {
            res.status(404).json({ error: 'Patient not found' });
            return;
        }
        const childProfile = await prisma_1.prisma.childProfile.create({
            data: {
                parentPatientId: parseInt(patientId),
                ...validatedData,
                dateOfBirth: new Date(validatedData.dateOfBirth)
            }
        });
        res.status(201).json({
            message: 'Child profile added successfully',
            childProfile
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({ error: error.issues });
            return;
        }
        next(error);
    }
};
exports.addChildProfile = addChildProfile;
// Get All Child Profiles
const getChildProfiles = async (req, res, next) => {
    try {
        const { patientId } = req.params;
        const childProfiles = await prisma_1.prisma.childProfile.findMany({
            where: { parentPatientId: parseInt(patientId) }
        });
        res.json(childProfiles);
    }
    catch (error) {
        next(error);
    }
};
exports.getChildProfiles = getChildProfiles;
// Delete Child Profile
const deleteChildProfile = async (req, res, next) => {
    try {
        const { childId } = req.params;
        await prisma_1.prisma.childProfile.delete({
            where: { id: parseInt(childId) }
        });
        res.json({ message: 'Child profile deleted successfully' });
    }
    catch (error) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'Child profile not found' });
            return;
        }
        next(error);
    }
};
exports.deleteChildProfile = deleteChildProfile;
//# sourceMappingURL=patient.controller.js.map