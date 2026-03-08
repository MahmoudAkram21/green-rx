import { computeBmi } from './bmi.util';

/**
 * Standard include for "full patient details" (profile, vitals, health status, visit files).
 * Use this in both GET /doctors/:doctorId/patients/:patientId and GET /patients/me/full
 * so the response structure and data types are identical.
 */
export const patientFullDetailsInclude = {
    user: { select: { name: true, email: true, phone: true } },
    medicalHistories: { include: { disease: true } },
    familyHistories: { include: { disease: true } },
    patientDiseases: { include: { disease: true } },
    patientLifestyles: { include: { lifestyle: true } },
    patientAllergies: { include: { allergen: true } },
    surgicalHistories: { include: { operation: true } },
    visits: { orderBy: { visitDate: 'desc' as const } },
    medicalReports: { orderBy: { reportDate: 'desc' as const } }
} as const;

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
