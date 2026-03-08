import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import {
    createDoctorSchema,
    updateDoctorMeSchema,
    verifyDoctorSchema,
    assignPatientSchema,
    createDoctorClinicSchema,
    updateDoctorClinicSchema
} from '../zod/doctor.zod';
import { computeBmi } from '../utils/bmi.util';
import { haversineDistanceKm } from '../utils/geo.util';
import { patientFullDetailsInclude, mapPatientToFullDetailsPayload } from '../utils/patientFullDetails.util';
import { getNearbyDoctorsRadiusKm } from './settings.controller';
import { getAggregatedWarningsForPatient } from './patient.controller';

// Create or Update Doctor Profile
export const createOrUpdateDoctor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = createDoctorSchema.parse(req.body);
        const { userId, clinicAddress, ...rest } = validatedData;
        const doctorData: Record<string, unknown> = { ...rest };
        if (clinicAddress !== undefined) (doctorData as any).address = clinicAddress;

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
                userId,
                name: validatedData.name,
                specialization: validatedData.specialization,
                licenseNumber: validatedData.licenseNumber,
                licenseImageUrl: validatedData.licenseImageUrl,
                phoneNumber: validatedData.phoneNumber,
                address: validatedData.clinicAddress,
                consultationFee: validatedData.consultationFee,
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

// GET /doctors/me/stats — statistics for the current doctor (total patients, prescriptions, etc.)
export const getDoctorMeStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            res.status(401).json({ error: 'Not authenticated' });
            return;
        }

        const doctor = await prisma.doctor.findUnique({
            where: { userId },
            select: {
                id: true,
                averageRating: true,
                totalRatings: true,
                _count: {
                    select: {
                        patientDoctors: true,
                        prescriptions: true,
                        consultations: true,
                        appointments: true,
                        visits: true,
                        ratings: true,
                        doctorClinics: true,
                    },
                },
            },
        });

        if (!doctor) {
            res.status(404).json({ error: 'Doctor profile not found' });
            return;
        }

        const stats = {
            totalPatients: doctor._count.patientDoctors,
            totalPrescriptions: doctor._count.prescriptions,
            totalConsultations: doctor._count.consultations,
            totalAppointments: doctor._count.appointments,
            totalVisits: doctor._count.visits,
            totalRatings: doctor._count.ratings,
            totalClinics: doctor._count.doctorClinics,
            averageRating: doctor.averageRating != null ? Number(doctor.averageRating) : null,
        };

        res.json(stats);
    } catch (error) {
        next(error);
    }
};

// GET /doctors/me — current doctor profile (mobile-friendly; auth from token)
export const getDoctorMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            res.status(401).json({ error: 'Not authenticated' });
            return;
        }

        const doctor = await prisma.doctor.findUnique({
            where: { userId },
            include: {
                user: { select: { email: true, name: true, role: true, isActive: true } },
                patientDoctors: { include: { patient: { select: { id: true, user: { select: { name: true } } } } } },
                doctorClinics: true
            }
        });

        if (!doctor) {
            res.status(404).json({ error: 'Doctor profile not found' });
            return;
        }

        res.json(doctor);
    } catch (error) {
        next(error);
    }
};

// PATCH /doctors/me — update current doctor profile (mobile-friendly; auth from token). Optional clinics array replaces all doctor clinics.
export const updateDoctorMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            res.status(401).json({ error: 'Not authenticated' });
            return;
        }

        const validated = updateDoctorMeSchema.parse(req.body);
        const { clinicAddress, yearsOfExperience, qualifications, clinics: clinicsPayload, ...rest } = validated;
        const data: Record<string, unknown> = { ...rest };
        if (clinicAddress !== undefined) (data as any).address = clinicAddress;
        // Doctor model has no yearsOfExperience/qualifications; omit so Prisma accepts

        const doctor = await prisma.doctor.findUnique({ where: { userId } });
        if (!doctor) {
            res.status(404).json({ error: 'Doctor profile not found' });
            return;
        }

        const updated = await prisma.doctor.update({
            where: { userId },
            data: data as object,
            include: { user: { select: { email: true, name: true, role: true } }, doctorClinics: true }
        });

        if (clinicsPayload !== undefined) {
            await prisma.doctorClinic.deleteMany({ where: { doctorId: doctor.id } });
            if (clinicsPayload.length > 0) {
                await prisma.doctorClinic.createMany({
                    data: clinicsPayload.map((c) => ({
                        doctorId: doctor.id,
                        name: c.name ?? undefined,
                        address: c.address ?? undefined,
                        city: c.city ?? undefined,
                        latitude: c.latitude,
                        longitude: c.longitude,
                        workingHours: c.workingHours ? JSON.parse(JSON.stringify(c.workingHours)) : undefined
                    }))
                });
            }
            const withClinics = await prisma.doctor.findUnique({
                where: { userId },
                include: { user: { select: { email: true, name: true, role: true } }, doctorClinics: true }
            });
            return res.json({ message: 'Profile updated successfully', doctor: withClinics ?? updated });
        }

        return res.json({ message: 'Profile updated successfully', doctor: updated });
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.issues });
            return;
        }
        return next(error);
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

const nearbyQuerySchema = z.object({
    lat: z.coerce.number().min(-90).max(90),
    lng: z.coerce.number().min(-180).max(180)
});

/** GET /doctors/nearby - Returns doctors within admin-configured radius (km). Uses DoctorClinic locations and Doctor-level lat/lng. */
export const getNearbyDoctors = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsed = nearbyQuerySchema.safeParse(req.query);
        if (!parsed.success) {
            res.status(400).json({ error: 'Invalid or missing lat/lng. Provide lat and lng as numbers (lat: -90..90, lng: -180..180).', issues: parsed.error.issues });
            return;
        }
        const { lat, lng } = parsed.data;
        const radiusKm = await getNearbyDoctorsRadiusKm();

        const toNum = (v: unknown): number | null => {
            if (v == null) return null;
            if (typeof v === 'number' && Number.isFinite(v)) return v;
            const n = Number(v);
            return Number.isFinite(n) ? n : null;
        };

        const doctors = await prisma.doctor.findMany({
            where: {
                isVerified: true,
                OR: [
                    { latitude: { not: null }, longitude: { not: null } },
                    { doctorClinics: { some: { latitude: { not: null }, longitude: { not: null } } } }
                ]
            },
            include: {
                user: { select: { email: true, isActive: true } },
                ratings: { select: { rating: true } },
                doctorClinics: { where: { latitude: { not: null }, longitude: { not: null } }, select: { id: true, name: true, address: true, city: true, latitude: true, longitude: true } }
            }
        });

        const withDistance = doctors
            .map((d) => {
                const locations: { lat: number; lng: number }[] = [];
                const docLat = toNum(d.latitude);
                const docLng = toNum(d.longitude);
                if (docLat != null && docLng != null) locations.push({ lat: docLat, lng: docLng });
                (d.doctorClinics || []).forEach((c) => {
                    const clat = toNum(c.latitude);
                    const clng = toNum(c.longitude);
                    if (clat != null && clng != null) locations.push({ lat: clat, lng: clng });
                });
                if (locations.length === 0) return null;
                let minDistanceKm = Infinity;
                locations.forEach((loc) => {
                    const km = haversineDistanceKm(lat, lng, loc.lat, loc.lng);
                    if (km < minDistanceKm) minDistanceKm = km;
                });
                minDistanceKm = Math.round(minDistanceKm * 100) / 100;
                if (minDistanceKm > radiusKm) return null;
                const avgRating = d.ratings.length > 0 ? d.ratings.reduce((s, r) => s + r.rating, 0) / d.ratings.length : 0;
                const { ratings, doctorClinics: _dc, ...rest } = d;
                return {
                    ...rest,
                    distanceKm: minDistanceKm,
                    averageRating: Math.round(avgRating * 100) / 100,
                    totalRatings: ratings.length
                };
            })
            .filter((d): d is NonNullable<typeof d> => d != null)
            .sort((a, b) => a.distanceKm - b.distanceKm);

        res.json({ doctors: withDistance, radiusKm });
    } catch (error) {
        next(error);
    }
};

// --- Doctor Clinics (multiple clinics per doctor) ---

async function ensureDoctorAccess(req: Request, doctorId: number): Promise<{ doctor: { id: number; userId: number } } | null> {
    const doctor = await prisma.doctor.findUnique({
        where: { id: doctorId },
        select: { id: true, userId: true }
    });
    if (!doctor) return null;
    const role = req.user?.role;
    if (role === 'Doctor' && req.user?.userId !== doctor.userId) return null;
    return { doctor };
}

/** GET /doctors/:doctorId/clinics - List clinics for a doctor. */
export const getDoctorClinics = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const doctorId = parseInt(req.params.doctorId, 10);
        if (Number.isNaN(doctorId)) {
            res.status(400).json({ error: 'Invalid doctorId' });
            return;
        }
        const access = await ensureDoctorAccess(req, doctorId);
        if (!access) {
            res.status(404).json({ error: 'Doctor not found or access denied' });
            return;
        }
        const clinics = await prisma.doctorClinic.findMany({
            where: { doctorId: access.doctor.id },
            orderBy: { createdAt: 'asc' }
        });
        res.json(clinics);
    } catch (error) {
        next(error);
    }
};

/** POST /doctors/:doctorId/clinics - Create a clinic for a doctor. */
export const createDoctorClinic = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const doctorId = parseInt(req.params.doctorId, 10);
        if (Number.isNaN(doctorId)) {
            res.status(400).json({ error: 'Invalid doctorId' });
            return;
        }
        const access = await ensureDoctorAccess(req, doctorId);
        if (!access) {
            res.status(404).json({ error: 'Doctor not found or access denied' });
            return;
        }
        const body = createDoctorClinicSchema.parse(req.body);
        const data: Record<string, unknown> = {
            doctorId: access.doctor.id,
            name: body.name,
            address: body.address,
            city: body.city,
            latitude: body.latitude,
            longitude: body.longitude,
            workingHours: body.workingHours ?? undefined
        };
        const clinic = await prisma.doctorClinic.create({
            data: data as any
        });
        res.status(201).json(clinic);
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.issues });
            return;
        }
        next(error);
    }
};

/** PATCH /doctors/:doctorId/clinics/:clinicId - Update a clinic. */
export const updateDoctorClinic = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const doctorId = parseInt(req.params.doctorId, 10);
        const clinicId = parseInt(req.params.clinicId, 10);
        if (Number.isNaN(doctorId) || Number.isNaN(clinicId)) {
            res.status(400).json({ error: 'Invalid doctorId or clinicId' });
            return;
        }
        const access = await ensureDoctorAccess(req, doctorId);
        if (!access) {
            res.status(404).json({ error: 'Doctor not found or access denied' });
            return;
        }
        const body = updateDoctorClinicSchema.parse(req.body);
        const existing = await prisma.doctorClinic.findFirst({
            where: { id: clinicId, doctorId: access.doctor.id }
        });
        if (!existing) {
            res.status(404).json({ error: 'Clinic not found' });
            return;
        }
        const data: Record<string, unknown> = {};
        if (body.name !== undefined) data.name = body.name;
        if (body.address !== undefined) data.address = body.address;
        if (body.city !== undefined) data.city = body.city;
        if (body.latitude !== undefined) data.latitude = body.latitude;
        if (body.longitude !== undefined) data.longitude = body.longitude;
        if (body.workingHours !== undefined) data.workingHours = body.workingHours;
        const clinic = await prisma.doctorClinic.update({
            where: { id: clinicId },
            data: data as object
        });
        res.json(clinic);
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.issues });
            return;
        }
        next(error);
    }
};

/** DELETE /doctors/:doctorId/clinics/:clinicId - Delete a clinic. */
export const deleteDoctorClinic = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const doctorId = parseInt(req.params.doctorId, 10);
        const clinicId = parseInt(req.params.clinicId, 10);
        if (Number.isNaN(doctorId) || Number.isNaN(clinicId)) {
            res.status(400).json({ error: 'Invalid doctorId or clinicId' });
            return;
        }
        const access = await ensureDoctorAccess(req, doctorId);
        if (!access) {
            res.status(404).json({ error: 'Doctor not found or access denied' });
            return;
        }
        const existing = await prisma.doctorClinic.findFirst({
            where: { id: clinicId, doctorId: access.doctor.id }
        });
        if (!existing) {
            res.status(404).json({ error: 'Clinic not found' });
            return;
        }
        await prisma.doctorClinic.delete({ where: { id: clinicId } });
        res.status(204).send();
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

// GET /doctors/:doctorId/patients/warnings — get aggregated warnings for all patients linked to this doctor
export const getWarningsForAllMyPatients = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const doctorId = parseInt(req.params.doctorId, 10);
        if (Number.isNaN(doctorId)) {
            res.status(400).json({ error: 'Invalid doctorId' });
            return;
        }
        const access = await ensureDoctorAccess(req, doctorId);
        if (!access) {
            res.status(404).json({ error: 'Doctor not found or access denied' });
            return;
        }

        const relationships = await prisma.patientDoctor.findMany({
            where: { doctorId: access.doctor.id },
            include: {
                patient: {
                    include: {
                        user: { select: { name: true, email: true } }
                    }
                }
            }
        });

        const patients: Array<{
            patientId: number;
            name: string | null;
            patientName: string | null;
            email: string | null;
            warnings: Array<{ type: string; severity: string; message: string; [k: string]: unknown }>;
        }> = [];

        for (const r of relationships) {
            const patient = r.patient;
            if (!patient) continue;
            const user = patient.user as { name: string | null; email: string } | undefined;
            const patientName = user?.name ?? null;
            const payload = await getAggregatedWarningsForPatient(patient.id);
            patients.push({
                patientId: patient.id,
                name: patientName,
                patientName,
                email: user?.email ?? null,
                warnings: payload?.warnings ?? []
            });
        }

        res.json({ patients });
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
                patient: { include: patientFullDetailsInclude }
            }
        });

        if (!link) {
            res.status(404).json({ error: 'Patient not found or not linked to this doctor' });
            return;
        }

        const payload = mapPatientToFullDetailsPayload(link.patient);
        res.json({
            ...payload,
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
