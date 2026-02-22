import path from 'path';

type SwaggerJSDoc = (options: unknown) => unknown;
const swaggerJSDoc = require('swagger-jsdoc') as SwaggerJSDoc;

const port = process.env.PORT || 3000;
const apiBase = process.env.API_BASE_URL || `http://localhost:${port}/api`;

type Method = 'get' | 'post' | 'put' | 'patch' | 'delete';

const bearerSecurity = [{ bearerAuth: [] }];
const paths: Record<string, any> = {};

/** Integer path param */
const p = (name: string, type: 'integer' | 'string' = 'integer') =>
  ({ name, in: 'path', required: true, schema: { type } });

/** String path param shorthand */
const ps = (name: string) => p(name, 'string');

/** Optional query param */
const q = (name: string, description?: string) =>
  ({ name, in: 'query', required: false, schema: { type: 'string' }, ...(description ? { description } : {}) });

const s = (
  pathKey: string,
  method: Method,
  tag: string,
  summary: string,
  secure = true,
  params: any[] = [],
  body?: { schemaRef: string; required?: boolean }
) => {
  paths[pathKey] = paths[pathKey] || {};
  paths[pathKey][method] = {
    tags: [tag],
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
// mount: none (root-level express routes)
// ═══════════════════════════════════════════════════
s('/health', 'get', 'System', 'Health check', false);

// ═══════════════════════════════════════════════════
// AUTH  →  /api/auth/*
// ═══════════════════════════════════════════════════
s('/auth/register', 'post', 'Auth', 'Register a new user', false, [], { schemaRef: 'RegisterRequest' });
s('/auth/login', 'post', 'Auth', 'Login and receive tokens', false, [], { schemaRef: 'LoginRequest' });
s('/auth/refresh', 'post', 'Auth', 'Refresh access token', false, [], { schemaRef: 'RefreshTokenRequest' });
s('/auth/logout', 'post', 'Auth', 'Logout (invalidate token)');
s('/auth/me', 'get', 'Auth', 'Get current authenticated user');
s('/auth/dev-reset-superadmin-password', 'post', 'Auth', '[Dev] Reset superadmin password', false);

// ═══════════════════════════════════════════════════
// USERS  →  /api/users/*
// ═══════════════════════════════════════════════════
s('/users', 'get', 'Users', 'Get all users');
s('/users', 'post', 'Users', 'Create a user');
s('/users/{id}', 'get', 'Users', 'Get user by ID', true, [p('id')]);
s('/users/{id}', 'put', 'Users', 'Update user by ID', true, [p('id')]);
s('/users/{id}', 'delete', 'Users', 'Delete user by ID', true, [p('id')]);

// ═══════════════════════════════════════════════════
// PATIENTS — Profile  →  /api/patients/*
// ═══════════════════════════════════════════════════
s('/patients', 'get', 'Patients', 'Get all patients (Admin/SuperAdmin only)');
s('/patients', 'post', 'Patients', 'Create or update patient profile');
s('/patients/{id}', 'get', 'Patients', 'Get patient by ID', true, [p('id')]);
s('/patients/user/{userId}', 'get', 'Patients', 'Get patient by user ID', true, [p('userId')]);

// ═══════════════════════════════════════════════════
// PATIENTS — Medical History  →  /api/patients/:patientId/medical-history
// ═══════════════════════════════════════════════════
s('/patients/{patientId}/medical-history', 'get', 'Patient Medical History', 'Get medical history entries', true, [p('patientId')]);
s('/patients/{patientId}/medical-history', 'post', 'Patient Medical History', 'Add a medical history entry', true, [p('patientId')]);

// ═══════════════════════════════════════════════════
// PATIENTS — Family History  →  /api/patients/:patientId/family-history
// ═══════════════════════════════════════════════════
s('/patients/{patientId}/family-history', 'post', 'Patient Family History', 'Add a family history entry', true, [p('patientId')]);

// ═══════════════════════════════════════════════════
// PATIENTS — Lifestyle  →  /api/patients/:patientId/lifestyle
// ═══════════════════════════════════════════════════
s('/patients/{patientId}/lifestyle', 'put', 'Patient Lifestyle', 'Update patient lifestyle data', true, [p('patientId')]);

// ═══════════════════════════════════════════════════
// PATIENTS — Children  →  /api/patients/:patientId/children
// ═══════════════════════════════════════════════════
s('/patients/{patientId}/children', 'get', 'Patient Children', 'Get child profiles for patient', true, [p('patientId')]);
s('/patients/{patientId}/children', 'post', 'Patient Children', 'Add a child profile', true, [p('patientId')]);
s('/patients/children/{childId}', 'delete', 'Patient Children', 'Delete a child profile', true, [p('childId')]);

// ═══════════════════════════════════════════════════
// DOCTORS  →  /api/doctors/*
// ═══════════════════════════════════════════════════
s('/doctors', 'post', 'Doctors', 'Create or update doctor profile');
s('/doctors/search', 'get', 'Doctors', 'Search / list all doctors', true, [q('q', 'Search query')]);
s('/doctors/{id}', 'get', 'Doctors', 'Get doctor by ID', true, [p('id')]);
s('/doctors/user/{userId}', 'get', 'Doctors', 'Get doctor by user ID', true, [p('userId')]);
s('/doctors/{id}/verify', 'put', 'Doctors', 'Verify a doctor (Admin)', true, [p('id')]);

// Doctor ↔ Patient assignment (lives inside /doctors router)
s('/doctors/{doctorId}/patients', 'get', 'Doctors', 'Get patients assigned to doctor', true, [p('doctorId')]);
s('/doctors/{doctorId}/patients', 'post', 'Doctors', 'Assign a patient to doctor', true, [p('doctorId')]);
s('/doctors/{doctorId}/patients/{patientId}', 'delete', 'Doctors', 'Remove patient from doctor', true, [p('doctorId'), p('patientId')]);

// ═══════════════════════════════════════════════════
// PHARMACISTS  →  /api/pharmacists/*
// ═══════════════════════════════════════════════════
s('/pharmacists', 'post', 'Pharmacists', 'Create or update pharmacist profile');
s('/pharmacists/search', 'get', 'Pharmacists', 'List / search all pharmacists');
s('/pharmacists/{id}', 'get', 'Pharmacists', 'Get pharmacist by ID', true, [p('id')]);
s('/pharmacists/user/{userId}', 'get', 'Pharmacists', 'Get pharmacist by user ID', true, [p('userId')]);

// ═══════════════════════════════════════════════════
// PATIENT-DOCTOR RELATIONSHIPS  →  /api/patient-doctors/*
// ═══════════════════════════════════════════════════
s('/patient-doctors', 'post', 'Patient-Doctor Relationships', 'Create a patient-doctor relationship');
s('/patient-doctors/patient/{patientId}', 'get', 'Patient-Doctor Relationships', 'Get relationships for a patient', true, [p('patientId')]);
s('/patient-doctors/doctor/{doctorId}', 'get', 'Patient-Doctor Relationships', 'Get relationships for a doctor', true, [p('doctorId')]);
s('/patient-doctors/{id}', 'get', 'Patient-Doctor Relationships', 'Get relationship by ID', true, [p('id')]);
s('/patient-doctors/{id}', 'put', 'Patient-Doctor Relationships', 'Update relationship', true, [p('id')]);
s('/patient-doctors/{id}/end', 'post', 'Patient-Doctor Relationships', 'End a patient-doctor relationship', true, [p('id')]);

// ═══════════════════════════════════════════════════
// ALLERGIES  →  /api/allergies/*
// Note: /api/patients/:id/allergies are separate patient-scoped shortcuts
// ═══════════════════════════════════════════════════
s('/allergies', 'post', 'Allergies', 'Create an allergy record');
s('/allergies/patient/{patientId}', 'get', 'Allergies', 'Get all allergies for a patient', true, [p('patientId')]);
s('/allergies/patient/{patientId}/critical', 'get', 'Allergies', 'Get critical allergies for a patient', true, [p('patientId')]);
s('/allergies/{id}', 'get', 'Allergies', 'Get allergy by ID', true, [p('id')]);
s('/allergies/{id}', 'put', 'Allergies', 'Update allergy', true, [p('id')]);
s('/allergies/{id}', 'delete', 'Allergies', 'Delete allergy', true, [p('id')]);
s('/allergies/check/{patientId}/{medicineId}', 'get', 'Allergies', 'Check if medicine conflicts with patient allergies', true, [p('patientId'), p('medicineId')]);

// Patient-scoped allergy shortcuts (mounted under /patients router)
s('/patients/{patientId}/allergies', 'post', 'Allergies', 'Add allergy to patient profile (patient-scoped)', true, [p('patientId')]);
s('/patients/allergies/{allergyId}', 'delete', 'Allergies', 'Remove allergy from patient profile (patient-scoped)', true, [p('allergyId')]);

// ═══════════════════════════════════════════════════
// PATIENT DISEASES  →  /api/patient-diseases/*
// ═══════════════════════════════════════════════════
s('/patient-diseases/patient/{patientId}', 'get', 'Patient Diseases', 'Get diseases for a patient', true, [p('patientId')]);
s('/patient-diseases/patient/{patientId}', 'post', 'Patient Diseases', 'Add a disease to patient', true, [p('patientId')]);
s('/patient-diseases/patient/{patientId}/active', 'get', 'Patient Diseases', 'Get only active diseases for a patient', true, [p('patientId')]);
s('/patient-diseases/{id}', 'patch', 'Patient Diseases', 'Update patient disease status', true, [p('id')]);
s('/patient-diseases/{id}', 'delete', 'Patient Diseases', 'Remove patient disease', true, [p('id')]);

// ═══════════════════════════════════════════════════
// PRESCRIPTIONS  →  /api/prescriptions/*
// ═══════════════════════════════════════════════════
s('/prescriptions', 'get', 'Prescriptions', 'List prescriptions (filtered by role)');
s('/prescriptions', 'post', 'Prescriptions', 'Create a prescription (runs drug-safety check)');
s('/prescriptions/batch', 'post', 'Prescriptions', 'Batch-create prescriptions');
s('/prescriptions/{id}', 'get', 'Prescriptions', 'Get prescription by ID', true, [p('id')]);
s('/prescriptions/{id}', 'put', 'Prescriptions', 'Update a prescription', true, [p('id')]);
s('/prescriptions/{id}', 'delete', 'Prescriptions', 'Delete a prescription', true, [p('id')]);
s('/prescriptions/{prescriptionId}/interactions', 'get', 'Prescriptions', 'Get drug interaction alerts for prescription', true, [p('prescriptionId')]);
s('/prescriptions/interactions/{alertId}/acknowledge', 'put', 'Prescriptions', 'Acknowledge a drug interaction alert', true, [p('alertId')]);

// ═══════════════════════════════════════════════════
// PRESCRIPTION VERSIONS  →  /api/prescription-versions/*
// ═══════════════════════════════════════════════════
s('/prescription-versions/prescription/{prescriptionId}', 'get', 'Prescription Versions', 'Get all versions of a prescription', true, [p('prescriptionId')]);
s('/prescription-versions/prescription/{prescriptionId}', 'post', 'Prescription Versions', 'Create a new prescription version', true, [p('prescriptionId')]);
s('/prescription-versions/prescription/{prescriptionId}/compare', 'get', 'Prescription Versions', 'Compare two prescription versions', true, [p('prescriptionId')]);
s('/prescription-versions/{id}', 'get', 'Prescription Versions', 'Get a specific prescription version', true, [p('id')]);

// ═══════════════════════════════════════════════════
// APPOINTMENTS  →  /api/appointments/*
// ═══════════════════════════════════════════════════
s('/appointments', 'post', 'Appointments', 'Create an appointment');
s('/appointments/{id}', 'get', 'Appointments', 'Get appointment by ID', true, [p('id')]);
s('/appointments/{id}', 'put', 'Appointments', 'Update an appointment', true, [p('id')]);
s('/appointments/{id}/cancel', 'post', 'Appointments', 'Cancel an appointment', true, [p('id')]);
s('/appointments/{id}/confirm', 'post', 'Appointments', 'Confirm an appointment (doctor)', true, [p('id')]);
s('/appointments/{id}/complete', 'post', 'Appointments', 'Mark appointment as completed (doctor)', true, [p('id')]);
s('/appointments/patient/{patientId}', 'get', 'Appointments', 'Get all appointments for a patient', true, [p('patientId')]);
s('/appointments/doctor/{doctorId}', 'get', 'Appointments', 'Get all appointments for a doctor', true, [p('doctorId')]);
s('/appointments/doctor/{doctorId}/today', 'get', 'Appointments', "Get today's appointments for a doctor", true, [p('doctorId')]);

// ═══════════════════════════════════════════════════
// CONSULTATIONS  →  /api/consultations/*
// ═══════════════════════════════════════════════════
s('/consultations', 'post', 'Consultations', 'Create a consultation');
s('/consultations/{id}', 'get', 'Consultations', 'Get consultation by ID', true, [p('id')]);
s('/consultations/{id}', 'put', 'Consultations', 'Update a consultation', true, [p('id')]);
s('/consultations/{id}', 'delete', 'Consultations', 'Delete a consultation', true, [p('id')]);
s('/consultations/patient/{patientId}', 'get', 'Consultations', 'Get consultations for a patient', true, [p('patientId')]);
s('/consultations/doctor/{doctorId}', 'get', 'Consultations', 'Get consultations for a doctor', true, [p('doctorId')]);
s('/consultations/doctor/{doctorId}/followups', 'get', 'Consultations', 'Get upcoming follow-ups for a doctor', true, [p('doctorId')]);

// ═══════════════════════════════════════════════════
// VISITS  →  /api/visits/*
// ═══════════════════════════════════════════════════
s('/visits', 'post', 'Visits', 'Create a visit record');
s('/visits/{id}', 'get', 'Visits', 'Get visit by ID', true, [p('id')]);
s('/visits/{id}', 'patch', 'Visits', 'Update a visit', true, [p('id')]);
s('/visits/{id}', 'delete', 'Visits', 'Delete a visit', true, [p('id')]);
s('/visits/patient/{patientId}', 'get', 'Visits', 'Get all visits for a patient', true, [p('patientId')]);
s('/visits/doctor/{doctorId}', 'get', 'Visits', 'Get all visits for a doctor', true, [p('doctorId')]);

// ═══════════════════════════════════════════════════
// MEDICAL REPORTS  →  /api/medical-reports/*
// ═══════════════════════════════════════════════════
s('/medical-reports', 'post', 'Medical Reports', 'Create a medical report');
s('/medical-reports/patient/{patientId}', 'get', 'Medical Reports', 'Get all medical reports for a patient', true, [p('patientId')]);
s('/medical-reports/{id}', 'get', 'Medical Reports', 'Get medical report by ID', true, [p('id')]);
s('/medical-reports/{id}', 'patch', 'Medical Reports', 'Update a medical report', true, [p('id')]);
s('/medical-reports/{id}', 'delete', 'Medical Reports', 'Delete a medical report', true, [p('id')]);
s('/medical-reports/{id}/upload', 'post', 'Medical Reports', 'Upload a file for a medical report', true, [p('id')]);

// ═══════════════════════════════════════════════════
// SHARE LINKS  →  /api/share-links/*
// ═══════════════════════════════════════════════════
s('/share-links/patient/{patientId}', 'get', 'Share Links', 'Get all share links for a patient', true, [p('patientId')]);
s('/share-links/patient/{patientId}', 'post', 'Share Links', 'Generate a new share link for a patient', true, [p('patientId')]);
s('/share-links/shared/{token}', 'get', 'Share Links', 'Access shared patient data via token (public)', false, [ps('token')]);
s('/share-links/{id}/revoke', 'patch', 'Share Links', 'Revoke a share link', true, [p('id')]);
s('/share-links/{id}', 'patch', 'Share Links', 'Update share link settings', true, [p('id')]);
s('/share-links/{id}', 'delete', 'Share Links', 'Delete a share link', true, [p('id')]);

// ═══════════════════════════════════════════════════
// RATINGS  →  /api/ratings/*
// ═══════════════════════════════════════════════════
s('/ratings', 'post', 'Ratings', 'Create or update a rating');
s('/ratings/doctor/{doctorId}', 'get', 'Ratings', 'Get ratings for a doctor', true, [p('doctorId')]);
s('/ratings/pharmacist/{pharmacistId}', 'get', 'Ratings', 'Get ratings for a pharmacist', true, [p('pharmacistId')]);
s('/ratings/patient/{patientId}', 'get', 'Ratings', 'Get ratings submitted by a patient', true, [p('patientId')]);
s('/ratings/{id}', 'delete', 'Ratings', 'Delete a rating', true, [p('id')]);

// ═══════════════════════════════════════════════════
// NOTIFICATIONS  →  /api/notifications/*
// ═══════════════════════════════════════════════════
s('/notifications', 'post', 'Notifications', 'Create a notification');
s('/notifications/user/{userId}', 'get', 'Notifications', 'Get all notifications for a user', true, [p('userId')]);
s('/notifications/user/{userId}/read-all', 'patch', 'Notifications', 'Mark all notifications as read', true, [p('userId')]);
s('/notifications/{id}/read', 'patch', 'Notifications', 'Mark a single notification as read', true, [p('id')]);
s('/notifications/{id}', 'delete', 'Notifications', 'Delete a notification', true, [p('id')]);
s('/notifications/appointment-reminders', 'post', 'Notifications', 'Trigger appointment reminder notifications');

// ═══════════════════════════════════════════════════
// DRUG INTERACTIONS  →  /api/drug-interactions/*
// ═══════════════════════════════════════════════════
s('/drug-interactions/check', 'post', 'Drug Interactions', 'Check drug safety before prescribing');
s('/drug-interactions/prescription/{prescriptionId}', 'get', 'Drug Interactions', 'Get interaction alerts for a prescription', false, [p('prescriptionId')]);
s('/drug-interactions/patient/{patientId}', 'get', 'Drug Interactions', 'Get interaction alerts for a patient', false, [p('patientId')]);
s('/drug-interactions/{id}/acknowledge-doctor', 'patch', 'Drug Interactions', 'Doctor acknowledges an interaction alert', false, [p('id')]);
s('/drug-interactions/{id}/acknowledge-patient', 'patch', 'Drug Interactions', 'Patient acknowledges an interaction alert', false, [p('id')]);

// ═══════════════════════════════════════════════════
// ADVERSE DRUG REACTIONS  →  /api/adverse-drug-reactions/*
// ═══════════════════════════════════════════════════
s('/adverse-drug-reactions', 'post', 'Adverse Drug Reactions', 'Report an adverse drug reaction');
s('/adverse-drug-reactions', 'get', 'Adverse Drug Reactions', 'Get all ADRs (Admin)');
s('/adverse-drug-reactions/statistics/summary', 'get', 'Adverse Drug Reactions', 'Get ADR statistics summary');
s('/adverse-drug-reactions/patient/{patientId}', 'get', 'Adverse Drug Reactions', 'Get all ADRs for a patient', false, [p('patientId')]);
s('/adverse-drug-reactions/drug/{drugType}/{drugId}', 'get', 'Adverse Drug Reactions', 'Get ADRs for a specific drug', false, [
  ps('drugType'), p('drugId')
]);
s('/adverse-drug-reactions/{id}', 'get', 'Adverse Drug Reactions', 'Get ADR by ID', false, [p('id')]);
s('/adverse-drug-reactions/{id}', 'patch', 'Adverse Drug Reactions', 'Update ADR record', false, [p('id')]);

// ═══════════════════════════════════════════════════
// MEDICINE SUGGESTIONS  →  /api/medicine-suggestions/*
// ═══════════════════════════════════════════════════
s('/medicine-suggestions', 'get', 'Medicine Suggestions', 'List medicine suggestions (Doctor sees own, Admin sees all)');
s('/medicine-suggestions', 'post', 'Medicine Suggestions', 'Create a medicine suggestion (Doctor only)');
s('/medicine-suggestions/{id}', 'get', 'Medicine Suggestions', 'Get suggestion by ID', true, [p('id')]);
s('/medicine-suggestions/{id}', 'delete', 'Medicine Suggestions', 'Delete a suggestion', true, [p('id')]);
s('/medicine-suggestions/{id}/review', 'patch', 'Medicine Suggestions', 'Review / approve suggestion (Admin)', true, [p('id')]);

// ═══════════════════════════════════════════════════
// ACTIVE SUBSTANCES  →  /api/active-substances/*
// ═══════════════════════════════════════════════════
s('/active-substances', 'post', 'Active Substances', 'Create an active substance (Admin/Company)');
s('/active-substances/search', 'get', 'Active Substances', 'Search active substances');
s('/active-substances/{id}', 'get', 'Active Substances', 'Get active substance by ID', true, [p('id')]);
s('/active-substances/{id}', 'put', 'Active Substances', 'Update active substance (Admin/Company)', true, [p('id')]);
s('/active-substances/{id}', 'delete', 'Active Substances', 'Delete active substance (Admin)', true, [p('id')]);
s('/active-substances/{id}/interactions', 'get', 'Active Substances', 'Get all drug interactions for substance', true, [p('id')]);

// ═══════════════════════════════════════════════════
// TRADE NAMES  →  /api/trade-names/*
// ═══════════════════════════════════════════════════
s('/trade-names', 'get', 'Trade Names', 'List all trade names');
s('/trade-names', 'post', 'Trade Names', 'Create a trade name (Admin/Company)');
s('/trade-names/search', 'get', 'Trade Names', 'Search trade names', true, [q('q')]);
s('/trade-names/{id}', 'get', 'Trade Names', 'Get trade name by ID', true, [p('id')]);
s('/trade-names/{id}', 'put', 'Trade Names', 'Update trade name (Admin/Company)', true, [p('id')]);
s('/trade-names/{id}', 'delete', 'Trade Names', 'Delete trade name (Admin)', true, [p('id')]);

// ═══════════════════════════════════════════════════
// DISEASES  →  /api/diseases/*
// ═══════════════════════════════════════════════════
s('/diseases', 'get', 'Diseases', 'List all diseases');
s('/diseases', 'post', 'Diseases', 'Create a disease (Admin)');
s('/diseases/{id}', 'get', 'Diseases', 'Get disease by ID', true, [p('id')]);
s('/diseases/{id}', 'put', 'Diseases', 'Update disease (Admin)', true, [p('id')]);
s('/diseases/{id}', 'delete', 'Diseases', 'Delete disease (Admin)', true, [p('id')]);
// /diseases/warnings  (router.post('/warnings', ...))
s('/diseases/warnings', 'post', 'Diseases', 'Create a disease warning rule (Admin)');
// /diseases/:diseaseId/warnings  (router.get('/:diseaseId/warnings', ...))
s('/diseases/{diseaseId}/warnings', 'get', 'Diseases', 'Get all warnings for a disease', true, [p('diseaseId')]);

// ═══════════════════════════════════════════════════
// DISEASE WARNING RULES  →  /api/disease-warning-rules/*
// ═══════════════════════════════════════════════════
s('/disease-warning-rules', 'get', 'Disease Warning Rules', 'Get all warning rules (Admin)');
s('/disease-warning-rules', 'post', 'Disease Warning Rules', 'Create a warning rule (Admin)');
s('/disease-warning-rules/disease/{diseaseId}', 'get', 'Disease Warning Rules', 'Get all rules for a disease', true, [p('diseaseId')]);
s('/disease-warning-rules/{id}', 'get', 'Disease Warning Rules', 'Get warning rule by ID', true, [p('id')]);
s('/disease-warning-rules/{id}', 'patch', 'Disease Warning Rules', 'Update a warning rule (Admin)', true, [p('id')]);
s('/disease-warning-rules/{id}', 'delete', 'Disease Warning Rules', 'Delete a warning rule (Admin)', true, [p('id')]);

// ═══════════════════════════════════════════════════
// COMPANIES  →  /api/companies/*
// ═══════════════════════════════════════════════════
s('/companies', 'get', 'Companies', 'List all companies');
s('/companies', 'post', 'Companies', 'Create a company (Admin)');
s('/companies/{id}', 'get', 'Companies', 'Get company by ID', true, [p('id')]);
s('/companies/{id}', 'put', 'Companies', 'Update company (Admin/Company)', true, [p('id')]);
s('/companies/{id}', 'delete', 'Companies', 'Delete company (Admin)', true, [p('id')]);

// ═══════════════════════════════════════════════════
// PRICING PLANS  →  /api/pricing-plans/*
// ═══════════════════════════════════════════════════
s('/pricing-plans', 'get', 'Pricing Plans', 'List all pricing plans', false);
s('/pricing-plans/default', 'get', 'Pricing Plans', 'Get the default pricing plan', false);
s('/pricing-plans', 'post', 'Pricing Plans', 'Create a pricing plan (Admin)');
s('/pricing-plans/{id}', 'get', 'Pricing Plans', 'Get pricing plan by ID', false, [p('id')]);
s('/pricing-plans/{id}', 'put', 'Pricing Plans', 'Update pricing plan (Admin)', true, [p('id')]);
s('/pricing-plans/{id}', 'delete', 'Pricing Plans', 'Delete pricing plan (Admin)', true, [p('id')]);

// ═══════════════════════════════════════════════════
// SUBSCRIPTIONS  →  /api/subscriptions/*
// ═══════════════════════════════════════════════════
s('/subscriptions', 'post', 'Subscriptions', 'Create a subscription');
s('/subscriptions', 'get', 'Subscriptions', 'List all subscriptions (Admin)');
s('/subscriptions/user/{userId}', 'get', 'Subscriptions', 'Get subscription for a user', true, [p('userId')]);
s('/subscriptions/{userId}', 'put', 'Subscriptions', 'Update a subscription', true, [p('userId')]);
s('/subscriptions/{userId}/cancel', 'post', 'Subscriptions', 'Cancel a subscription', true, [p('userId')]);
s('/subscriptions/{userId}/renew', 'post', 'Subscriptions', 'Renew a subscription', true, [p('userId')]);

// ═══════════════════════════════════════════════════
// PAYMENTS  →  /api/payments/*
// ═══════════════════════════════════════════════════
s('/payments', 'post', 'Payments', 'Create a payment record');
s('/payments', 'get', 'Payments', 'List all payments (Admin)');
s('/payments/subscription/{subscriptionId}', 'get', 'Payments', 'Get payments for a subscription', true, [p('subscriptionId')]);
s('/payments/{id}', 'get', 'Payments', 'Get payment by ID', true, [p('id')]);
s('/payments/{id}/status', 'put', 'Payments', 'Update payment status (Admin)', true, [p('id')]);
s('/payments/{id}/process', 'post', 'Payments', 'Process a payment', true, [p('id')]);
s('/payments/{id}/refund', 'post', 'Payments', 'Refund a payment (Admin)', true, [p('id')]);

// ═══════════════════════════════════════════════════
// ADMIN  →  /api/admin/*
// ═══════════════════════════════════════════════════
// Permissions
s('/admin/permissions', 'get', 'Admin', 'List all permissions');
s('/admin/permissions', 'post', 'Admin', 'Create a permission');
s('/admin/permissions/{id}', 'delete', 'Admin', 'Delete a permission', true, [p('id')]);
s('/admin/roles/{role}/permissions', 'get', 'Admin', 'Get permissions for a role', true, [ps('role')]);
s('/admin/roles/{role}/permissions', 'post', 'Admin', 'Add permission to a role', true, [ps('role')]);
s('/admin/roles/{role}/permissions/{permissionId}', 'delete', 'Admin', 'Remove permission from a role', true, [ps('role'), p('permissionId')]);
// Doctor verification
s('/admin/doctors/pending', 'get', 'Admin', 'List doctors pending verification');
s('/admin/doctors/{id}/verify', 'patch', 'Admin', 'Verify a doctor', true, [p('id')]);
s('/admin/doctors/{id}/reject', 'patch', 'Admin', 'Reject a doctor', true, [p('id')]);
// Pharmacist verification
s('/admin/pharmacists/pending', 'get', 'Admin', 'List pharmacists pending verification');
s('/admin/pharmacists/{id}/verify', 'patch', 'Admin', 'Verify a pharmacist', true, [p('id')]);
s('/admin/pharmacists/{id}/reject', 'patch', 'Admin', 'Reject a pharmacist', true, [p('id')]);
// Dashboard
s('/admin/statistics', 'get', 'Admin', 'Get platform statistics');
s('/admin/audit-logs', 'get', 'Admin', 'Get audit logs');

// ═══════════════════════════════════════════════════
// SETTINGS  →  /api/settings/*
// ═══════════════════════════════════════════════════
s('/settings/logo', 'get', 'Settings', 'Get application logo (public)', false);
s('/settings/logo', 'post', 'Settings', 'Upload / update application logo (Admin)');

// ═══════════════════════════════════════════════════
// IMPORT  →  /api/import/*
// ═══════════════════════════════════════════════════
s('/import/active-substances', 'post', 'Import', 'Import active substances from Excel/CSV file');
s('/import/{entityType}', 'post', 'Import', 'Generic entity import', true, [ps('entityType')]);
s('/import/history', 'get', 'Import', 'Get import history');

// ═══════════════════════════════════════════════════
// EXPORT  →  /api/export/*
// ═══════════════════════════════════════════════════
s('/export/active-substances', 'get', 'Export', 'Export active substances to Excel');
s('/export/trade-names', 'get', 'Export', 'Export trade names to Excel');
s('/export/diseases', 'get', 'Export', 'Export diseases to Excel');
s('/export/companies', 'get', 'Export', 'Export companies to Excel');
s('/export/history', 'get', 'Export', 'Get export history');

// ═══════════════════════════════════════════════════════
// OpenAPI definition
// ═══════════════════════════════════════════════════════
const options: Record<string, unknown> = {
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
      // ── System
      { name: 'System',                        description: 'Health check' },
      { name: 'Auth',                          description: 'Authentication & current user' },
      // ── User management
      { name: 'Users',                         description: 'User CRUD (Admin)' },
      // ── Patient domain
      { name: 'Patients',                      description: 'Patient profile management' },
      { name: 'Patient Medical History',       description: 'Patient medical history records' },
      { name: 'Patient Family History',        description: 'Patient family history records' },
      { name: 'Patient Lifestyle',             description: 'Patient lifestyle data' },
      { name: 'Patient Children',              description: 'Patient child profiles' },
      { name: 'Patient Diseases',              description: 'Diseases linked to a patient' },
      // ── Doctor domain
      { name: 'Doctors',                       description: 'Doctor profile & patient assignments' },
      { name: 'Patient-Doctor Relationships',  description: 'Explicit patient-doctor relationship records' },
      // ── Pharmacist
      { name: 'Pharmacists',                   description: 'Pharmacist profile management' },
      // ── Clinical
      { name: 'Allergies',                     description: 'Allergy records & conflict checking' },
      { name: 'Prescriptions',                 description: 'Prescription management & interaction alerts' },
      { name: 'Prescription Versions',         description: 'Prescription version history & comparison' },
      { name: 'Appointments',                  description: 'Appointment scheduling & lifecycle' },
      { name: 'Consultations',                 description: 'Consultation records' },
      { name: 'Visits',                        description: 'Visit records' },
      { name: 'Medical Reports',               description: 'Medical report management & file upload' },
      { name: 'Share Links',                   description: 'Patient data sharing via tokens' },
      // ── Safety
      { name: 'Drug Interactions',             description: 'Drug interaction detection & acknowledgement' },
      { name: 'Adverse Drug Reactions',        description: 'ADR reporting & analysis' },
      { name: 'Medicine Suggestions',          description: 'Doctor medicine suggestions (admin review)' },
      // ── Drug catalog
      { name: 'Active Substances',             description: 'Active substance catalog' },
      { name: 'Trade Names',                   description: 'Trade name catalog' },
      { name: 'Diseases',                      description: 'Disease catalog & warnings' },
      { name: 'Disease Warning Rules',         description: 'Configurable disease warning rules' },
      { name: 'Companies',                     description: 'Pharmaceutical company management' },
      // ── Ratings
      { name: 'Ratings',                       description: 'Doctor & pharmacist ratings' },
      // ── Notifications
      { name: 'Notifications',                 description: 'In-app notifications' },
      // ── Subscriptions & billing
      { name: 'Pricing Plans',                 description: 'Subscription pricing plans' },
      { name: 'Subscriptions',                 description: 'User subscriptions' },
      { name: 'Payments',                      description: 'Payment processing & history' },
      // ── Admin & platform ops
      { name: 'Admin',                         description: 'Admin-only: permissions, verification, statistics' },
      { name: 'Settings',                      description: 'Application-level settings (logo etc.)' },
      { name: 'Import',                        description: 'Bulk data import from Excel/CSV' },
      { name: 'Export',                        description: 'Bulk data export to Excel' },
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
            email:    { type: 'string', format: 'email', example: 'user@example.com' },
            password: { type: 'string', minLength: 6,    example: 'secret123' },
            role:     { type: 'string', enum: ['Patient', 'Doctor', 'Pharmacist', 'Admin', 'SuperAdmin'], default: 'Patient' },
            name:     { type: 'string', minLength: 2,    example: 'John Doe' }
          }
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email:    { type: 'string', format: 'email', example: 'user@example.com' },
            password: { type: 'string',                  example: 'secret123' }
          }
        },
        RefreshTokenRequest: {
          type: 'object',
          required: ['refreshToken'],
          properties: {
            refreshToken: { type: 'string', example: 'eyJhbGci...' }
          }
        },
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
            type:     { $ref: '#/components/schemas/WarningType' },
            message:  { type: 'string' },
            blocked:  { type: 'boolean' }
          }
        },
        WarningResult: {
          type: 'object',
          properties: {
            blocked:  { type: 'boolean' },
            warnings: { type: 'array', items: { $ref: '#/components/schemas/Warning' } }
          }
        }
      }
    },
    paths
  },
  apis: [
    path.join(__dirname, '../routes/*.ts'),
    path.join(__dirname, '../controllers/*.ts')
  ]
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
