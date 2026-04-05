import { computeBmi } from './bmi.util';

/**
 * Standard include for "full patient details" (profile, vitals, health status, visit files, prescription history).
 * Use this in both GET /doctors/:doctorId/patients/:patientId and GET /patients/me/full
 * so the response structure and data types are identical.
 */
/** Prescription history on full patient profile (doctor view + GET /patients/me/full). Newest first; includes issuing doctor and medicines. */
const prescriptionsForFullProfile = {
    orderBy: { prescriptionDate: 'desc' as const },
    include: {
        doctor: { select: { id: true, name: true, specialization: true } },
        visit: { select: { id: true, visitDate: true, visitType: true, isNewVisit: true } },
        prescriptionMedicines: {
            orderBy: { sortOrder: 'asc' as const },
            include: {
                patientMedicine: {
                    include: {
                        tradeName: { include: { activeSubstance: true, company: true } },
                        activeSubstance: true
                    }
                }
            }
        },
        drugInteractionAlerts: true
    }
} as const;

export const patientFullDetailsInclude = {
    user: { select: { name: true, email: true, phone: true } },
    medicalHistories: { include: { disease: true } },
    familyHistories: { include: { disease: true } },
    patientDiseases: { include: { disease: true } },
    patientLifestyles: { include: { lifestyle: true } },
    allergyReports: true,
    surgicalHistories: { include: { organ: true } },
    visits: { orderBy: { visitDate: 'desc' as const } },
    medicalReports: { orderBy: { reportDate: 'desc' as const } },
    prescriptions: prescriptionsForFullProfile
} as const;

/**
 * Same as patientFullDetailsInclude but prescriptions are limited to those issued by the given doctor
 * (for GET /doctors/:doctorId/patients/:patientId).
 */
export function patientFullDetailsIncludeForDoctor(doctorId: number) {
    return {
        ...patientFullDetailsInclude,
        prescriptions: {
            where: { doctorId },
            ...prescriptionsForFullProfile
        }
    };
}

type PatientWithFullDetails = {
    user: { name: string | null; email: string; phone: string | null } | null;
    weight?: unknown;
    height?: unknown;
    [key: string]: unknown;
};

/**
 * Maps a loaded patient (with patientFullDetailsInclude) to the shared response shape.
 * Same structure and data types for GET /doctors/:doctorId/patients/:patientId and GET /patients/me/full.
 */
export function mapPatientToFullDetailsPayload(patient: PatientWithFullDetails | null): {
    patient: Record<string, unknown> | null;
} {
    if (!patient) {
        return { patient: null };
    }
    const user = patient.user as { name: string | null; email: string; phone: string | null } | undefined;
    const bodyMassIndex = computeBmi(patient.weight, patient.height) ?? undefined;
    return {
        patient: {
            ...patient,
            name: user?.name ?? null,
            email: user?.email ?? null,
            phone: user?.phone ?? null,
            bodyMassIndex
        }
    };
}
