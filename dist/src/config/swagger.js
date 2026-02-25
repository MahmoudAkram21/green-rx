"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const swaggerJSDoc = require('swagger-jsdoc');
const port = process.env.PORT || 3000;
const apiBase = process.env.API_BASE_URL || `http://localhost:${port}/api`;
const bearerSecurity = [{ bearerAuth: [] }];
const paths = {};
/** Integer path param */
const p = (name, type = 'integer') => ({ name, in: 'path', required: true, schema: { type } });
/** String path param shorthand */
const ps = (name) => p(name, 'string');
/** Optional query param */
const q = (name, description) => ({ name, in: 'query', required: false, schema: { type: 'string' }, ...(description ? { description } : {}) });
const AUTH_TAGS = ['Patient - 1. Auth', 'Doctor - 1. Auth', 'Pharmacist - 1. Auth'];
const PATIENT_TAGS = {
    AUTH: 'Patient - 1. Auth',
    PROFILE: 'Patient - 2. Personal info & profile',
    ALLERGIES: 'Patient - 3. Allergies',
    SURGERIES: 'Patient - 4. Previous surgeries',
    FAMILY_HISTORY: 'Patient - 5. Family health history',
    CURRENT_DISEASES: 'Patient - 6. Current diseases',
    LIFESTYLE: 'Patient - 7. Lifestyle',
    MEDICATIONS: 'Patient - 8. My medications',
    SHARE_WITH_DOCTOR: 'Patient - 9. Share profile with doctor',
    PRESCRIPTIONS: 'Patient - 10. Prescriptions',
    CONSULTATIONS_VISITS: 'Patient - 11. Consultations & visits',
    SHARE_LINKS: 'Patient - 12. Share links',
    DRUG_SAFETY: 'Patient - 13. Drug interactions & ADR',
    RATINGS: 'Patient - 14. Ratings',
    NOTIFICATIONS: 'Patient - 15. Notifications',
    SUBSCRIPTION_PAYMENTS: 'Patient - 16. Subscription & payments',
};
const DOCTOR_TAGS = {
    AUTH: 'Doctor - 1. Auth',
    MY_PATIENTS: 'Doctor - 2. My patients',
    PRESCRIPTIONS: 'Doctor - 3. Prescriptions',
    CONSULTATIONS_VISITS: 'Doctor - 4. Consultations & visits',
    MEDICAL_REPORTS: 'Doctor - 5. Medical reports',
    DRUG_SAFETY: 'Doctor - 6. Drug interactions & medicine suggestions',
    RATINGS: 'Doctor - 7. Ratings',
    NOTIFICATIONS: 'Doctor - 8. Notifications',
};
const PHARMACIST_TAGS = {
    AUTH: 'Pharmacist - 1. Auth',
    PROFILE: 'Pharmacist - 2. Profile',
    MEDICATIONS_SEARCH: 'Pharmacist - 3. Search medicines & prescriptions',
    NOTIFICATIONS: 'Pharmacist - 4. Notifications',
    RATINGS: 'Pharmacist - 5. Ratings',
};
const ADMIN_TAG = 'System & Admin';
const s = (pathKey, method, tagOrTags, summary, secure = true, params = [], body) => {
    const tagList = Array.isArray(tagOrTags) ? tagOrTags : [tagOrTags];
    paths[pathKey] = paths[pathKey] || {};
    paths[pathKey][method] = {
        tags: tagList,
        summary,
        ...(secure ? { security: bearerSecurity } : {}),
        ...(params.length ? { parameters: params } : {}),
        ...(body ? {
            requestBody: {
                required: body.required !== false,
                content: { 'application/json': { schema: { $ref: `#/components/schemas/${body.schemaRef}` } } }
            }
        } : {}),
        responses: { '200': { description: 'Success' } }
    };
};
// ═══════════════════════════════════════════════════
// SYSTEM
// ═══════════════════════════════════════════════════
s('/health', 'get', ADMIN_TAG, 'Health check', false);
// ═══════════════════════════════════════════════════
// AUTH  →  /api/auth/*
// ═══════════════════════════════════════════════════
s('/auth/register', 'post', AUTH_TAGS, 'Register a new user', false, [], { schemaRef: 'RegisterRequest' });
s('/auth/login', 'post', AUTH_TAGS, 'Login and receive tokens', false, [], { schemaRef: 'LoginRequest' });
s('/auth/refresh', 'post', AUTH_TAGS, 'Refresh access token', false, [], { schemaRef: 'RefreshTokenRequest' });
s('/auth/logout', 'post', AUTH_TAGS, 'Logout (invalidate token)');
s('/auth/me', 'get', AUTH_TAGS, 'Get current authenticated user');
s('/auth/dev-reset-superadmin-password', 'post', ADMIN_TAG, '[Dev] Reset superadmin password', false);
// ═══════════════════════════════════════════════════
// USERS  →  /api/users/*
// ═══════════════════════════════════════════════════
s('/users', 'get', ADMIN_TAG, 'Get all users');
s('/users', 'post', ADMIN_TAG, 'Create a user', true, [], { schemaRef: 'CreateUserRequest' });
s('/users/{id}', 'get', ADMIN_TAG, 'Get user by ID', true, [p('id')]);
s('/users/{id}', 'put', ADMIN_TAG, 'Update user by ID', true, [p('id')], { schemaRef: 'UpdateUserRequest' });
s('/users/{id}', 'delete', ADMIN_TAG, 'Delete user by ID', true, [p('id')]);
// ═══════════════════════════════════════════════════
// PATIENTS — Profile  →  /api/patients/*
// ═══════════════════════════════════════════════════
s('/patients', 'get', ADMIN_TAG, 'Get all patients (Admin/SuperAdmin only)');
s('/patients', 'post', PATIENT_TAGS.PROFILE, 'Create or update patient profile', true, [], { schemaRef: 'CreatePatientRequest' });
s('/patients/{id}', 'get', PATIENT_TAGS.PROFILE, 'Get patient by ID', true, [p('id')]);
s('/patients/user/{userId}', 'get', PATIENT_TAGS.PROFILE, 'Get patient by user ID', true, [p('userId')]);
// PATIENTS — Medical History
s('/patients/{patientId}/medical-history', 'get', PATIENT_TAGS.PROFILE, 'Get medical history entries', true, [p('patientId')]);
s('/patients/{patientId}/medical-history', 'post', PATIENT_TAGS.PROFILE, 'Add a medical history entry', true, [p('patientId')], { schemaRef: 'MedicalHistoryRequest' });
// PATIENTS — Family History
s('/patients/{patientId}/family-history', 'get', PATIENT_TAGS.FAMILY_HISTORY, 'Get family history entries', true, [p('patientId')]);
s('/patients/{patientId}/family-history', 'post', PATIENT_TAGS.FAMILY_HISTORY, 'Add a family history entry', true, [p('patientId')], { schemaRef: 'FamilyHistoryRequest' });
// PATIENTS — Surgical History
s('/patients/{patientId}/surgeries', 'get', PATIENT_TAGS.SURGERIES, 'Get previous surgeries', true, [p('patientId')]);
s('/patients/{patientId}/surgeries', 'post', PATIENT_TAGS.SURGERIES, 'Add a surgical history entry', true, [p('patientId')], { schemaRef: 'SurgicalHistoryRequest' });
s('/patients/surgeries/{id}', 'delete', PATIENT_TAGS.SURGERIES, 'Delete a surgical history entry', true, [p('id')]);
// PATIENTS — Lifestyle
s('/patients/{patientId}/lifestyle', 'put', PATIENT_TAGS.LIFESTYLE, 'Update patient lifestyle data', true, [p('patientId')], { schemaRef: 'LifestyleRequest' });
// PATIENTS — Children
s('/patients/{patientId}/children', 'get', PATIENT_TAGS.PROFILE, 'Get child profiles for patient', true, [p('patientId')]);
s('/patients/{patientId}/children', 'post', PATIENT_TAGS.PROFILE, 'Add a child profile', true, [p('patientId')], { schemaRef: 'ChildProfileRequest' });
s('/patients/children/{childId}', 'delete', PATIENT_TAGS.PROFILE, 'Delete a child profile', true, [p('childId')]);
// DOCTORS
s('/doctors', 'post', DOCTOR_TAGS.MY_PATIENTS, 'Create or update doctor profile', true, [], { schemaRef: 'CreateDoctorRequest' });
s('/doctors/search', 'get', [PATIENT_TAGS.SHARE_WITH_DOCTOR, DOCTOR_TAGS.MY_PATIENTS], 'Search / list all doctors', true, [q('q', 'Search query')]);
s('/doctors/{id}', 'get', [PATIENT_TAGS.SHARE_WITH_DOCTOR, DOCTOR_TAGS.MY_PATIENTS], 'Get doctor by ID', true, [p('id')]);
s('/doctors/user/{userId}', 'get', DOCTOR_TAGS.MY_PATIENTS, 'Get doctor by user ID', true, [p('userId')]);
s('/doctors/{id}/verify', 'put', ADMIN_TAG, 'Verify a doctor (Admin)', true, [p('id')], { schemaRef: 'VerifyDoctorRequest' });
s('/doctors/{doctorId}/patients', 'get', DOCTOR_TAGS.MY_PATIENTS, 'Get patients assigned to doctor (My patients)', true, [p('doctorId')]);
s('/doctors/{doctorId}/patients', 'post', [PATIENT_TAGS.SHARE_WITH_DOCTOR, DOCTOR_TAGS.MY_PATIENTS], 'Assign a patient to doctor', true, [p('doctorId')], { schemaRef: 'AssignPatientRequest' });
s('/doctors/{doctorId}/patients/{patientId}', 'delete', DOCTOR_TAGS.MY_PATIENTS, 'Remove patient from doctor', true, [p('doctorId'), p('patientId')]);
// PHARMACISTS
s('/pharmacists', 'post', PHARMACIST_TAGS.PROFILE, 'Create or update pharmacist profile', true, [], { schemaRef: 'CreatePharmacistRequest' });
s('/pharmacists/search', 'get', PHARMACIST_TAGS.PROFILE, 'List / search all pharmacists', true, [q('q')]);
s('/pharmacists/{id}', 'get', PHARMACIST_TAGS.PROFILE, 'Get pharmacist by ID', true, [p('id')]);
s('/pharmacists/user/{userId}', 'get', PHARMACIST_TAGS.PROFILE, 'Get pharmacist by user ID', true, [p('userId')]);
// PATIENT-DOCTOR (Share profile with doctor)
s('/patient-doctors', 'post', [PATIENT_TAGS.SHARE_WITH_DOCTOR, DOCTOR_TAGS.MY_PATIENTS], 'Create a patient-doctor relationship', true, [], { schemaRef: 'CreatePatientDoctorRequest' });
s('/patient-doctors/patient/{patientId}', 'get', PATIENT_TAGS.SHARE_WITH_DOCTOR, 'Get relationships for a patient', true, [p('patientId')]);
s('/patient-doctors/doctor/{doctorId}', 'get', DOCTOR_TAGS.MY_PATIENTS, 'Get relationships for a doctor', true, [p('doctorId')]);
s('/patient-doctors/{id}', 'get', [PATIENT_TAGS.SHARE_WITH_DOCTOR, DOCTOR_TAGS.MY_PATIENTS], 'Get relationship by ID', true, [p('id')]);
s('/patient-doctors/{id}', 'put', [PATIENT_TAGS.SHARE_WITH_DOCTOR, DOCTOR_TAGS.MY_PATIENTS], 'Update relationship', true, [p('id')], { schemaRef: 'UpdatePatientDoctorRequest' });
s('/patient-doctors/{id}/end', 'post', [PATIENT_TAGS.SHARE_WITH_DOCTOR, DOCTOR_TAGS.MY_PATIENTS], 'End a patient-doctor relationship', true, [p('id')]);
// ALLERGIES
s('/allergies', 'post', PATIENT_TAGS.ALLERGIES, 'Create an allergy record', true, [], { schemaRef: 'AllergyRequest' });
s('/allergies/patient/{patientId}', 'get', PATIENT_TAGS.ALLERGIES, 'Get all allergies for a patient', true, [p('patientId')]);
s('/allergies/patient/{patientId}/critical', 'get', PATIENT_TAGS.ALLERGIES, 'Get critical allergies for a patient', true, [p('patientId')]);
s('/allergies/{id}', 'get', PATIENT_TAGS.ALLERGIES, 'Get allergy by ID', true, [p('id')]);
s('/allergies/{id}', 'put', PATIENT_TAGS.ALLERGIES, 'Update allergy', true, [p('id')], { schemaRef: 'UpdateAllergyRequest' });
s('/allergies/{id}', 'delete', PATIENT_TAGS.ALLERGIES, 'Delete allergy', true, [p('id')]);
s('/allergies/check/{patientId}/{medicineId}', 'get', PATIENT_TAGS.ALLERGIES, 'Check if medicine conflicts with patient allergies', true, [p('patientId'), p('medicineId')]);
s('/patients/{patientId}/allergies', 'post', PATIENT_TAGS.ALLERGIES, 'Add allergy to patient profile', true, [p('patientId')], { schemaRef: 'AllergyRequest' });
s('/patients/{patientId}/allergies/batch', 'post', PATIENT_TAGS.ALLERGIES, 'Add multiple allergies to patient (batch)', true, [p('patientId')], { schemaRef: 'BatchAllergyRequest' });
s('/patients/allergies/{allergyId}', 'delete', PATIENT_TAGS.ALLERGIES, 'Remove allergy from patient profile', true, [p('allergyId')]);
// PATIENT DISEASES (Current diseases)
s('/patient-diseases/patient/{patientId}', 'get', PATIENT_TAGS.CURRENT_DISEASES, 'Get diseases for a patient', true, [p('patientId')]);
s('/patient-diseases/patient/{patientId}', 'post', PATIENT_TAGS.CURRENT_DISEASES, 'Add a disease to patient', true, [p('patientId')], { schemaRef: 'AddPatientDiseaseRequest' });
s('/patient-diseases/patient/{patientId}/active', 'get', PATIENT_TAGS.CURRENT_DISEASES, 'Get only active diseases for a patient', true, [p('patientId')]);
s('/patient-diseases/{id}', 'patch', PATIENT_TAGS.CURRENT_DISEASES, 'Update patient disease status', true, [p('id')], { schemaRef: 'UpdatePatientDiseaseRequest' });
s('/patient-diseases/{id}', 'delete', PATIENT_TAGS.CURRENT_DISEASES, 'Remove patient disease', true, [p('id')]);
// PATIENT MEDICINES (My medications)
s('/patient-medicines/patient/{patientId}', 'get', PATIENT_TAGS.MEDICATIONS, 'List all medicines for a patient', true, [p('patientId')]);
s('/patient-medicines/{id}', 'get', PATIENT_TAGS.MEDICATIONS, 'Get a patient medicine by ID', true, [p('id')]);
s('/patient-medicines/patient/{patientId}', 'post', PATIENT_TAGS.MEDICATIONS, 'Add a medicine to patient', true, [p('patientId')], { schemaRef: 'AddPatientMedicineRequest' });
s('/patient-medicines/patient/{patientId}/upload-image', 'post', PATIENT_TAGS.MEDICATIONS, 'Upload medicine image (when not in system)', true, [p('patientId')], { schemaRef: 'AddPatientMedicineRequest' });
s('/patient-medicines/{id}', 'patch', PATIENT_TAGS.MEDICATIONS, 'Update a patient medicine', true, [p('id')], { schemaRef: 'UpdatePatientMedicineRequest' });
s('/patient-medicines/{id}', 'delete', PATIENT_TAGS.MEDICATIONS, 'Delete a patient medicine', true, [p('id')]);
s('/patient-medicines/{id}/verify', 'patch', ADMIN_TAG, 'Verify an uploaded medicine (Admin/Doctor)', true, [p('id')]);
s('/patient-medicines/unverified', 'get', ADMIN_TAG, 'List unverified patient medicines (Admin)', true);
// PRESCRIPTIONS
s('/prescriptions', 'get', [PATIENT_TAGS.PRESCRIPTIONS, DOCTOR_TAGS.PRESCRIPTIONS], 'List prescriptions (filtered by role)', true, [q('patientId'), q('doctorId')]);
s('/prescriptions', 'post', DOCTOR_TAGS.PRESCRIPTIONS, 'Create a prescription (runs drug-safety check)', true, [], { schemaRef: 'CreatePrescriptionRequest' });
s('/prescriptions/batch', 'post', DOCTOR_TAGS.PRESCRIPTIONS, 'Batch-create prescriptions', true, [], { schemaRef: 'BatchPrescriptionsRequest' });
s('/prescriptions/{id}', 'get', [PATIENT_TAGS.PRESCRIPTIONS, DOCTOR_TAGS.PRESCRIPTIONS], 'Get prescription by ID', true, [p('id')]);
s('/prescriptions/{id}', 'put', DOCTOR_TAGS.PRESCRIPTIONS, 'Update a prescription', true, [p('id')], { schemaRef: 'UpdatePrescriptionRequest' });
s('/prescriptions/{id}', 'delete', [PATIENT_TAGS.PRESCRIPTIONS, DOCTOR_TAGS.PRESCRIPTIONS], 'Delete a prescription', true, [p('id')]);
s('/prescriptions/{prescriptionId}/interactions', 'get', [PATIENT_TAGS.PRESCRIPTIONS, PATIENT_TAGS.DRUG_SAFETY, DOCTOR_TAGS.DRUG_SAFETY], 'Get drug interaction alerts for prescription', true, [p('prescriptionId')]);
s('/prescriptions/interactions/{alertId}/acknowledge', 'put', [PATIENT_TAGS.PRESCRIPTIONS, PATIENT_TAGS.DRUG_SAFETY, DOCTOR_TAGS.DRUG_SAFETY], 'Acknowledge a drug interaction alert', true, [p('alertId')]);
// PRESCRIPTION VERSIONS
s('/prescription-versions/prescription/{prescriptionId}', 'get', [PATIENT_TAGS.PRESCRIPTIONS, DOCTOR_TAGS.PRESCRIPTIONS], 'Get all versions of a prescription', true, [p('prescriptionId')]);
s('/prescription-versions/prescription/{prescriptionId}', 'post', DOCTOR_TAGS.PRESCRIPTIONS, 'Create a new prescription version', true, [p('prescriptionId')], { schemaRef: 'CreatePrescriptionVersionRequest' });
s('/prescription-versions/prescription/{prescriptionId}/compare', 'get', [PATIENT_TAGS.PRESCRIPTIONS, DOCTOR_TAGS.PRESCRIPTIONS], 'Compare two prescription versions', true, [p('prescriptionId'), q('version1'), q('version2')]);
s('/prescription-versions/{id}', 'get', [PATIENT_TAGS.PRESCRIPTIONS, DOCTOR_TAGS.PRESCRIPTIONS], 'Get a specific prescription version', true, [p('id')]);
// APPOINTMENTS (not in core patient-doctor flow; tag for Admin / future use)
s('/appointments', 'post', ADMIN_TAG, 'Create an appointment', true, [], { schemaRef: 'CreateAppointmentRequest' });
s('/appointments/{id}', 'get', ADMIN_TAG, 'Get appointment by ID', true, [p('id')]);
s('/appointments/{id}', 'put', ADMIN_TAG, 'Update an appointment', true, [p('id')], { schemaRef: 'UpdateAppointmentRequest' });
s('/appointments/{id}/cancel', 'post', ADMIN_TAG, 'Cancel an appointment', true, [p('id')]);
s('/appointments/{id}/confirm', 'post', ADMIN_TAG, 'Confirm an appointment (doctor)', true, [p('id')]);
s('/appointments/{id}/complete', 'post', ADMIN_TAG, 'Mark appointment as completed (doctor)', true, [p('id')]);
s('/appointments/patient/{patientId}', 'get', ADMIN_TAG, 'Get all appointments for a patient', true, [p('patientId')]);
s('/appointments/doctor/{doctorId}', 'get', ADMIN_TAG, 'Get all appointments for a doctor', true, [p('doctorId')]);
s('/appointments/doctor/{doctorId}/today', 'get', ADMIN_TAG, "Get today's appointments for a doctor", true, [p('doctorId')]);
// CONSULTATIONS
s('/consultations', 'post', [PATIENT_TAGS.CONSULTATIONS_VISITS, DOCTOR_TAGS.CONSULTATIONS_VISITS], 'Create a consultation', true, [], { schemaRef: 'CreateConsultationRequest' });
s('/consultations/{id}', 'get', [PATIENT_TAGS.CONSULTATIONS_VISITS, DOCTOR_TAGS.CONSULTATIONS_VISITS], 'Get consultation by ID', true, [p('id')]);
s('/consultations/{id}', 'put', [PATIENT_TAGS.CONSULTATIONS_VISITS, DOCTOR_TAGS.CONSULTATIONS_VISITS], 'Update a consultation', true, [p('id')], { schemaRef: 'UpdateConsultationRequest' });
s('/consultations/{id}', 'delete', [PATIENT_TAGS.CONSULTATIONS_VISITS, DOCTOR_TAGS.CONSULTATIONS_VISITS], 'Delete a consultation', true, [p('id')]);
s('/consultations/patient/{patientId}', 'get', PATIENT_TAGS.CONSULTATIONS_VISITS, 'Get consultations for a patient', true, [p('patientId')]);
s('/consultations/doctor/{doctorId}', 'get', DOCTOR_TAGS.CONSULTATIONS_VISITS, 'Get consultations for a doctor', true, [p('doctorId')]);
s('/consultations/doctor/{doctorId}/followups', 'get', DOCTOR_TAGS.CONSULTATIONS_VISITS, 'Get upcoming follow-ups for a doctor', true, [p('doctorId')]);
// VISITS
s('/visits', 'post', [PATIENT_TAGS.CONSULTATIONS_VISITS, DOCTOR_TAGS.CONSULTATIONS_VISITS], 'Create a visit record', true, [], { schemaRef: 'CreateVisitRequest' });
s('/visits/{id}', 'get', [PATIENT_TAGS.CONSULTATIONS_VISITS, DOCTOR_TAGS.CONSULTATIONS_VISITS], 'Get visit by ID', true, [p('id')]);
s('/visits/{id}', 'patch', [PATIENT_TAGS.CONSULTATIONS_VISITS, DOCTOR_TAGS.CONSULTATIONS_VISITS], 'Update a visit', true, [p('id')], { schemaRef: 'UpdateVisitRequest' });
s('/visits/{id}', 'delete', [PATIENT_TAGS.CONSULTATIONS_VISITS, DOCTOR_TAGS.CONSULTATIONS_VISITS], 'Delete a visit', true, [p('id')]);
s('/visits/patient/{patientId}', 'get', PATIENT_TAGS.CONSULTATIONS_VISITS, 'Get all visits for a patient', true, [p('patientId')]);
s('/visits/doctor/{doctorId}', 'get', DOCTOR_TAGS.CONSULTATIONS_VISITS, 'Get all visits for a doctor', true, [p('doctorId')]);
// MEDICAL REPORTS
s('/medical-reports', 'post', [PATIENT_TAGS.CONSULTATIONS_VISITS, DOCTOR_TAGS.MEDICAL_REPORTS], 'Create a medical report', true, [], { schemaRef: 'CreateMedicalReportRequest' });
s('/medical-reports/patient/{patientId}', 'get', [PATIENT_TAGS.CONSULTATIONS_VISITS, DOCTOR_TAGS.MEDICAL_REPORTS], 'Get all medical reports for a patient', true, [p('patientId')]);
s('/medical-reports/{id}', 'get', [PATIENT_TAGS.CONSULTATIONS_VISITS, DOCTOR_TAGS.MEDICAL_REPORTS], 'Get medical report by ID', true, [p('id')]);
s('/medical-reports/{id}', 'patch', DOCTOR_TAGS.MEDICAL_REPORTS, 'Update a medical report', true, [p('id')], { schemaRef: 'UpdateMedicalReportRequest' });
s('/medical-reports/{id}', 'delete', [PATIENT_TAGS.CONSULTATIONS_VISITS, DOCTOR_TAGS.MEDICAL_REPORTS], 'Delete a medical report', true, [p('id')]);
s('/medical-reports/{id}/upload', 'post', DOCTOR_TAGS.MEDICAL_REPORTS, 'Upload a file for a medical report', true, [p('id')]);
// SHARE LINKS
s('/share-links/patient/{patientId}', 'get', PATIENT_TAGS.SHARE_LINKS, 'Get all share links for a patient', true, [p('patientId')]);
s('/share-links/patient/{patientId}', 'post', PATIENT_TAGS.SHARE_LINKS, 'Generate a new share link for a patient', true, [p('patientId')], { schemaRef: 'GenerateShareLinkRequest' });
s('/share-links/shared/{token}', 'get', PATIENT_TAGS.SHARE_LINKS, 'Access shared patient data via token (public)', false, [ps('token')]);
s('/share-links/{id}/revoke', 'patch', PATIENT_TAGS.SHARE_LINKS, 'Revoke a share link', true, [p('id')]);
s('/share-links/{id}', 'patch', PATIENT_TAGS.SHARE_LINKS, 'Update share link settings', true, [p('id')], { schemaRef: 'UpdateShareLinkRequest' });
s('/share-links/{id}', 'delete', PATIENT_TAGS.SHARE_LINKS, 'Delete a share link', true, [p('id')]);
// RATINGS
s('/ratings', 'post', PATIENT_TAGS.RATINGS, 'Create or update a rating', true, [], { schemaRef: 'CreateRatingRequest' });
s('/ratings/doctor/{doctorId}', 'get', [PATIENT_TAGS.RATINGS, DOCTOR_TAGS.RATINGS], 'Get ratings for a doctor', true, [p('doctorId')]);
s('/ratings/pharmacist/{pharmacistId}', 'get', [PATIENT_TAGS.RATINGS, PHARMACIST_TAGS.RATINGS], 'Get ratings for a pharmacist', true, [p('pharmacistId')]);
s('/ratings/patient/{patientId}', 'get', PATIENT_TAGS.RATINGS, 'Get ratings submitted by a patient', true, [p('patientId')]);
s('/ratings/{id}', 'delete', PATIENT_TAGS.RATINGS, 'Delete a rating', true, [p('id')]);
// NOTIFICATIONS
s('/notifications', 'post', [PATIENT_TAGS.NOTIFICATIONS, DOCTOR_TAGS.NOTIFICATIONS, PHARMACIST_TAGS.NOTIFICATIONS], 'Create a notification', true, [], { schemaRef: 'CreateNotificationRequest' });
s('/notifications/user/{userId}', 'get', [PATIENT_TAGS.NOTIFICATIONS, DOCTOR_TAGS.NOTIFICATIONS, PHARMACIST_TAGS.NOTIFICATIONS], 'Get all notifications for a user', true, [p('userId')]);
s('/notifications/user/{userId}/read-all', 'patch', [PATIENT_TAGS.NOTIFICATIONS, DOCTOR_TAGS.NOTIFICATIONS, PHARMACIST_TAGS.NOTIFICATIONS], 'Mark all notifications as read', true, [p('userId')]);
s('/notifications/{id}/read', 'patch', [PATIENT_TAGS.NOTIFICATIONS, DOCTOR_TAGS.NOTIFICATIONS, PHARMACIST_TAGS.NOTIFICATIONS], 'Mark a single notification as read', true, [p('id')]);
s('/notifications/{id}', 'delete', [PATIENT_TAGS.NOTIFICATIONS, DOCTOR_TAGS.NOTIFICATIONS, PHARMACIST_TAGS.NOTIFICATIONS], 'Delete a notification', true, [p('id')]);
s('/notifications/appointment-reminders', 'post', ADMIN_TAG, 'Trigger appointment reminder notifications');
// DRUG INTERACTIONS
s('/drug-interactions/check', 'post', DOCTOR_TAGS.DRUG_SAFETY, 'Check drug safety before prescribing', true, [], { schemaRef: 'DrugSafetyCheckRequest' });
s('/drug-interactions/prescription/{prescriptionId}', 'get', [PATIENT_TAGS.DRUG_SAFETY, DOCTOR_TAGS.DRUG_SAFETY], 'Get interaction alerts for a prescription', false, [p('prescriptionId')]);
s('/drug-interactions/patient/{patientId}', 'get', PATIENT_TAGS.DRUG_SAFETY, 'Get interaction alerts for a patient', false, [p('patientId')]);
s('/drug-interactions/{id}/acknowledge-doctor', 'patch', DOCTOR_TAGS.DRUG_SAFETY, 'Doctor acknowledges an interaction alert', false, [p('id')]);
s('/drug-interactions/{id}/acknowledge-patient', 'patch', PATIENT_TAGS.DRUG_SAFETY, 'Patient acknowledges an interaction alert', false, [p('id')]);
// ADVERSE DRUG REACTIONS
s('/adverse-drug-reactions', 'post', PATIENT_TAGS.DRUG_SAFETY, 'Report an adverse drug reaction', true, [], { schemaRef: 'CreateAdrRequest' });
s('/adverse-drug-reactions', 'get', ADMIN_TAG, 'Get all ADRs (Admin)');
s('/adverse-drug-reactions/statistics/summary', 'get', ADMIN_TAG, 'Get ADR statistics summary');
s('/adverse-drug-reactions/patient/{patientId}', 'get', PATIENT_TAGS.DRUG_SAFETY, 'Get all ADRs for a patient', false, [p('patientId')]);
s('/adverse-drug-reactions/drug/{drugType}/{drugId}', 'get', [PATIENT_TAGS.DRUG_SAFETY, DOCTOR_TAGS.DRUG_SAFETY], 'Get ADRs for a specific drug', false, [ps('drugType'), p('drugId')]);
s('/adverse-drug-reactions/{id}', 'get', PATIENT_TAGS.DRUG_SAFETY, 'Get ADR by ID', false, [p('id')]);
s('/adverse-drug-reactions/{id}', 'patch', PATIENT_TAGS.DRUG_SAFETY, 'Update ADR record', false, [p('id')], { schemaRef: 'UpdateAdrRequest' });
// MEDICINE SUGGESTIONS
s('/medicine-suggestions', 'get', [DOCTOR_TAGS.DRUG_SAFETY, ADMIN_TAG], 'List medicine suggestions (Doctor sees own, Admin sees all)', true, [q('status')]);
s('/medicine-suggestions', 'post', DOCTOR_TAGS.DRUG_SAFETY, 'Create a medicine suggestion (Doctor only)', true, [], { schemaRef: 'CreateMedicineSuggestionRequest' });
s('/medicine-suggestions/{id}', 'get', [DOCTOR_TAGS.DRUG_SAFETY, ADMIN_TAG], 'Get suggestion by ID', true, [p('id')]);
s('/medicine-suggestions/{id}', 'delete', DOCTOR_TAGS.DRUG_SAFETY, 'Delete a suggestion', true, [p('id')]);
s('/medicine-suggestions/{id}/review', 'patch', ADMIN_TAG, 'Review / approve suggestion (Admin)', true, [p('id')], { schemaRef: 'ReviewMedicineSuggestionRequest' });
// ACTIVE SUBSTANCES
s('/active-substances', 'post', ADMIN_TAG, 'Create an active substance (Admin/Company)', true, [], { schemaRef: 'CreateActiveSubstanceRequest' });
s('/active-substances/search', 'get', [PATIENT_TAGS.MEDICATIONS, PHARMACIST_TAGS.MEDICATIONS_SEARCH], 'Search active substances', true, [q('q')]);
s('/active-substances/{id}', 'get', [PATIENT_TAGS.MEDICATIONS, PHARMACIST_TAGS.MEDICATIONS_SEARCH], 'Get active substance by ID', true, [p('id')]);
s('/active-substances/{id}', 'put', ADMIN_TAG, 'Update active substance (Admin/Company)', true, [p('id')], { schemaRef: 'UpdateActiveSubstanceRequest' });
s('/active-substances/{id}', 'delete', ADMIN_TAG, 'Delete active substance (Admin)', true, [p('id')]);
s('/active-substances/{id}/interactions', 'get', [PATIENT_TAGS.DRUG_SAFETY, DOCTOR_TAGS.DRUG_SAFETY], 'Get all drug interactions for substance', true, [p('id')]);
// TRADE NAMES
s('/trade-names', 'get', [PATIENT_TAGS.MEDICATIONS, PHARMACIST_TAGS.MEDICATIONS_SEARCH], 'List all trade names');
s('/trade-names', 'post', ADMIN_TAG, 'Create a trade name (Admin/Company)', true, [], { schemaRef: 'CreateTradeNameRequest' });
s('/trade-names/search', 'get', [PATIENT_TAGS.MEDICATIONS, PHARMACIST_TAGS.MEDICATIONS_SEARCH], 'Search trade names', true, [q('q')]);
s('/trade-names/{id}', 'get', [PATIENT_TAGS.MEDICATIONS, PHARMACIST_TAGS.MEDICATIONS_SEARCH], 'Get trade name by ID', true, [p('id')]);
s('/trade-names/{id}', 'put', ADMIN_TAG, 'Update trade name (Admin/Company)', true, [p('id')], { schemaRef: 'UpdateTradeNameRequest' });
s('/trade-names/{id}', 'delete', ADMIN_TAG, 'Delete trade name (Admin)', true, [p('id')]);
// DISEASES (catalog – Admin adds; Patient picks on Current diseases screen)
s('/diseases', 'get', [PATIENT_TAGS.CURRENT_DISEASES, ADMIN_TAG], 'List all diseases');
s('/diseases', 'post', ADMIN_TAG, 'Create a disease (Admin)', true, [], { schemaRef: 'CreateDiseaseRequest' });
s('/diseases/{id}', 'get', [PATIENT_TAGS.CURRENT_DISEASES, ADMIN_TAG], 'Get disease by ID', true, [p('id')]);
s('/diseases/{id}', 'put', ADMIN_TAG, 'Update disease (Admin)', true, [p('id')], { schemaRef: 'UpdateDiseaseRequest' });
s('/diseases/{id}', 'delete', ADMIN_TAG, 'Delete disease (Admin)', true, [p('id')]);
s('/diseases/warnings', 'post', ADMIN_TAG, 'Create a disease warning rule (Admin)', true, [], { schemaRef: 'CreateDiseaseWarningRequest' });
s('/diseases/{diseaseId}/warnings', 'get', [PATIENT_TAGS.CURRENT_DISEASES, ADMIN_TAG], 'Get all warnings for a disease', true, [p('diseaseId')]);
// DISEASE WARNING RULES
s('/disease-warning-rules', 'get', ADMIN_TAG, 'Get all warning rules (Admin)');
s('/disease-warning-rules', 'post', ADMIN_TAG, 'Create a warning rule (Admin)', true, [], { schemaRef: 'CreateDiseaseWarningRuleRequest' });
s('/disease-warning-rules/disease/{diseaseId}', 'get', ADMIN_TAG, 'Get all rules for a disease', true, [p('diseaseId')]);
s('/disease-warning-rules/{id}', 'get', ADMIN_TAG, 'Get warning rule by ID', true, [p('id')]);
s('/disease-warning-rules/{id}', 'patch', ADMIN_TAG, 'Update a warning rule (Admin)', true, [p('id')], { schemaRef: 'UpdateDiseaseWarningRuleRequest' });
s('/disease-warning-rules/{id}', 'delete', ADMIN_TAG, 'Delete a warning rule (Admin)', true, [p('id')]);
// COMPANIES
s('/companies', 'get', ADMIN_TAG, 'List all companies');
s('/companies', 'post', ADMIN_TAG, 'Create a company (Admin)', true, [], { schemaRef: 'CreateCompanyRequest' });
s('/companies/{id}', 'get', ADMIN_TAG, 'Get company by ID', true, [p('id')]);
s('/companies/{id}', 'put', ADMIN_TAG, 'Update company (Admin/Company)', true, [p('id')], { schemaRef: 'UpdateCompanyRequest' });
s('/companies/{id}', 'delete', ADMIN_TAG, 'Delete company (Admin)', true, [p('id')]);
// PRICING PLANS
s('/pricing-plans', 'get', [PATIENT_TAGS.SUBSCRIPTION_PAYMENTS, ADMIN_TAG], 'List all pricing plans', false);
s('/pricing-plans/default', 'get', [PATIENT_TAGS.SUBSCRIPTION_PAYMENTS, ADMIN_TAG], 'Get the default pricing plan', false);
s('/pricing-plans', 'post', ADMIN_TAG, 'Create a pricing plan (Admin)', true, [], { schemaRef: 'CreatePricingPlanRequest' });
s('/pricing-plans/{id}', 'get', [PATIENT_TAGS.SUBSCRIPTION_PAYMENTS, ADMIN_TAG], 'Get pricing plan by ID', false, [p('id')]);
s('/pricing-plans/{id}', 'put', ADMIN_TAG, 'Update pricing plan (Admin)', true, [p('id')], { schemaRef: 'UpdatePricingPlanRequest' });
s('/pricing-plans/{id}', 'delete', ADMIN_TAG, 'Delete pricing plan (Admin)', true, [p('id')]);
// SUBSCRIPTIONS
s('/subscriptions', 'post', PATIENT_TAGS.SUBSCRIPTION_PAYMENTS, 'Create a subscription', true, [], { schemaRef: 'CreateSubscriptionRequest' });
s('/subscriptions', 'get', ADMIN_TAG, 'List all subscriptions (Admin)');
s('/subscriptions/user/{userId}', 'get', PATIENT_TAGS.SUBSCRIPTION_PAYMENTS, 'Get subscription for a user', true, [p('userId')]);
s('/subscriptions/{userId}', 'put', PATIENT_TAGS.SUBSCRIPTION_PAYMENTS, 'Update a subscription', true, [p('userId')], { schemaRef: 'UpdateSubscriptionRequest' });
s('/subscriptions/{userId}/cancel', 'post', PATIENT_TAGS.SUBSCRIPTION_PAYMENTS, 'Cancel a subscription', true, [p('userId')]);
s('/subscriptions/{userId}/renew', 'post', PATIENT_TAGS.SUBSCRIPTION_PAYMENTS, 'Renew a subscription', true, [p('userId')]);
// PAYMENTS
s('/payments', 'post', PATIENT_TAGS.SUBSCRIPTION_PAYMENTS, 'Create a payment record', true, [], { schemaRef: 'CreatePaymentRequest' });
s('/payments', 'get', ADMIN_TAG, 'List all payments (Admin)');
s('/payments/subscription/{subscriptionId}', 'get', PATIENT_TAGS.SUBSCRIPTION_PAYMENTS, 'Get payments for a subscription', true, [p('subscriptionId')]);
s('/payments/{id}', 'get', PATIENT_TAGS.SUBSCRIPTION_PAYMENTS, 'Get payment by ID', true, [p('id')]);
s('/payments/{id}/status', 'put', ADMIN_TAG, 'Update payment status (Admin)', true, [p('id')], { schemaRef: 'UpdatePaymentStatusRequest' });
s('/payments/{id}/process', 'post', PATIENT_TAGS.SUBSCRIPTION_PAYMENTS, 'Process a payment', true, [p('id')]);
s('/payments/{id}/refund', 'post', ADMIN_TAG, 'Refund a payment (Admin)', true, [p('id')]);
// ADMIN
s('/admin/permissions', 'get', ADMIN_TAG, 'List all permissions');
s('/admin/permissions', 'post', ADMIN_TAG, 'Create a permission', true, [], { schemaRef: 'CreatePermissionRequest' });
s('/admin/permissions/{id}', 'delete', ADMIN_TAG, 'Delete a permission', true, [p('id')]);
s('/admin/roles/{role}/permissions', 'get', ADMIN_TAG, 'Get permissions for a role', true, [ps('role')]);
s('/admin/roles/{role}/permissions', 'post', ADMIN_TAG, 'Add permission to a role', true, [ps('role')], { schemaRef: 'AddPermissionToRoleRequest' });
s('/admin/roles/{role}/permissions/{permissionId}', 'delete', ADMIN_TAG, 'Remove permission from a role', true, [ps('role'), p('permissionId')]);
s('/admin/doctors/pending', 'get', ADMIN_TAG, 'List doctors pending verification');
s('/admin/doctors/{id}/verify', 'patch', ADMIN_TAG, 'Verify a doctor', true, [p('id')]);
s('/admin/doctors/{id}/reject', 'patch', ADMIN_TAG, 'Reject a doctor', true, [p('id')], { schemaRef: 'RejectDoctorRequest' });
s('/admin/pharmacists/pending', 'get', ADMIN_TAG, 'List pharmacists pending verification');
s('/admin/pharmacists/{id}/verify', 'patch', ADMIN_TAG, 'Verify a pharmacist', true, [p('id')]);
s('/admin/pharmacists/{id}/reject', 'patch', ADMIN_TAG, 'Reject a pharmacist', true, [p('id')], { schemaRef: 'RejectPharmacistRequest' });
s('/admin/statistics', 'get', ADMIN_TAG, 'Get platform statistics');
s('/admin/audit-logs', 'get', ADMIN_TAG, 'Get audit logs');
// SETTINGS
s('/settings/logo', 'get', ADMIN_TAG, 'Get application logo (public)', false);
s('/settings/logo', 'post', ADMIN_TAG, 'Upload / update application logo (Admin)');
// IMPORT
s('/import/active-substances', 'post', ADMIN_TAG, 'Import active substances from Excel/CSV file');
s('/import/{entityType}', 'post', ADMIN_TAG, 'Generic entity import', true, [ps('entityType')]);
s('/import/history', 'get', ADMIN_TAG, 'Get import history');
// EXPORT
s('/export/active-substances', 'get', ADMIN_TAG, 'Export active substances to Excel');
s('/export/trade-names', 'get', ADMIN_TAG, 'Export trade names to Excel');
s('/export/diseases', 'get', ADMIN_TAG, 'Export diseases to Excel');
s('/export/companies', 'get', ADMIN_TAG, 'Export companies to Excel');
s('/export/history', 'get', ADMIN_TAG, 'Get export history');
// ═══════════════════════════════════════════════════════
// OpenAPI definition
// ═══════════════════════════════════════════════════════
const options = {
    definition: {
        openapi: '3.0.3',
        info: {
            title: 'Green RX Backend API',
            version: '1.0.0',
            description: 'Full API documentation for the Green RX platform.'
        },
        servers: [
            { url: 'https://green-back.developteam.site/api', description: 'Production server' },
            { url: apiBase, description: 'Local development server' }
        ],
        tags: [
            { name: ADMIN_TAG, description: 'Health, users, admin, settings, import/export' },
            { name: PATIENT_TAGS.AUTH, description: 'Authentication (Patient)' },
            { name: PATIENT_TAGS.PROFILE, description: 'Personal info and profile' },
            { name: PATIENT_TAGS.ALLERGIES, description: 'Allergies' },
            { name: PATIENT_TAGS.SURGERIES, description: 'Previous surgeries' },
            { name: PATIENT_TAGS.FAMILY_HISTORY, description: 'Family health history' },
            { name: PATIENT_TAGS.CURRENT_DISEASES, description: 'Current diseases' },
            { name: PATIENT_TAGS.LIFESTYLE, description: 'Lifestyle' },
            { name: PATIENT_TAGS.MEDICATIONS, description: 'My medications' },
            { name: PATIENT_TAGS.SHARE_WITH_DOCTOR, description: 'Share profile with doctor' },
            { name: PATIENT_TAGS.PRESCRIPTIONS, description: 'Prescriptions' },
            { name: PATIENT_TAGS.CONSULTATIONS_VISITS, description: 'Consultations and visits' },
            { name: PATIENT_TAGS.SHARE_LINKS, description: 'Share links' },
            { name: PATIENT_TAGS.DRUG_SAFETY, description: 'Drug interactions and ADR' },
            { name: PATIENT_TAGS.RATINGS, description: 'Ratings' },
            { name: PATIENT_TAGS.NOTIFICATIONS, description: 'Notifications' },
            { name: PATIENT_TAGS.SUBSCRIPTION_PAYMENTS, description: 'Subscription and payments' },
            { name: DOCTOR_TAGS.AUTH, description: 'Authentication (Doctor)' },
            { name: DOCTOR_TAGS.MY_PATIENTS, description: 'My patients' },
            { name: DOCTOR_TAGS.PRESCRIPTIONS, description: 'Prescriptions' },
            { name: DOCTOR_TAGS.CONSULTATIONS_VISITS, description: 'Consultations and visits' },
            { name: DOCTOR_TAGS.MEDICAL_REPORTS, description: 'Medical reports' },
            { name: DOCTOR_TAGS.DRUG_SAFETY, description: 'Drug interactions and medicine suggestions' },
            { name: DOCTOR_TAGS.RATINGS, description: 'Ratings' },
            { name: DOCTOR_TAGS.NOTIFICATIONS, description: 'Notifications' },
            { name: PHARMACIST_TAGS.AUTH, description: 'Authentication (Pharmacist)' },
            { name: PHARMACIST_TAGS.PROFILE, description: 'Profile' },
            { name: PHARMACIST_TAGS.MEDICATIONS_SEARCH, description: 'Search medicines and prescriptions' },
            { name: PHARMACIST_TAGS.NOTIFICATIONS, description: 'Notifications' },
            { name: PHARMACIST_TAGS.RATINGS, description: 'Ratings' },
        ],
        components: {
            securitySchemes: {
                bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }
            },
            schemas: {
                // ── Auth request bodies
                RegisterRequest: {
                    type: 'object',
                    required: ['email', 'password'],
                    properties: {
                        email: { type: 'string', format: 'email', example: 'user@example.com' },
                        password: { type: 'string', minLength: 6, example: 'secret123' },
                        role: { type: 'string', enum: ['Patient', 'Doctor', 'Pharmacist', 'Admin', 'SuperAdmin'], default: 'Patient' },
                        name: { type: 'string', minLength: 2, example: 'John Doe' },
                        phone: { type: 'string', example: '+201145441141', description: 'Optional e.g. E.164' }
                    }
                },
                LoginRequest: {
                    type: 'object',
                    required: ['email', 'password'],
                    properties: {
                        email: { type: 'string', format: 'email', example: 'user@example.com' },
                        password: { type: 'string', example: 'secret123' }
                    }
                },
                RefreshTokenRequest: {
                    type: 'object',
                    required: ['refreshToken'],
                    properties: {
                        refreshToken: { type: 'string', example: 'eyJhbGci...' }
                    }
                },
                CreatePatientRequest: {
                    description: 'Step 1 "Enter Your Personal Information": send userId (from auth), name, age, ageClassification, gender. Optional: dateOfBirth, height, weight (BMI computed from height/weight in GET patient), bloodType, smoking, pregnancy/lactation fields.',
                    type: 'object',
                    required: ['userId', 'name', 'age', 'ageClassification', 'gender'],
                    properties: {
                        userId: { type: 'integer', description: 'From GET /auth/me or register response' },
                        name: { type: 'string', example: 'Heba Yasser' },
                        age: { type: 'integer', minimum: 0, maximum: 150, description: 'Age in years' },
                        ageClassification: { type: 'string', enum: ['Neonates', 'Infants', 'Toddlers', 'Children', 'Adolescents', 'Adults', 'Elderly'] },
                        gender: { type: 'string', enum: ['Male', 'Female', 'Other'] },
                        dateOfBirth: { type: 'string', format: 'date-time', description: 'Date of birth (ISO 8601)' },
                        height: { type: 'number', description: 'Height in cm (used for BMI)' },
                        weight: { type: 'number', description: 'Weight in kg (used for BMI)' },
                        bloodType: { type: 'string', example: 'AB', description: 'e.g. A+, A-, B+, B-, AB+, AB-, O+, O-' },
                        smoking: { type: 'boolean', default: false },
                        pregnancyWarning: { type: 'boolean', default: false },
                        pregnancyStatus: { type: 'boolean' },
                        trimester: { type: 'integer', minimum: 1, maximum: 3 },
                        lactation: { type: 'boolean', default: false }
                    }
                },
                // ── User
                CreateUserRequest: { type: 'object', required: ['email', 'role'], properties: { email: { type: 'string', format: 'email' }, passwordHash: { type: 'string' }, role: { type: 'string', enum: ['Patient', 'Doctor', 'Pharmacist', 'Admin', 'SuperAdmin'] } } },
                UpdateUserRequest: { type: 'object', properties: { email: { type: 'string', format: 'email' }, isActive: { type: 'boolean' } } },
                // ── Patient profile & history
                MedicalHistoryRequest: { type: 'object', required: ['diseaseId', 'severity', 'status'], properties: { diseaseId: { type: 'integer' }, severity: { type: 'string', enum: ['None', 'Mild', 'Moderate', 'Severe'] }, diagnosisDate: { type: 'string', format: 'date-time' }, treatment: { type: 'string' }, status: { type: 'string', enum: ['Active', 'Resolved', 'Chronic', 'Unknown'] }, notes: { type: 'string' } } },
                FamilyHistoryRequest: { type: 'object', required: ['relation', 'diseaseId', 'severity'], properties: { relation: { type: 'string', example: 'Father' }, diseaseId: { type: 'integer' }, severity: { type: 'string', enum: ['None', 'Mild', 'Moderate', 'Severe'] }, notes: { type: 'string' } } },
                SurgicalHistoryRequest: { type: 'object', required: ['operationName', 'surgeryDate'], properties: { operationName: { type: 'string' }, surgeryDate: { type: 'string', format: 'date-time' } } },
                LifestyleRequest: { type: 'object', properties: { noGlasses: { type: 'boolean' }, alcoholAbuse: { type: 'boolean' }, excessCaffeine: { type: 'boolean' }, waterDaily: { type: 'number' }, travellerAbroad: { type: 'boolean' }, annualVaccination: { type: 'boolean' }, noiseExposure: { type: 'boolean' }, chemicalExposure: { type: 'boolean' }, radiationExposure: { type: 'boolean' }, physicalActivity: { type: 'string' }, dietaryHabits: { type: 'string' } } },
                ChildProfileRequest: { type: 'object', required: ['name', 'dateOfBirth', 'gender', 'ageClassification'], properties: { name: { type: 'string' }, dateOfBirth: { type: 'string', format: 'date-time' }, gender: { type: 'string', enum: ['Male', 'Female', 'Other'] }, ageClassification: { type: 'string', enum: ['Neonates', 'Infants', 'Toddlers', 'Children', 'Adolescents', 'Adults', 'Elderly'] }, weight: { type: 'number' }, height: { type: 'number' }, allergies: {}, diseases: {}, medicalHistory: {} } },
                // ── Doctor & Pharmacist
                CreateDoctorRequest: { type: 'object', required: ['userId', 'name', 'specialization', 'licenseNumber'], properties: { userId: { type: 'integer' }, name: { type: 'string' }, specialization: { type: 'string' }, licenseNumber: { type: 'string' }, phoneNumber: { type: 'string' }, clinicAddress: { type: 'string' }, yearsOfExperience: { type: 'integer' }, qualifications: { type: 'string' }, consultationFee: { type: 'number' } } },
                AssignPatientRequest: { type: 'object', required: ['patientId', 'relationshipType'], properties: { patientId: { type: 'integer' }, relationshipType: { type: 'string', enum: ['PrimaryCare', 'Specialist', 'Consultation', 'Other'] }, startDate: { type: 'string', format: 'date-time' }, endDate: { type: 'string', format: 'date-time' } } },
                CreatePharmacistRequest: { type: 'object', required: ['userId', 'name', 'licenseNumber'], properties: { userId: { type: 'integer' }, name: { type: 'string' }, licenseNumber: { type: 'string' }, phoneNumber: { type: 'string' }, pharmacyName: { type: 'string' }, pharmacyAddress: { type: 'string' } } },
                // ── Patient-Doctor
                CreatePatientDoctorRequest: { type: 'object', required: ['patientId', 'doctorId', 'relationshipType'], properties: { patientId: { type: 'integer' }, doctorId: { type: 'integer' }, relationshipType: { type: 'string', enum: ['PrimaryCare', 'Specialist', 'Consultation', 'Other'] } } },
                UpdatePatientDoctorRequest: { type: 'object', properties: { relationshipType: { type: 'string' }, isActive: { type: 'boolean' }, endDate: { type: 'string', format: 'date-time' } } },
                // ── Allergies
                AllergyRequest: { type: 'object', required: ['allergen'], properties: { allergen: { type: 'string' }, allergenType: { type: 'string', enum: ['Drug', 'Food', 'Pollen', 'Dust', 'Pet', 'Fragrance', 'Other'] }, reaction: { type: 'string' }, severity: { type: 'string', enum: ['Mild', 'Moderate', 'Severe', 'LifeThreatening'] }, notes: { type: 'string' } } },
                BatchAllergyRequest: { type: 'array', items: { $ref: '#/components/schemas/AllergyRequest' } },
                UpdateAllergyRequest: { type: 'object', properties: { allergen: { type: 'string' }, severity: { type: 'string' }, reactionType: { type: 'string' }, notes: { type: 'string' } } },
                // ── Patient diseases
                AddPatientDiseaseRequest: { type: 'object', required: ['diseaseId', 'severity', 'status'], properties: { diseaseId: { type: 'integer' }, diagnosisDate: { type: 'string', format: 'date-time' }, severity: { type: 'string', enum: ['None', 'Mild', 'Moderate', 'Severe'] }, status: { type: 'string', enum: ['Active', 'Resolved', 'Chronic'] }, notes: { type: 'string' } } },
                UpdatePatientDiseaseRequest: { type: 'object', properties: { status: { type: 'string' }, severity: { type: 'string' }, notes: { type: 'string' } } },
                // ── Patient medicines
                AddPatientMedicineRequest: { type: 'object', required: ['medicineName'], properties: { medicineName: { type: 'string' }, tradeNameId: { type: 'integer' }, dosage: { type: 'string' }, frequency: { type: 'string' }, startDate: { type: 'string', format: 'date-time' }, endDate: { type: 'string', format: 'date-time' }, isOngoing: { type: 'boolean' }, notes: { type: 'string' } } },
                UpdatePatientMedicineRequest: { type: 'object', properties: { medicineName: { type: 'string' }, dosage: { type: 'string' }, frequency: { type: 'string' }, startDate: { type: 'string' }, endDate: { type: 'string' }, isOngoing: { type: 'boolean' }, notes: { type: 'string' } } },
                // ── Prescriptions
                CreatePrescriptionRequest: { type: 'object', required: ['doctorId', 'patientId', 'tradeNameId'], properties: { doctorId: { type: 'integer' }, patientId: { type: 'integer' }, tradeNameId: { type: 'integer' }, dosage: { type: 'string' }, frequency: { type: 'string' }, duration: { type: 'string' }, instructions: { type: 'string' }, validFrom: { type: 'string', format: 'date-time' }, validUntil: { type: 'string', format: 'date-time' }, maxRefills: { type: 'integer' }, notes: { type: 'string' } } },
                BatchPrescriptionsRequest: { type: 'object', required: ['doctorId', 'patientId', 'medicines'], properties: { doctorId: { type: 'integer' }, patientId: { type: 'integer' }, medicines: { type: 'array', items: { type: 'object', properties: { tradeNameId: { type: 'integer' }, dosage: { type: 'string' }, frequency: { type: 'string' }, duration: { type: 'string' }, instructions: { type: 'string' }, notes: { type: 'string' } } } }, validFrom: { type: 'string', format: 'date-time' }, validUntil: { type: 'string', format: 'date-time' }, maxRefills: { type: 'integer' } } },
                UpdatePrescriptionRequest: { type: 'object', properties: { status: { type: 'string' }, dosage: { type: 'string' }, frequency: { type: 'string' }, duration: { type: 'string' }, instructions: { type: 'string' }, notes: { type: 'string' }, changedBy: { type: 'string' } } },
                CreatePrescriptionVersionRequest: { type: 'object', properties: { changes: { type: 'string' } } },
                // ── Appointments
                CreateAppointmentRequest: { type: 'object', required: ['patientId', 'doctorId', 'appointmentDate'], properties: { patientId: { type: 'integer' }, doctorId: { type: 'integer' }, appointmentDate: { type: 'string', format: 'date-time' }, duration: { type: 'integer' }, notes: { type: 'string' } } },
                UpdateAppointmentRequest: { type: 'object', properties: { appointmentDate: { type: 'string', format: 'date-time' }, duration: { type: 'integer' }, status: { type: 'string' }, notes: { type: 'string' } } },
                // ── Consultations
                CreateConsultationRequest: { type: 'object', required: ['patientId', 'doctorId'], properties: { patientId: { type: 'integer' }, doctorId: { type: 'integer' }, consultationDate: { type: 'string', format: 'date-time' }, notes: { type: 'string' }, diagnosis: { type: 'string' }, followUpRequired: { type: 'boolean' }, followUpDate: { type: 'string', format: 'date-time' } } },
                UpdateConsultationRequest: { type: 'object', properties: { notes: { type: 'string' }, diagnosis: { type: 'string' }, followUpRequired: { type: 'boolean' }, followUpDate: { type: 'string', format: 'date-time' } } },
                // ── Visits
                CreateVisitRequest: { type: 'object', required: ['patientId', 'doctorId', 'visitDate'], properties: { patientId: { type: 'integer' }, doctorId: { type: 'integer' }, visitDate: { type: 'string', format: 'date-time' }, visitType: { type: 'string', enum: ['FirstVisit', 'FollowUp', 'Emergency', 'Consultation'] }, diagnosis: { type: 'string' }, treatmentPlan: { type: 'string' }, notes: { type: 'string' } } },
                UpdateVisitRequest: { type: 'object', properties: { visitDate: { type: 'string', format: 'date-time' }, visitType: { type: 'string' }, diagnosis: { type: 'string' }, treatmentPlan: { type: 'string' }, notes: { type: 'string' } } },
                // ── Medical reports
                CreateMedicalReportRequest: { type: 'object', required: ['patientId', 'fileName', 'fileUrl', 'fileType', 'uploadedBy'], properties: { patientId: { type: 'integer' }, fileName: { type: 'string' }, fileUrl: { type: 'string' }, fileType: { type: 'string' }, uploadedBy: { type: 'integer' }, reportType: { type: 'string', enum: ['LabTest', 'Imaging', 'Consultation', 'Procedure', 'Other'] }, reportDate: { type: 'string' }, notes: { type: 'string' }, fileSize: { type: 'number' } } },
                UpdateMedicalReportRequest: { type: 'object', properties: { notes: { type: 'string' }, reportType: { type: 'string' }, reportDate: { type: 'string' } } },
                // ── Share links
                GenerateShareLinkRequest: { type: 'object', properties: { expiresInDays: { type: 'integer', default: 7 } } },
                UpdateShareLinkRequest: { type: 'object', properties: { expiresAt: { type: 'string', format: 'date-time' } } },
                // ── Ratings
                CreateRatingRequest: { type: 'object', required: ['patientId', 'ratedType', 'rating'], properties: { patientId: { type: 'integer' }, ratedType: { type: 'string', enum: ['Doctor', 'Pharmacist'] }, doctorId: { type: 'integer' }, pharmacistId: { type: 'integer' }, rating: { type: 'integer', minimum: 1, maximum: 5 }, review: { type: 'string' } } },
                // ── Notifications
                CreateNotificationRequest: { type: 'object', required: ['userId', 'type', 'title', 'message'], properties: { userId: { type: 'integer' }, type: { type: 'string', enum: ['PrescriptionReady', 'DrugInteraction', 'AppointmentReminder', 'SystemAlert'] }, title: { type: 'string' }, message: { type: 'string' } } },
                // ── Drug safety
                DrugSafetyCheckRequest: { type: 'object', required: ['patientId', 'activeSubstanceId'], properties: { patientId: { type: 'integer' }, activeSubstanceId: { type: 'integer' }, tradeNameId: { type: 'integer' } } },
                // ── ADR
                CreateAdrRequest: { type: 'object', required: ['patientId', 'tradeNameId', 'companyId', 'severity', 'reaction', 'startDate'], properties: { patientId: { type: 'integer' }, tradeNameId: { type: 'integer' }, companyId: { type: 'integer' }, activeSubstanceId: { type: 'integer' }, severity: { type: 'string', enum: ['Mild', 'Moderate', 'Severe', 'LifeThreatening'] }, reaction: { type: 'string' }, startDate: { type: 'string', format: 'date-time' }, endDate: { type: 'string', format: 'date-time' }, isAnonymous: { type: 'boolean' } } },
                UpdateAdrRequest: { type: 'object', properties: { status: { type: 'string', enum: ['Pending', 'UnderReview', 'Confirmed', 'Rejected'] }, adminNotes: { type: 'string' } } },
                // ── Medicine suggestions
                CreateMedicineSuggestionRequest: { type: 'object', required: ['tradeName', 'activeSubstance'], properties: { tradeName: { type: 'string' }, activeSubstance: { type: 'string' }, concentration: { type: 'string' }, dosageForm: { type: 'string' }, manufacturer: { type: 'string' }, reason: { type: 'string' } } },
                ReviewMedicineSuggestionRequest: { type: 'object', properties: { status: { type: 'string' }, reviewNotes: { type: 'string' } } },
                // ── Active substances (minimal for doc; full schema is large)
                CreateActiveSubstanceRequest: { type: 'object', required: ['activeSubstance'], properties: { activeSubstance: { type: 'string' }, concentration: { type: 'string' }, classification: { type: 'string' }, dosageForm: { type: 'string' }, indication: { type: 'string' }, pregnancyWarning: { type: 'string' }, lactationWarning: { type: 'string' }, contraindications: {}, isActive: { type: 'boolean' } } },
                UpdateActiveSubstanceRequest: { type: 'object', properties: { activeSubstance: { type: 'string' }, concentration: { type: 'string' }, classification: { type: 'string' }, isActive: { type: 'boolean' } } },
                // ── Trade names
                CreateTradeNameRequest: { type: 'object', required: ['title', 'activeSubstanceId', 'companyId'], properties: { title: { type: 'string' }, activeSubstanceId: { type: 'integer' }, companyId: { type: 'integer' }, batchNumber: { type: 'string' }, barCode: { type: 'string' }, warningNotification: { type: 'string' }, availabilityStatus: { type: 'string', enum: ['InStock', 'OutOfStock', 'Discontinued', 'Pending'] }, stockQuantity: { type: 'integer' }, expiryDate: { type: 'string', format: 'date-time' } } },
                UpdateTradeNameRequest: { type: 'object', properties: { title: { type: 'string' }, activeSubstanceId: { type: 'integer' }, companyId: { type: 'integer' }, availabilityStatus: { type: 'string' }, stockQuantity: { type: 'integer' } } },
                // ── Diseases
                CreateDiseaseRequest: { type: 'object', required: ['name', 'severity'], properties: { name: { type: 'string' }, severity: { type: 'string', enum: ['None', 'Mild', 'Moderate', 'Severe'] }, description: { type: 'string' } } },
                UpdateDiseaseRequest: { type: 'object', properties: { name: { type: 'string' }, severity: { type: 'string' }, description: { type: 'string' } } },
                CreateDiseaseWarningRequest: { type: 'object', required: ['diseaseId', 'activeSubstanceId', 'warningFieldName', 'warningMessage', 'severity'], properties: { diseaseId: { type: 'integer' }, activeSubstanceId: { type: 'integer' }, warningFieldName: { type: 'string' }, warningMessage: { type: 'string' }, severity: { type: 'string', enum: ['Info', 'Low', 'Medium', 'High', 'Critical'] } } },
                // ── Disease warning rules
                CreateDiseaseWarningRuleRequest: { type: 'object', required: ['diseaseId'], properties: { diseaseId: { type: 'integer' }, ruleType: { type: 'string' }, targetActiveSubstanceId: { type: 'integer' }, targetDrugClass: { type: 'string' }, severity: { type: 'string' }, warningMessage: { type: 'string' }, autoBlock: { type: 'boolean' }, requiresOverride: { type: 'boolean' }, requiredMonitoring: { type: 'string' } } },
                UpdateDiseaseWarningRuleRequest: { type: 'object', properties: { ruleType: { type: 'string' }, targetActiveSubstanceId: { type: 'integer' }, targetDrugClass: { type: 'string' }, severity: { type: 'string' }, warningMessage: { type: 'string' }, autoBlock: { type: 'boolean' }, requiresOverride: { type: 'boolean' }, requiredMonitoring: { type: 'string' } } },
                // ── Companies
                CreateCompanyRequest: { type: 'object', required: ['name'], properties: { name: { type: 'string' }, address: { type: 'string' }, governorate: { type: 'string' }, country: { type: 'string' }, contactInfo: {}, phoneNumber: { type: 'string' }, email: { type: 'string', format: 'email' }, website: { type: 'string', format: 'uri' } } },
                UpdateCompanyRequest: { type: 'object', properties: { name: { type: 'string' }, address: { type: 'string' }, phoneNumber: { type: 'string' }, email: { type: 'string' } } },
                // ── Pricing plans
                CreatePricingPlanRequest: { type: 'object', required: ['title', 'price'], properties: { title: { type: 'string' }, price: { type: 'number' }, salePrice: { type: 'number' }, duration: { type: 'integer' }, features: { type: 'array', items: { type: 'string' } }, isDefault: { type: 'boolean' } } },
                UpdatePricingPlanRequest: { type: 'object', properties: { title: { type: 'string' }, price: { type: 'number' }, salePrice: { type: 'number' }, duration: { type: 'integer' }, features: { type: 'array', items: { type: 'string' } }, isDefault: { type: 'boolean' }, isActive: { type: 'boolean' } } },
                // ── Subscriptions & payments
                CreateSubscriptionRequest: { type: 'object', required: ['userId', 'pricingPlanId'], properties: { userId: { type: 'integer' }, pricingPlanId: { type: 'integer' }, autoRenew: { type: 'boolean' } } },
                UpdateSubscriptionRequest: { type: 'object', properties: { pricingPlanId: { type: 'integer' }, autoRenew: { type: 'boolean' }, status: { type: 'string' } } },
                CreatePaymentRequest: { type: 'object', required: ['subscriptionId', 'amount'], properties: { subscriptionId: { type: 'integer' }, amount: { type: 'number' }, currency: { type: 'string' }, paymentMethod: { type: 'string' }, transactionId: { type: 'string' } } },
                UpdatePaymentStatusRequest: { type: 'object', properties: { status: { type: 'string' }, transactionId: { type: 'string' } } },
                // ── Admin
                CreatePermissionRequest: { type: 'object', required: ['code', 'name'], properties: { code: { type: 'string' }, name: { type: 'string' }, description: { type: 'string' }, adminOnly: { type: 'boolean' } } },
                AddPermissionToRoleRequest: { type: 'object', required: ['permissionId'], properties: { permissionId: { type: 'integer' } } },
                RejectDoctorRequest: { type: 'object', properties: { reason: { type: 'string' } } },
                RejectPharmacistRequest: { type: 'object', properties: { reason: { type: 'string' } } },
                VerifyDoctorRequest: { type: 'object', properties: { notes: { type: 'string' } } },
                // ── Drug-safety schemas
                WarningSeverity: {
                    type: 'string',
                    enum: ['Info', 'Low', 'Medium', 'High', 'Critical']
                },
                WarningType: {
                    type: 'string',
                    enum: ['AllergyWarning', 'DiseaseContraindication', 'PregnancyWarning', 'LactationWarning',
                        'PediatricWarning', 'GeriatricWarning', 'RenalWarning', 'HepaticWarning',
                        'DrugInteraction', 'BatchDrugInteraction', 'FamilyHistoryRisk']
                },
                Warning: {
                    type: 'object',
                    properties: {
                        severity: { $ref: '#/components/schemas/WarningSeverity' },
                        type: { $ref: '#/components/schemas/WarningType' },
                        message: { type: 'string' },
                        blocked: { type: 'boolean' }
                    }
                },
                WarningResult: {
                    type: 'object',
                    properties: {
                        blocked: { type: 'boolean' },
                        warnings: { type: 'array', items: { $ref: '#/components/schemas/Warning' } }
                    }
                }
            }
        },
        paths
    },
    apis: [
        path_1.default.join(__dirname, '../routes/*.ts'),
        path_1.default.join(__dirname, '../controllers/*.ts')
    ]
};
const swaggerSpec = swaggerJSDoc(options);
exports.default = swaggerSpec;
//# sourceMappingURL=swagger.js.map