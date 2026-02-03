"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removePatient = exports.getDoctorPatients = exports.assignPatient = exports.getAllDoctors = exports.verifyDoctor = exports.getDoctorByUserId = exports.getDoctorById = exports.createOrUpdateDoctor = void 0;
const zod_1 = require("zod");
const prisma_1 = require("../lib/prisma");
const doctor_zod_1 = require("../zod/doctor.zod");
// Create or Update Doctor Profile
const createOrUpdateDoctor = async (req, res, next) => {
    try {
        const validatedData = doctor_zod_1.createDoctorSchema.parse(req.body);
        const { userId, ...doctorData } = validatedData;
        // Check if doctor already exists for this user
        const existingDoctor = await prisma_1.prisma.doctor.findUnique({
            where: { userId }
        });
        if (existingDoctor) {
            // Update existing doctor
            const updated = await prisma_1.prisma.doctor.update({
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
        const doctor = await prisma_1.prisma.doctor.create({
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
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({ error: error.issues });
            return;
        }
        next(error);
    }
};
exports.createOrUpdateDoctor = createOrUpdateDoctor;
// Get Doctor by ID
const getDoctorById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const doctor = await prisma_1.prisma.doctor.findUnique({
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
                                name: true,
                                age: true,
                                gender: true
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
    }
    catch (error) {
        next(error);
    }
};
exports.getDoctorById = getDoctorById;
// Get Doctor by User ID
const getDoctorByUserId = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const doctor = await prisma_1.prisma.doctor.findUnique({
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
                                name: true,
                                age: true,
                                gender: true
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
    }
    catch (error) {
        next(error);
    }
};
exports.getDoctorByUserId = getDoctorByUserId;
// Verify Doctor (Admin only)
const verifyDoctor = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { isVerified, verificationNotes } = doctor_zod_1.verifyDoctorSchema.parse(req.body);
        const doctor = await prisma_1.prisma.doctor.findUnique({
            where: { id: parseInt(id) }
        });
        if (!doctor) {
            res.status(404).json({ error: 'Doctor not found' });
            return;
        }
        const updated = await prisma_1.prisma.doctor.update({
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
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({ error: error.issues });
            return;
        }
        next(error);
    }
};
exports.verifyDoctor = verifyDoctor;
// Get All Doctors (with optional filters)
const getAllDoctors = async (req, res, next) => {
    try {
        const { isVerified, specialization, search, page = '1', limit = '20' } = req.query;
        const whereClause = {};
        if (isVerified !== undefined) {
            whereClause.isVerified = isVerified === 'true';
        }
        if (specialization) {
            whereClause.specialization = {
                contains: specialization,
                mode: 'insensitive'
            };
        }
        if (search) {
            whereClause.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { specialization: { contains: search, mode: 'insensitive' } }
            ];
        }
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const take = parseInt(limit);
        const [doctors, total] = await Promise.all([
            prisma_1.prisma.doctor.findMany({
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
            prisma_1.prisma.doctor.count({ where: whereClause })
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
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / parseInt(limit))
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllDoctors = getAllDoctors;
// Assign Patient to Doctor
const assignPatient = async (req, res, next) => {
    try {
        const { doctorId } = req.params;
        const validatedData = doctor_zod_1.assignPatientSchema.parse(req.body);
        // Check if doctor exists and is verified
        const doctor = await prisma_1.prisma.doctor.findUnique({
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
        const patient = await prisma_1.prisma.patient.findUnique({
            where: { id: validatedData.patientId }
        });
        if (!patient) {
            res.status(404).json({ error: 'Patient not found' });
            return;
        }
        // Check if relationship already exists
        const existingRelation = await prisma_1.prisma.patientDoctor.findUnique({
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
        const patientDoctor = await prisma_1.prisma.patientDoctor.create({
            data: {
                patientId: validatedData.patientId,
                doctorId: parseInt(doctorId),
                relationshipType: validatedData.relationshipType,
                startDate: validatedData.startDate ? new Date(validatedData.startDate) : new Date(),
                endDate: validatedData.endDate ? new Date(validatedData.endDate) : null
            },
            include: {
                patient: {
                    select: { name: true, age: true, gender: true }
                },
                doctor: {
                    select: { name: true, specialization: true }
                }
            }
        });
        res.status(201).json({
            message: 'Patient assigned to doctor successfully',
            relationship: patientDoctor
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
exports.assignPatient = assignPatient;
// Get Doctor's Patients
const getDoctorPatients = async (req, res, next) => {
    try {
        const { doctorId } = req.params;
        const relationships = await prisma_1.prisma.patientDoctor.findMany({
            where: { doctorId: parseInt(doctorId) },
            include: {
                patient: {
                    include: {
                        allergies: true,
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
            patients: relationships.map(r => ({
                ...r.patient,
                relationshipType: r.relationshipType,
                startDate: r.startDate,
                endDate: r.endDate
            }))
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getDoctorPatients = getDoctorPatients;
// Remove Patient from Doctor
const removePatient = async (req, res, next) => {
    try {
        const { doctorId, patientId } = req.params;
        await prisma_1.prisma.patientDoctor.delete({
            where: {
                patientId_doctorId: {
                    patientId: parseInt(patientId),
                    doctorId: parseInt(doctorId)
                }
            }
        });
        res.json({ message: 'Patient removed from doctor successfully' });
    }
    catch (error) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'Patient-Doctor relationship not found' });
            return;
        }
        next(error);
    }
};
exports.removePatient = removePatient;
//# sourceMappingURL=doctor.controller.js.map