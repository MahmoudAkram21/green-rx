import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import {
    createDoctorSchema,
    verifyDoctorSchema,
    assignPatientSchema
} from '../zod/doctor.zod';
import { computeBmi } from '../utils/bmi.util';

// Create or Update Doctor Profile
export const createOrUpdateDoctor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = createDoctorSchema.parse(req.body);
        const { userId, ...doctorData } = validatedData;

        // Check if doctor already exists for this user
        const existingDoctor = await prisma.doctor.findUnique({
            where: { userId }
        });

        if (existingDoctor) {
            // Update existing doctor
            const updated = await prisma.doctor.update({
                where: { userId },
                data: doctorData,
                include: {
                    user: {
                        select: { email: true, role: true }
                    }
                }
            });

            res.json({
                message: 'Doctor profile updated successfully',
                doctor: updated
            });
            return;
        }

        // Create new doctor (starts unverified)
        const doctor = await prisma.doctor.create({
            data: {
                ...doctorData,
                userId,
                isVerified: false
            },
            include: {
                user: {
                    select: { email: true, role: true }
                }
            }
        });

        res.status(201).json({
            message: 'Doctor profile created successfully. Pending verification.',
            doctor
        });
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.issues });
            return;
        }
        next(error);
    }
};

// Get Doctor by ID
export const getDoctorById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const doctor = await prisma.doctor.findUnique({
            where: { id: parseInt(id) },
            include: {
                user: {
                    select: { email: true, role: true, isActive: true }
                },
                patientDoctors: {
                    include: {
                        patient: {
                            select: {
                                id: true,
                                age: true,
                                gender: true,
                                user: { select: { name: true } }
                            }
                        }
                    }
                },
                ratings: {
                    select: {
                        rating: true,
                        createdAt: true
                    }
                }
            }
        });

        if (!doctor) {
            res.status(404).json({ error: 'Doctor not found' });
            return;
        }

        res.json(doctor);
    } catch (error) {
        next(error);
    }
};

// Get Doctor by User ID
export const getDoctorByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;

        const doctor = await prisma.doctor.findUnique({
            where: { userId: parseInt(userId) },
            include: {
                user: {
                    select: { email: true, role: true, isActive: true }
                },
                patientDoctors: {
                    include: {
                        patient: {
                            select: {
                                id: true,
                                age: true,
                                gender: true,
                                user: { select: { name: true } }
                            }
                        }
                    }
                }
            }
        });

        if (!doctor) {
            res.status(404).json({ error: 'Doctor not found' });
            return;
        }

        res.json(doctor);
    } catch (error) {
        next(error);
    }
};

// Verify Doctor (Admin only)
export const verifyDoctor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { isVerified, verificationNotes } = verifyDoctorSchema.parse(req.body);

        const doctor = await prisma.doctor.findUnique({
            where: { id: parseInt(id) }
        });

        if (!doctor) {
            res.status(404).json({ error: 'Doctor not found' });
            return;
        }

        const updated = await prisma.doctor.update({
            where: { id: parseInt(id) },
            data: {
                isVerified,
                verifiedAt: isVerified ? new Date() : null,
                verificationNotes
            },
            include: {
                user: {
                    select: { email: true }
                }
            }
        });

        // TODO: Send notification email to doctor about verification status

        res.json({
            message: `Doctor ${isVerified ? 'verified' : 'unverified'} successfully`,
            doctor: updated
        });
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.issues });
            return;
        }
        next(error);
    }
};

// Get All Doctors (with optional filters)
export const getAllDoctors = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            isVerified,
            specialization,
            search,
            page = '1',
            limit = '20'
        } = req.query;

        const whereClause: any = {};

        if (isVerified !== undefined) {
            whereClause.isVerified = isVerified === 'true';
        }

        if (specialization) {
            whereClause.specialization = {
                contains: specialization as string,
                mode: 'insensitive'
            };
        }

        if (search) {
            whereClause.OR = [
                { name: { contains: search as string, mode: 'insensitive' } },
                { specialization: { contains: search as string, mode: 'insensitive' } }
            ];
        }

        const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
        const take = parseInt(limit as string);

        const [doctors, total] = await Promise.all([
            prisma.doctor.findMany({
                where: whereClause,
                include: {
                    user: {
                        select: { email: true, isActive: true }
                    },
                    ratings: {
                        select: { rating: true }
                    }
                },
                skip,
                take,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.doctor.count({ where: whereClause })
        ]);

        // Calculate average rating for each doctor
        const doctorsWithRating = doctors.map(doctor => ({
            ...doctor,
            averageRating: doctor.ratings.length > 0
                ? doctor.ratings.reduce((sum, r) => sum + r.rating, 0) / doctor.ratings.length
                : 0,
            totalRatings: doctor.ratings.length
        }));

        res.json({
            doctors: doctorsWithRating,
            pagination: {
                total,
                page: parseInt(page as string),
                limit: parseInt(limit as string),
                totalPages: Math.ceil(total / parseInt(limit as string))
            }
        });
    } catch (error) {
        next(error);
    }
};

// Assign Patient to Doctor
export const assignPatient = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { doctorId } = req.params;
        const validatedData = assignPatientSchema.parse(req.body);

        // Check if doctor exists and is verified
        const doctor = await prisma.doctor.findUnique({
            where: { id: parseInt(doctorId) }
        });

        if (!doctor) {
            res.status(404).json({ error: 'Doctor not found' });
            return;
        }

        if (!doctor.isVerified) {
            res.status(403).json({ error: 'Doctor must be verified to accept patients' });
            return;
        }

        // Check if patient exists
        const patient = await prisma.patient.findUnique({
            where: { id: validatedData.patientId }
        });

        if (!patient) {
            res.status(404).json({ error: 'Patient not found' });
            return;
        }

        // Check if relationship already exists
        const existingRelation = await prisma.patientDoctor.findUnique({
            where: {
                patientId_doctorId: {
                    patientId: validatedData.patientId,
                    doctorId: parseInt(doctorId)
                }
            }
        });

        if (existingRelation) {
            res.status(409).json({ error: 'Patient already assigned to this doctor' });
            return;
        }

        // Create relationship
        const patientDoctor = await prisma.patientDoctor.create({
            data: {
                patientId: validatedData.patientId,
                doctorId: parseInt(doctorId),
                relationshipType: validatedData.relationshipType,
                startDate: validatedData.startDate ? new Date(validatedData.startDate) : new Date(),
                endDate: validatedData.endDate ? new Date(validatedData.endDate) : null
            },
            include: {
                patient: {
                    include: {
                        user: { select: { name: true, email: true, phone: true } }
                    }
                },
                doctor: {
                    select: { name: true, specialization: true }
                }
            }
        });

        const relationshipWithPatientUser = {
            ...patientDoctor,
            patient: patientDoctor.patient ? {
                ...patientDoctor.patient,
                name: patientDoctor.patient.user?.name ?? null,
                email: patientDoctor.patient.user?.email ?? null,
                phone: patientDoctor.patient.user?.phone ?? null,
                bodyMassIndex: computeBmi(patientDoctor.patient.weight, patientDoctor.patient.height) ?? undefined
            } : null
        };
        res.status(201).json({
            message: 'Patient assigned to doctor successfully',
            relationship: relationshipWithPatientUser
        });
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.issues });
            return;
        }
        next(error);
    }
};

// Search for patient by name (among doctor's assigned patients only)
export const searchDoctorPatientsByName = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { doctorId } = req.params;
        const name = (req.query.name ?? req.query.q ?? '') as string;

        if (!name.trim()) {
            res.status(400).json({ error: 'Query parameter "name" or "q" is required for search' });
            return;
        }

        const relationships = await prisma.patientDoctor.findMany({
            where: {
                doctorId: parseInt(doctorId),
                patient: {
                    user: {
                        name: { contains: name.trim(), mode: 'insensitive' }
                    }
                }
            },
            include: {
                patient: {
                    include: {
                        user: { select: { name: true, email: true, phone: true } },
                        patientAllergies: { include: { allergen: true } },
                        patientDiseases: { include: { disease: true } }
                    }
                }
            },
            orderBy: { startDate: 'desc' }
        });

        res.json({
            patients: relationships.map((r) => ({
                ...r.patient,
                name: r.patient.user?.name ?? null,
                email: r.patient.user?.email ?? null,
                phone: r.patient.user?.phone ?? null,
                bodyMassIndex: computeBmi(r.patient.weight, r.patient.height) ?? undefined,
                relationshipType: r.relationshipType,
                startDate: r.startDate,
                endDate: r.endDate
            }))
        });
    } catch (error) {
        next(error);
    }
};

// Get full details of a specific patient (doctor can only access their linked patients)
export const getPatientDetailsForDoctor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { doctorId, patientId } = req.params;
        const docId = parseInt(doctorId);
        const patId = parseInt(patientId);
        if (Number.isNaN(docId) || Number.isNaN(patId)) {
            res.status(400).json({ error: 'Invalid doctorId or patientId' });
            return;
        }

        const link = await prisma.patientDoctor.findUnique({
            where: {
                patientId_doctorId: { patientId: patId, doctorId: docId }
            },
            include: {
                patient: {
                    include: {
                        user: { select: { name: true, email: true, phone: true } },
                        medicalHistories: { include: { disease: true } },
                        familyHistories: { include: { disease: true } },
                        patientDiseases: { include: { disease: true } },
                        patientLifestyles: { include: { lifestyle: true } },
                        patientAllergies: { include: { allergen: true } },
                        surgicalHistories: { include: { operation: true } },
                        visits: { orderBy: { visitDate: 'desc' } },
                        medicalReports: { orderBy: { reportDate: 'desc' } }
                    }
                }
            }
        });

        if (!link) {
            res.status(404).json({ error: 'Patient not found or not linked to this doctor' });
            return;
        }

        const patient = link.patient;
        const user = patient?.user as { name: string | null; email: string; phone: string | null } | undefined;
        const bodyMassIndex = patient ? computeBmi(patient.weight, patient.height) : null;
        res.json({
            patient: patient ? {
                ...patient,
                name: user?.name ?? null,
                email: user?.email ?? null,
                phone: user?.phone ?? null,
                bodyMassIndex: bodyMassIndex ?? undefined
            } : null,
            relationship: {
                relationshipType: link.relationshipType,
                startDate: link.startDate,
                endDate: link.endDate,
                isActive: link.isActive
            }
        });
    } catch (error) {
        next(error);
    }
};

// Get Doctor's Patients
export const getDoctorPatients = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { doctorId } = req.params;

        const relationships = await prisma.patientDoctor.findMany({
            where: { doctorId: parseInt(doctorId) },
            include: {
                patient: {
                    include: {
                        user: { select: { name: true, email: true, phone: true } },
                        patientAllergies: { include: { allergen: true } },
                        patientDiseases: {
                            include: {
                                disease: true
                            }
                        }
                    }
                }
            },
            orderBy: { startDate: 'desc' }
        });

        res.json({
            patients: relationships.map((r) => ({
                ...r.patient,
                name: r.patient.user?.name ?? null,
                email: r.patient.user?.email ?? null,
                phone: r.patient.user?.phone ?? null,
                bodyMassIndex: computeBmi(r.patient.weight, r.patient.height) ?? undefined,
                relationshipType: r.relationshipType,
                startDate: r.startDate,
                endDate: r.endDate
            }))
        });
    } catch (error) {
        next(error);
    }
};

// Remove Patient from Doctor
export const removePatient = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { doctorId, patientId } = req.params;

        await prisma.patientDoctor.delete({
            where: {
                patientId_doctorId: {
                    patientId: parseInt(patientId),
                    doctorId: parseInt(doctorId)
                }
            }
        });

        res.json({ message: 'Patient removed from doctor successfully' });
    } catch (error: any) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'Patient-Doctor relationship not found' });
            return;
        }
        next(error);
    }
};
