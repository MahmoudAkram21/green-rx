import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import {
    createPatientSchema,
    medicalHistorySchema,
    familyHistorySchema,
    lifestyleSchema,
    allergySchema,
    childProfileSchema
} from '../zod/patient.zod';

// Create or Update Patient Profile
export const createOrUpdatePatient = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = createPatientSchema.parse(req.body);
        const { userId, ...patientData } = validatedData;

        // Check if patient already exists for this user
        const existingPatient = await prisma.patient.findUnique({
            where: { userId }
        });

        if (existingPatient) {
            // Update existing patient
            const updated = await prisma.patient.update({
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
        const patient = await prisma.patient.create({
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
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.issues });
            return;
        }
        next(error);
    }
};

// Get all patients (Admin/SuperAdmin only)
export const getAllPatients = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = Math.max(1, parseInt(String(req.query.page)) || 1);
        const limit = Math.min(100, Math.max(1, parseInt(String(req.query.limit)) || 20));
        const search = typeof req.query.search === 'string' ? req.query.search.trim() : undefined;
        const skip = (page - 1) * limit;

        const where = search
            ? { name: { contains: search, mode: 'insensitive' as const } }
            : {};

        const [patients, total] = await Promise.all([
            prisma.patient.findMany({
                where,
                skip,
                take: limit,
                include: {
                    user: { select: { email: true, role: true } }
                },
                orderBy: { id: 'asc' }
            }),
            prisma.patient.count({ where })
        ]);

        res.json({
            patients,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        next(error);
    }
};

// Get Patient by ID
export const getPatientById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const patient = await prisma.patient.findUnique({
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
    } catch (error) {
        next(error);
    }
};

// Get Patient by User ID
export const getPatientByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;

        const patient = await prisma.patient.findUnique({
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
    } catch (error) {
        next(error);
    }
};

// Add Medical History Entry (accepts single object or array of objects)
export const addMedicalHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { patientId } = req.params;
        const raw = req.body;
        const items = Array.isArray(raw) ? raw : [raw];
        const validatedItems = z.array(medicalHistorySchema).parse(items);

        const patient = await prisma.patient.findUnique({
            where: { id: parseInt(patientId) }
        });

        if (!patient) {
            res.status(404).json({ error: 'Patient not found' });
            return;
        }

        if (validatedItems.length === 0) {
            res.status(400).json({ error: 'At least one medical history entry is required' });
            return;
        }

        const data = validatedItems.map((v) => ({
            patientId: parseInt(patientId),
            diseaseId: v.diseaseId,
            severity: v.severity,
            status: v.status,
            diagnosisDate: v.diagnosisDate ? new Date(v.diagnosisDate) : undefined,
            treatment: v.treatment,
            notes: v.notes
        }));

        const medicalHistories = await prisma.medicalHistory.createManyAndReturn({ data });

        res.status(201).json({
            message: medicalHistories.length === 1 ? 'Medical history added successfully' : `${medicalHistories.length} medical history entries added successfully`,
            count: medicalHistories.length,
            medicalHistories
        });
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.issues });
            return;
        }
        next(error);
    }
};

// Get All Medical Histories for a Patient
export const getMedicalHistories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { patientId } = req.params;

        const histories = await prisma.medicalHistory.findMany({
            where: { patientId: parseInt(patientId) },
            include: { disease: true },
            orderBy: { createdAt: 'desc' }
        });

        res.json(histories);
    } catch (error) {
        next(error);
    }
};

// Add Family History Entry (accepts single object or array of objects)
export const addFamilyHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { patientId } = req.params;
        const raw = req.body;
        const items = Array.isArray(raw) ? raw : [raw];
        const validatedItems = z.array(familyHistorySchema).parse(items);

        const patient = await prisma.patient.findUnique({
            where: { id: parseInt(patientId) }
        });

        if (!patient) {
            res.status(404).json({ error: 'Patient not found' });
            return;
        }

        if (validatedItems.length === 0) {
            res.status(400).json({ error: 'At least one family history entry is required' });
            return;
        }

        const data = validatedItems.map((v) => ({
            patientId: parseInt(patientId),
            relation: v.relation,
            diseaseId: v.diseaseId,
            severity: v.severity,
            notes: v.notes
        }));

        const familyHistories = await prisma.familyHistory.createManyAndReturn({ data });

        res.status(201).json({
            message: familyHistories.length === 1 ? 'Family history added successfully' : `${familyHistories.length} family history entries added successfully`,
            count: familyHistories.length,
            familyHistories
        });
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.issues });
            return;
        }
        next(error);
    }
};

// Update or Create Lifestyle
export const updateLifestyle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { patientId } = req.params;
        const validatedData = lifestyleSchema.parse(req.body);

        // Check if patient exists
        const patient = await prisma.patient.findUnique({
            where: { id: parseInt(patientId) }
        });

        if (!patient) {
            res.status(404).json({ error: 'Patient not found' });
            return;
        }

        // Check if lifestyle exists
        const existingLifestyle = await prisma.lifestyle.findUnique({
            where: { patientId: parseInt(patientId) }
        });

        let lifestyle;
        if (existingLifestyle) {
            lifestyle = await prisma.lifestyle.update({
                where: { patientId: parseInt(patientId) },
                data: validatedData
            });
        } else {
            lifestyle = await prisma.lifestyle.create({
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
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.issues });
            return;
        }
        next(error);
    }
};

// Add Allergy
export const addAllergy = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { patientId } = req.params;
        const validatedData = allergySchema.parse(req.body);

        // Check if patient exists
        const patient = await prisma.patient.findUnique({
            where: { id: parseInt(patientId) }
        });

        if (!patient) {
            res.status(404).json({ error: 'Patient not found' });
            return;
        }

        const allergy = await prisma.allergy.create({
            data: {
                patientId: parseInt(patientId),
                ...validatedData
            }
        });

        res.status(201).json({
            message: 'Allergy added successfully',
            allergy
        });
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.issues });
            return;
        }
        next(error);
    }
};

// Delete Allergy
export const deleteAllergy = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { allergyId } = req.params;

        await prisma.allergy.delete({
            where: { id: parseInt(allergyId) }
        });

        res.json({ message: 'Allergy deleted successfully' });
    } catch (error: any) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'Allergy not found' });
            return;
        }
        next(error);
    }
};

// Add Child Profile (accepts single object or array of objects)
export const addChildProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { patientId } = req.params;
        const raw = req.body;
        const items = Array.isArray(raw) ? raw : [raw];
        const validatedItems = z.array(childProfileSchema).parse(items);

        const patient = await prisma.patient.findUnique({
            where: { id: parseInt(patientId) }
        });

        if (!patient) {
            res.status(404).json({ error: 'Patient not found' });
            return;
        }

        if (validatedItems.length === 0) {
            res.status(400).json({ error: 'At least one child profile is required' });
            return;
        }

        const data = validatedItems.map((v) => ({
            parentPatientId: parseInt(patientId),
            name: v.name,
            dateOfBirth: new Date(v.dateOfBirth),
            gender: v.gender,
            ageClassification: v.ageClassification,
            weight: v.weight,
            height: v.height,
            allergies: v.allergies,
            diseases: v.diseases,
            medicalHistory: v.medicalHistory
        }));

        const childProfiles = await prisma.childProfile.createManyAndReturn({ data });

        res.status(201).json({
            message: childProfiles.length === 1 ? 'Child profile added successfully' : `${childProfiles.length} child profiles added successfully`,
            count: childProfiles.length,
            childProfiles
        });
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.issues });
            return;
        }
        next(error);
    }
};

// Get All Child Profiles
export const getChildProfiles = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { patientId } = req.params;

        const childProfiles = await prisma.childProfile.findMany({
            where: { parentPatientId: parseInt(patientId) }
        });

        res.json(childProfiles);
    } catch (error) {
        next(error);
    }
};

// Delete Child Profile
export const deleteChildProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { childId } = req.params;

        await prisma.childProfile.delete({
            where: { id: parseInt(childId) }
        });

        res.json({ message: 'Child profile deleted successfully' });
    } catch (error: any) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'Child profile not found' });
            return;
        }
        next(error);
    }
};
