import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { Gender, AgeClassification, AllergySeverity, DiseaseStatus, DiseaseSeverity } from '../generated/client';

// Validation Schemas
const createPatientSchema = z.object({
    userId: z.number().int().positive(),
    name: z.string().min(1),
    age: z.number().int().positive(),
    ageClassification: z.nativeEnum(AgeClassification),
    gender: z.nativeEnum(Gender),
    weight: z.number().positive().optional(),
    height: z.number().positive().optional(),
    smoking: z.boolean().optional(),
    pregnancyWarning: z.boolean().optional(),
    lactation: z.boolean().optional()
});

const medicalHistorySchema = z.object({
    diseaseId: z.number().int().positive(),
    severity: z.nativeEnum(DiseaseSeverity),
    diagnosisDate: z.string().datetime().optional(),
    treatment: z.string().optional(),
    status: z.nativeEnum(DiseaseStatus),
    notes: z.string().optional()
});

const familyHistorySchema = z.object({
    relation: z.string().min(1), // e.g., "Father", "Mother", "Sibling"
    diseaseId: z.number().int().positive(),
    severity: z.nativeEnum(DiseaseSeverity),
    notes: z.string().optional()
});

const lifestyleSchema = z.object({
    noGlasses: z.boolean().optional(),
    alcoholAbuse: z.boolean().optional(),
    excessCaffeine: z.boolean().optional(),
    waterDaily: z.number().positive().optional(),
    travellerAbroad: z.boolean().optional(),
    annualVaccination: z.boolean().optional(),
    noiseExposure: z.boolean().optional(),
    chemicalExposure: z.boolean().optional(),
    radiationExposure: z.boolean().optional()
});

const allergySchema = z.object({
    allergen: z.string().min(1),
    reaction: z.string(),
    severity: z.nativeEnum(AllergySeverity),
    notes: z.string().optional()
});

const childProfileSchema = z.object({
    name: z.string().min(1),
    dateOfBirth: z.string().datetime(),
    gender: z.nativeEnum(Gender),
    ageClassification: z.nativeEnum(AgeClassification),
    weight: z.number().positive().optional(),
    height: z.number().positive().optional(),
    allergies: z.any().optional(), // JSON
    diseases: z.any().optional(), // JSON
    medicalHistory: z.any().optional() // JSON
});

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

// Add Medical History Entry
export const addMedicalHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { patientId } = req.params;
        const validatedData = medicalHistorySchema.parse(req.body);

        // Check if patient exists
        const patient = await prisma.patient.findUnique({
            where: { id: parseInt(patientId) }
        });

        if (!patient) {
            res.status(404).json({ error: 'Patient not found' });
            return;
        }

        const medicalHistory = await prisma.medicalHistory.create({
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

// Add Family History Entry
export const addFamilyHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { patientId } = req.params;
        const validatedData = familyHistorySchema.parse(req.body);

        // Check if patient exists
        const patient = await prisma.patient.findUnique({
            where: { id: parseInt(patientId) }
        });

        if (!patient) {
            res.status(404).json({ error: 'Patient not found' });
            return;
        }

        const familyHistory = await prisma.familyHistory.create({
            data: {
                patientId: parseInt(patientId),
                ...validatedData
            }
        });

        res.status(201).json({
            message: 'Family history added successfully',
            familyHistory
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

// Add Child Profile
export const addChildProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { patientId } = req.params;
        const validatedData = childProfileSchema.parse(req.body);

        // Check if patient exists
        const patient = await prisma.patient.findUnique({
            where: { id: parseInt(patientId) }
        });

        if (!patient) {
            res.status(404).json({ error: 'Patient not found' });
            return;
        }

        const childProfile = await prisma.childProfile.create({
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
