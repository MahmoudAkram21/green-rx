/** @format */

import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { AgeClassification } from "../../generated/client/client";
import {
    createPatientSchema,
    medicalHistorySchema,
    familyHistorySchema,
    batchPatientLifestyleSchema,
    patientAllergyReportSchema,
    childProfileSchema,
} from "../zod/patient.zod";
import { generateWarnings } from "../services/warningService";
import drugInteractionService from "../services/drugInteraction.service";
import { computeBmi } from "../utils/bmi.util";
import {
    patientFullDetailsInclude,
    mapPatientToFullDetailsPayload,
} from "../utils/patientFullDetails.util";

/** Compute age in years and age classification from date of birth. */
function computeAgeAndClassification(dateOfBirth: Date): {
    age: number;
    ageClassification: AgeClassification;
} {
    const today = new Date();
    let age = today.getFullYear() - dateOfBirth.getFullYear();
    const m = today.getMonth() - dateOfBirth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dateOfBirth.getDate())) age--;
    age = Math.max(0, Math.min(150, age));

    if (age < 1) {
        const months =
            (today.getFullYear() - dateOfBirth.getFullYear()) * 12 +
            today.getMonth() -
            dateOfBirth.getMonth();
        if (months < 1)
            return { age: 0, ageClassification: AgeClassification.Neonates };
        return { age: 0, ageClassification: AgeClassification.Infants };
    }
    if (age <= 3) return { age, ageClassification: AgeClassification.Toddlers };
    if (age <= 12) return { age, ageClassification: AgeClassification.Children };
    if (age < 18)
        return { age, ageClassification: AgeClassification.Adolescents };
    if (age < 65) return { age, ageClassification: AgeClassification.Adults };
    return { age, ageClassification: AgeClassification.Elderly };
}

// Create or Update Patient Profile (name from User; age/ageClassification from dateOfBirth when provided; smoking in lifestyle)
export const createOrUpdatePatient = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const validatedData = createPatientSchema.parse(req.body);
        const {
            userId,
            dateOfBirth,
            age: ageInput,
            ageClassification: classificationInput,
            ...rest
        } = validatedData;

        let age: number;
        let ageClassification: AgeClassification;

        if (dateOfBirth) {
            const computed = computeAgeAndClassification(new Date(dateOfBirth));
            age = computed.age;
            ageClassification = computed.ageClassification;
        } else {
            age = ageInput ?? 0;
            ageClassification = classificationInput ?? AgeClassification.Adults;
        }

        const isFemale = validatedData.gender === "Female";
        const patientData = {
            ...rest,
            contracipient: isFemale ? rest.contracipient : undefined,
            isContracipientHormonal: isFemale
                ? rest.isContracipientHormonal
                : undefined,
            dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
            age,
            ageClassification,
        };

        // Check if patient already exists for this user
        const existingPatient = await prisma.patient.findUnique({
            where: { userId },
        });

        if (existingPatient) {
            const updated = await prisma.patient.update({
                where: { userId },
                data: patientData,
                include: {
                    user: {
                        select: { email: true, role: true, name: true },
                    },
                },
            });

            const bodyMassIndex = computeBmi(updated.weight, updated.height);
            res.json({
                message: "Patient profile updated successfully",
                patient: { ...updated, bodyMassIndex: bodyMassIndex ?? undefined },
            });
            return;
        }

        const patient = await prisma.patient.create({
            data: {
                ...patientData,
                userId,
            },
            include: {
                user: {
                    select: { email: true, role: true, name: true },
                },
            },
        });

        const bodyMassIndex = computeBmi(patient.weight, patient.height);
        res.status(201).json({
            message: "Patient profile created successfully",
            patient: { ...patient, bodyMassIndex: bodyMassIndex ?? undefined },
        });
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.issues });
            return;
        }
        next(error);
    }
};

// Get all patients (Admin/SuperAdmin only). Search by user email or user name.
export const getAllPatients = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const page = Math.max(1, parseInt(String(req.query.page)) || 1);
        const limit = Math.min(
            100,
            Math.max(1, parseInt(String(req.query.limit)) || 20),
        );
        const search =
            typeof req.query.search === "string"
                ? req.query.search.trim()
                : undefined;
        const skip = (page - 1) * limit;

        const where = search
            ? {
                user: {
                    OR: [
                        { email: { contains: search, mode: "insensitive" as const } },
                        ...(search.length >= 1
                            ? [{ name: { contains: search, mode: "insensitive" as const } }]
                            : []),
                    ],
                },
            }
            : {};

        const [patients, total] = await Promise.all([
            prisma.patient.findMany({
                where,
                skip,
                take: limit,
                include: {
                    user: { select: { email: true, role: true, name: true } },
                },
                orderBy: { id: "asc" },
            }),
            prisma.patient.count({ where }),
        ]);

        res.json({
            patients,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        next(error);
    }
};

// Get Patient by ID
export const getPatientById = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { id } = req.params;

        const patient = await prisma.patient.findUnique({
            where: { id: parseInt(id) },
            include: {
                user: {
                    select: { email: true, role: true, isActive: true, name: true },
                },
                medicalHistories: { include: { disease: true } },
                familyHistories: { include: { disease: true } },
                patientLifestyles: { include: { lifestyle: true } },
                allergyReports: true,
                childrenProfiles: true,
                patientDiseases: {
                    include: {
                        disease: true,
                    },
                },
            },
        });

        if (!patient) {
            res.status(404).json({ error: "Patient not found" });
            return;
        }

        const bodyMassIndex = computeBmi(patient.weight, patient.height);
        res.json({ ...patient, bodyMassIndex: bodyMassIndex ?? undefined });
    } catch (error) {
        next(error);
    }
};

// Get Patient by User ID
export const getPatientByUserId = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { userId } = req.params;

        const patient = await prisma.patient.findUnique({
            where: { userId: parseInt(userId) },
            include: {
                user: {
                    select: { email: true, role: true, isActive: true },
                },
                medicalHistories: true,
                familyHistories: true,
                patientLifestyles: { include: { lifestyle: true } },
                allergyReports: true,
                childrenProfiles: true,
            },
        });

        if (!patient) {
            res.status(404).json({ error: "Patient not found" });
            return;
        }

        const bodyMassIndex = computeBmi(patient.weight, patient.height);
        res.json({ ...patient, bodyMassIndex: bodyMassIndex ?? undefined });
    } catch (error) {
        next(error);
    }
};

// Add Medical History Entry (accepts single object or array of objects)
export const addMedicalHistory = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { patientId } = req.params;
        const raw = req.body;
        const items = Array.isArray(raw) ? raw : [raw];
        const validatedItems = z.array(medicalHistorySchema).parse(items);

        const patient = await prisma.patient.findUnique({
            where: { id: parseInt(patientId) },
        });

        if (!patient) {
            res.status(404).json({ error: "Patient not found" });
            return;
        }

        if (validatedItems.length === 0) {
            res
                .status(400)
                .json({ error: "At least one medical history entry is required" });
            return;
        }

        const data = validatedItems.map((v) => ({
            patientId: parseInt(patientId),
            diseaseId: v.diseaseId,
            severity: v.severity,
            status: v.status,
            diagnosisDate: v.diagnosisDate ? new Date(v.diagnosisDate) : undefined,
            treatment: v.treatment,
            notes: v.notes,
        }));

        const medicalHistories = await prisma.medicalHistory.createManyAndReturn({
            data,
        });

        res.status(201).json({
            message:
                medicalHistories.length === 1
                    ? "Medical history added successfully"
                    : `${medicalHistories.length} medical history entries added successfully`,
            count: medicalHistories.length,
            medicalHistories,
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
export const getMedicalHistories = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { patientId } = req.params;

        const histories = await prisma.medicalHistory.findMany({
            where: { patientId: parseInt(patientId) },
            include: { disease: true },
            orderBy: { createdAt: "desc" },
        });

        res.json(histories);
    } catch (error) {
        next(error);
    }
};

// Add Family History Entry (accepts single object or array of objects)
export const addFamilyHistory = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { patientId } = req.params;
        const raw = req.body;
        const items = Array.isArray(raw) ? raw : [raw];
        const validatedItems = z.array(familyHistorySchema).parse(items);
        console.log(raw);
        const patient = await prisma.patient.findUnique({
            where: { id: parseInt(patientId) },
        });

        if (!patient) {
            res.status(404).json({ error: "Patient not found" });
            return;
        }

        if (validatedItems.length === 0) {
            res
                .status(400)
                .json({ error: "At least one family history entry is required" });
            return;
        }

        const uniqueDiseaseIds = [
            ...new Set(validatedItems.map((v) => v.diseaseId)),
        ];
        const existingDiseases = await prisma.disease.findMany({
            where: { id: { in: uniqueDiseaseIds } },
            select: { id: true },
        });
        const existingDiseaseIdSet = new Set(existingDiseases.map((d) => d.id));
        const missingDiseaseIds = uniqueDiseaseIds.filter(
            (id) => !existingDiseaseIdSet.has(id),
        );
        if (missingDiseaseIds.length > 0) {
            res.status(400).json({
                error: "Invalid diseaseId(s)",
                missingDiseaseIds,
            });
            return;
        }

        const data = validatedItems.map((v) => ({
            patientId: parseInt(patientId),
            diseaseId: v.diseaseId,
            severity: v.severity,
            notes: v.notes,
        }));
        console.log(data);

        const familyHistories = await prisma.familyHistory.createManyAndReturn({
            data,
        });

        res.status(201).json({
            message:
                familyHistories.length === 1
                    ? "Family history added successfully"
                    : `${familyHistories.length} family history entries added successfully`,
            count: familyHistories.length,
            familyHistories,
        });
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.issues });
            return;
        }
        // Prisma FK violation (e.g. diseaseId doesn't exist)
        if (error?.code === "P2003") {
            res
                .status(400)
                .json({ error: "Foreign key constraint violated", meta: error?.meta });
            return;
        }
        console.log(error);
        next(error);
    }
};

// Get All Family Histories for a Patient
export const getFamilyHistories = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { patientId } = req.params;
        const list = await prisma.familyHistory.findMany({
            where: { patientId: parseInt(patientId) },
            include: { disease: true },
            orderBy: { createdAt: "desc" },
        });
        res.json(list);
    } catch (error) {
        next(error);
    }
};

// Get patient's lifestyle answers (PatientLifestyle with catalog Lifestyle)
export const getPatientLifestyles = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const patientId = parseInt(req.params.patientId);
        const list = await prisma.patientLifestyle.findMany({
            where: { patientId },
            include: { lifestyle: true },
            orderBy: { lifestyleId: "asc" },
        });
        res.json(list);
    } catch (error) {
        next(error);
    }
};

// Add or update patient lifestyle answers — body: array of { lifestyleId, value }
export const addOrUpdatePatientLifestyles = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const patientId = parseInt(req.params.patientId);
        const raw = req.body;
        const items = Array.isArray(raw) ? raw : [raw];
        const validated = batchPatientLifestyleSchema.parse(items);

        const patient = await prisma.patient.findUnique({
            where: { id: patientId },
        });
        if (!patient) {
            res.status(404).json({ error: "Patient not found" });
            return;
        }

        const results = await Promise.all(
            validated.map(async (item) => {
                const lifestyle = await prisma.lifestyle.findUnique({
                    where: { id: item.lifestyleId },
                });
                if (!lifestyle) {
                    throw new Error(`Lifestyle with id ${item.lifestyleId} not found`);
                }
                return prisma.patientLifestyle.upsert({
                    where: {
                        patientId_lifestyleId: { patientId, lifestyleId: item.lifestyleId },
                    },
                    create: {
                        patientId,
                        lifestyleId: item.lifestyleId,
                        value: item.value,
                    },
                    update: { value: item.value },
                    include: { lifestyle: true },
                });
            }),
        );

        res.status(201).json({
            message:
                results.length === 1
                    ? "Lifestyle updated successfully"
                    : `${results.length} lifestyle answers updated`,
            patientLifestyles: results,
        });
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.issues });
            return;
        }
        if (error.message?.includes("not found")) {
            res.status(400).json({ error: error.message });
            return;
        }
        next(error);
    }
};

// Delete one patient lifestyle entry by PatientLifestyle id
export const deletePatientLifestyle = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const patientLifestyleId = parseInt(req.params.patientLifestyleId);
        await prisma.patientLifestyle.delete({
            where: { id: patientLifestyleId },
        });
        res.json({ message: "Lifestyle entry removed successfully" });
    } catch (error: any) {
        if (error.code === "P2025") {
            res.status(404).json({ error: "Lifestyle entry not found" });
            return;
        }
        next(error);
    }
};

// Add one or more allergies to a patient.
// Body: one report payload with optional tradeNameId and related IDs arrays.
export const addAllergy = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const patientId = parseInt(req.params.patientId);
        const payload = patientAllergyReportSchema.parse(req.body);
        const allergenIds = Array.from(new Set(payload.allergenIds ?? []));
        const activeSubstanceIds = Array.from(
            new Set(payload.activeSubstanceIds ?? []),
        );
        const excipientIds = Array.from(new Set(payload.excipientIds ?? []));
        const classificationIds = Array.from(
            new Set(payload.classificationIds ?? []),
        );

        const patient = await prisma.patient.findUnique({
            where: { id: patientId },
        });
        if (!patient) {
            res.status(404).json({ error: "Patient not found" });
            return;
        }

        if (payload.tradeNameIds?.length !== 0) {
            const tradeName = await prisma.tradeName.findMany({
                where: { id: { in: payload.tradeNameIds } },
            });
            if (!(tradeName.length > 0)) {
                res.status(400).json({
                    error: `Some Trade names are not found`,
                });
                return;
            }
        }

        if (allergenIds.length > 0) {
            const found = await prisma.allergen.findMany({
                where: { id: { in: allergenIds } },
                select: { id: true },
            });
            if (found.length !== allergenIds.length) {
                res.status(400).json({ error: "One or more allergenIds are invalid" });
                return;
            }
        }

        if (activeSubstanceIds.length > 0) {
            const found = await prisma.activeSubstance.findMany({
                where: { id: { in: activeSubstanceIds } },
                select: { id: true },
            });
            if (found.length !== activeSubstanceIds.length) {
                res
                    .status(400)
                    .json({ error: "One or more activeSubstanceIds are invalid" });
                return;
            }
        }

        if (excipientIds.length > 0) {
            const found = await prisma.excipient.findMany({
                where: { id: { in: excipientIds } },
                select: { id: true },
            });
            if (found.length !== excipientIds.length) {
                res.status(400).json({ error: "One or more excipientIds are invalid" });
                return;
            }
        }

        if (classificationIds.length > 0) {
            const found = await prisma.classification.findMany({
                where: { id: { in: classificationIds } },
                select: { id: true },
            });
            if (found.length !== classificationIds.length) {
                res
                    .status(400)
                    .json({ error: "One or more classificationIds are invalid" });
                return;
            }
        }
        const tradeNameIds = Array.from(new Set(payload.tradeNameIds ?? []));

        const report = await prisma.$transaction(async (tx) => {
            const upserted = await tx.patientAllergyReport.upsert({
                where: { patientId },
                create: {
                    patientId,
                    tradeName: {
                        create: tradeNameIds?.map((id) => ({
                            tradeName: {
                                connect: { id },
                            },
                        })),
                    },
                    reaction: payload.reaction ?? null,
                    notes: payload.notes ?? null,
                },
                update: {
                    reaction: payload.reaction ?? null,
                    notes: payload.notes ?? null,
                },
                select: { id: true },
            });



            await Promise.all([
                tx.tradenamePatientAllergy.deleteMany({
                    where: { patientAllergyReportId: upserted.id },
                }),
                tx.patientAllergy.deleteMany({
                    where: { patientAllergyReportId: upserted.id },
                }),
                tx.activeSubstancePatientAllergy.deleteMany({
                    where: { patientAllergyReportId: upserted.id },
                }),
                tx.excipientPatientAllergy.deleteMany({
                    where: { patientAllergyReportId: upserted.id },
                }),
                tx.classificationPatientAllergy.deleteMany({
                    where: { patientAllergyReportId: upserted.id },
                }),
            ]);

            if (tradeNameIds?.length > 0) {
                await tx.tradenamePatientAllergy.createMany({
                    data: tradeNameIds.map((tradeNameId) => ({
                        patientAllergyReportId: upserted.id,
                        tradeNameId,
                    })),
                    skipDuplicates: true,
                });
            }
            if (allergenIds.length > 0) {
                await tx.patientAllergy.createMany({
                    data: allergenIds.map((allergenId) => ({
                        patientAllergyReportId: upserted.id,
                        allergenId,
                    })),
                });
            }

            if (activeSubstanceIds.length > 0) {
                await tx.activeSubstancePatientAllergy.createMany({
                    data: activeSubstanceIds.map((activeSubstanceId) => ({
                        patientAllergyReportId: upserted.id,
                        activeSubstanceId,
                    })),
                });
            }

            if (excipientIds.length > 0) {
                await tx.excipientPatientAllergy.createMany({
                    data: excipientIds.map((excipientId) => ({
                        patientAllergyReportId: upserted.id,
                        excipientId,
                    })),
                });
            }

            if (classificationIds.length > 0) {
                await tx.classificationPatientAllergy.createMany({
                    data: classificationIds.map((classificationId) => ({
                        patientAllergyReportId: upserted.id,
                        classificationId,
                    })),
                });
            }

            return tx.patientAllergyReport.findUnique({
                where: { id: upserted.id },
                include: {
                    tradeName: { select: { id: true, tradeName: { select: { title: true } } } },
                    patientAllergies: { select: { id: true, allergenId: true } },
                    activeSubstancePatientAllergies: {
                        select: { id: true, activeSubstanceId: true },
                    },
                    excipientPatientAllergies: {
                        select: { id: true, excipientId: true },
                    },
                    classificationPatientAllergies: {
                        select: { id: true, classificationId: true },
                    },
                },
            });
        });

        if (!report) {
            res.status(500).json({ error: "Failed to save allergy report" });
            return;
        }
        res.status(201).json({
            message: "Allergy report saved successfully",
            report,
        });
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.issues });
            return;
        }
        next(error);
    }
};

// Add Allergies (batch) — same as addAllergy with array body; kept for backward compatibility.
export const addAllergiesBatch = async (
    req: Request,
    res: Response,
    _next: NextFunction,
) => {
    return addAllergy(req, res, () => { });
};

// Delete patient's allergy (PatientAllergy id)
export const deleteAllergy = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { allergyId } = req.params;

        await prisma.patientAllergy.delete({
            where: { id: parseInt(allergyId) },
        });

        res.json({ message: "Allergy removed successfully" });
    } catch (error: any) {
        if (error.code === "P2025") {
            res.status(404).json({ error: "Allergy not found" });
            return;
        }
        next(error);
    }
};

// Add Child Profile (accepts single object or array of objects)
export const addChildProfile = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { patientId } = req.params;
        const raw = req.body;
        const items = Array.isArray(raw) ? raw : [raw];
        const validatedItems = z.array(childProfileSchema).parse(items);

        const patient = await prisma.patient.findUnique({
            where: { id: parseInt(patientId) },
        });

        if (!patient) {
            res.status(404).json({ error: "Patient not found" });
            return;
        }

        if (validatedItems.length === 0) {
            res.status(400).json({ error: "At least one child profile is required" });
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
            medicalHistory: v.medicalHistory,
        }));

        const childProfiles = await prisma.childProfile.createManyAndReturn({
            data,
        });

        res.status(201).json({
            message:
                childProfiles.length === 1
                    ? "Child profile added successfully"
                    : `${childProfiles.length} child profiles added successfully`,
            count: childProfiles.length,
            childProfiles,
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
export const getChildProfiles = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { patientId } = req.params;

        const childProfiles = await prisma.childProfile.findMany({
            where: { parentPatientId: parseInt(patientId) },
        });

        res.json(childProfiles);
    } catch (error) {
        next(error);
    }
};

// Delete Child Profile
export const deleteChildProfile = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { childId } = req.params;

        await prisma.childProfile.delete({
            where: { id: parseInt(childId) },
        });

        res.json({ message: "Child profile deleted successfully" });
    } catch (error: any) {
        if (error.code === "P2025") {
            res.status(404).json({ error: "Child profile not found" });
            return;
        }
        next(error);
    }
};

// GET /patients/me/full — patient gets own full details (same structure and data types as GET /doctors/:doctorId/patients/:patientId, without doctorId or relationship)
export const getMyFullDetails = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        const patient = await prisma.patient.findUnique({
            where: { userId },
            include: patientFullDetailsInclude,
        });

        if (!patient) {
            res.status(404).json({ error: "Patient not found" });
            return;
        }

        const payload = mapPatientToFullDetailsPayload(patient);
        res.json(payload);
    } catch (error) {
        next(error);
    }
};

/** Shared result type for aggregated patient warnings (used by GET /patients/:patientId/warnings and GET /doctors/:doctorId/patients/warnings). */
export type PatientWarningsPayload = {
    warnings: Array<{
        type: string;
        severity: string;
        message: string;
        [k: string]: unknown;
    }>;
    byMedicine: Array<{
        medicineName: string;
        tradeNameId?: number;
        activeSubstanceId?: number;
        warnings: unknown[];
    }>;
};

/** Compute aggregated warnings for one patient (prescriptions + self-reported medicines). Returns null if patient not found. */
export async function getAggregatedWarningsForPatient(
    patientId: number,
): Promise<PatientWarningsPayload | null> {
    const patient = await prisma.patient.findUnique({
        where: { id: patientId },
        include: {
            prescriptions: {
                where: {
                    status: { in: ["Approved", "Filled"] },
                    validUntil: { gte: new Date() },
                },
                include: {
                    prescriptionMedicines: {
                        include: {
                            patientMedicine: {
                                include: {
                                    tradeName: { include: { activeSubstance: true } },
                                    activeSubstance: true,
                                },
                            },
                        },
                    },
                },
            },
            medicines: {
                where: { isOngoing: true },
                include: {
                    tradeName: { include: { activeSubstance: true } },
                    activeSubstance: true,
                },
            },
        },
    });

    if (!patient) return null;

    const allWarnings: PatientWarningsPayload["warnings"] = [];
    const byMedicine: PatientWarningsPayload["byMedicine"] = [];
    const seenTradeNames = new Set<number>();
    const seenActiveOnly = new Set<number>();

    for (const p of patient.prescriptions) {
        for (const link of (p as any).prescriptionMedicines || []) {
            const pm = link.patientMedicine;
            const tn = pm?.tradeName;
            if (!tn || seenTradeNames.has(tn.id)) continue;
            seenTradeNames.add(tn.id);
            try {
                const result = await generateWarnings(patientId, tn.id);
                const list = result.warnings as Array<{
                    type: string;
                    severity: string;
                    message: string;
                    [k: string]: unknown;
                }>;
                allWarnings.push(...list);
                byMedicine.push({
                    medicineName: pm?.medicineName || tn.title || String(tn.id),
                    tradeNameId: tn.id,
                    warnings: list,
                });
            } catch (_) {
                byMedicine.push({
                    medicineName: pm?.medicineName || tn?.title || String(tn?.id),
                    tradeNameId: tn?.id,
                    warnings: [],
                });
            }
        }
    }

    for (const m of patient.medicines) {
        if (m.tradeNameId != null && !seenTradeNames.has(m.tradeNameId)) {
            seenTradeNames.add(m.tradeNameId);
            try {
                const result = await generateWarnings(patientId, m.tradeNameId);
                const list = result.warnings as Array<{
                    type: string;
                    severity: string;
                    message: string;
                }>;
                allWarnings.push(...list);
                byMedicine.push({
                    medicineName: m.medicineName,
                    tradeNameId: m.tradeNameId,
                    activeSubstanceId: m.activeSubstanceId ?? undefined,
                    warnings: list,
                });
            } catch (_) {
                byMedicine.push({
                    medicineName: m.medicineName,
                    tradeNameId: m.tradeNameId,
                    activeSubstanceId: m.activeSubstanceId ?? undefined,
                    warnings: [],
                });
            }
        } else if (
            m.activeSubstanceId != null &&
            !seenActiveOnly.has(m.activeSubstanceId)
        ) {
            seenActiveOnly.add(m.activeSubstanceId);
            try {
                const safety = await drugInteractionService.checkDrugSafety(
                    patientId,
                    m.activeSubstanceId,
                    undefined,
                );
                const list = safety.warnings as Array<{
                    type: string;
                    severity: string;
                    message: string;
                }>;
                allWarnings.push(...list);
                byMedicine.push({
                    medicineName: m.medicineName,
                    activeSubstanceId: m.activeSubstanceId,
                    warnings: list,
                });
            } catch (_) {
                byMedicine.push({
                    medicineName: m.medicineName,
                    activeSubstanceId: m.activeSubstanceId,
                    warnings: [],
                });
            }
        }
    }

    return { warnings: allWarnings, byMedicine };
}

// GET /patients/:patientId/warnings — aggregated warnings for all current medicines (prescriptions + self-reported)
export const getPatientWarnings = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const patientId = Number(req.params.patientId);
        if (!Number.isFinite(patientId)) {
            res.status(400).json({ error: "Invalid patient ID" });
            return;
        }

        const result = await getAggregatedWarningsForPatient(patientId);
        if (!result) {
            res.status(404).json({ error: "Patient not found" });
            return;
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
};
