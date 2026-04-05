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
  SIDE_EFFECTS: 'Patient - 17. My Side Effects',
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

/** Single Swagger section grouping all doctor capabilities related to patients */
const DOCTOR_PATIENTS_SECTION = 'Doctor - Capabilities with patients';

/** Doctor Add A New Drug flow: call these endpoints in order (Step 1–5). */
const DOCTOR_ADD_DRUG_SECTION = 'Doctor - Add prescription (step-by-step)';

const PHARMACIST_TAGS = {
  AUTH: 'Pharmacist - 1. Auth',
  PROFILE: 'Pharmacist - 2. Profile',
  MEDICATIONS_SEARCH: 'Pharmacist - 3. Search medicines & prescriptions',
  NOTIFICATIONS: 'Pharmacist - 4. Notifications',
  RATINGS: 'Pharmacist - 5. Ratings',
};

/**
 * Single Swagger section grouping ALL endpoints that participate in the Warning System:
 * - Pharma Safety Engine safetyStatus (RED/ORANGE/GREEN + warnings + filteredData)
 * - aggregated patient warnings / interaction alerts
 */
const WARNING_SYSTEM_SECTION = '⚠️ Warning System (Pharma Safety Engine)';

const ADMIN_TAG = 'System & Admin';

/** Optional custom responses: e.g. { 201: 'Created', 204: 'No Content' } */
const s = (
  pathKey: string,
  method: Method,
  tagOrTags: string | string[],
  summary: string,
  secure = true,
  params: any[] = [],
  body?: { schemaRef: string; required?: boolean },
  responses?: Record<string, string>,
  responseRef?: string
) => {
  const tagList = Array.isArray(tagOrTags) ? tagOrTags : [tagOrTags];
  const defaultResponses: Record<string, any> = {
    '200': responseRef
      ? { description: 'Success', content: { 'application/json': { schema: { $ref: `#/components/schemas/${responseRef}` } } } }
      : { description: 'Success' }
  };
  if (responses) {
    for (const [code, desc] of Object.entries(responses)) {
      defaultResponses[code] = { description: desc };
    }
  }
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
    responses: defaultResponses
  };
};

// ═══════════════════════════════════════════════════
// SYSTEM
// ═══════════════════════════════════════════════════
s('/health', 'get', ADMIN_TAG, 'Health check', false);

// ═══════════════════════════════════════════════════
// AUTH  →  /api/auth/*
// ═══════════════════════════════════════════════════
s('/auth/register', 'post', AUTH_TAGS, 'Register a new user. For Doctor and Pharmacist, the server may use AI (Gemini) to read the license image; if it extracts a non-empty number that does not match the submitted licenseNumber (after normalization), registration fails with 400 and the temp upload is removed. If the API key is missing, the request fails, or the image is unreadable, registration still succeeds and the response may include licenseNumberVerification: not_checked and a hint.', false, [], { schemaRef: 'RegisterRequest' }, { '201': 'User created — OTP sent to email', '400': 'Validation error (Zod issues) or license number on the image does not match the number you entered' }, 'RegisterResponse');
s('/auth/login', 'post', AUTH_TAGS, 'Login and receive tokens. Returns 200 with tokens on success. Returns 200 with { name, email, role, isActive: false } (no tokens) when account is deactivated — handle this case by showing an "account inactive" screen without storing tokens.', false, [], { schemaRef: 'LoginRequest' }, { '401': 'Invalid credentials (wrong email or password)' }, 'LoginResponse');
s('/auth/refresh', 'post', AUTH_TAGS, 'Refresh access token', false, [], { schemaRef: 'RefreshTokenRequest' }, {}, 'RefreshTokenResponse');
s('/auth/logout', 'post', AUTH_TAGS, 'Logout (invalidate token)', true, [], undefined, {}, 'MessageResponse');
s('/auth/me', 'get', AUTH_TAGS, 'Get current authenticated user. When role is Patient, response includes full patient data (same as GET /patients/:id): user, medicalHistories, familyHistories, patientLifestyles, patientAllergies, childrenProfiles, patientDiseases, bodyMassIndex.', true, [], undefined, {}, 'AuthMeResponse');
s('/auth/dev-reset-superadmin-password', 'post', ADMIN_TAG, '[Dev] Reset superadmin password', false);

// ═══════════════════════════════════════════════════
// OTP  →  /api/otp/*
// ═══════════════════════════════════════════════════
s('/otp/verify', 'post', AUTH_TAGS, 'Verify the 6-digit OTP sent to email after registration. Requires the otpToken returned from /auth/register as Bearer token. On success activates the account (Patient only) and returns accessToken + refreshToken.', true, [], { schemaRef: 'VerifyOtpRequest' }, { '401': 'Invalid or expired OTP', '429': 'Too many failed attempts — request a new OTP' }, 'VerifyOtpResponse');
s('/otp/resend', 'post', AUTH_TAGS, 'Resend a new OTP to the registered email (invalidates the previous code and resets the expiry timer). Requires the otpToken returned from /auth/register as Bearer token.', true, [], undefined, {}, 'ResendOtpResponse');

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
s('/patients/me/full', 'get', PATIENT_TAGS.PROFILE, 'Get my full details (patient only). Same structure as GET /doctors/{doctorId}/patients/{patientId} (without `relationship`): profile, vitals, medicalHistories, familyHistories, patientDiseases, patientLifestyles, patientAllergies, surgicalHistories, visits, medicalReports, **prescriptions** (full history, newest first, with medicines and prescribing doctor), name, email, phone, bodyMassIndex. No path params; use Bearer token.', true);
s('/patients/{id}', 'get', PATIENT_TAGS.PROFILE, 'Get patient by ID', true, [p('id')]);
s('/patients/user/{userId}', 'get', PATIENT_TAGS.PROFILE, 'Get patient by user ID', true, [p('userId')]);

// PATIENTS — Medical History
s('/patients/{patientId}/medical-history', 'get', PATIENT_TAGS.PROFILE, 'Get medical history entries', true, [p('patientId')]);
s('/patients/{patientId}/medical-history', 'post', PATIENT_TAGS.PROFILE, 'Add medical history (one or multiple diseases)', true, [p('patientId')], { schemaRef: 'BatchMedicalHistoryRequest' });

// PATIENTS — Family History
s('/patients/{patientId}/family-history', 'get', PATIENT_TAGS.FAMILY_HISTORY, 'Get family history entries', true, [p('patientId')]);
s('/patients/{patientId}/family-history', 'post', PATIENT_TAGS.FAMILY_HISTORY, 'Add family history entries (single object or array)', true, [p('patientId')], { schemaRef: 'BatchFamilyHistoryRequest' });

// FAMILY RELATIONS (enum options for family history dropdown)
s('/family-relations', 'get', [PATIENT_TAGS.FAMILY_HISTORY, ADMIN_TAG], 'List family relation enum values for dropdowns (Father, Mother, Sibling, etc.)', true);

// PATIENTS — Surgical History
s('/patients/{patientId}/surgeries', 'get', PATIENT_TAGS.SURGERIES, 'Get previous surgeries (patientId can be "me" for logged-in patient)', true, [p('patientId')]);
s('/patients/{patientId}/surgeries', 'post', PATIENT_TAGS.SURGERIES, 'Add surgical history (patientId can be "me"; body: organId from GET /operations)', true, [p('patientId')], { schemaRef: 'BatchSurgicalHistoryRequest' });
s('/patients/{patientId}/surgeries/{id}', 'put', PATIENT_TAGS.SURGERIES, 'Update a surgical history entry', true, [p('patientId'), p('id')], { schemaRef: 'UpdateSurgicalHistoryRequest' });
s('/patients/surgeries/{id}', 'delete', PATIENT_TAGS.SURGERIES, 'Delete a surgical history entry', true, [p('id')]);

// PATIENTS — Lifestyle (catalog: GET /lifestyles; patient answers below)
s('/patients/{patientId}/lifestyle', 'get', PATIENT_TAGS.LIFESTYLE, 'Get patient lifestyle answers (patientId can be "me")', true, [p('patientId')]);
s('/patients/{patientId}/lifestyle', 'post', PATIENT_TAGS.LIFESTYLE, 'Add or update lifestyle answers — body: array of { lifestyleId, value } (lifestyleId from GET /lifestyles)', true, [p('patientId')], { schemaRef: 'BatchPatientLifestyleRequest' });
s('/patients/lifestyle/{patientLifestyleId}', 'delete', PATIENT_TAGS.LIFESTYLE, 'Remove one lifestyle entry (PatientLifestyle id)', true, [p('patientLifestyleId')]);

// LIFESTYLES (catalog — Admin CRUD; patients use GET for lifestyle questions and POST .../lifestyle to submit answers)
s('/lifestyles', 'get', [PATIENT_TAGS.LIFESTYLE, ADMIN_TAG], 'List all lifestyle questions (for patient form and admin)', true);
s('/lifestyles/{id}', 'get', [PATIENT_TAGS.LIFESTYLE, ADMIN_TAG], 'Get lifestyle by ID', true, [p('id')]);
s('/lifestyles', 'post', ADMIN_TAG, 'Create a lifestyle question (Admin)', true, [], { schemaRef: 'CreateLifestyleRequest' }, { '200': 'Success', '201': 'Created' });
s('/lifestyles/{id}', 'put', ADMIN_TAG, 'Update a lifestyle question (Admin)', true, [p('id')], { schemaRef: 'UpdateLifestyleRequest' });
s('/lifestyles/{id}', 'delete', ADMIN_TAG, 'Delete a lifestyle question (Admin)', true, [p('id')], undefined, { '200': 'Success', '204': 'No Content' });

// OPERATIONS (Organs) (Admin CRUD; GET for patient/mobile dropdown)
s('/operations', 'get', [PATIENT_TAGS.SURGERIES, ADMIN_TAG], 'List all organs for dropdown (used by Add Surgeries screen)', true);
s('/operations/{id}', 'get', [PATIENT_TAGS.SURGERIES, ADMIN_TAG], 'Get organ by ID', true, [p('id')]);
s('/operations', 'post', ADMIN_TAG, 'Create an organ (Admin)', true, [], { schemaRef: 'CreateOperationRequest' }, { '200': 'Success', '201': 'Created' });
s('/operations/{id}', 'put', ADMIN_TAG, 'Update an organ (Admin)', true, [p('id')], { schemaRef: 'UpdateOperationRequest' });
s('/operations/{id}', 'delete', ADMIN_TAG, 'Delete an organ (Admin)', true, [p('id')], undefined, { '200': 'Success', '204': 'No Content' });

// PATIENTS — Children
s('/patients/{patientId}/children', 'get', PATIENT_TAGS.PROFILE, 'Get child profiles for patient', true, [p('patientId')]);
s('/patients/{patientId}/children', 'post', PATIENT_TAGS.PROFILE, 'Add a child profile', true, [p('patientId')], { schemaRef: 'ChildProfileRequest' });
s('/patients/children/{childId}', 'delete', PATIENT_TAGS.PROFILE, 'Delete a child profile', true, [p('childId')]);

// PATIENTS — All warnings (aggregated for current prescriptions + self-reported medicines)
s('/patients/{patientId}/warnings', 'get', [WARNING_SYSTEM_SECTION, PATIENT_TAGS.DRUG_SAFETY, PATIENT_TAGS.MEDICATIONS, DOCTOR_PATIENTS_SECTION], 'Get all warnings for a patient (all types: allergies, disease, interactions, etc.) for current prescriptions and self-reported medicines', true, [p('patientId')]);

// DOCTORS
s('/doctors', 'post', [DOCTOR_TAGS.MY_PATIENTS, DOCTOR_PATIENTS_SECTION], 'Create or update doctor profile', true, [], { schemaRef: 'CreateDoctorRequest' });
s('/doctors/search', 'get', [PATIENT_TAGS.SHARE_WITH_DOCTOR, DOCTOR_TAGS.MY_PATIENTS], 'Search / list all doctors', true, [q('q', 'Search query')]);
s('/doctors/me/stats', 'get', [DOCTOR_TAGS.MY_PATIENTS, DOCTOR_PATIENTS_SECTION], 'Get statistics for the current doctor (total patients, prescriptions, consultations, appointments, visits, ratings, clinics; averageRating). Requires Bearer token (Doctor).', true);
s('/doctors/me', 'get', [DOCTOR_TAGS.MY_PATIENTS, DOCTOR_PATIENTS_SECTION], 'Get current doctor profile (mobile: use Bearer token; no path params)', true);
s('/doctors/me', 'patch', [DOCTOR_TAGS.MY_PATIENTS, DOCTOR_PATIENTS_SECTION], 'Update current doctor profile (mobile: use Bearer token). Body: optional name, specialization, licenseNumber, clinicAddress, phoneNumber, yearsOfExperience, qualifications, consultationFee; optional clinics array to replace all doctor clinics (each item: name?, address?, city?, latitude?, longitude?, workingHours?).', true, [], { schemaRef: 'UpdateDoctorMeRequest' });
s('/doctors/nearby', 'get', [PATIENT_TAGS.SHARE_WITH_DOCTOR, DOCTOR_TAGS.MY_PATIENTS], 'Get doctors within admin-configured radius (km) of patient location. Uses Doctor-level lat/lng and DoctorClinic locations (nearest clinic used). Query: lat, lng. Returns verified doctors sorted by distance with distanceKm.', true, [
  { name: 'lat', in: 'query', required: true, schema: { type: 'number' }, description: 'Latitude (-90 to 90)' },
  { name: 'lng', in: 'query', required: true, schema: { type: 'number' }, description: 'Longitude (-180 to 180)' }
]);
s('/doctors/{id}', 'get', [PATIENT_TAGS.SHARE_WITH_DOCTOR, DOCTOR_TAGS.MY_PATIENTS, DOCTOR_PATIENTS_SECTION], 'Get doctor by ID', true, [p('id')]);
s('/doctors/user/{userId}', 'get', [DOCTOR_TAGS.MY_PATIENTS, DOCTOR_PATIENTS_SECTION], 'Get doctor by user ID', true, [p('userId')]);
s('/doctors/{id}/verify', 'put', ADMIN_TAG, 'Verify a doctor (Admin)', true, [p('id')], { schemaRef: 'VerifyDoctorRequest' });
s('/doctors/{doctorId}/clinics', 'get', [DOCTOR_TAGS.MY_PATIENTS, DOCTOR_PATIENTS_SECTION], 'List clinics for a doctor (Doctor: own profile only; Admin: any doctor). Each clinic may have workingHours: array of { day, startTime, endTime }.', true, [p('doctorId')]);
s('/doctors/{doctorId}/clinics', 'post', [DOCTOR_TAGS.MY_PATIENTS, DOCTOR_PATIENTS_SECTION], 'Create a clinic for a doctor. Body: name?, address?, city?, latitude?, longitude?, workingHours? (array of { day, startTime, endTime }).', true, [p('doctorId')], { schemaRef: 'CreateDoctorClinicRequest' });
s('/doctors/{doctorId}/clinics/{clinicId}', 'patch', [DOCTOR_TAGS.MY_PATIENTS, DOCTOR_PATIENTS_SECTION], 'Update a doctor clinic. Body: same as create, all optional.', true, [p('doctorId'), p('clinicId')], { schemaRef: 'UpdateDoctorClinicRequest' });
s('/doctors/{doctorId}/clinics/{clinicId}', 'delete', [DOCTOR_TAGS.MY_PATIENTS, DOCTOR_PATIENTS_SECTION], 'Delete a doctor clinic', true, [p('doctorId'), p('clinicId')]);
s('/doctors/{doctorId}/patients/search', 'get', [DOCTOR_TAGS.MY_PATIENTS, DOCTOR_PATIENTS_SECTION], 'Search for patient by name (among doctor\'s assigned patients only)', true, [p('doctorId'), q('name', 'Patient name or partial name to search (also accepts "q")')]);
s('/doctors/{doctorId}/patients/warnings', 'get', [WARNING_SYSTEM_SECTION, DOCTOR_TAGS.MY_PATIENTS, DOCTOR_PATIENTS_SECTION, DOCTOR_TAGS.DRUG_SAFETY], 'Get all warnings for patients linked to this doctor. Returns { warnings: [ { patientId, name, patientName, email, type, severity, message, ... } ] } — one entry per warning with patient info on each.', true, [p('doctorId')]);
s('/doctors/{doctorId}/patients/{patientId}', 'get', [DOCTOR_TAGS.MY_PATIENTS, DOCTOR_PATIENTS_SECTION], 'Get full details of a linked patient: profile, vitals, medicalHistories, familyHistories, patientDiseases, patientLifestyles, allergyReports, surgicalHistories, visits, medicalReports, **prescriptions** (all prescribers, newest first, with prescriptionMedicines and doctor), plus `relationship` (type, dates, isActive). Returns 404 if not linked.', true, [p('doctorId'), p('patientId')]);
s('/doctors/{doctorId}/patients', 'get', [DOCTOR_TAGS.MY_PATIENTS, DOCTOR_PATIENTS_SECTION], 'Get patients assigned to doctor (My patients)', true, [p('doctorId')]);
s('/doctors/{doctorId}/patients', 'post', [PATIENT_TAGS.SHARE_WITH_DOCTOR, DOCTOR_TAGS.MY_PATIENTS, DOCTOR_PATIENTS_SECTION], 'Assign a patient to doctor', true, [p('doctorId')], { schemaRef: 'AssignPatientRequest' });
s('/doctors/{doctorId}/patients/{patientId}', 'delete', [DOCTOR_TAGS.MY_PATIENTS, DOCTOR_PATIENTS_SECTION], 'Remove patient from doctor', true, [p('doctorId'), p('patientId')]);

// PHARMACISTS
s('/pharmacists', 'post', PHARMACIST_TAGS.PROFILE, 'Create or update pharmacist profile', true, [], { schemaRef: 'CreatePharmacistRequest' });
s('/pharmacists/search', 'get', PHARMACIST_TAGS.PROFILE, 'List / search all pharmacists', true, [q('q')]);
s('/pharmacists/{id}', 'get', PHARMACIST_TAGS.PROFILE, 'Get pharmacist by ID', true, [p('id')]);
s('/pharmacists/user/{userId}', 'get', PHARMACIST_TAGS.PROFILE, 'Get pharmacist by user ID', true, [p('userId')]);

// PATIENT-DOCTOR (Share profile with doctor)
s('/patient-doctors', 'post', [PATIENT_TAGS.SHARE_WITH_DOCTOR, DOCTOR_TAGS.MY_PATIENTS, DOCTOR_PATIENTS_SECTION], 'Create a patient-doctor relationship', true, [], { schemaRef: 'CreatePatientDoctorRequest' });
s('/patient-doctors/patient/{patientId}', 'get', PATIENT_TAGS.SHARE_WITH_DOCTOR, 'Get relationships for a patient', true, [p('patientId')]);
s('/patient-doctors/doctor/{doctorId}', 'get', [DOCTOR_TAGS.MY_PATIENTS, DOCTOR_PATIENTS_SECTION], 'Get relationships for a doctor', true, [p('doctorId')]);
s('/patient-doctors/{id}', 'get', [PATIENT_TAGS.SHARE_WITH_DOCTOR, DOCTOR_TAGS.MY_PATIENTS, DOCTOR_PATIENTS_SECTION], 'Get relationship by ID', true, [p('id')]);
s('/patient-doctors/{id}', 'put', [PATIENT_TAGS.SHARE_WITH_DOCTOR, DOCTOR_TAGS.MY_PATIENTS, DOCTOR_PATIENTS_SECTION], 'Update relationship', true, [p('id')], { schemaRef: 'UpdatePatientDoctorRequest' });
s('/patient-doctors/{id}/end', 'post', [PATIENT_TAGS.SHARE_WITH_DOCTOR, DOCTOR_TAGS.MY_PATIENTS, DOCTOR_PATIENTS_SECTION], 'End a patient-doctor relationship', true, [p('id')]);

// ALLERGIES (patient allergy records — read-only here; add/delete under /patients)
s('/allergies/patient/{patientId}', 'get', [PATIENT_TAGS.ALLERGIES, DOCTOR_PATIENTS_SECTION], 'Get all allergies for a patient (PatientAllergy with allergen name)', true, [p('patientId')]);
s('/allergies/patient/{patientId}/critical', 'get', [PATIENT_TAGS.ALLERGIES, DOCTOR_PATIENTS_SECTION], 'Get critical allergies for a patient', true, [p('patientId')]);
s('/allergies/check/{patientId}/{medicineId}', 'get', [PATIENT_TAGS.ALLERGIES, DOCTOR_PATIENTS_SECTION], 'Check if medicine conflicts with patient allergies', true, [p('patientId'), p('medicineId')]);
s('/patients/{patientId}/allergies', 'post', PATIENT_TAGS.ALLERGIES, 'Create or replace the patient allergy report. Body supports optional tradeNameId plus arrays: allergenIds, activeSubstanceIds, excipientIds, classificationIds. At least one of these must be provided. Optional: reaction, notes.', true, [p('patientId')], { schemaRef: 'PatientAllergyReportRequest' });
s('/patients/{patientId}/allergies/batch', 'post', PATIENT_TAGS.ALLERGIES, 'Alias of POST /patients/{patientId}/allergies (same request body).', true, [p('patientId')], { schemaRef: 'PatientAllergyReportRequest' });
s('/patients/allergies/{allergyId}', 'delete', PATIENT_TAGS.ALLERGIES, 'Remove allergy from patient (PatientAllergy id)', true, [p('allergyId')]);

// ALLERGEN CATEGORIES (catalog — GET for patient/doctor dropdown; Admin CRUD)
s('/allergen-categories', 'get', [PATIENT_TAGS.ALLERGIES, ADMIN_TAG], 'List all allergen categories (id, name, allergen count). Mobile: step 1 — show categories to patient.', true);
s('/allergen-categories/{id}', 'get', [PATIENT_TAGS.ALLERGIES, ADMIN_TAG], 'Get allergen category by ID', true, [p('id')]);
s('/allergen-categories/{id}/allergens', 'get', [PATIENT_TAGS.ALLERGIES, ADMIN_TAG], 'Get all allergens for a category. Mobile: step 2 — patient picks allergens from this list.', true, [p('id')]);
s('/allergen-categories', 'post', ADMIN_TAG, 'Create an allergen category (Admin). Body: name { en, ar? }', true, [], { schemaRef: 'CreateAllergenCategoryRequest' }, { '200': 'Success', '201': 'Created' });
s('/allergen-categories/{id}', 'put', ADMIN_TAG, 'Update an allergen category (Admin)', true, [p('id')], { schemaRef: 'UpdateAllergenCategoryRequest' });
s('/allergen-categories/{id}', 'delete', ADMIN_TAG, 'Delete an allergen category (Admin). Fails if it has allergens.', true, [p('id')], undefined, { '200': 'Success', '204': 'No Content' });

// ALLERGENS (catalog — Admin CRUD; patients use GET for dropdown when adding allergies; optional ?categoryId=N filter)
s('/allergens', 'get', [PATIENT_TAGS.ALLERGIES, ADMIN_TAG], 'List all allergens (optional ?categoryId=N to filter by category). Response includes allergenCategory.', true, [
  { name: 'categoryId', in: 'query', required: false, schema: { type: 'integer' }, description: 'Optional. Filter allergens by category ID.' }
]);
s('/allergens/{id}', 'get', [PATIENT_TAGS.ALLERGIES, ADMIN_TAG], 'Get allergen by ID (includes allergenCategory)', true, [p('id')]);
s('/allergens', 'post', ADMIN_TAG, 'Create an allergen (Admin). Required: name, allergenCategoryId. Optional: allergenType.', true, [], { schemaRef: 'CreateAllergenRequest' }, { '200': 'Success', '201': 'Created' });
s('/allergens/{id}', 'put', ADMIN_TAG, 'Update an allergen (Admin)', true, [p('id')], { schemaRef: 'UpdateAllergenRequest' });
s('/allergens/{id}', 'delete', ADMIN_TAG, 'Delete an allergen (Admin)', true, [p('id')], undefined, { '200': 'Success', '204': 'No Content' });

// EXCIPIENTS (catalog — patients read active items; admin full CRUD)
s('/excipients', 'get', [PATIENT_TAGS.ALLERGIES, ADMIN_TAG], 'List excipients. Patient/default: active only. Admin can use ?scope=admin&includeInactive=true.', true, [
  q('search', 'Optional text search by excipient name'),
  q('scope', 'Optional: set to "admin" to include admin view behavior'),
  q('includeInactive', 'Optional (admin scope): true to include inactive entries')
]);
s('/excipients/search', 'get', PATIENT_TAGS.ALLERGIES, 'Patient search endpoint for active excipients by text. Requires ?q=...', true, [
  q('q', 'Required search text')
]);
s('/excipients/{id}', 'get', [PATIENT_TAGS.ALLERGIES, ADMIN_TAG], 'Get excipient by ID. Patient/default returns only active records; admin can use ?scope=admin.', true, [p('id'), q('scope', 'Optional: set to "admin"')]);
s('/excipients', 'post', ADMIN_TAG, 'Create excipient (Admin)', true, [], { schemaRef: 'CreateExcipientRequest' }, { '200': 'Success', '201': 'Created' });
s('/excipients/{id}', 'put', ADMIN_TAG, 'Update excipient (Admin)', true, [p('id')], { schemaRef: 'UpdateExcipientRequest' });
s('/excipients/{id}', 'delete', ADMIN_TAG, 'Soft-delete excipient by setting isActive=false (Admin)', true, [p('id')], undefined, { '200': 'Success', '204': 'No Content' });

// PATIENT DISEASES (Current diseases)
s('/patient-diseases/patient/{patientId}', 'get', [PATIENT_TAGS.CURRENT_DISEASES, DOCTOR_PATIENTS_SECTION], 'Get diseases for a patient', true, [p('patientId')]);
s('/patient-diseases/patient/{patientId}', 'post', PATIENT_TAGS.CURRENT_DISEASES, 'Add current diseases (single object or array)', true, [p('patientId')], { schemaRef: 'BatchPatientDiseasesRequest' });
s('/patient-diseases/{id}', 'patch', PATIENT_TAGS.CURRENT_DISEASES, 'Update patient disease (severity, notes)', true, [p('id')], { schemaRef: 'UpdatePatientDiseaseRequest' });
s('/patient-diseases/{id}', 'delete', PATIENT_TAGS.CURRENT_DISEASES, 'Remove patient disease', true, [p('id')]);

// PATIENT MEDICINES (My medications)
s('/patient-medicines/patient/{patientId}', 'get', [PATIENT_TAGS.MEDICATIONS, DOCTOR_PATIENTS_SECTION], 'List all medicines for a patient', true, [p('patientId')]);
s('/patient-medicines/{id}', 'get', [PATIENT_TAGS.MEDICATIONS, DOCTOR_PATIENTS_SECTION], 'Get a patient medicine by ID', true, [p('id')]);
s('/patient-medicines/patient/{patientId}', 'post', PATIENT_TAGS.MEDICATIONS, 'Add a medicine to patient (runs risk check; response includes warnings and blocked)', true, [p('patientId')], { schemaRef: 'AddPatientMedicineRequest' });
s('/patient-medicines/patient/{patientId}/upload-image', 'post', PATIENT_TAGS.MEDICATIONS, 'Upload medicine image (runs risk check; response includes warnings and blocked)', true, [p('patientId')]);
s('/patient-medicines/{id}', 'patch', PATIENT_TAGS.MEDICATIONS, 'Update a patient medicine', true, [p('id')], { schemaRef: 'UpdatePatientMedicineRequest' });
s('/patient-medicines/{id}', 'delete', PATIENT_TAGS.MEDICATIONS, 'Delete a patient medicine', true, [p('id')]);
s('/patient-medicines/{id}/verify', 'patch', ADMIN_TAG, 'Verify an uploaded medicine (Admin/Doctor)', true, [p('id')]);
s('/patient-medicines/unverified', 'get', ADMIN_TAG, 'List unverified patient medicines (Admin)', true);

// Add Medicine Requests (Admin) – from patient image upload when AI/DB match missing
s('/add-medicine-requests', 'get', ADMIN_TAG, 'List add medicine requests (Admin)', true, [q('status'), q('page'), q('limit')]);
s('/add-medicine-requests/{id}', 'get', ADMIN_TAG, 'Get add medicine request by ID (Admin)', true, [p('id')]);
s('/add-medicine-requests/{id}/resolve', 'patch', ADMIN_TAG, 'Resolve request: link trade name/active substance and mark PatientMedicine verified', true, [p('id')], { schemaRef: 'ResolveAddMedicineRequestRequest' });

// PRESCRIPTIONS
s('/prescriptions', 'get', [PATIENT_TAGS.PRESCRIPTIONS, DOCTOR_TAGS.PRESCRIPTIONS, DOCTOR_PATIENTS_SECTION], 'List prescriptions with pagination. **Doctor:** always scoped to their own prescriptions; optional **patientId** narrows to one linked patient (403 if not linked). **Patient:** only their prescriptions. **Admin/SuperAdmin:** optional patientId and doctorId filters. Query: status, page, limit.', true, [q('patientId', 'Doctor: filter to one linked patient. Admin: filter by patient ID.'), q('doctorId', 'Admin/SuperAdmin only — filter by doctor ID'), q('status', 'Draft | Pending | Approved | Filled | Cancelled'), q('page'), q('limit')]);
s('/prescriptions/patient/{patientId}/latest', 'get', [DOCTOR_TAGS.PRESCRIPTIONS, DOCTOR_PATIENTS_SECTION], 'Doctor only. Newest prescription you issued for this patient (prescriptionDate desc, then id). Same JSON as GET /prescriptions/{id}; use returned id with PUT /prescriptions/{id} for notes, status, First Visit fields, etc. Add drugs with POST /prescriptions/{id}/medicines. Requires patient–doctor link.', true, [p('patientId')], undefined, { '403': 'Patient not linked to your practice', '404': 'No prescription from this doctor for this patient' });
s('/prescriptions', 'post', [DOCTOR_TAGS.PRESCRIPTIONS, DOCTOR_PATIENTS_SECTION, DOCTOR_ADD_DRUG_SECTION], 'Create prescription. Doctor only. doctorId is resolved automatically from the JWT token (do NOT pass doctorId in body when calling as Doctor). Required: patientId, items or medicationPlan; each item: medicineName (required), tradeNameId?, activeSubstanceId?, dosageAmount?, frequencyCount?, durationValue?, etc. Runs drug-safety check. First Visit fields: conditionDiagnosis, initialCheckUp, testResultsOrScans, followUpAppointmentDate.', true, [], { schemaRef: 'CreatePrescriptionRequest' });
s('/prescriptions/batch', 'post', [DOCTOR_TAGS.PRESCRIPTIONS, DOCTOR_PATIENTS_SECTION], 'Batch-create prescriptions: one Prescription per medicine, each with one PatientMedicine + PrescriptionMedicine. Runs drug-safety and batch-interaction checks. Doctor only. doctorId is resolved from JWT token — do NOT pass it in body.', true, [], { schemaRef: 'BatchPrescriptionsRequest' });
s('/prescriptions/interactions/{alertId}/acknowledge', 'put', [WARNING_SYSTEM_SECTION, PATIENT_TAGS.PRESCRIPTIONS, PATIENT_TAGS.DRUG_SAFETY, DOCTOR_TAGS.DRUG_SAFETY, DOCTOR_PATIENTS_SECTION], 'Acknowledge a drug interaction alert. The acknowledgedBy field (doctor or patient) is derived automatically from the caller\'s role — no need to pass it in the request body. Requires Doctor or Patient role.', true, [p('alertId')]);
s('/prescriptions/{prescriptionId}/medicines', 'post', [DOCTOR_TAGS.PRESCRIPTIONS, DOCTOR_PATIENTS_SECTION, DOCTOR_ADD_DRUG_SECTION], 'Add one medicine to an existing prescription (draft). Doctor must own the prescription. Body: AddMedicineToPrescriptionRequest (medicineName required, tradeNameId?, activeSubstanceId?, dosageAmount?, frequencyCount?, durationValue?, etc.). Returns prescription with prescriptionMedicines and patientMedicine.', true, [p('prescriptionId')], { schemaRef: 'AddMedicineToPrescriptionRequest' });
s('/prescriptions/{prescriptionId}/interactions', 'get', [WARNING_SYSTEM_SECTION, PATIENT_TAGS.PRESCRIPTIONS, PATIENT_TAGS.DRUG_SAFETY, DOCTOR_TAGS.DRUG_SAFETY, DOCTOR_PATIENTS_SECTION], 'Get drug interaction alerts for a prescription. Requires Doctor (own prescriptions), Patient (own prescriptions), or Admin role.', true, [p('prescriptionId')]);
s('/prescriptions/{id}', 'get', [PATIENT_TAGS.PRESCRIPTIONS, DOCTOR_TAGS.PRESCRIPTIONS, DOCTOR_PATIENTS_SECTION], 'Get prescription by ID. Ownership enforced: Doctor must own it, Patient must be the subject. Response includes prescriptionMedicines (sortOrder) with nested patientMedicine (tradeName, activeSubstance, dosageAmount, frequencyCount, durationValue, notes).', true, [p('id')]);
s('/prescriptions/{id}', 'put', [DOCTOR_TAGS.PRESCRIPTIONS, DOCTOR_PATIENTS_SECTION], 'Update a prescription. Doctor must own the prescription. Requires Doctor or Admin role.', true, [p('id')], { schemaRef: 'UpdatePrescriptionRequest' });
s('/prescriptions/{id}', 'delete', [DOCTOR_TAGS.PRESCRIPTIONS, DOCTOR_PATIENTS_SECTION], 'Soft-delete a prescription (sets status to Cancelled). Doctor must own the prescription. Requires Doctor or Admin role.', true, [p('id')]);

// PRESCRIPTION VERSIONS
s('/prescription-versions/prescription/{prescriptionId}', 'get', [PATIENT_TAGS.PRESCRIPTIONS, DOCTOR_TAGS.PRESCRIPTIONS, DOCTOR_PATIENTS_SECTION], 'Get all versions of a prescription', true, [p('prescriptionId')]);
s('/prescription-versions/prescription/{prescriptionId}', 'post', [DOCTOR_TAGS.PRESCRIPTIONS, DOCTOR_PATIENTS_SECTION], 'Create a new prescription version', true, [p('prescriptionId')], { schemaRef: 'CreatePrescriptionVersionRequest' });
s('/prescription-versions/prescription/{prescriptionId}/compare', 'get', [PATIENT_TAGS.PRESCRIPTIONS, DOCTOR_TAGS.PRESCRIPTIONS, DOCTOR_PATIENTS_SECTION], 'Compare two prescription versions', true, [p('prescriptionId'), q('version1'), q('version2')]);
s('/prescription-versions/{id}', 'get', [PATIENT_TAGS.PRESCRIPTIONS, DOCTOR_TAGS.PRESCRIPTIONS, DOCTOR_PATIENTS_SECTION], 'Get a specific prescription version', true, [p('id')]);

// APPOINTMENTS
s('/appointments', 'post', [PATIENT_TAGS.CONSULTATIONS_VISITS, DOCTOR_TAGS.CONSULTATIONS_VISITS, DOCTOR_PATIENTS_SECTION], 'Create an appointment. Requires Doctor or Patient role.', true, [], { schemaRef: 'CreateAppointmentRequest' });
s('/appointments/patient/{patientId}', 'get', [PATIENT_TAGS.CONSULTATIONS_VISITS, DOCTOR_PATIENTS_SECTION], 'Get all appointments for a patient. Requires Doctor, Patient, or Admin role.', true, [p('patientId')]);
s('/appointments/doctor/{doctorId}/today', 'get', [DOCTOR_TAGS.CONSULTATIONS_VISITS, DOCTOR_PATIENTS_SECTION], "Get today's appointments for a doctor. Requires Doctor or Admin role.", true, [p('doctorId')]);
s('/appointments/doctor/{doctorId}', 'get', [DOCTOR_TAGS.CONSULTATIONS_VISITS, DOCTOR_PATIENTS_SECTION], 'Get all appointments for a doctor. Requires Doctor or Admin role.', true, [p('doctorId')]);
s('/appointments/{id}', 'get', [PATIENT_TAGS.CONSULTATIONS_VISITS, DOCTOR_TAGS.CONSULTATIONS_VISITS, DOCTOR_PATIENTS_SECTION], 'Get appointment by ID. Requires Doctor, Patient, or Admin role.', true, [p('id')]);
s('/appointments/{id}', 'put', [PATIENT_TAGS.CONSULTATIONS_VISITS, DOCTOR_TAGS.CONSULTATIONS_VISITS, DOCTOR_PATIENTS_SECTION], 'Update an appointment. Requires Doctor, Patient, or Admin role.', true, [p('id')], { schemaRef: 'UpdateAppointmentRequest' });
s('/appointments/{id}/cancel', 'post', [PATIENT_TAGS.CONSULTATIONS_VISITS, DOCTOR_TAGS.CONSULTATIONS_VISITS, DOCTOR_PATIENTS_SECTION], 'Cancel an appointment. Requires Doctor, Patient, or Admin role.', true, [p('id')]);
s('/appointments/{id}/confirm', 'post', [DOCTOR_TAGS.CONSULTATIONS_VISITS, DOCTOR_PATIENTS_SECTION], 'Confirm an appointment. Doctor only.', true, [p('id')]);
s('/appointments/{id}/complete', 'post', [DOCTOR_TAGS.CONSULTATIONS_VISITS, DOCTOR_PATIENTS_SECTION], 'Mark appointment as completed. Doctor only.', true, [p('id')]);

// CONSULTATIONS
s('/consultations', 'post', [PATIENT_TAGS.CONSULTATIONS_VISITS, DOCTOR_TAGS.CONSULTATIONS_VISITS, DOCTOR_PATIENTS_SECTION], 'Create a consultation', true, [], { schemaRef: 'CreateConsultationRequest' });
s('/consultations/{id}', 'get', [PATIENT_TAGS.CONSULTATIONS_VISITS, DOCTOR_TAGS.CONSULTATIONS_VISITS, DOCTOR_PATIENTS_SECTION], 'Get consultation by ID', true, [p('id')]);
s('/consultations/{id}', 'put', [PATIENT_TAGS.CONSULTATIONS_VISITS, DOCTOR_TAGS.CONSULTATIONS_VISITS, DOCTOR_PATIENTS_SECTION], 'Update a consultation', true, [p('id')], { schemaRef: 'UpdateConsultationRequest' });
s('/consultations/{id}', 'delete', [PATIENT_TAGS.CONSULTATIONS_VISITS, DOCTOR_TAGS.CONSULTATIONS_VISITS, DOCTOR_PATIENTS_SECTION], 'Delete a consultation', true, [p('id')]);
s('/consultations/patient/{patientId}', 'get', PATIENT_TAGS.CONSULTATIONS_VISITS, 'Get consultations for a patient', true, [p('patientId')]);
s('/consultations/doctor/{doctorId}', 'get', [DOCTOR_TAGS.CONSULTATIONS_VISITS, DOCTOR_PATIENTS_SECTION], 'Get consultations for a doctor', true, [p('doctorId')]);
s('/consultations/doctor/{doctorId}/followups', 'get', [DOCTOR_TAGS.CONSULTATIONS_VISITS, DOCTOR_PATIENTS_SECTION], 'Get upcoming follow-ups for a doctor', true, [p('doctorId')]);

// VISITS
s('/visits', 'post', [PATIENT_TAGS.CONSULTATIONS_VISITS, DOCTOR_TAGS.CONSULTATIONS_VISITS, DOCTOR_PATIENTS_SECTION], 'Create a visit record', true, [], { schemaRef: 'CreateVisitRequest' });
s('/visits/{id}', 'get', [PATIENT_TAGS.CONSULTATIONS_VISITS, DOCTOR_TAGS.CONSULTATIONS_VISITS, DOCTOR_PATIENTS_SECTION], 'Get visit by ID', true, [p('id')]);
s('/visits/{id}', 'patch', [PATIENT_TAGS.CONSULTATIONS_VISITS, DOCTOR_TAGS.CONSULTATIONS_VISITS, DOCTOR_PATIENTS_SECTION], 'Update a visit', true, [p('id')], { schemaRef: 'UpdateVisitRequest' });
s('/visits/{id}', 'delete', [PATIENT_TAGS.CONSULTATIONS_VISITS, DOCTOR_TAGS.CONSULTATIONS_VISITS, DOCTOR_PATIENTS_SECTION], 'Delete a visit', true, [p('id')]);
s('/visits/patient/{patientId}', 'get', [PATIENT_TAGS.CONSULTATIONS_VISITS, DOCTOR_PATIENTS_SECTION], 'Get all visits for a patient', true, [p('patientId')]);
s('/visits/doctor/{doctorId}', 'get', [DOCTOR_TAGS.CONSULTATIONS_VISITS, DOCTOR_PATIENTS_SECTION], 'Get all visits for a doctor', true, [p('doctorId')]);

// MEDICAL REPORTS
s('/medical-reports', 'post', [PATIENT_TAGS.CONSULTATIONS_VISITS, DOCTOR_TAGS.MEDICAL_REPORTS, DOCTOR_PATIENTS_SECTION], 'Create a medical report', true, [], { schemaRef: 'CreateMedicalReportRequest' });
s('/medical-reports/patient/{patientId}', 'get', [PATIENT_TAGS.CONSULTATIONS_VISITS, DOCTOR_TAGS.MEDICAL_REPORTS, DOCTOR_PATIENTS_SECTION], 'Get all medical reports for a patient', true, [p('patientId')]);
s('/medical-reports/{id}', 'get', [PATIENT_TAGS.CONSULTATIONS_VISITS, DOCTOR_TAGS.MEDICAL_REPORTS, DOCTOR_PATIENTS_SECTION], 'Get medical report by ID', true, [p('id')]);
s('/medical-reports/{id}', 'patch', [DOCTOR_TAGS.MEDICAL_REPORTS, DOCTOR_PATIENTS_SECTION], 'Update a medical report', true, [p('id')], { schemaRef: 'UpdateMedicalReportRequest' });
s('/medical-reports/{id}', 'delete', [PATIENT_TAGS.CONSULTATIONS_VISITS, DOCTOR_TAGS.MEDICAL_REPORTS, DOCTOR_PATIENTS_SECTION], 'Delete a medical report', true, [p('id')]);
s('/medical-reports/{id}/upload', 'post', [DOCTOR_TAGS.MEDICAL_REPORTS, DOCTOR_PATIENTS_SECTION], 'Upload a file for a medical report', true, [p('id')]);

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
s('/notifications', 'post', ADMIN_TAG, 'Create a notification. Admin/SuperAdmin only.', true, [], { schemaRef: 'CreateNotificationRequest' });
s('/notifications/user/{userId}', 'get', [PATIENT_TAGS.NOTIFICATIONS, DOCTOR_TAGS.NOTIFICATIONS, PHARMACIST_TAGS.NOTIFICATIONS], 'Get all notifications for a user', true, [p('userId')]);
s('/notifications/user/{userId}/read-all', 'patch', [PATIENT_TAGS.NOTIFICATIONS, DOCTOR_TAGS.NOTIFICATIONS, PHARMACIST_TAGS.NOTIFICATIONS], 'Mark all notifications as read', true, [p('userId')]);
s('/notifications/{id}/read', 'patch', [PATIENT_TAGS.NOTIFICATIONS, DOCTOR_TAGS.NOTIFICATIONS, PHARMACIST_TAGS.NOTIFICATIONS], 'Mark a single notification as read', true, [p('id')]);
s('/notifications/{id}', 'delete', [PATIENT_TAGS.NOTIFICATIONS, DOCTOR_TAGS.NOTIFICATIONS, PHARMACIST_TAGS.NOTIFICATIONS], 'Delete a notification', true, [p('id')]);
s('/notifications/appointment-reminders', 'post', ADMIN_TAG, 'Trigger appointment reminder notifications');

// BATCH NUMBER CHECK (trade name can have many batch numbers in BatchHistory)
s('/batch-check/trade-name/{tradeNameId}', 'get', [WARNING_SYSTEM_SECTION, PATIENT_TAGS.MEDICATIONS, PATIENT_TAGS.DRUG_SAFETY, ADMIN_TAG], 'List all batch numbers for a trade name. A trade name can have many batches (e.g. last 3 months from contracted companies). Returns tradeNameId, count, and batches array. Requires authentication.', true, [p('tradeNameId')]);
s('/batch-check', 'post', [WARNING_SYSTEM_SECTION, PATIENT_TAGS.MEDICATIONS, PATIENT_TAGS.DRUG_SAFETY], 'Check if a batch number is approved (in our database). Send batchNumber in body or upload image of batch section for AI extraction. Returns status: approved | recalled | not_in_database. Requires authentication. Batch numbers are stored per trade name (one trade name has many batch numbers).', true, []);

// DRUG INTERACTIONS
s('/drug-interactions/check-by-trade-name', 'post', [WARNING_SYSTEM_SECTION, DOCTOR_TAGS.DRUG_SAFETY, PATIENT_TAGS.DRUG_SAFETY, DOCTOR_PATIENTS_SECTION], 'Run full warning check for a drug by trade name ID. Returns blocked flag and all warnings (allergy, disease, lifestyle, pregnancy, lactation, age, organ, drug-drug). Doctor: any patient; Patient: own patientId only.', true, [], { schemaRef: 'CheckByTradeNameRequest' });
s('/drug-interactions/check', 'post', [WARNING_SYSTEM_SECTION, DOCTOR_TAGS.DRUG_SAFETY, DOCTOR_PATIENTS_SECTION], 'Check drug safety before prescribing', true, [], { schemaRef: 'DrugSafetyCheckRequest' });
s('/drug-interactions/prescription/{prescriptionId}', 'get', [WARNING_SYSTEM_SECTION, PATIENT_TAGS.DRUG_SAFETY, DOCTOR_TAGS.DRUG_SAFETY, DOCTOR_PATIENTS_SECTION], 'Get interaction alerts for a prescription', false, [p('prescriptionId')]);
s('/drug-interactions/patient/{patientId}', 'get', [WARNING_SYSTEM_SECTION, PATIENT_TAGS.DRUG_SAFETY, DOCTOR_PATIENTS_SECTION], 'Get prescription-linked drug interaction alerts only (stored DrugInteractionAlert for this patient). For aggregated warnings including self-reported medicines use GET /patients/:patientId/warnings.', true, [p('patientId')]);
s('/drug-interactions/{id}/acknowledge-doctor', 'patch', [WARNING_SYSTEM_SECTION, DOCTOR_TAGS.DRUG_SAFETY, DOCTOR_PATIENTS_SECTION], 'Doctor acknowledges an interaction alert', false, [p('id')]);
s('/drug-interactions/{id}/acknowledge-patient', 'patch', [WARNING_SYSTEM_SECTION, PATIENT_TAGS.DRUG_SAFETY], 'Patient acknowledges an interaction alert', false, [p('id')]);

// ADVERSE DRUG REACTIONS
s('/adverse-drug-reactions', 'post', [WARNING_SYSTEM_SECTION, PATIENT_TAGS.DRUG_SAFETY], 'Report an adverse drug reaction', true, [], { schemaRef: 'CreateAdrRequest' });
s('/adverse-drug-reactions', 'get', ADMIN_TAG, 'Get all ADRs (Admin)');
s('/adverse-drug-reactions/statistics/summary', 'get', ADMIN_TAG, 'Get ADR statistics summary');
s('/adverse-drug-reactions/patient/{patientId}', 'get', [WARNING_SYSTEM_SECTION, PATIENT_TAGS.DRUG_SAFETY], 'Get all ADRs for a patient', false, [p('patientId')]);
s('/adverse-drug-reactions/drug/{drugType}/{drugId}', 'get', [WARNING_SYSTEM_SECTION, PATIENT_TAGS.DRUG_SAFETY, DOCTOR_TAGS.DRUG_SAFETY], 'Get ADRs for a specific drug', false, [ps('drugType'), p('drugId')]);
s('/adverse-drug-reactions/{id}', 'get', [WARNING_SYSTEM_SECTION, PATIENT_TAGS.DRUG_SAFETY], 'Get ADR by ID', false, [p('id')]);
s('/adverse-drug-reactions/{id}', 'patch', [WARNING_SYSTEM_SECTION, PATIENT_TAGS.DRUG_SAFETY], 'Update ADR record', false, [p('id')], { schemaRef: 'UpdateAdrRequest' });

// MEDICINE SUGGESTIONS
s('/medicine-suggestions', 'get', [WARNING_SYSTEM_SECTION, DOCTOR_TAGS.DRUG_SAFETY, ADMIN_TAG], 'List medicine suggestions (Doctor sees own, Admin sees all)', true, [q('status')]);
s('/medicine-suggestions', 'post', [WARNING_SYSTEM_SECTION, DOCTOR_TAGS.DRUG_SAFETY], 'Create a medicine suggestion (Doctor only)', true, [], { schemaRef: 'CreateMedicineSuggestionRequest' });
s('/medicine-suggestions/{id}', 'get', [WARNING_SYSTEM_SECTION, DOCTOR_TAGS.DRUG_SAFETY, ADMIN_TAG], 'Get suggestion by ID', true, [p('id')]);
s('/medicine-suggestions/{id}', 'delete', [WARNING_SYSTEM_SECTION, DOCTOR_TAGS.DRUG_SAFETY], 'Delete a suggestion', true, [p('id')]);
s('/medicine-suggestions/{id}/review', 'patch', ADMIN_TAG, 'Review / approve suggestion (Admin)', true, [p('id')], { schemaRef: 'ReviewMedicineSuggestionRequest' });

// ACTIVE SUBSTANCES
s('/active-substances', 'post', ADMIN_TAG, 'Create an active substance (Admin/Company)', true, [], { schemaRef: 'CreateActiveSubstanceRequest' });
s('/active-substances/classifications', 'get', [DOCTOR_ADD_DRUG_SECTION, DOCTOR_TAGS.PRESCRIPTIONS], 'Step 1: Search classifications for the active substance (dropdown / autocomplete). Doctor only.', true, [q('q', 'Filter classifications by substring (case-insensitive)')]);
s('/active-substances/concentrations', 'get', [DOCTOR_ADD_DRUG_SECTION, DOCTOR_TAGS.PRESCRIPTIONS], 'List concentrations (Conc for this API). Optional: q, classification, activeSubstanceId. Returns { concentrations: string[] }. Doctor only.', true, [q('q'), q('classification'), q('activeSubstanceId')]);
s('/active-substances/dosage-forms', 'get', [DOCTOR_ADD_DRUG_SECTION, DOCTOR_TAGS.PRESCRIPTIONS], 'Step 3: List dosage forms (optionally filtered by classification and/or selected active substance). Doctor only.', true, [q('q'), q('classification'), q('activeSubstanceId')]);
s('/active-substances/search', 'get', [WARNING_SYSTEM_SECTION, DOCTOR_ADD_DRUG_SECTION, DOCTOR_TAGS.PRESCRIPTIONS, PATIENT_TAGS.DRUG_SAFETY], 'Search active substances. Pass optional **patientId** to receive a `safetyStatus` on every result (statusColor RED/ORANGE/GREEN, blocked flag, warnings array, filteredData). Without patientId, safetyStatus is null. Patient context is pre-loaded once to avoid N+1 queries.', true, [q('search', 'Search by name or classification'), q('q', 'Alias for search'), q('classification', 'Filter by classification (alias: therapeuticClass)'), q('therapeuticClass'), q('patientId', 'Optional. Patient ID — enables real-time Pharma Safety Engine evaluation for each result.'), q('page'), q('limit')]);
s('/active-substances/{id}', 'get', [PATIENT_TAGS.MEDICATIONS, PHARMACIST_TAGS.MEDICATIONS_SEARCH], 'Get active substance by ID', true, [p('id')]);
s('/active-substances/{id}', 'put', ADMIN_TAG, 'Update active substance (Admin/Company)', true, [p('id')], { schemaRef: 'UpdateActiveSubstanceRequest' });
s('/active-substances/{id}', 'delete', ADMIN_TAG, 'Delete active substance (Admin)', true, [p('id')]);
s('/active-substances/{id}/interactions', 'get', [WARNING_SYSTEM_SECTION, PATIENT_TAGS.DRUG_SAFETY, DOCTOR_TAGS.DRUG_SAFETY], 'Get all drug interactions for substance', true, [p('id')]);

// TRADE NAMES
s('/trade-names', 'get', [PATIENT_TAGS.MEDICATIONS, PHARMACIST_TAGS.MEDICATIONS_SEARCH], 'List all trade names');
s('/trade-names', 'post', ADMIN_TAG, 'Create a trade name (Admin/Company)', true, [], { schemaRef: 'CreateTradeNameRequest' });
s('/trade-names/search', 'get', [WARNING_SYSTEM_SECTION, DOCTOR_ADD_DRUG_SECTION, DOCTOR_TAGS.PRESCRIPTIONS, PATIENT_TAGS.DRUG_SAFETY], 'Search trade names. Pass optional **patientId** to receive a `safetyStatus` on every result (statusColor RED/ORANGE/GREEN, blocked flag, warnings array, filteredData). When patientId is provided, excipients are also fetched for allergy checks and patient context is pre-loaded once. Without patientId, safetyStatus is null.', true, [q('q', 'Search text (title or active substance name)'), q('search', 'Alias for q'), q('activeSubstanceId'), q('classification'), q('dosageForm'), q('concentration', 'Filter by active substance concentration e.g. 5 mg'), q('companyId'), q('isActive'), q('availabilityStatus', 'InStock | OutOfStock | Discontinued | Pending'), q('patientId', 'Optional. Patient ID — enables real-time Pharma Safety Engine evaluation for each result.'), q('page'), q('limit')]);
  s('/trade-names/search-by-image', 'post', [PATIENT_TAGS.MEDICATIONS, PHARMACIST_TAGS.MEDICATIONS_SEARCH, DOCTOR_TAGS.PRESCRIPTIONS], 'Search for trade names by image. Upload a medicine package image; AI extracts trade name and active substance, then returns matching trade names from the database.', true);
  s('/trade-names/{id}', 'get', [PATIENT_TAGS.MEDICATIONS, PHARMACIST_TAGS.MEDICATIONS_SEARCH], 'Get trade name by ID', true, [p('id')]);
s('/trade-names/{id}', 'put', ADMIN_TAG, 'Update trade name (Admin/Company)', true, [p('id')], { schemaRef: 'UpdateTradeNameRequest' });
s('/trade-names/{id}', 'delete', ADMIN_TAG, 'Delete trade name (Admin)', true, [p('id')]);

// DISEASES (catalog – Admin adds; Patient picks on Current diseases screen)
s('/diseases', 'get', [PATIENT_TAGS.CURRENT_DISEASES, ADMIN_TAG], 'List all diseases');
s('/diseases', 'post', ADMIN_TAG, 'Create a disease (Admin)', true, [], { schemaRef: 'CreateDiseaseRequest' });
s('/diseases/{id}', 'get', [PATIENT_TAGS.CURRENT_DISEASES, ADMIN_TAG], 'Get disease by ID', true, [p('id')]);
s('/diseases/{id}', 'put', ADMIN_TAG, 'Update disease (Admin)', true, [p('id')], { schemaRef: 'UpdateDiseaseRequest' });
s('/diseases/{id}', 'delete', ADMIN_TAG, 'Delete disease (Admin)', true, [p('id')]);
s('/diseases/warnings', 'post', ADMIN_TAG, 'Create a disease–drug warning mapping (Admin)', true, [], { schemaRef: 'CreateDiseaseWarningRequest' });
s('/diseases/{diseaseId}/warnings', 'get', [PATIENT_TAGS.CURRENT_DISEASES, ADMIN_TAG], 'Get all warnings for a disease', true, [p('diseaseId')]);

// Body System Mappings — configure which ActiveSubstance warning fields the Safety Engine checks for each disease
s('/diseases/{diseaseId}/body-system-mappings', 'get', ADMIN_TAG, 'List all body-system-mappings for a disease. The Safety Engine uses these to know which warning field on the ActiveSubstance to check when a patient has this disease.', true, [p('diseaseId')]);
s('/diseases/body-system-mappings', 'post', ADMIN_TAG, 'Add a single body-system-mapping (Admin). Maps one disease to one ActiveSubstance warning field (e.g. Hypertension → vascularWarning).', true, [], { schemaRef: 'CreateBodySystemMappingRequest' }, { '201': 'Mapping created', '409': 'Mapping already exists for this disease+field' });
s('/diseases/body-system-mappings/bulk', 'put', ADMIN_TAG, 'Bulk-replace all body-system-mappings for a disease (Admin). Atomically deletes existing mappings and inserts the new set. Ideal for the admin UI "save all" action.', true, [], { schemaRef: 'BulkBodySystemMappingRequest' });
s('/diseases/body-system-mappings/{id}', 'delete', ADMIN_TAG, 'Remove a single body-system-mapping by its ID (Admin)', true, [p('id')], undefined, { '200': 'Deleted', '404': 'Mapping not found' });

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
// Admin - Side Effects Management
s('/admin/side-effects', 'post', ADMIN_TAG, 'Create a new side effect and optionally link to trade names (drugs)', true, [], { schemaRef: 'AdminCreateSideEffectRequest' }, { '201': 'Side effect created' });
  s('/admin/side-effects', 'get', ADMIN_TAG, 'List all side effects with their linked trade names (drugs)');
  s('/admin/side-effects/pending', 'get', ADMIN_TAG, 'List patient-submitted side effects pending approval');
  s('/admin/side-effects/{id}', 'put', ADMIN_TAG, 'Update a side effect (e.g. rename)', true, [p('id')], { schemaRef: 'AdminUpdateSideEffectRequest' });
  s('/admin/side-effects/{id}/trade-names', 'post', ADMIN_TAG, 'Attach trade names (drugs) to side effect', true, [p('id')], { schemaRef: 'AdminAttachTradeNamesRequest' });
  s('/admin/side-effects/{id}/trade-names/{tradeNameId}', 'delete', ADMIN_TAG, 'Remove a trade name from a side effect', true, [p('id'), p('tradeNameId')]);
s('/admin/side-effects/{id}/approve', 'patch', ADMIN_TAG, 'Approve a patient-submitted side effect (makes it visible in mobile app)', true, [p('id')]);

s('/admin/statistics', 'get', ADMIN_TAG, 'Get platform statistics');
s('/admin/audit-logs', 'get', ADMIN_TAG, 'Get audit logs');

// SETTINGS
s('/settings/logo', 'get', ADMIN_TAG, 'Get application logo (public)', false);
s('/settings/logo', 'post', ADMIN_TAG, 'Upload / update application logo (Admin)');
s('/settings/nearby-doctors-radius', 'get', ADMIN_TAG, 'Get nearby doctors search radius in km (Admin). Used by GET /doctors/nearby.', true);
s('/settings/nearby-doctors-radius', 'put', ADMIN_TAG, 'Set nearby doctors search radius in km (Admin). Body: { radiusKm: number } (1–500).', true, [], { schemaRef: 'PutNearbyDoctorsRadiusRequest' });

// PATIENT SHARE TOKEN (QR Code sharing)
s('/patient-share-token/generate', 'post', [PATIENT_TAGS.SHARE_WITH_DOCTOR, DOCTOR_TAGS.MY_PATIENTS, DOCTOR_PATIENTS_SECTION], 'Generate a secure QR code token for sharing profile with a doctor (Patient only). Returns token + QR code base64 data URL. Token expires in 10 minutes.', true, [], undefined, { '201': 'Token generated successfully (token, expiresAt, qrCode base64)' });
s('/patient-share-token/redeem', 'post', [PATIENT_TAGS.SHARE_WITH_DOCTOR, DOCTOR_TAGS.MY_PATIENTS, DOCTOR_PATIENTS_SECTION], 'Redeem a patient share QR token (Doctor only). Validates token, creates patient-doctor relationship, sends notifications, returns patient details.', true, [], { schemaRef: 'RedeemShareTokenRequest' }, { '201': 'Patient linked successfully', '404': 'Invalid token or profile not found', '409': 'Patient already linked to this doctor', '410': 'Token expired or already used' });

// SIDE EFFECTS (My Side Effects)
s('/side-effects/by-medication/{medicationId}', 'get', [PATIENT_TAGS.SIDE_EFFECTS, DOCTOR_PATIENTS_SECTION], 'Get known side effects for a patient medication. Returns { supported: false, redirect } if the company is not contracted, or { supported: true, sideEffects } otherwise.', true, [p('medicationId')]);
s('/side-effects/add', 'post', PATIENT_TAGS.SIDE_EFFECTS, 'Add a new side effect name and link it to a medication\'s active substance (Patient only)', true, [], { schemaRef: 'AddSideEffectRequest' }, { '201': 'Side effect created and linked' });
s('/medicines/{tradeNameId}/side-effects', 'get', [PATIENT_TAGS.SIDE_EFFECTS, DOCTOR_PATIENTS_SECTION], 'Extract pre-defined side effects for a trade name from database. Groups by frequency (VeryCommon, Common, Uncommon, Rare, VeryRare, Unknown). Validates active company contract. Returns 403 if no active contract. Includes instructionPdf (id, url, views, timestamps) when the trade name has companyInstructionsPdf; null otherwise.', true, [p('tradeNameId')], undefined, { '403': 'No active contract for this medication', '404': 'Trade name not found' }, 'ExtractSideEffectsResponse');

// INSTRUCTION PDF (Medicine instructions)
s('/trade-names/{tradeNameId}/instruction-pdf/view', 'post', [DOCTOR_TAGS.DRUG_SAFETY, DOCTOR_PATIENTS_SECTION], 'View instruction PDF for a medicine and increment the view counter. Doctor or Admin: call this when opening the PDF so views are tracked. Returns PDF metadata including url (not file bytes).', true, [p('tradeNameId')], undefined, { '404': 'Instruction PDF not found for this medicine' }, 'ViewInstructionPdfResponse');
s('/trade-names/{tradeNameId}/instruction-pdf/stats', 'get', [DOCTOR_TAGS.DRUG_SAFETY, DOCTOR_PATIENTS_SECTION, ADMIN_TAG], 'Get view count statistics for an instruction PDF without incrementing the counter. Authorized: Doctor, Admin, or Company (company users see stats for their products).', true, [p('tradeNameId')], undefined, { '404': 'Instruction PDF not found for this medicine' }, 'GetInstructionPdfStatsResponse');
s('/my-side-effects', 'post', PATIENT_TAGS.SIDE_EFFECTS, 'Report one or more side effects for a medication (Patient only)', true, [], { schemaRef: 'ReportSideEffectsRequest' }, { '201': 'Side effects reported successfully' });
s('/my-side-effects/batch', 'post', PATIENT_TAGS.SIDE_EFFECTS, 'Submit multiple side effects at once with severity and optional notes (Patient only). Each side effect includes sideEffectId, severity (Mild|Moderate|Severe), and optional notes. Returns 409 if duplicate, 403 if medicine not in profile.', true, [], { schemaRef: 'SubmitBatchSideEffectsRequest' }, { '201': 'Side effects submitted pending approval', '403': 'Medicine not in your profile', '409': 'Duplicate submission' });
s('/my-side-effects', 'get', [PATIENT_TAGS.SIDE_EFFECTS, DOCTOR_PATIENTS_SECTION], 'Get all side effects reported by the patient');
s('/my-side-effects/by-medication/{medicationId}', 'get', [PATIENT_TAGS.SIDE_EFFECTS, DOCTOR_PATIENTS_SECTION], 'Get side effects reported by the patient for a specific medication', true, [p('medicationId')]);

// IMPORT
s('/import/active-substances', 'post', ADMIN_TAG, 'Import active substances from Excel/CSV file. Uses fixed column indexes (not header titles). Column 180 (Trade Name) is parsed as comma-separated values and each value is inserted into TradeName linked to the created active substance.');
s('/import/{entityType}', 'post', ADMIN_TAG, 'Generic entity import', true, [ps('entityType')]);
s('/import/history', 'get', ADMIN_TAG, 'Get import history');

// EXPORT
s('/export/active-substances', 'get', ADMIN_TAG, 'Export active substances to Excel');
s('/export/trade-names', 'get', ADMIN_TAG, 'Export trade names to Excel');
s('/export/diseases', 'get', ADMIN_TAG, 'Export diseases to Excel');
s('/export/companies', 'get', ADMIN_TAG, 'Export companies to Excel');
s('/export/history', 'get', ADMIN_TAG, 'Get export history');

// Register accepts multipart when role=Doctor or Pharmacist (license image)
if (paths['/auth/register']?.post) {
  paths['/auth/register'].post.requestBody = {
    required: true,
    content: {
      'multipart/form-data': {
        schema: { $ref: '#/components/schemas/RegisterRequest' }
      }
    }
  };
  paths['/auth/register'].post.responses['201'] = {
    description:
      'User created — OTP sent to email. For Doctor/Pharmacist only: may include licenseNumberVerification (matched when AI read matches the submitted number; not_checked when AI was skipped, failed, or returned nothing readable) and optional hint suggesting a clearer image.',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/RegisterResponse' }
      }
    }
  };
  paths['/auth/register'].post.responses['400'] = {
    description:
      'Validation failed (body often returns { error: Zod issue array }) or license mismatch for Doctor/Pharmacist ({ error: string } when the number read from the image does not match licenseNumber).',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            error: {
              description: 'Either a human-readable string (e.g. license mismatch) or Zod validation issues array',
              oneOf: [
                { type: 'string' },
                { type: 'array', items: { type: 'object' } }
              ]
            }
          }
        }
      }
    }
  };
}

// POST /trade-names/search-by-image: multipart with file field "image"
if (paths['/trade-names/search-by-image']?.post) {
  paths['/trade-names/search-by-image'].post.requestBody = {
    required: true,
    content: {
      'multipart/form-data': {
        schema: {
          type: 'object',
          required: ['image'],
          properties: {
            image: { type: 'string', format: 'binary', description: 'Required. Image of the medicine package (PNG, JPG, JPEG, WebP, GIF, max 10MB). AI extracts trade name and active substance.' }
          }
        }
      }
    }
  };
  paths['/trade-names/search-by-image'].post.responses['200'] = {
    description: 'Extracted data from image and matching trade names from DB.',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            extracted: {
              type: 'object',
              description: 'What the AI read from the image',
              properties: {
                tradeName: { type: 'string' },
                activeSubstance: { type: 'string' },
                concentration: { type: 'string', nullable: true },
                dosageForm: { type: 'string', nullable: true }
              }
            },
            tradeNames: {
              type: 'array',
              items: { $ref: '#/components/schemas/TradeName' },
              description: 'Matching trade names from the database (includes activeSubstance, company)'
            },
            activeSubstances: {
              type: 'array',
              items: { $ref: '#/components/schemas/ActiveSubstance' },
              description: 'Present when no trade name matched but active substance did'
            },
            message: { type: 'string', description: 'Present when extraction failed or returned nothing' }
          }
        }
      }
    }
  };
}

// POST /import/active-substances: multipart with file field "file"
if (paths['/import/active-substances']?.post) {
  paths['/import/active-substances'].post.requestBody = {
    required: true,
    content: {
      'multipart/form-data': {
        schema: {
          type: 'object',
          required: ['file'],
          properties: {
            file: {
              type: 'string',
              format: 'binary',
              description: 'Required. Excel/CSV file. Import uses fixed column indexes; headers are ignored.'
            }
          }
        }
      }
    }
  };

  paths['/import/active-substances'].post.responses['200'] = {
    description: 'Import completed. Creates ActiveSubstance rows and TradeName rows from column 180 (comma-separated).',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Import completed' },
            total: { type: 'integer' },
            successful: { type: 'integer' },
            created: { type: 'integer' },
            updated: { type: 'integer' },
            failed: { type: 'integer' },
            errors: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  row: { type: 'integer' },
                  data: { type: 'string' },
                  error: { type: 'string' }
                }
              }
            }
          }
        }
      }
    }
  };
}

// POST /patient-medicines/patient/:patientId — JSON body (explicit example aligned with AddPatientMedicineRequest)
if (paths['/patient-medicines/patient/{patientId}']?.post) {
  paths['/patient-medicines/patient/{patientId}'].post.requestBody = {
    required: true,
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/AddPatientMedicineRequest' },
        example: {
          medicineName: 'Metformin 500mg',
          tradeNameId: 23,
          dosageAmount: 500,
          frequencyCount: 2,
          frequencyPeriod: 8,
          frequencyUnit: 'Hours',
          durationValue: 30,
          durationUnit: 'Days',
          startDate: '2026-01-01T08:00:00.000Z',
          endDate: '2026-07-01T23:59:59.000Z',
          isOngoing: true,
          notes: 'Take with food',
          reminderEnabled: true,
          reminderTimes: ['08:00', '14:00', '20:00']
        }
      }
    }
  };
}

// Upload medicine image: multipart with file field "image" (AI extracts trade name, active substance, concentration, dosage form)
if (paths['/patient-medicines/patient/{patientId}/upload-image']?.post) {
  paths['/patient-medicines/patient/{patientId}/upload-image'].post.summary = 'Upload medicine image (AI extracts full drug data; response includes extracted + matched drug details, warnings)';
  paths['/patient-medicines/patient/{patientId}/upload-image'].post.requestBody = {
    required: true,
    content: {
      'multipart/form-data': {
        schema: {
          type: 'object',
          required: ['image'],
          properties: {
            image:           { type: 'string', format: 'binary', description: 'Required. Image of the medicine package (PNG, JPG, JPEG, WebP, GIF, max 10MB).' },
            medicineName:    { type: 'string', description: 'Optional. Fallback name if AI extraction fails.' },
            dosageAmount:    { type: 'number', format: 'float', description: 'Optional.' },
            frequencyCount:  { type: 'integer', description: 'Optional.' },
            frequencyPeriod: { type: 'integer', description: 'Optional.' },
            frequencyUnit:   { type: 'string', enum: ['Hours', 'Days', 'Weeks', 'Months', 'Years'], description: 'Optional.' },
            durationValue:   { type: 'integer', description: 'Optional.' },
            durationUnit:    { type: 'string', enum: ['Days', 'Weeks', 'Months', 'Years'], description: 'Optional.' },
            startDate:       { type: 'string', format: 'date-time', description: 'Optional.' },
            endDate:         { type: 'string', format: 'date-time', description: 'Optional.' },
            isOngoing:       { type: 'boolean', description: 'Optional.' },
            notes:           { type: 'string', description: 'Optional.' },
            reminderEnabled: { type: 'boolean', description: 'Optional. Enable in-app medicine reminders.' },
            reminderTimes:   { type: 'array', items: { type: 'string' }, description: 'Optional. Daily times HH:mm (e.g. ["08:00","14:00","20:00"]).' }
          }
        }
      }
    }
  };
  paths['/patient-medicines/patient/{patientId}/upload-image'].post.responses['201'] = {
    description: 'Created. Returns full detection data: extracted (tradeName, activeSubstance, concentration, dosageForm from image), matchedTradeName (id, title, activeSubstance, company, etc. when matched), matchedActiveSubstance (when only AS matched), plus medicine record, warnings, blocked.',
    content: { 'application/json': { schema: { $ref: '#/components/schemas/UploadMedicineImageResponse' } } }
  };
  paths['/patient-medicines/patient/{patientId}/upload-image'].post.responses['409'] = {
    description: 'Conflict — allergy gate blocked the add. The medicine was NOT saved. Patient has a documented allergy to the detected active substance, trade name, drug classification, or an excipient in this medicine.',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/AllergyGateBlockedResponse' }
      }
    }
  };
}

// POST /batch-check: optional batchNumber (body) or image (multipart) for AI extraction
if (paths['/batch-check']?.post) {
  paths['/batch-check'].post.requestBody = {
    required: false,
    content: {
      'application/json': {
        schema: { type: 'object', properties: { batchNumber: { type: 'string', description: 'Batch or lot number to check.' } } }
      },
      'multipart/form-data': {
        schema: {
          type: 'object',
          properties: {
            batchNumber: { type: 'string', description: 'Optional. Type batch number manually.' },
            image:       { type: 'string', format: 'binary', description: 'Optional. Image of batch number on package; AI extracts batch number.' }
          }
        }
      }
    }
  };
  paths['/batch-check'].post.responses['200'] = {
    description: 'approved: batch in database and not recalled. recalled: batch in database but recalled. not_in_database: batch number not in our system (some companies do not share batch data).',
    content: { 'application/json': { schema: { $ref: '#/components/schemas/BatchCheckResponse' } } }
  };
}

// GET /batch-check/trade-name/:tradeNameId: document 200 response
if (paths['/batch-check/trade-name/{tradeNameId}']?.get) {
  paths['/batch-check/trade-name/{tradeNameId}'].get.responses['200'] = {
    description: 'List of all batch numbers for this trade name. A trade name can have many batches.',
    content: { 'application/json': { schema: { $ref: '#/components/schemas/BatchListByTradeNameResponse' } } }
  };
}

// POST /auth/login: document both 200 cases with named examples
if (paths['/auth/login']?.post) {
  paths['/auth/login'].post.responses['200'] = {
    description: 'Login result. Two distinct shapes: **success** (tokens + user) or **inactive account** (isActive: false, no tokens). Always check `isActive` before storing tokens.',
    content: {
      'application/json': {
        examples: {
          success_patient: {
            summary: 'Successful login — Patient',
            value: {
              message: 'Login successful',
              accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
              refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
              user: { id: 12, email: 'patient@greenrx.com', role: 'Patient', patientId: 5 }
            }
          },
          success_doctor: {
            summary: 'Successful login — Doctor',
            value: {
              message: 'Login successful',
              accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
              refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
              user: { id: 7, email: 'dr.smith@greenrx.com', role: 'Doctor', doctorId: 2, isVerified: true }
            }
          },
          success_pharmacist: {
            summary: 'Successful login — Pharmacist',
            value: {
              message: 'Login successful',
              accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
              refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
              user: { id: 9, email: 'pharmacist@greenrx.com', role: 'Pharmacist', pharmacistId: 3, isVerified: true }
            }
          },
          account_inactive: {
            summary: '⚠️ Account deactivated — NO tokens returned',
            description: 'The account exists but isActive is false. The client must NOT store tokens (none are returned). Show an "account suspended / contact support" message.',
            value: {
              name: 'John Doe',
              email: 'john@greenrx.com',
              role: 'Patient',
              isActive: false
            }
          }
        }
      }
    }
  };
}

// GET /auth/me: document 200 response with user fields including name
if (paths['/auth/me']?.get) {
  paths['/auth/me'].get.responses['200'] = {
    description: 'Success',
    content: { 'application/json': { schema: { $ref: '#/components/schemas/AuthMeResponse' } } }
  };
}

// GET /patients/:patientId/warnings: document 200 response
if (paths['/patients/{patientId}/warnings']?.get) {
  paths['/patients/{patientId}/warnings'].get.responses['200'] = {
    description: 'Aggregated warnings for current prescriptions and self-reported medicines.',
    content: { 'application/json': { schema: { $ref: '#/components/schemas/PatientWarningsResponse' } } }
  };
}

// GET /doctors/me/stats: document 200 response
if (paths['/doctors/me/stats']?.get) {
  paths['/doctors/me/stats'].get.responses['200'] = {
    description: 'Doctor statistics (patients, prescriptions, consultations, appointments, visits, ratings, clinics, averageRating).',
    content: { 'application/json': { schema: { $ref: '#/components/schemas/DoctorMeStatsResponse' } } }
  };
}

// GET /patients/me/full: full profile including prescription history
if (paths['/patients/me/full']?.get) {
  paths['/patients/me/full'].get.responses['200'] = {
    description: 'Patient full details including prescriptions (newest first).',
    content: { 'application/json': { schema: { $ref: '#/components/schemas/PatientMeFullResponse' } } }
  };
}

// GET /doctors/:doctorId/patients/:patientId: full chart + relationship + prescriptions
if (paths['/doctors/{doctorId}/patients/{patientId}']?.get) {
  paths['/doctors/{doctorId}/patients/{patientId}'].get.responses['200'] = {
    description: 'Linked patient full file with prescription history and doctor–patient relationship metadata.',
    content: { 'application/json': { schema: { $ref: '#/components/schemas/DoctorPatientProfileResponse' } } }
  };
  paths['/doctors/{doctorId}/patients/{patientId}'].get.responses['404'] = {
    description: 'Patient not found or not linked to this doctor'
  };
}

// GET /prescriptions/patient/:patientId/latest — full prescription for doctor edit flow
if (paths['/prescriptions/patient/{patientId}/latest']?.get) {
  paths['/prescriptions/patient/{patientId}/latest'].get.responses['200'] = {
    description: 'Full prescription object (same fields as GET /prescriptions/{id}): prescriptionMedicines with patientMedicine, patient allergies/diseases, drugInteractionAlerts, prescriptionVersions, visit, etc.',
    content: {
      'application/json': {
        schema: { type: 'object', additionalProperties: true, description: 'Prescription with relations; mirror GET /prescriptions/{id}.' }
      }
    }
  };
}

// GET /prescriptions: paginated list (doctor may pass patientId when linked)
if (paths['/prescriptions']?.get) {
  paths['/prescriptions'].get.responses['200'] = {
    description: 'Paginated prescriptions. Doctor: own prescriptions only; optional patientId when linked. Patient: own only. Admin: optional filters.',
    content: { 'application/json': { schema: { $ref: '#/components/schemas/PrescriptionsListResponse' } } }
  };
  paths['/prescriptions'].get.responses['403'] = { description: 'Doctor requested patientId for a patient not linked to them' };
  paths['/prescriptions'].get.responses['400'] = { description: 'Invalid patientId' };
}

// POST /prescriptions — explicit `examples` so Swagger UI "Example Value" matches schema (avoids auto-sample from per-property examples)
if (paths['/prescriptions']?.post) {
  const prescriptionCreateSampleMedication = {
    medicineName: 'Metformin 500mg',
    tradeNameId: 23,
    dosageAmount: 500,
    frequencyCount: 2,
    frequencyPeriod: 8,
    frequencyUnit: 'Hours',
    durationValue: 30,
    durationUnit: 'Days',
    notes: 'Take with food'
  };
  const prescriptionCreateSampleCommon = {
    patientId: 5,
    conditionDiagnosis: 'Type 2 Diabetes Mellitus',
    initialCheckUp: { height: 175, weight: 80, bloodPressure: '130/85', bloodGlucose: 140 },
    testResultsOrScans: ['hba1c_march2026.pdf'],
    followUpAppointmentDate: '2026-04-15T09:00:00.000Z',
    maxRefills: 2,
    notes: 'Monitor HbA1c in 3 months'
  };
  paths['/prescriptions'].post.requestBody = {
    required: true,
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/CreatePrescriptionRequest' },
        examples: {
          usingItems: {
            summary: 'Using items[] (recommended)',
            description: 'Send a non-empty **items** array. Do not duplicate the same drugs under **medicationPlan**.',
            value: {
              ...prescriptionCreateSampleCommon,
              items: [prescriptionCreateSampleMedication]
            }
          },
          usingMedicationPlan: {
            summary: 'Using medicationPlan[] (alias)',
            description: 'Same payload shape as **items**; only the property name changes.',
            value: {
              ...prescriptionCreateSampleCommon,
              medicationPlan: [prescriptionCreateSampleMedication]
            }
          }
        }
      }
    }
  };
}

// GET /active-substances/search: document 200 response (with safetyStatus shape)
if (paths['/active-substances/search']?.get) {
  paths['/active-substances/search'].get.responses['200'] = {
    description: 'Paginated list of active substances. Each item includes a `safetyStatus` field (SafetyEvalResult) when patientId is supplied, otherwise null.',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            substances: {
              type: 'array',
              items: {
                allOf: [
                  { $ref: '#/components/schemas/ActiveSubstance' },
                  {
                    type: 'object',
                    properties: {
                      safetyStatus: { $ref: '#/components/schemas/SafetyEvalResult' }
                    }
                  }
                ]
              }
            },
            pagination: { $ref: '#/components/schemas/Pagination' }
          }
        }
      }
    }
  };
}

// GET /trade-names/search: document 200 response (with safetyStatus shape)
if (paths['/trade-names/search']?.get) {
  paths['/trade-names/search'].get.responses['200'] = {
    description:
      'Paginated trade names. Each element is a full `TradeName` (id, title, activeSubstance, company, companyInstructionsPdf, optional excipientTradeName when `patientId` is set) plus `safetyStatus`: a `SafetyEvalResult` when `patientId` query is provided, otherwise `null`.',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          required: ['tradeNames', 'pagination'],
          properties: {
            tradeNames: {
              type: 'array',
              items: {
                allOf: [
                  { $ref: '#/components/schemas/TradeName' },
                  {
                    type: 'object',
                    required: ['safetyStatus'],
                    properties: {
                      safetyStatus: { $ref: '#/components/schemas/SafetyEvalResult' }
                    }
                  }
                ]
              }
            },
            pagination: { $ref: '#/components/schemas/Pagination' }
          }
        },
        example: {
          tradeNames: [
            {
              id: 12,
              title: 'Crestor 5mg',
              activeSubstanceId: 7,
              companyId: 2,
              warningNotification: null,
              barCode: '6224000123456',
              availabilityStatus: 'InStock',
              isActive: true,
              createdAt: '2026-01-15T08:00:00.000Z',
              updatedAt: '2026-03-01T12:00:00.000Z',
              deletedAt: null,
              activeSubstance: {
                id: 7,
                name: 'Rosuvastatin',
                classificationId: 4,
                dosageForm: 'Tablet'
              },
              company: { id: 2, name: 'AstraZeneca' },
              companyInstructionsPdf: {
                id: 1,
                url: 'https://storage.example.com/instructions/crestor.pdf',
                views: 3,
                tradeNameId: 12,
                createdAt: '2026-04-01T10:00:00.000Z',
                updatedAt: '2026-04-01T10:00:00.000Z'
              },
              excipientTradeName: [
                {
                  id: 50,
                  excipientId: 3,
                  tradeNameId: 12,
                  isActive: true,
                  createdAt: '2026-01-10T00:00:00.000Z',
                  updatedAt: '2026-01-10T00:00:00.000Z',
                  excipient: { id: 3, name: 'Lactose' }
                }
              ],
              safetyStatus: {
                statusColor: 'ORANGE',
                blocked: false,
                warnings: [
                  {
                    checkType: 'disease',
                    severity: 'Medium',
                    statusColor: 'ORANGE',
                    message:
                      'Patient has Hypertension. Drug has Vascular ADR data containing relevant keywords.',
                    blocked: false
                  }
                ],
                filteredData: {
                  excipients: 'Lactose',
                  vascularWarning: 'Hypertension reported in ≥1% of patients.',
                  specialPopulationElderly: 'Reduce dose in elderly patients.'
                }
              }
            }
          ],
          pagination: {
            total: 48,
            page: 1,
            limit: 20,
            totalPages: 3
          }
        }
      }
    }
  };
}

// POST /drug-interactions/check-by-trade-name: document 200 response
if (paths['/drug-interactions/check-by-trade-name']?.post) {
  paths['/drug-interactions/check-by-trade-name'].post.responses['200'] = {
    description: 'Full warning check result: blocked flag and list of warnings (severity, type, message).',
    content: { 'application/json': { schema: { $ref: '#/components/schemas/CheckByTradeNameResponse' } } }
  };
}

// ═══════════════════════════════════════════════════════
// OpenAPI definition
// ═══════════════════════════════════════════════════════
const options: Record<string, unknown> = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Green RX Backend API',
      version: '1.0.0',
      description: 'Full API documentation for the Green RX platform. **Request bodies:** Each schema lists Required vs Optional fields. Where IDs or enums are needed (e.g. diseaseId, relation, tradeNameId), the description points to the endpoint to get values (e.g. GET /diseases, GET /family-relations, GET /trade-names/search). Update requests typically accept partial bodies (all fields optional).'
    },
    servers: [
      { url: 'https://green-back.developteam.site/api', description: 'Production server' },
      { url: apiBase, description: 'Local development server' }
    ],
    tags: [
      { name: ADMIN_TAG, description: 'Health, users, admin, settings, import/export' },
      { name: WARNING_SYSTEM_SECTION, description: 'All endpoints that participate in the Warning System / Pharma Safety Engine (safetyStatus RED/ORANGE/GREEN, warnings, blocked, filteredData) + interaction alerts + ADR.' },
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
      { name: PATIENT_TAGS.SIDE_EFFECTS, description: 'Report and view medication side effects' },
      { name: DOCTOR_TAGS.AUTH, description: 'Authentication (Doctor)' },
      { name: DOCTOR_PATIENTS_SECTION, description: 'All doctor capabilities with patients: list/search/get details, assign/remove, prescriptions, visits, consultations, medical reports, drug safety, view patient allergies/diseases/medicines.' },
      { name: DOCTOR_ADD_DRUG_SECTION, description: 'Add A New Drug screen: Step 1 — GET /active-substances/classifications. Step 2 — GET /active-substances/search (API, filter by classification). Step 3 — GET /active-substances/concentrations (Conc for this API). Step 4 — GET /active-substances/dosage-forms. Step 5 — GET /trade-names/search (classification, API, concentration, dosage form). Step 6 — POST /prescriptions with medicationPlan (each item: medicineName required, tradeNameId? or manual; creates Prescription + PatientMedicine + PrescriptionMedicine). Optional: POST /prescriptions/:prescriptionId/medicines to add one drug to a draft prescription.' },
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
        // ── Auth response bodies
        RegisterResponse: {
          description: 'Returned after successful registration. Use otpToken as Bearer token when calling POST /otp/verify. The otp field is only present outside production (dev/staging helper for mobile testing). For Doctor and Pharmacist, licenseNumberVerification and hint are present when a license image was uploaded.',
          type: 'object',
          properties: {
            message:  { type: 'string', example: 'User registered successfully and OTP sent to email' },
            otpToken: { type: 'string', description: 'Short-lived JWT. Use as Bearer token when calling POST /otp/verify and POST /otp/resend.', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
            otp:      { type: 'integer', description: 'Dev/staging only — the actual OTP for quick testing. Not present in production.', example: 482910 },
            licenseNumberVerification: {
              type: 'string',
              enum: ['matched', 'not_checked'],
              description: 'Doctor/Pharmacist only. matched = AI read a license number that matches the submitted value after normalization. not_checked = AI unavailable, failed, unreadable image, or empty extraction — registration proceeded for admin review.'
            },
            hint: {
              type: 'string',
              description: 'Doctor/Pharmacist only, optional. Shown with not_checked to suggest uploading a clearer license image later.'
            }
          },
          example: {
            message: 'User registered successfully and OTP sent to email',
            otpToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            otp: 482910
          }
        },
        RefreshTokenResponse: {
          description: 'Returns a new access token. Use it to replace the expired one in subsequent requests.',
          type: 'object',
          properties: {
            accessToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }
          },
          example: { accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }
        },
        ResendOtpResponse: {
          description: 'Returned after successfully resending the OTP. Use the new otpToken as Bearer token for the next POST /otp/verify call.',
          type: 'object',
          properties: {
            message:  { type: 'string', example: 'OTP resent successfully' },
            otpToken: { type: 'string', description: 'New short-lived JWT replacing the previous one.', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }
          },
          example: { message: 'OTP resent successfully', otpToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }
        },
        MessageResponse: {
          description: 'Simple message response (e.g. logout).',
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Logged out successfully' }
          },
          example: { message: 'Logged out successfully' }
        },

        // ── Auth request bodies
        RegisterRequest: {
          description: 'Create a new user account. Send as multipart/form-data when role=Doctor or Pharmacist. Required: email, password. Optional: role (default Patient), name, phone. When role=Patient, a patient profile is auto-created and the response includes user.patientId. When role=Doctor: name, licenseNumber, specialization, and licenseImage (file) are required; license image is stored under uploads/doctor-licenses/ and the URL is saved as licenseImageUrl on the Doctor profile. When role=Pharmacist: name, licenseNumber, and licenseImage (file) are required; license image is stored under uploads/pharmacist-licenses/ and the URL is saved as licenseImageUrl on the Pharmacist profile. For Doctor/Pharmacist, the server may verify licenseNumber against text extracted from licenseImage via Gemini; mismatch returns 400. Response includes user.doctorId or user.pharmacistId when applicable.',
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email:           { type: 'string', format: 'email', example: 'patient@greenrx.com', description: 'Required.' },
            password:        { type: 'string', minLength: 6, example: 'Password@123', description: 'Required. Min 6 characters.' },
            role:            { type: 'string', enum: ['Patient', 'Doctor', 'Pharmacist', 'Admin', 'SuperAdmin'], default: 'Patient', description: 'Optional. Default: Patient.' },
            name:            { type: 'string', minLength: 2, example: 'John Doe', description: 'Required when role=Doctor or Pharmacist.' },
            phone:           { type: 'string', example: '+201145441141', description: 'Optional. E.164 format.' },
            licenseNumber:   { type: 'string', description: 'Required when role=Pharmacist or Doctor. Professional license number. For Pharmacist: send this in the request; it is stored on the Pharmacist profile.' },
            specialization:  { type: 'string', description: 'Required when role=Doctor. Omit for Pharmacist.' },
            licenseImage:    { type: 'string', format: 'binary', description: 'Required when role=Pharmacist or Doctor. License image file (PNG, JPG, etc., max 10MB). Server stores it under uploads/pharmacist-licenses/ (Pharmacist) or uploads/doctor-licenses/ (Doctor) and saves the file URL as licenseImageUrl on the Pharmacist/Doctor profile.' },
            licenseImageUrl: { type: 'string', readOnly: true, description: 'Set by server from uploaded licenseImage. Do not send when registering. After registration, the stored URL is available on the Pharmacist/Doctor profile (e.g. GET /pharmacists or GET /doctors/me).' }
          },
          example: { email: 'patient@greenrx.com', password: 'Password@123', role: 'Patient', name: 'John Doe', phone: '+201145441141' }
        },
        LoginRequest: {
          description: 'Authenticate and get tokens. Required: email, password. Response includes accessToken, refreshToken, user (id, email, role, etc.). When role is Patient, user also includes patientId (use for /patients/me or /patients/:patientId).',
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email:    { type: 'string', format: 'email', example: 'patient@greenrx.com', description: 'Required.' },
            password: { type: 'string', example: 'Password@123', description: 'Required.' }
          },
          example: { email: 'patient@greenrx.com', password: 'Password@123' }
        },
        LoginResponse: {
          description: 'Login result. **Two possible shapes**: (1) Success — includes accessToken, refreshToken, and user object. (2) Inactive account — includes name, email, role, and isActive: false with NO tokens. Always check isActive before storing tokens. user.patientId when role is Patient; user.doctorId and user.isVerified when role is Doctor; user.pharmacistId and user.isVerified when role is Pharmacist.',
          type: 'object',
          properties: {
            message:      { type: 'string', example: 'Login successful' },
            accessToken:  { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
            refreshToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
            user: {
              type: 'object',
              properties: {
                id:           { type: 'integer', example: 12 },
                email:        { type: 'string', example: 'patient@greenrx.com' },
                role:         { type: 'string', example: 'Patient' },
                patientId:    { type: 'integer', example: 5, description: 'Present when role is Patient.' },
                doctorId:     { type: 'integer', example: 2, description: 'Present when role is Doctor.' },
                pharmacistId: { type: 'integer', example: 3, description: 'Present when role is Pharmacist.' },
                isVerified:   { type: 'boolean', example: true, description: 'Present when role is Doctor or Pharmacist. True if admin has verified the profile.' }
              }
            },
            name:     { type: 'string', example: 'John Doe', description: 'Only present in inactive-account response.' },
            isActive: { type: 'boolean', example: false, description: 'Only present in inactive-account response. Always false here.' }
          },
          example: {
            message: 'Login successful',
            accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            user: { id: 12, email: 'patient@greenrx.com', role: 'Patient', patientId: 5 }
          }
        },
        InactiveLoginResponse: {
          description: 'Returned when the account exists but is deactivated (isActive=false). HTTP 200 but NO tokens. Client must show an "account suspended" message and must NOT store tokens.',
          type: 'object',
          properties: {
            name:     { type: 'string', example: 'John Doe' },
            email:    { type: 'string', example: 'john@greenrx.com' },
            role:     { type: 'string', example: 'Patient' },
            isActive: { type: 'boolean', example: false }
          },
          example: { name: 'John Doe', email: 'john@greenrx.com', role: 'Patient', isActive: false }
        },
        RefreshTokenRequest: {
          description: 'Get a new access token. Required: refreshToken (from login/register response).',
          type: 'object',
          required: ['refreshToken'],
          properties: {
            refreshToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', description: 'Required.' }
          },
          example: { refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }
        },
        VerifyOtpRequest: {
          description: 'Submit the 6-digit OTP received by email. Send the otpToken returned from POST /auth/register as a Bearer token in the Authorization header. On success the account is activated and a full session (accessToken + refreshToken) is returned.',
          type: 'object',
          required: ['otp'],
          properties: {
            otp: { type: 'integer', minimum: 100000, maximum: 999999, example: 482910, description: 'The 6-digit numeric OTP sent to the registered email.' }
          },
          example: { otp: 482910 }
        },
        VerifyOtpResponse: {
          description: 'Successful OTP verification. Returns a full auth session identical to the login response.',
          type: 'object',
          properties: {
            message:      { type: 'string', example: 'OTP verified successfully' },
            accessToken:  { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
            refreshToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
            user: {
              type: 'object',
              properties: {
                id:           { type: 'integer', example: 12 },
                email:        { type: 'string', example: 'patient@greenrx.com' },
                role:         { type: 'string', example: 'Patient' },
                patientId:    { type: 'integer', example: 5, description: 'Present when role is Patient.' },
                doctorId:     { type: 'integer', example: 2, description: 'Present when role is Doctor.' },
                pharmacistId: { type: 'integer', example: 3, description: 'Present when role is Pharmacist.' },
                isVerified:   { type: 'boolean', example: true, description: 'Present when role is Doctor or Pharmacist.' }
              }
            }
          },
          example: {
            message: 'OTP verified successfully',
            accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            user: { id: 12, email: 'patient@greenrx.com', role: 'Patient', patientId: 5 }
          }
        },
        AuthMeResponse: {
          description: 'Current authenticated user (GET /auth/me). When role is Patient, patient contains full profile (same structure as GET /patients/:id): user, medicalHistories, familyHistories, patientLifestyles, patientAllergies, childrenProfiles, patientDiseases, bodyMassIndex.',
          type: 'object',
          properties: {
            id:        { type: 'integer', example: 12, description: 'User ID.' },
            email:     { type: 'string', example: 'patient@greenrx.com', description: 'User email.' },
            name:      { type: 'string', nullable: true, example: 'John Doe', description: 'Display name (e.g. set at registration).' },
            role:      { type: 'string', enum: ['Patient', 'Doctor', 'Pharmacist', 'Admin', 'SuperAdmin'], example: 'Patient' },
            isActive:  { type: 'boolean', example: true },
            createdAt: { type: 'string', format: 'date-time', example: '2025-01-15T10:30:00.000Z' },
            patient:   { type: 'object', nullable: true, description: 'When role is Patient: full patient profile (same as GET /patients/:id): user, medicalHistories, familyHistories, patientLifestyles, patientAllergies, childrenProfiles, patientDiseases, bodyMassIndex.' },
            doctor:    { type: 'object', nullable: true, description: 'Doctor profile if role is Doctor.' },
            pharmacist: { type: 'object', nullable: true, description: 'Pharmacist profile if role is Pharmacist.' }
          },
          example: {
            id: 12, email: 'patient@greenrx.com', name: 'John Doe', role: 'Patient', isActive: true, createdAt: '2025-01-15T10:30:00.000Z',
            patient: { id: 5, gender: 'Male', age: 45, ageClassification: 'Adults', height: 175, weight: 80, bodyMassIndex: 26.1, patientDiseases: [], medicalHistories: [], familyHistories: [], patientLifestyles: [], allergyReports: [] },
            doctor: null, pharmacist: null
          }
        },
        CreatePatientRequest: {
          description: 'Step 1 "Enter Your Personal Information". Required: userId, gender. Optional: dateOfBirth (when provided, age and ageClassification are computed by backend), age, ageClassification, height (cm), weight (kg). BMI is computed from height and weight and returned as bodyMassIndex in patient responses when both are set. Patient name comes from User (e.g. set at registration). Smoking is covered by lifestyle questions. Get userId from GET /auth/me or register response.',
          type: 'object',
          required: ['userId', 'gender'],
          properties: {
            userId:           { type: 'integer', example: 12, description: 'Required. From GET /auth/me or register response.' },
            gender:           { type: 'string', enum: ['Male', 'Female', 'Other'], example: 'Male', description: 'Required.' },
            dateOfBirth:      { type: 'string', format: 'date-time', example: '1980-06-15T00:00:00.000Z', description: 'Optional. ISO 8601. When provided, age and ageClassification are computed by the backend.' },
            age:              { type: 'integer', minimum: 0, maximum: 150, example: 45, description: 'Optional. Ignored if dateOfBirth is provided. Fallback when dateOfBirth not sent.' },
            ageClassification: { type: 'string', enum: ['Neonates', 'Infants', 'Toddlers', 'Children', 'Adolescents', 'Adults', 'Elderly'], example: 'Adults', description: 'Optional. Computed from dateOfBirth when provided.' },
            height:           { type: 'number', example: 175, description: 'Optional. Height in cm. With weight, used to compute bodyMassIndex in responses.' },
            weight:           { type: 'number', example: 80, description: 'Optional. Weight in kg. With height, used to compute bodyMassIndex in responses.' },
            bloodType:        { type: 'string', example: 'A+', description: 'Optional. e.g. A+, A-, B+, B-, AB+, AB-, O+, O-' },
            pregnancyWarning: { type: 'boolean', example: false, default: false, description: 'Optional.' },
            pregnancyStatus:  { type: 'boolean', example: false, description: 'Optional.' },
            trimester:        { type: 'integer', minimum: 1, maximum: 3, example: 2, description: 'Optional. 1–3.' },
            lactation:        { type: 'boolean', example: false, default: false, description: 'Optional.' },
            contracipient:    { type: 'boolean', example: false, description: 'Optional. Female only.' },
            isContracipientHormonal: { type: 'boolean', example: false, description: 'Optional. Female only.' },
          },
          example: { userId: 12, gender: 'Male', dateOfBirth: '1980-06-15T00:00:00.000Z', height: 175, weight: 80, bloodType: 'A+' }
        },
        // ── User
        CreateUserRequest: { type: 'object', required: ['email', 'role'], properties: { email: { type: 'string', format: 'email', example: 'admin@greenrx.com' }, passwordHash: { type: 'string', example: '$2b$10$...' }, role: { type: 'string', enum: ['Patient', 'Doctor', 'Pharmacist', 'Admin', 'SuperAdmin'], example: 'Admin' } }, example: { email: 'admin@greenrx.com', role: 'Admin' } },
        UpdateUserRequest: { description: 'All fields optional. Send only fields to update.', type: 'object', properties: { email: { type: 'string', format: 'email', example: 'newemail@greenrx.com' }, isActive: { type: 'boolean', example: true } }, example: { isActive: true } },
        // ── Patient profile & history
        DiseaseSeverity: {
          type: 'string',
          enum: ['None', 'Mild', 'Moderate', 'Severe'],
          description: 'Disease severity. Used in medical history, family history, and patient diseases.'
        },
        DiseaseStatus: {
          type: 'string',
          enum: ['Active', 'Resolved', 'Chronic'],
          description: 'Disease status. Used in medical history only (not in patient current diseases).'
        },
        MedicalHistoryRequest: {
          description: 'One medical history entry. Required: diseaseId, severity, status. Optional: diagnosisDate, treatment, notes. Get diseaseId from GET /diseases.',
          type: 'object',
          required: ['diseaseId', 'severity', 'status'],
          properties: {
            diseaseId:    { type: 'integer', example: 3, description: 'Required. Get IDs from GET /diseases.' },
            severity:     { $ref: '#/components/schemas/DiseaseSeverity', description: 'Required.' },
            status:       { $ref: '#/components/schemas/DiseaseStatus', description: 'Required.' },
            diagnosisDate: { type: 'string', format: 'date-time', example: '2020-03-10T00:00:00.000Z', description: 'Optional.' },
            treatment:    { type: 'string', example: 'Metformin 500mg twice daily', description: 'Optional.' },
            notes:        { type: 'string', example: 'Well controlled with diet', description: 'Optional.' }
          },
          example: { diseaseId: 3, severity: 'Moderate', status: 'Chronic', diagnosisDate: '2020-03-10T00:00:00.000Z', treatment: 'Metformin 500mg twice daily' }
        },
        BatchMedicalHistoryRequest: {
          description: 'One or more medical history entries. Send a single object to add one disease, or an array of objects to add multiple diseases in one request. Each entry: diseaseId, severity, status required; diagnosisDate, treatment, notes optional. Get diseaseId from GET /diseases.',
          type: 'array',
          minItems: 1,
          items: { $ref: '#/components/schemas/MedicalHistoryRequest' },
          example: [{ diseaseId: 3, severity: 'Moderate', status: 'Chronic' }, { diseaseId: 7, severity: 'Mild', status: 'Active' }]
        },

        FamilyHistoryRequest: {
          description: 'One family history entry. Required: diseaseId, severity. Optional: relation (defaults to Other), notes. Get diseaseId from GET /diseases. **Note:** only Father and Mother relations trigger the Pharma Safety Engine family-disease check. Setting triggersCancerCheck=true on a disease + Father or Mother relation activates the Cancer Risk (RED) check.',
          type: 'object',
          required: ['diseaseId', 'severity'],
          properties: {
            diseaseId: { type: 'integer', example: 8, description: 'Required. Get IDs from GET /diseases.' },
            relation:  { type: 'string', enum: ['Father','Mother','Sibling','GrandParent','Uncle','Aunt','Cousin','Other'], example: 'Father', default: 'Other', description: 'Optional. Defaults to Other. Only Father and Mother are evaluated by the Safety Engine family-disease and cancer-risk checks.' },
            severity:  { $ref: '#/components/schemas/DiseaseSeverity', description: 'Required.' },
            notes:     { type: 'string', example: 'Diagnosed at age 60', description: 'Optional.' },
          },
          example: { diseaseId: 8, relation: 'Father', severity: 'Severe', notes: 'Diagnosed at age 60' }
        },
        BatchFamilyHistoryRequest: { type: 'array', minItems: 1, items: { $ref: '#/components/schemas/FamilyHistoryRequest' }, description: 'Send multiple family history entries in one request. Body: array of FamilyHistoryRequest.', example: [{ diseaseId: 8, relation: 'Father', severity: 'Severe' }, { diseaseId: 10, relation: 'Mother', severity: 'Moderate' }] },
        SurgicalHistoryRequest: {
          description: 'One surgical history entry. Required: organId (from GET /operations). Use "me" as patientId for the logged-in patient.',
          type: 'object',
          required: ['organId', 'surgeryTimeframe'],
          properties: {
            organId:  { type: 'integer', example: 2, description: 'Required. ID from GET /operations.' },
            surgeryTimeframe:  { type: 'string', enum: ['THREE_MONTHS', 'SIX_MONTHS', 'MORE_THAN_SIX_MONTHS'], example: 'THREE_MONTHS', description: 'Required. Surgery timeframe.' }
          },
          example: { organId: 2, surgeryTimeframe: 'THREE_MONTHS' }
        },
        BatchSurgicalHistoryRequest: {
          description: 'One or more surgical history entries. Send a single object or array. Each entry: organId required. GET /patients/:id/surgeries returns each entry with organ: { id, name }.',
          type: 'array',
          minItems: 1,
          items: { $ref: '#/components/schemas/SurgicalHistoryRequest' },
          example: [{ organId: 2, surgeryTimeframe: 'THREE_MONTHS' }, { organId: 5, surgeryTimeframe: 'SIX_MONTHS' }]
        },
        UpdateSurgicalHistoryRequest: {
          description: 'Update a surgical history entry. Required: organId from GET /operations, surgeryTimeframe.',
          type: 'object',
          required: ['organId', 'surgeryTimeframe'],
          properties: {
            organId: { type: 'integer', example: 2, description: 'Required. ID from GET /operations.' },
            surgeryTimeframe: { type: 'string', enum: ['THREE_MONTHS', 'SIX_MONTHS', 'MORE_THAN_SIX_MONTHS'], example: 'SIX_MONTHS', description: 'Required. Surgery timeframe.' }
          },
          example: { organId: 2, surgeryTimeframe: 'SIX_MONTHS' }
        },
        CreateLifestyleRequest: {
          description: 'Create lifestyle question (catalog). activeSubstanceField must be one of the ActiveSubstance field names used for warnings (e.g. interactionAlcohol, interactionXanthines). See backend enum ACTIVE_SUBSTANCE_LIFESTYLE_FIELDS.',
          type: 'object',
          required: ['question', 'activeSubstanceField'],
          properties: { question: { type: 'string', example: 'Do you drink alcohol regularly?' }, activeSubstanceField: { type: 'string', example: 'interactionAlcohol', description: 'Field on ActiveSubstance to check when adding a medicine (enum)' } },
          example: { question: 'Do you drink alcohol regularly?', activeSubstanceField: 'interactionAlcohol' }
        },
        UpdateLifestyleRequest: {
          description: 'Update lifestyle question. All fields optional.',
          type: 'object',
          properties: { question: { type: 'string', example: 'Do you smoke?' }, activeSubstanceField: { type: 'string', example: 'interactionXanthines' } },
          example: { question: 'Do you smoke?' }
        },
        PatientLifestyleItemRequest: {
          description: 'One lifestyle answer. lifestyleId from GET /lifestyles, value = boolean.',
          type: 'object',
          required: ['lifestyleId'],
          properties: { lifestyleId: { type: 'integer', example: 1 }, value: { type: 'boolean', example: true, default: false } },
          example: { lifestyleId: 1, value: true }
        },
        BatchPatientLifestyleRequest: {
          description: 'Array of { lifestyleId, value }. Upserts patient lifestyle answers.',
          type: 'array',
          minItems: 1,
          items: { $ref: '#/components/schemas/PatientLifestyleItemRequest' },
          example: [{ lifestyleId: 1, value: true }, { lifestyleId: 2, value: false }]
        },
        Operation: {
          description: 'Organ (admin-managed). Returned from GET /operations and used in Add Surgeries dropdown.',
          type: 'object',
          properties: { id: { type: 'integer', example: 2 }, name: { type: 'string', example: 'Liver' }, createdAt: { type: 'string', format: 'date-time', example: '2025-01-01T00:00:00.000Z' }, updatedAt: { type: 'string', format: 'date-time', example: '2025-01-01T00:00:00.000Z' } },
          example: { id: 2, name: 'Liver', createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-01-01T00:00:00.000Z' }
        },
        CreateOperationRequest: {
          description: 'Create organ. Required: name.',
          type: 'object',
          required: ['name'],
          properties: { name: { type: 'string', example: 'Kidney', description: 'Organ name (e.g. Heart, Liver, Kidney)' } },
          example: { name: 'Kidney' }
        },
        UpdateOperationRequest: {
          description: 'Update organ. All fields optional.',
          type: 'object',
          properties: { name: { type: 'string', example: 'Right Kidney' } },
          example: { name: 'Right Kidney' }
        },
        ChildProfileRequest: { type: 'object', required: ['name', 'dateOfBirth', 'gender', 'ageClassification'], properties: { name: { type: 'string', example: 'Sara Doe' }, dateOfBirth: { type: 'string', format: 'date-time', example: '2018-05-20T00:00:00.000Z' }, gender: { type: 'string', enum: ['Male', 'Female', 'Other'], example: 'Female' }, ageClassification: { type: 'string', enum: ['Neonates', 'Infants', 'Toddlers', 'Children', 'Adolescents', 'Adults', 'Elderly'], example: 'Children' }, weight: { type: 'number', example: 25 }, height: { type: 'number', example: 120 }, allergies: {}, diseases: {}, medicalHistory: {} }, example: { name: 'Sara Doe', dateOfBirth: '2018-05-20T00:00:00.000Z', gender: 'Female', ageClassification: 'Children', weight: 25, height: 120 } },
        // ── Doctor & Pharmacist
        CreateDoctorRequest: {
          description: 'Create/update doctor profile. Required: userId, name, specialization, licenseNumber. Optional: licenseImageUrl (URL of uploaded license image, e.g. from register or /uploads/doctor-licenses/...), phoneNumber, clinicAddress, yearsOfExperience, qualifications, consultationFee. Get userId from GET /auth/me.',
          type: 'object',
          required: ['userId', 'name', 'specialization', 'licenseNumber'],
          properties: { userId: { type: 'integer', example: 7, description: 'Required. From GET /auth/me.' }, name: { type: 'string', example: 'Dr. Ahmed Smith', description: 'Required.' }, specialization: { type: 'string', example: 'Cardiology', description: 'Required.' }, licenseNumber: { type: 'string', example: 'DOC-2024-00123', description: 'Required.' }, licenseImageUrl: { type: 'string', example: '/uploads/doctor-licenses/doc123.jpg', description: 'Optional. URL of uploaded license image.' }, phoneNumber: { type: 'string', example: '+201145441100', description: 'Optional.' }, clinicAddress: { type: 'string', example: '12 Tahrir St, Cairo', description: 'Optional.' }, yearsOfExperience: { type: 'integer', example: 10, description: 'Optional.' }, qualifications: { type: 'string', example: 'MD, FACC', description: 'Optional.' }, consultationFee: { type: 'number', example: 250, description: 'Optional.' } },
          example: { userId: 7, name: 'Dr. Ahmed Smith', specialization: 'Cardiology', licenseNumber: 'DOC-2024-00123', yearsOfExperience: 10, consultationFee: 250 }
        },
        UpdateDoctorMeRequest: {
          description: 'PATCH /doctors/me. All fields optional. clinics: optional array of clinic objects (name?, address?, city?, latitude?, longitude?, workingHours? array of { day, startTime, endTime }); when provided, replaces all doctor clinics.',
          type: 'object',
          properties: { name: { type: 'string', example: 'Dr. Ahmed Smith' }, specialization: { type: 'string', example: 'Cardiology' }, licenseNumber: { type: 'string', example: 'DOC-2024-00123' }, licenseImageUrl: { type: 'string', example: '/uploads/doctor-licenses/doc123.jpg' }, phoneNumber: { type: 'string', example: '+201145441100' }, clinicAddress: { type: 'string', example: '12 Tahrir St, Cairo' }, yearsOfExperience: { type: 'integer', example: 11 }, qualifications: { type: 'string', example: 'MD, FACC' }, consultationFee: { type: 'number', example: 300 }, clinics: { type: 'array', items: { $ref: '#/components/schemas/CreateDoctorClinicRequest' }, description: 'Replace all clinics for this doctor; each item same shape as POST /doctors/:doctorId/clinics body.' } },
          example: { consultationFee: 300, clinics: [{ name: 'Al-Shifaa Clinic', address: '12 Tahrir St, Cairo', city: 'Cairo', workingHours: [{ day: 'monday', startTime: '09:00', endTime: '17:00' }] }] }
        },
        DoctorMeStatsResponse: {
          description: 'GET /doctors/me/stats. Statistics for the current doctor.',
          type: 'object',
          properties: {
            totalPatients:     { type: 'integer', example: 42, description: 'Number of patients linked to this doctor' },
            totalPrescriptions:{ type: 'integer', example: 128, description: 'Number of prescriptions written' },
            totalConsultations:{ type: 'integer', example: 95, description: 'Number of consultations' },
            totalAppointments: { type: 'integer', example: 110, description: 'Number of appointments' },
            totalVisits:       { type: 'integer', example: 87, description: 'Number of visit records' },
            totalRatings:      { type: 'integer', example: 20, description: 'Number of ratings received' },
            totalClinics:      { type: 'integer', example: 2, description: 'Number of clinics (locations)' },
            averageRating:     { type: 'number', example: 4.7, nullable: true, description: 'Average rating (1–5) or null if none' }
          },
          example: { totalPatients: 42, totalPrescriptions: 128, totalConsultations: 95, totalAppointments: 110, totalVisits: 87, totalRatings: 20, totalClinics: 2, averageRating: 4.7 }
        },
        PutNearbyDoctorsRadiusRequest: {
          description: 'PUT /settings/nearby-doctors-radius. Admin sets the radius in km used by GET /doctors/nearby.',
          type: 'object',
          required: ['radiusKm'],
          properties: { radiusKm: { type: 'integer', minimum: 1, maximum: 500, example: 10, description: 'Radius in kilometres (1–500)' } },
          example: { radiusKm: 10 }
        },
        AssignPatientRequest: {
          description: 'Assign patient to doctor. Required: patientId, relationshipType. Optional: startDate, endDate. Used in POST /doctors/:doctorId/patients.',
          type: 'object',
          required: ['patientId', 'relationshipType'],
          properties: { patientId: { type: 'integer', example: 5, description: 'Required.' }, relationshipType: { type: 'string', enum: ['PrimaryCare', 'Specialist', 'Consultation', 'Other'], example: 'PrimaryCare', description: 'Required.' }, startDate: { type: 'string', format: 'date-time', example: '2025-01-15T00:00:00.000Z', description: 'Optional.' }, endDate: { type: 'string', format: 'date-time', description: 'Optional.' } },
          example: { patientId: 5, relationshipType: 'PrimaryCare', startDate: '2025-01-15T00:00:00.000Z' }
        },
        WorkingHoursSlot: {
          description: 'One slot: day (weekday e.g. "monday" or ISO date), startTime (e.g. "09:00"), endTime (e.g. "17:00").',
          type: 'object',
          required: ['day', 'startTime', 'endTime'],
          properties: { day: { type: 'string', example: 'monday' }, startTime: { type: 'string', example: '09:00' }, endTime: { type: 'string', example: '17:00' } },
          example: { day: 'monday', startTime: '09:00', endTime: '17:00' }
        },
        CreateDoctorClinicRequest: {
          description: 'Create a doctor clinic. All optional. workingHours: array of { day, startTime, endTime }.',
          type: 'object',
          properties: { name: { type: 'string', example: 'Al-Shifaa Clinic' }, address: { type: 'string', example: '12 Tahrir St, Cairo' }, city: { type: 'string', example: 'Cairo' }, latitude: { type: 'number', example: 30.0444 }, longitude: { type: 'number', example: 31.2357 }, workingHours: { type: 'array', items: { $ref: '#/components/schemas/WorkingHoursSlot' } } },
          example: { name: 'Al-Shifaa Clinic', address: '12 Tahrir St, Cairo', city: 'Cairo', latitude: 30.0444, longitude: 31.2357, workingHours: [{ day: 'monday', startTime: '09:00', endTime: '17:00' }] }
        },
        UpdateDoctorClinicRequest: {
          description: 'Update a doctor clinic. All optional. workingHours: array of { day, startTime, endTime }.',
          type: 'object',
          properties: { name: { type: 'string', example: 'Al-Shifaa Clinic (Branch 2)' }, address: { type: 'string', example: '5 Nile St, Giza' }, city: { type: 'string', example: 'Giza' }, latitude: { type: 'number', example: 29.9765 }, longitude: { type: 'number', example: 31.1313 }, workingHours: { type: 'array', items: { $ref: '#/components/schemas/WorkingHoursSlot' } } },
          example: { name: 'Al-Shifaa Clinic (Branch 2)', workingHours: [{ day: 'tuesday', startTime: '10:00', endTime: '16:00' }] }
        },
        CreatePharmacistRequest: {
          description: 'Create/update pharmacist profile. Required: userId, name, licenseNumber. Optional: phoneNumber, pharmacyName, pharmacyAddress. Get userId from GET /auth/me.',
          type: 'object',
          required: ['userId', 'name', 'licenseNumber'],
          properties: { userId: { type: 'integer', example: 9, description: 'Required.' }, name: { type: 'string', example: 'Nadia Hassan', description: 'Required.' }, licenseNumber: { type: 'string', example: 'PH-2024-00456', description: 'Required.' }, phoneNumber: { type: 'string', example: '+201012345678', description: 'Optional.' }, pharmacyName: { type: 'string', example: 'GreenRx Pharmacy', description: 'Optional.' }, pharmacyAddress: { type: 'string', example: '88 Corniche St, Alexandria', description: 'Optional.' } },
          example: { userId: 9, name: 'Nadia Hassan', licenseNumber: 'PH-2024-00456', pharmacyName: 'GreenRx Pharmacy', pharmacyAddress: '88 Corniche St, Alexandria' }
        },
        // ── Patient-Doctor
        CreatePatientDoctorRequest: {
          description: 'Create patient-doctor relationship. Required: patientId, doctorId, relationshipType. Get doctor IDs from GET /doctors/search.',
          type: 'object',
          required: ['patientId', 'doctorId', 'relationshipType'],
          properties: { patientId: { type: 'integer', example: 5, description: 'Required.' }, doctorId: { type: 'integer', example: 2, description: 'Required. Get from GET /doctors/search.' }, relationshipType: { type: 'string', enum: ['PrimaryCare', 'Specialist', 'Consultation', 'Other'], example: 'PrimaryCare', description: 'Required.' } },
          example: { patientId: 5, doctorId: 2, relationshipType: 'PrimaryCare' }
        },
        UpdatePatientDoctorRequest: { description: 'All fields optional. Send only fields to update.', type: 'object', properties: { relationshipType: { type: 'string', enum: ['PrimaryCare', 'Specialist', 'Consultation', 'Other'], example: 'Specialist' }, isActive: { type: 'boolean', example: true }, endDate: { type: 'string', format: 'date-time', example: '2026-01-01T00:00:00.000Z' } }, example: { relationshipType: 'Specialist' } },
        // ── Allergen categories (catalog)
        AllergenCategoryName: {
          description: 'Bilingual category name object.',
          type: 'object',
          required: ['en'],
          properties: { en: { type: 'string', example: 'Antibiotics', description: 'English name. Required.' }, ar: { type: 'string', example: 'المضادات الحيوية', description: 'Arabic name. Optional.' } },
          example: { en: 'Antibiotics', ar: 'المضادات الحيوية' }
        },
        AllergenCategory: {
          description: 'Allergen category (admin-managed). Used for grouping allergens in the patient form.',
          type: 'object',
          properties: {
            id:        { type: 'integer', example: 1 },
            name:      { $ref: '#/components/schemas/AllergenCategoryName' },
            _count:    { type: 'object', properties: { allergens: { type: 'integer', example: 8 } }, description: 'Number of allergens in this category.' },
            createdAt: { type: 'string', format: 'date-time', example: '2025-01-01T00:00:00.000Z' },
            updatedAt: { type: 'string', format: 'date-time', example: '2025-01-01T00:00:00.000Z' }
          },
          example: { id: 1, name: { en: 'Antibiotics', ar: 'المضادات الحيوية' }, _count: { allergens: 8 }, createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-01-01T00:00:00.000Z' }
        },
        CreateAllergenCategoryRequest: {
          description: 'Create allergen category. Required: name.en. Optional: name.ar.',
          type: 'object',
          required: ['name'],
          properties: { name: { $ref: '#/components/schemas/AllergenCategoryName' } },
          example: { name: { en: 'Antibiotics', ar: 'المضادات الحيوية' } }
        },
        UpdateAllergenCategoryRequest: {
          description: 'Update allergen category. All fields optional.',
          type: 'object',
          properties: { name: { $ref: '#/components/schemas/AllergenCategoryName' } },
          example: { name: { en: 'Beta-Lactam Antibiotics' } }
        },
        // ── Allergens (catalog — GET /allergens for dropdown)
        Allergen: {
          description: 'Allergen catalog entry (admin-managed). Patients link via POST /patients/:patientId/allergies with allergenId. Response includes allergenCategory.',
          type: 'object',
          properties: {
            id:                  { type: 'integer', example: 5 },
            name:                { type: 'string', example: 'Penicillin' },
            allergenType:        { type: 'string', nullable: true, enum: ['Drug', 'Food', 'Pollen', 'Dust', 'Pet', 'Fragrance', 'Other'], example: 'Drug' },
            allergenCategoryId:  { type: 'integer', example: 1, description: 'FK to AllergenCategory.' },
            allergenCategory:    { $ref: '#/components/schemas/AllergenCategory', nullable: true, description: 'Included in GET responses.' },
            createdAt:           { type: 'string', format: 'date-time', example: '2025-01-01T00:00:00.000Z' },
            updatedAt:           { type: 'string', format: 'date-time', example: '2025-01-01T00:00:00.000Z' }
          },
          example: { id: 5, name: 'Penicillin', allergenType: 'Drug', allergenCategoryId: 1, createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-01-01T00:00:00.000Z' }
        },
        CreateAllergenRequest: {
          description: 'Create allergen. Required: name, allergenCategoryId. Optional: allergenType.',
          type: 'object',
          required: ['name', 'allergenCategoryId'],
          properties: {
            name:               { type: 'string', example: 'Penicillin', description: 'Required. e.g. Penicillin, Peanuts.' },
            allergenCategoryId: { type: 'integer', example: 1, description: 'Required. ID from GET /allergen-categories.' },
            allergenType:       { type: 'string', enum: ['Drug', 'Food', 'Pollen', 'Dust', 'Pet', 'Fragrance', 'Other'], example: 'Drug', description: 'Optional.' }
          },
          example: { name: 'Penicillin', allergenCategoryId: 1, allergenType: 'Drug' }
        },
        UpdateAllergenRequest: {
          description: 'Update allergen. All fields optional.',
          type: 'object',
          properties: {
            name:               { type: 'string', example: 'Amoxicillin' },
            allergenType:       { type: 'string', enum: ['Drug', 'Food', 'Pollen', 'Dust', 'Pet', 'Fragrance', 'Other'], nullable: true, example: 'Drug' },
            allergenCategoryId: { type: 'integer', example: 1, description: 'Optional. Move allergen to a different category.' }
          },
          example: { name: 'Amoxicillin', allergenType: 'Drug' }
        },
        // ── Excipients (catalog)
        Excipient: {
          description: 'Excipient catalog entry used in allergy reports and trade-name composition.',
          type: 'object',
          properties: {
            id:          { type: 'integer', example: 3 },
            name:        { type: 'string', example: 'Lactose' },
            description: { type: 'string', nullable: true, example: 'Milk sugar used as filler' },
            isActive:    { type: 'boolean', example: true },
            createdAt:   { type: 'string', format: 'date-time', example: '2025-01-01T00:00:00.000Z' },
            updatedAt:   { type: 'string', format: 'date-time', example: '2025-01-01T00:00:00.000Z' }
          },
          example: { id: 3, name: 'Lactose', description: 'Milk sugar used as filler', isActive: true }
        },
        CreateExcipientRequest: {
          description: 'Create excipient (Admin).',
          type: 'object',
          required: ['name'],
          properties: {
            name:        { type: 'string', example: 'Lactose' },
            description: { type: 'string', nullable: true, example: 'Milk sugar used as filler' },
            isActive:    { type: 'boolean', example: true, default: true }
          },
          example: { name: 'Lactose', description: 'Milk sugar used as filler', isActive: true }
        },
        UpdateExcipientRequest: {
          description: 'Update excipient (Admin). All fields optional.',
          type: 'object',
          properties: {
            name:        { type: 'string', example: 'Lactose monohydrate' },
            description: { type: 'string', nullable: true, example: 'Updated description' },
            isActive:    { type: 'boolean', example: false }
          },
          example: { isActive: false }
        },
        // ── Patient allergies (report + relation tables)
        PatientAllergyReportRequest: {
          description: 'Create/replace a patient allergy report. Provide any combination of tradeNameId, allergenIds, activeSubstanceIds, excipientIds, classificationIds. At least one source must be provided.',
          type: 'object',
          properties: {
            // tradeNameId:       { type: 'integer', description: 'Optional trade name ID from GET /trade-names/search.' },
            tradeNameIds:      { type: 'array', items: { type: 'integer' }, description: 'Optional trade name IDs from GET /trade-names/search.' },
            allergenIds:       { type: 'array', items: { type: 'integer' }, description: 'Optional catalog allergen IDs from GET /allergens.' },
            activeSubstanceIds:{ type: 'array', items: { type: 'integer' }, description: 'Optional active substance IDs from GET /active-substances/search.' },
            excipientIds:      { type: 'array', items: { type: 'integer' }, description: 'Optional excipient IDs.' },
            classificationIds: { type: 'array', items: { type: 'integer' }, description: 'Optional classification IDs.' },
            reaction:          { type: 'string', nullable: true },
            notes:             { type: 'string', nullable: true }
          },
          example: {
            tradeNameIds: [17 , 18],
            allergenIds: [2, 5],
            activeSubstanceIds: [12],
            excipientIds: [4],
            classificationIds: [3],
            reaction: 'Rash',
            notes: 'Observed after repeated use'
          }
        },
        PatientAllergyReportResponse: {
          description: 'Patient allergy report with related allergy links.',
          type: 'object',
          properties: {
            id:                { type: 'integer', example: 1 },
            patientId:         { type: 'integer', example: 5 },
            tradeNameId:       { type: 'integer', nullable: true, example: 17 },
            reaction:          { type: 'string', nullable: true, example: 'Rash' },
            notes:             { type: 'string', nullable: true, example: 'Observed after repeated use' },
            createdAt:         { type: 'string', format: 'date-time', example: '2025-03-01T10:00:00.000Z' },
            updatedAt:         { type: 'string', format: 'date-time', example: '2025-03-01T10:00:00.000Z' },
            tradeName: { nullable: true, type: 'object', properties: { id: { type: 'integer', example: 17 }, title: { type: 'string', example: 'Augmentin 1g' } } },
            patientAllergies: { type: 'array', items: { type: 'object', properties: { id: { type: 'integer' }, allergenId: { type: 'integer' } } }, example: [{ id: 1, allergenId: 2 }] },
            activeSubstancePatientAllergies: { type: 'array', items: { type: 'object', properties: { id: { type: 'integer' }, activeSubstanceId: { type: 'integer' } } }, example: [] },
            excipientPatientAllergies: { type: 'array', items: { type: 'object', properties: { id: { type: 'integer' }, excipientId: { type: 'integer' } } }, example: [] },
            classificationPatientAllergies: { type: 'array', items: { type: 'object', properties: { id: { type: 'integer' }, classificationId: { type: 'integer' } } }, example: [] }
          },
          example: { id: 1, patientId: 5, reaction: 'Rash', notes: 'Observed after repeated use', patientAllergies: [{ id: 1, allergenId: 2 }], activeSubstancePatientAllergies: [], excipientPatientAllergies: [], classificationPatientAllergies: [] }
        },
        // ── Patient diseases
        AddPatientDiseaseRequest: {
          description: 'One current disease. Required: diseaseId, severity. Optional: diagnosisDate, notes. No status field (removed). Get diseaseId from GET /diseases.',
          type: 'object',
          required: ['diseaseId', 'severity'],
          properties: {
            diseaseId:    { type: 'integer', example: 1, description: 'Required. Get IDs from GET /diseases.' },
            severity:    { type: 'string', enum: ['None', 'Mild', 'Moderate', 'Severe'], example: 'Moderate', description: 'Required.' },
            diagnosisDate: { type: 'string', format: 'date-time', example: '2024-01-15T00:00:00.000Z', description: 'Optional. ISO 8601.' },
            notes:       { type: 'string', example: 'Well controlled with medication', description: 'Optional.' }
          },
          example: { diseaseId: 1, severity: 'Moderate', diagnosisDate: '2024-01-15T00:00:00.000Z', notes: 'Well controlled with medication' }
        },
        BatchPatientDiseasesRequest: { type: 'array', minItems: 1, items: { $ref: '#/components/schemas/AddPatientDiseaseRequest' }, description: 'Send multiple current diseases in one request. Body: array of AddPatientDiseaseRequest. Single object also accepted.', example: [{ diseaseId: 1, severity: 'Moderate' }, { diseaseId: 4, severity: 'Mild' }] },
        UpdatePatientDiseaseRequest: { description: 'All fields optional. Send only fields to update. severity: None|Mild|Moderate|Severe.', type: 'object', properties: { severity: { type: 'string', enum: ['None', 'Mild', 'Moderate', 'Severe'], example: 'Severe' }, notes: { type: 'string', example: 'Condition worsened' } }, example: { severity: 'Severe', notes: 'Condition worsened' } },
        // ── Patient medicines
        FrequencyUnit: { type: 'string', enum: ['Hours', 'Days', 'Weeks', 'Months', 'Years'], example: 'Hours', description: 'Unit for frequency (repetitions per X).' },
        DurationUnit: { type: 'string', enum: ['Days', 'Weeks', 'Months', 'Years'], example: 'Days', description: 'Unit for duration of treatment.' },
        AddPatientMedicineRequest: {
          description:
            'JSON body for POST /patient-medicines/patient/:patientId. Required: **medicineName**. Optional: **tradeNameId** (from GET /trade-names/search — backend resolves activeSubstanceId). Same field names and types as the server expects (see PatientMedicine / FrequencyUnit / DurationUnit enums). **reminderTimes**: strings must match HH:mm (e.g. 08:00); invalid entries are dropped server-side.',
          type: 'object',
          required: ['medicineName'],
          properties: {
            medicineName:    { type: 'string', example: 'Metformin 500mg', description: 'Required. Display name; often matches trade name title.' },
            tradeNameId:     { type: 'integer', example: 23, description: 'Optional. When set, must exist in DB; active substance is derived automatically.' },
            dosageAmount:    { type: 'number', example: 500, description: 'Optional. Numeric dose (e.g. 500, 0.5).' },
            frequencyCount:  { type: 'integer', example: 2, description: 'Optional. Repetitions per frequency period (e.g. 2 for twice).' },
            frequencyPeriod: { type: 'integer', example: 8, description: 'Optional. Spacing (e.g. 8 with Hours = every 8 hours).' },
            frequencyUnit:   { type: 'string', enum: ['Hours', 'Days', 'Weeks', 'Months', 'Years'], example: 'Hours', description: 'Optional. Must match Prisma FrequencyUnit.' },
            durationValue:   { type: 'integer', example: 30, description: 'Optional. Treatment length (e.g. 30).' },
            durationUnit:    { type: 'string', enum: ['Days', 'Weeks', 'Months', 'Years'], example: 'Days', description: 'Optional. Must match Prisma DurationUnit.' },
            startDate:       { type: 'string', format: 'date-time', example: '2026-01-01T08:00:00.000Z', description: 'Optional. ISO 8601.' },
            endDate:         { type: 'string', format: 'date-time', nullable: true, example: '2026-07-01T23:59:59.000Z', description: 'Optional. ISO 8601.' },
            isOngoing:       { type: 'boolean', example: true, description: 'Optional. Default true if omitted.' },
            notes:           { type: 'string', example: 'Take with food', description: 'Optional.' },
            reminderEnabled: { type: 'boolean', example: true, description: 'Optional. Default false if omitted.' },
            reminderTimes:   {
              type: 'array',
              items: { type: 'string', pattern: '^([01]?[0-9]|2[0-3]):[0-5][0-9]$', example: '08:00' },
              example: ['08:00', '14:00', '20:00'],
              description: 'Optional. Daily slots HH:mm (24h). Server keeps only strings matching /^\\d{1,2}:\\d{2}$/.'
            }
          },
          example: {
            medicineName: 'Metformin 500mg',
            tradeNameId: 23,
            dosageAmount: 500,
            frequencyCount: 2,
            frequencyPeriod: 8,
            frequencyUnit: 'Hours',
            durationValue: 30,
            durationUnit: 'Days',
            startDate: '2026-01-01T08:00:00.000Z',
            endDate: '2026-07-01T23:59:59.000Z',
            isOngoing: true,
            notes: 'Take with food',
            reminderEnabled: true,
            reminderTimes: ['08:00', '14:00', '20:00']
          }
        },
        UpdatePatientMedicineRequest: {
          description: 'All fields optional. Send only fields to update.',
          type: 'object',
          properties: {
            medicineName:     { type: 'string' },
            dosageAmount:     { type: 'number', format: 'float' },
            frequencyCount:   { type: 'integer' },
            frequencyPeriod:  { type: 'integer' },
            frequencyUnit:    { $ref: '#/components/schemas/FrequencyUnit' },
            durationValue:    { type: 'integer' },
            durationUnit:     { $ref: '#/components/schemas/DurationUnit' },
            startDate:        { type: 'string', format: 'date-time' },
            endDate:          { type: 'string', format: 'date-time' },
            isOngoing:        { type: 'boolean' },
            notes:            { type: 'string' },
            reminderEnabled:  { type: 'boolean' },
            reminderTimes:     { type: 'array', items: { type: 'string' } }
          }
        },
        UploadMedicineImageResponse: {
          description: 'POST /patient-medicines/patient/:patientId/upload-image. Full detection data: extracted (from image), matchedTradeName (from DB when found), matchedActiveSubstance (when only AS matched), plus medicine record, warnings, blocked.',
          type: 'object',
          properties: {
            extracted: {
              type: 'object',
              description: 'Data detected from the image (trade name, active substance, concentration, dosage form).',
              properties: {
                tradeName:       { type: 'string' },
                activeSubstance: { type: 'string' },
                concentration:   { type: 'string', nullable: true },
                dosageForm:     { type: 'string', nullable: true }
              }
            },
            matchedTradeName: {
              type: 'object',
              nullable: true,
              description: 'Matched trade name from DB (id, title, activeSubstance, company, etc.) when found.',
              properties: {
                id: { type: 'integer' },
                title: { type: 'string' },
                barCode: { type: 'string', nullable: true },
                warningNotification: { type: 'string', nullable: true },
                availabilityStatus: { type: 'string' },
                activeSubstance: {
                  type: 'object',
                  nullable: true,
                  properties: { id: { type: 'integer' }, activeSubstance: { type: 'string' }, concentration: { type: 'string', nullable: true }, dosageForm: { type: 'string', nullable: true }, classification: { type: 'string', nullable: true }, indication: { type: 'string', nullable: true } }
                },
                company: { type: 'object', nullable: true, properties: { id: { type: 'integer' }, name: { type: 'string' } } }
              }
            },
            matchedActiveSubstance: {
              type: 'object',
              nullable: true,
              description: 'Matched active substance from DB when no trade name matched.',
              properties: { id: { type: 'integer' }, activeSubstance: { type: 'string' }, concentration: { type: 'string', nullable: true }, dosageForm: { type: 'string', nullable: true }, classification: { type: 'string', nullable: true }, indication: { type: 'string', nullable: true } }
            },
            warnings: { type: 'array', items: { $ref: '#/components/schemas/Warning' } },
            blocked: { type: 'boolean' },
            addedToPatient: { type: 'boolean' },
            addMedicineRequestId: { type: 'integer', description: 'Present when no full match; request created for admin to add drug.' }
          }
        },
        BatchCheckResponse: {
          description: 'POST /batch-check. status: approved (in DB, not recalled) | recalled (in DB, recalled) | not_in_database. A trade name can have many batch numbers (BatchHistory); this endpoint checks one batch. When not_in_database, message explains that some companies do not share batch data.',
          type: 'object',
          required: ['status', 'batchNumber'],
          properties: {
            status:       { type: 'string', enum: ['approved', 'recalled', 'not_in_database'] },
            batchNumber:  { type: 'string' },
            message:      { type: 'string', description: 'Present for not_in_database or recalled.' },
            tradeNameId:  { type: 'integer', description: 'When found in DB.' },
            tradeName:    { type: 'object', properties: { id: { type: 'integer' }, title: { type: 'string' } }, description: 'When found in DB.' },
            expiryDate:   { type: 'string', format: 'date-time' },
            manufacturingDate: { type: 'string', format: 'date-time' },
            isRecalled:   { type: 'boolean' },
            recallReason: { type: 'string', nullable: true },
            recallDate:   { type: 'string', format: 'date-time', nullable: true }
          }
        },
        AllergyGateBlockedResponse: {
          description: 'Returned with HTTP 409 when the allergy gate blocks adding a medicine. The medicine was NOT saved.',
          type: 'object',
          properties: {
            blocked:  { type: 'boolean', example: true },
            reason:   { type: 'string', example: 'allergy_conflict' },
            message:  { type: 'string', example: 'This medicine cannot be added because of a documented allergy conflict.' },
            conflicts: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  type:        { type: 'string', enum: ['active_substance', 'trade_name', 'classification', 'excipient', 'catalog_allergen'] },
                  matchedId:   { type: 'integer', nullable: true },
                  matchedName: { type: 'string' },
                  reaction:    { type: 'string', nullable: true },
                  reason:      { type: 'string' }
                }
              }
            },
            warnings: {
              type: 'array',
              items: { type: 'string' },
              description: 'Human-readable warning messages, one per conflict.'
            }
          }
        },
        BatchListByTradeNameResponse: {
          description: 'GET /batch-check/trade-name/:tradeNameId. A trade name can have many batch numbers. Returns all BatchHistory rows for that trade name.',
          type: 'object',
          properties: {
            tradeNameId: { type: 'integer' },
            count:       { type: 'integer', description: 'Number of batches.' },
            batches:     {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  batchNumber: { type: 'string' },
                  manufacturingDate: { type: 'string', format: 'date-time' },
                  expiryDate: { type: 'string', format: 'date-time' },
                  quantity: { type: 'integer', nullable: true },
                  isRecalled: { type: 'boolean' },
                  recallReason: { type: 'string', nullable: true },
                  recallDate: { type: 'string', format: 'date-time', nullable: true },
                  tradeName: { type: 'object', properties: { id: { type: 'integer' }, title: { type: 'string' } } }
                }
              }
            }
          }
        },
        // ── Prescriptions (First Visit: Prescription + PatientMedicine + PrescriptionMedicine)
        MedicationPlanItem: {
          description:
            'Single drug line inside the items or medicationPlan array for POST /prescriptions. medicineName is required. tradeNameId is optional (use GET /trade-names/search); when tradeNameId is set, the server can set activeSubstanceId from the trade name. See the schema example below for a full row; the operation also lists named request examples (usingItems / usingMedicationPlan).',
          type: 'object',
          required: ['medicineName'],
          properties: {
            medicineName:      { type: 'string', description: 'Required. Trade name title or manual entry.' },
            tradeNameId:       { type: 'integer', nullable: true, description: 'Optional. From GET /trade-names/search.' },
            activeSubstanceId: { type: 'integer', nullable: true, description: 'Optional; derived from tradeNameId when omitted.' },
            dosageAmount:      { type: 'number', nullable: true, description: 'Optional dose amount.' },
            frequencyCount:    { type: 'integer', nullable: true, description: 'Optional. Repetitions per period.' },
            frequencyPeriod:   { type: 'integer', nullable: true, description: 'Optional. E.g. every 8 with Hours.' },
            frequencyUnit:     { type: 'string', enum: ['Hours', 'Days', 'Weeks', 'Months', 'Years'], nullable: true, description: 'Optional. Prisma FrequencyUnit.' },
            durationValue:     { type: 'integer', nullable: true, description: 'Optional. Treatment length.' },
            durationUnit:      { type: 'string', enum: ['Days', 'Weeks', 'Months', 'Years'], nullable: true, description: 'Optional. Prisma DurationUnit.' },
            startDate:         { type: 'string', format: 'date-time', nullable: true },
            endDate:           { type: 'string', format: 'date-time', nullable: true },
            notes:             { type: 'string', nullable: true }
          },
          example: {
            medicineName: 'Metformin 500mg',
            tradeNameId: 23,
            dosageAmount: 500,
            frequencyCount: 2,
            frequencyPeriod: 8,
            frequencyUnit: 'Hours',
            durationValue: 30,
            durationUnit: 'Days',
            notes: 'Take with food'
          }
        },
        CreatePrescriptionRequest: {
          description:
            'Request body for POST /prescriptions (doctor JWT only). Do not send doctorId; the prescribing doctor is taken from the token. Required: patientId, plus a non-empty items array or a non-empty medicationPlan array (same MedicationPlanItem shape; use one array, not two copies of the same drugs). Each array element needs medicineName. Optional First Visit fields: conditionDiagnosis, initialCheckUp, testResultsOrScans, followUpAppointmentDate. The server runs drug-safety checks and may respond with 400 and blocked or warnings.',
          type: 'object',
          required: ['patientId'],
          properties: {
            patientId:               { type: 'integer', description: 'Required. Patient receiving the prescription.' },
            items:                   { type: 'array', minItems: 1, items: { $ref: '#/components/schemas/MedicationPlanItem' }, description: 'Either this or medicationPlan (non-empty array). Same item shape as medicationPlan.' },
            medicationPlan:          { type: 'array', minItems: 1, items: { $ref: '#/components/schemas/MedicationPlanItem' }, description: 'Alias of items. Send one or the other.' },
            conditionDiagnosis:      { type: 'string', description: 'Optional. First Visit.' },
            initialCheckUp:          {
              type: 'object',
              description: 'Optional. Vitals object (all fields optional).',
              properties: {
                height:           { type: 'number' },
                weight:           { type: 'number' },
                bloodPressure:    { type: 'string' },
                bloodGlucose:     { type: 'number' },
                bodyTemperature:  { type: 'number' },
                heartRate:        { type: 'number' },
                respiratoryRate:  { type: 'string' },
                oxygenSaturation: { type: 'number' }
              }
            },
            testResultsOrScans:      { type: 'array', items: { type: 'string' }, description: 'Optional. File names or URLs.' },
            followUpAppointmentDate: { type: 'string', format: 'date-time', description: 'Optional.' },
            visitId:                 { type: 'integer', nullable: true, description: 'Optional. Must belong to this doctor and patient.' },
            validFrom:               { type: 'string', format: 'date-time', description: 'Optional. Default: now.' },
            validUntil:              { type: 'string', format: 'date-time', description: 'Optional. Default ~30 days.' },
            maxRefills:              { type: 'integer', description: 'Optional. Default 0.' },
            notes:                   { type: 'string', nullable: true, description: 'Optional prescription notes.' }
          },
          example: {
            patientId: 5,
            items: [
              {
                medicineName: 'Metformin 500mg',
                tradeNameId: 23,
                dosageAmount: 500,
                frequencyCount: 2,
                frequencyPeriod: 8,
                frequencyUnit: 'Hours',
                durationValue: 30,
                durationUnit: 'Days',
                notes: 'Take with food'
              }
            ],
            conditionDiagnosis: 'Type 2 Diabetes Mellitus',
            initialCheckUp: { height: 175, weight: 80, bloodPressure: '130/85', bloodGlucose: 140 },
            testResultsOrScans: ['hba1c_march2026.pdf'],
            followUpAppointmentDate: '2026-04-15T09:00:00.000Z',
            maxRefills: 2,
            notes: 'Monitor HbA1c in 3 months'
          }
        },
        AddMedicineToPrescriptionRequest: {
          description: 'Body for POST /prescriptions/:prescriptionId/medicines. One medication plan item (same shape as element of medicationPlan).',
          type: 'object',
          required: ['medicineName'],
          properties: {
            medicineName:      { type: 'string', example: 'Atorvastatin 20mg' },
            tradeNameId:       { type: 'integer', nullable: true, example: 31 },
            activeSubstanceId: { type: 'integer', nullable: true, example: 15 },
            dosageAmount:      { type: 'number', nullable: true, example: 20 },
            frequencyCount:    { type: 'integer', nullable: true, example: 1 },
            frequencyPeriod:   { type: 'integer', nullable: true, example: 1 },
            frequencyUnit:     { type: 'string', nullable: true, example: 'Days' },
            durationValue:     { type: 'integer', nullable: true, example: 90 },
            durationUnit:      { type: 'string', nullable: true, example: 'Days' },
            startDate:         { type: 'string', format: 'date-time', nullable: true, example: '2025-03-01T00:00:00.000Z' },
            endDate:           { type: 'string', format: 'date-time', nullable: true },
            notes:             { type: 'string', nullable: true, example: 'Take at night' }
          },
          example: { medicineName: 'Atorvastatin 20mg', tradeNameId: 31, dosageAmount: 20, frequencyCount: 1, frequencyPeriod: 1, frequencyUnit: 'Days', notes: 'Take at night' }
        },
        PrescriptionListItem: {
          description:
            'Prescription with nested medicines and alerts. **GET /prescriptions** includes nested `patient` on each row. **GET /patients/me/full** and **GET /doctors/.../patients/...** embed rows under `patient.prescriptions` without nested `patient` on each prescription.',
          type: 'object',
          properties: {
            id:                 { type: 'integer', example: 42 },
            doctorId:           { type: 'integer', example: 2 },
            patientId:          { type: 'integer', example: 5 },
            visitId:            { type: 'integer', nullable: true },
            status:             { type: 'string', enum: ['Draft', 'Pending', 'Approved', 'Filled', 'Cancelled'], example: 'Approved' },
            prescriptionDate: { type: 'string', format: 'date-time' },
            validFrom:          { type: 'string', format: 'date-time' },
            validUntil:         { type: 'string', format: 'date-time' },
            notes:              { type: 'string', nullable: true },
            conditionDiagnosis: { type: 'string', nullable: true },
            maxRefills:         { type: 'integer', example: 0 },
            doctor: {
              type: 'object',
              properties: {
                id:               { type: 'integer', example: 2 },
                name:             { type: 'string', example: 'Dr. Ahmed Hassan' },
                specialization:   { type: 'string', nullable: true, example: 'Internal Medicine' }
              }
            },
            patient: {
              type: 'object',
              nullable: true,
              description: 'Included on GET /prescriptions; omitted when prescription is nested under patient full details.',
              properties: {
                id:   { type: 'integer', example: 5 },
                age:  { type: 'integer', nullable: true, example: 45 },
                user: { type: 'object', properties: { name: { type: 'string', example: 'John Doe' } } }
              }
            },
            visit: {
              type: 'object',
              nullable: true,
              properties: {
                id:         { type: 'integer' },
                visitDate:  { type: 'string', format: 'date-time' },
                visitType:  { type: 'string' },
                isNewVisit: { type: 'boolean' }
              }
            },
            prescriptionMedicines: {
              type: 'array',
              description: 'Ordered by sortOrder; each entry includes patientMedicine (dosage, frequency, tradeName, activeSubstance, etc.).',
              items: {
                type: 'object',
                properties: {
                  id:                { type: 'integer' },
                  prescriptionId:    { type: 'integer' },
                  patientMedicineId: { type: 'integer' },
                  sortOrder:         { type: 'integer', example: 0 },
                  patientMedicine:   { type: 'object', additionalProperties: true }
                }
              }
            },
            drugInteractionAlerts: { type: 'array', items: { type: 'object', additionalProperties: true } }
          },
          additionalProperties: true
        },
        PrescriptionsListResponse: {
          description: 'GET /prescriptions paginated response.',
          type: 'object',
          required: ['prescriptions', 'pagination'],
          properties: {
            prescriptions: { type: 'array', items: { $ref: '#/components/schemas/PrescriptionListItem' } },
            pagination:    { $ref: '#/components/schemas/Pagination' }
          }
        },
        PatientMeFullResponse: {
          description: 'GET /patients/me/full — patient-only. Same `patient` object shape as doctor profile response, without `relationship`.',
          type: 'object',
          required: ['patient'],
          properties: {
            patient: {
              type: 'object',
              description:
                'Full patient record: flattened name/email/phone, bodyMassIndex, medicalHistories, familyHistories, patientDiseases, patientLifestyles, allergyReports, surgicalHistories, visits, medicalReports, and **prescriptions** (newest first).',
              properties: {
                prescriptions: { type: 'array', items: { $ref: '#/components/schemas/PrescriptionListItem' } }
              },
              additionalProperties: true
            }
          }
        },
        DoctorPatientProfileResponse: {
          description: 'GET /doctors/{doctorId}/patients/{patientId} — full chart for a linked patient.',
          type: 'object',
          required: ['patient', 'relationship'],
          properties: {
            patient: {
              type: 'object',
              description:
                'Same fields as GET /patients/me/full. **prescriptions** lists this patient’s prescription history (all doctors), newest first.',
              properties: {
                prescriptions: { type: 'array', items: { $ref: '#/components/schemas/PrescriptionListItem' } }
              },
              additionalProperties: true
            },
            relationship: {
              type: 'object',
              properties: {
                relationshipType: { type: 'string', example: 'PrimaryCare', description: 'RelationshipType enum' },
                startDate:        { type: 'string', format: 'date-time' },
                endDate:          { type: 'string', format: 'date-time', nullable: true },
                isActive:         { type: 'boolean', example: true }
              }
            }
          }
        },
        ConcentrationsResponse: {
          description: 'GET /active-substances/concentrations. Distinct concentration values (e.g. "5 mg", "5 mg/ 20 mg") filtered by classification and/or activeSubstanceId.',
          type: 'object',
          properties: { concentrations: { type: 'array', items: { type: 'string', example: '500 mg' } } },
          example: { concentrations: ['250 mg', '500 mg', '1 g'] }
        },
        BatchPrescriptionsRequest: {
          description: 'Batch: one Prescription per medicine; each prescription gets one PatientMedicine + PrescriptionMedicine. Required: doctorId, patientId, medicines (array). Each medicine: tradeNameId (from GET /trade-names/search), dosage, frequency, duration, instructions, notes. Runs drug-safety and batch-interaction checks.',
          type: 'object',
          required: ['doctorId', 'patientId', 'medicines'],
          properties: {
            doctorId:   { type: 'integer', example: 2, description: 'Required.' },
            patientId:  { type: 'integer', example: 5, description: 'Required.' },
            medicines:  {
              type: 'array',
              items: {
                type: 'object',
                required: ['tradeNameId'],
                properties: {
                  tradeNameId:  { type: 'integer', example: 23, description: 'From GET /trade-names/search.' },
                  dosage:       { type: 'string', nullable: true, example: '500mg' },
                  frequency:    { type: 'string', nullable: true, example: 'Twice daily' },
                  duration:     { type: 'string', nullable: true, example: '30 days' },
                  instructions: { type: 'string', nullable: true, example: 'Take with food' },
                  notes:        { type: 'string', nullable: true }
                }
              }
            },
            validFrom:  { type: 'string', format: 'date-time', nullable: true, example: '2025-03-01T00:00:00.000Z' },
            validUntil: { type: 'string', format: 'date-time', nullable: true, example: '2025-04-01T00:00:00.000Z' },
            maxRefills: { type: 'integer', nullable: true, example: 3 }
          },
          example: { doctorId: 2, patientId: 5, medicines: [{ tradeNameId: 23, dosage: '500mg', frequency: 'Twice daily', duration: '30 days', instructions: 'Take with food' }], validFrom: '2025-03-01T00:00:00.000Z' }
        },
        UpdatePrescriptionRequest: { description: 'All fields optional. Send only fields to update.', type: 'object', properties: { status: { type: 'string', example: 'Active' }, dosage: { type: 'string', example: '500mg' }, frequency: { type: 'string', example: 'Twice daily' }, duration: { type: 'string', example: '30 days' }, instructions: { type: 'string', example: 'Take with food' }, notes: { type: 'string', example: 'Monitor kidney function' }, changedBy: { type: 'string', example: 'Dr. Ahmed' }, conditionDiagnosis: { type: 'string', example: 'Type 2 Diabetes' }, initialCheckUp: { type: 'object' }, testResultsOrScans: { type: 'array', items: { type: 'string' } }, followUpAppointmentDate: { type: 'string', format: 'date-time', example: '2025-04-15T09:00:00.000Z' } }, example: { status: 'Active', notes: 'Monitor kidney function', followUpAppointmentDate: '2025-04-15T09:00:00.000Z' } },
        CreatePrescriptionVersionRequest: { type: 'object', properties: { changes: { type: 'string', example: 'Changed dosage from 250mg to 500mg' } }, example: { changes: 'Changed dosage from 250mg to 500mg' } },
        // ── Appointments
        CreateAppointmentRequest: { description: 'Required: patientId, doctorId, appointmentDate. Optional: duration, notes. Get doctorId from GET /doctors/search.', type: 'object', required: ['patientId', 'doctorId', 'appointmentDate'], properties: { patientId: { type: 'integer', example: 5, description: 'Required.' }, doctorId: { type: 'integer', example: 2, description: 'Required. Get from GET /doctors/search.' }, appointmentDate: { type: 'string', format: 'date-time', example: '2025-04-20T10:00:00.000Z', description: 'Required. ISO 8601.' }, duration: { type: 'integer', example: 30, description: 'Optional. Minutes.' }, notes: { type: 'string', example: 'Annual check-up', description: 'Optional.' } }, example: { patientId: 5, doctorId: 2, appointmentDate: '2025-04-20T10:00:00.000Z', duration: 30, notes: 'Annual check-up' } },
        UpdateAppointmentRequest: { description: 'All fields optional. Send only fields to update.', type: 'object', properties: { appointmentDate: { type: 'string', format: 'date-time', example: '2025-04-21T11:00:00.000Z' }, duration: { type: 'integer', example: 45 }, status: { type: 'string', example: 'Confirmed' }, notes: { type: 'string', example: 'Rescheduled' } }, example: { appointmentDate: '2025-04-21T11:00:00.000Z', status: 'Confirmed' } },
        // ── Consultations
        CreateConsultationRequest: { description: 'Required: patientId, doctorId. Optional: consultationDate, notes, diagnosis, followUpRequired, followUpDate. Get doctorId from GET /doctors/search.', type: 'object', required: ['patientId', 'doctorId'], properties: { patientId: { type: 'integer', example: 5, description: 'Required.' }, doctorId: { type: 'integer', example: 2, description: 'Required. Get from GET /doctors/search.' }, consultationDate: { type: 'string', format: 'date-time', example: '2025-04-10T09:00:00.000Z', description: 'Optional.' }, notes: { type: 'string', example: 'Patient reports dizziness', description: 'Optional.' }, diagnosis: { type: 'string', example: 'Hypertension', description: 'Optional.' }, followUpRequired: { type: 'boolean', example: true, description: 'Optional.' }, followUpDate: { type: 'string', format: 'date-time', example: '2025-05-10T09:00:00.000Z', description: 'Optional.' } }, example: { patientId: 5, doctorId: 2, diagnosis: 'Hypertension', followUpRequired: true, followUpDate: '2025-05-10T09:00:00.000Z' } },
        UpdateConsultationRequest: { description: 'All fields optional. Send only fields to update.', type: 'object', properties: { notes: { type: 'string', example: 'BP improved after medication' }, diagnosis: { type: 'string', example: 'Controlled Hypertension' }, followUpRequired: { type: 'boolean', example: false }, followUpDate: { type: 'string', format: 'date-time' } }, example: { notes: 'BP improved after medication', followUpRequired: false } },
        // ── Visits
        CreateVisitRequest: { description: 'Required: patientId, doctorId, visitDate. Optional: visitType, diagnosis, treatmentPlan, notes. Get doctorId from GET /doctors/search.', type: 'object', required: ['patientId', 'doctorId', 'visitDate'], properties: { patientId: { type: 'integer', example: 5, description: 'Required.' }, doctorId: { type: 'integer', example: 2, description: 'Required. Get from GET /doctors/search.' }, visitDate: { type: 'string', format: 'date-time', example: '2025-04-10T10:00:00.000Z', description: 'Required. ISO 8601.' }, visitType: { type: 'string', enum: ['FirstVisit', 'FollowUp', 'Emergency', 'Consultation'], example: 'FollowUp', description: 'Optional.' }, diagnosis: { type: 'string', example: 'Type 2 Diabetes — follow-up', description: 'Optional.' }, treatmentPlan: { type: 'string', example: 'Continue Metformin; add dietary guidance', description: 'Optional.' }, notes: { type: 'string', example: 'Patient tolerating medication well', description: 'Optional.' } }, example: { patientId: 5, doctorId: 2, visitDate: '2025-04-10T10:00:00.000Z', visitType: 'FollowUp', diagnosis: 'Type 2 Diabetes — follow-up' } },
        UpdateVisitRequest: { description: 'All fields optional. Send only fields to update.', type: 'object', properties: { visitDate: { type: 'string', format: 'date-time' }, visitType: { type: 'string', example: 'Emergency' }, diagnosis: { type: 'string', example: 'Acute hyperglycaemia' }, treatmentPlan: { type: 'string' }, notes: { type: 'string' } }, example: { visitType: 'Emergency', diagnosis: 'Acute hyperglycaemia' } },
        // ── Medical reports
        CreateMedicalReportRequest: { description: 'Required: patientId, fileName, fileUrl, fileType, uploadedBy. Optional: reportType, reportDate, notes, fileSize. uploadedBy is the user ID (e.g. from GET /auth/me).', type: 'object', required: ['patientId', 'fileName', 'fileUrl', 'fileType', 'uploadedBy'], properties: { patientId: { type: 'integer', example: 5, description: 'Required.' }, fileName: { type: 'string', example: 'hba1c_march2025.pdf', description: 'Required.' }, fileUrl: { type: 'string', example: '/uploads/reports/hba1c_march2025.pdf', description: 'Required. URL of uploaded file.' }, fileType: { type: 'string', example: 'application/pdf', description: 'Required. MIME type.' }, uploadedBy: { type: 'integer', example: 12, description: 'Required. User ID from GET /auth/me.' }, reportType: { type: 'string', enum: ['LabTest', 'Imaging', 'Consultation', 'Procedure', 'Other'], example: 'LabTest', description: 'Optional.' }, reportDate: { type: 'string', example: '2025-03-15', description: 'Optional.' }, notes: { type: 'string', example: 'HbA1c: 7.2%', description: 'Optional.' }, fileSize: { type: 'number', example: 204800, description: 'Optional.' } }, example: { patientId: 5, fileName: 'hba1c_march2025.pdf', fileUrl: '/uploads/reports/hba1c_march2025.pdf', fileType: 'application/pdf', uploadedBy: 12, reportType: 'LabTest', notes: 'HbA1c: 7.2%' } },
        UpdateMedicalReportRequest: { description: 'All fields optional. Send only fields to update.', type: 'object', properties: { notes: { type: 'string', example: 'Reviewed by Dr. Ahmed' }, reportType: { type: 'string', example: 'LabTest' }, reportDate: { type: 'string', example: '2025-03-15' } }, example: { notes: 'Reviewed by Dr. Ahmed' } },
        // ── Share links
        GenerateShareLinkRequest: { type: 'object', properties: { expiresInDays: { type: 'integer', example: 7, default: 7 } }, example: { expiresInDays: 7 } },
        UpdateShareLinkRequest: { type: 'object', properties: { expiresAt: { type: 'string', format: 'date-time', example: '2025-05-01T00:00:00.000Z' } }, example: { expiresAt: '2025-05-01T00:00:00.000Z' } },
        // ── Ratings
        CreateRatingRequest: { description: 'Required: patientId, ratedType, rating (1–5). For Doctor: include doctorId; for Pharmacist: include pharmacistId. Optional: review.', type: 'object', required: ['patientId', 'ratedType', 'rating'], properties: { patientId: { type: 'integer', example: 5, description: 'Required.' }, ratedType: { type: 'string', enum: ['Doctor', 'Pharmacist'], example: 'Doctor', description: 'Required.' }, doctorId: { type: 'integer', example: 2, description: 'Required when ratedType=Doctor.' }, pharmacistId: { type: 'integer', description: 'Required when ratedType=Pharmacist.' }, rating: { type: 'integer', minimum: 1, maximum: 5, example: 5, description: 'Required. 1–5.' }, review: { type: 'string', example: 'Very attentive and professional', description: 'Optional.' } }, example: { patientId: 5, ratedType: 'Doctor', doctorId: 2, rating: 5, review: 'Very attentive and professional' } },
        // ── Notifications
        CreateNotificationRequest: { type: 'object', required: ['userId', 'type', 'title', 'message'], properties: { userId: { type: 'integer', example: 12 }, type: { type: 'string', enum: ['PrescriptionReady', 'DrugInteraction', 'AppointmentReminder', 'SystemAlert'], example: 'AppointmentReminder' }, title: { type: 'string', example: 'Appointment Reminder' }, message: { type: 'string', example: 'Your appointment with Dr. Ahmed is tomorrow at 10:00 AM.' } }, example: { userId: 12, type: 'AppointmentReminder', title: 'Appointment Reminder', message: 'Your appointment with Dr. Ahmed is tomorrow at 10:00 AM.' } },
        // ── Drug safety
        CheckByTradeNameRequest: { description: 'POST /drug-interactions/check-by-trade-name. Run full 8-check warning logic for this patient and drug.', type: 'object', required: ['patientId', 'tradeNameId'], properties: { patientId: { type: 'integer', example: 5, description: 'Patient to check against (Doctor: any; Patient: must be own id)' }, tradeNameId: { type: 'integer', example: 23, description: 'Drug trade name ID (from GET /trade-names or search)' } }, example: { patientId: 5, tradeNameId: 23 } },
        CheckByTradeNameResponse: {
          description: 'Response: blocked (true if any check would block prescribing), warnings array, tradeName (id, title, activeSubstanceName).',
          type: 'object',
          properties: {
            blocked: { type: 'boolean', example: true },
            warnings: { type: 'array', items: { $ref: '#/components/schemas/Warning' } },
            tradeName: {
              type: 'object',
              properties: {
                id: { type: 'integer', example: 23 },
                title: { type: 'string', example: 'Ibuprofen 400mg' },
                activeSubstanceName: { type: 'string', example: 'Ibuprofen' }
              }
            }
          },
          example: { blocked: true, tradeName: { id: 23, title: 'Ibuprofen 400mg', activeSubstanceName: 'Ibuprofen' }, warnings: [{ severity: 'High', type: 'DiseaseContraindication', message: 'Ibuprofen is contraindicated in renal failure.', blocked: true }] }
        },
        DrugSafetyCheckRequest: { type: 'object', required: ['patientId', 'activeSubstanceId'], properties: { patientId: { type: 'integer', example: 5 }, activeSubstanceId: { type: 'integer', example: 11 }, tradeNameId: { type: 'integer', example: 23 } }, example: { patientId: 5, activeSubstanceId: 11 } },
        // ── ADR
        CreateAdrRequest: { type: 'object', required: ['patientId', 'tradeNameId', 'companyId', 'severity', 'reaction', 'startDate'], properties: { patientId: { type: 'integer', example: 5 }, tradeNameId: { type: 'integer', example: 23 }, companyId: { type: 'integer', example: 1 }, activeSubstanceId: { type: 'integer', example: 11 }, severity: { type: 'string', enum: ['Mild', 'Moderate', 'Severe', 'LifeThreatening'], example: 'Moderate' }, reaction: { type: 'string', example: 'Severe rash and itching' }, startDate: { type: 'string', format: 'date-time', example: '2025-03-10T00:00:00.000Z' }, endDate: { type: 'string', format: 'date-time' }, isAnonymous: { type: 'boolean', example: false } }, example: { patientId: 5, tradeNameId: 23, companyId: 1, severity: 'Moderate', reaction: 'Severe rash and itching', startDate: '2025-03-10T00:00:00.000Z' } },
        UpdateAdrRequest: { type: 'object', properties: { status: { type: 'string', enum: ['Pending', 'UnderReview', 'Confirmed', 'Rejected'], example: 'Confirmed' }, adminNotes: { type: 'string', example: 'Verified by clinical team' } }, example: { status: 'Confirmed', adminNotes: 'Verified by clinical team' } },
        // ── Pharma Safety Engine response shapes
        SafetyWarning: {
          description: 'A single clinical warning generated by one of the 7 Safety Engine checks.',
          type: 'object',
          properties: {
            checkType:   { type: 'string', enum: ['allergy','disease','contraindication','familyDisease','lifestyle','surgery','drugInteraction','cancerRisk'], example: 'allergy', description: 'Which check triggered this warning.' },
            severity:    { type: 'string', enum: ['Info','Low','Medium','High','Critical'], example: 'Critical' },
            statusColor: { type: 'string', enum: ['RED','ORANGE','GREEN'], example: 'RED', description: 'Color contribution of this individual warning.' },
            message:     { type: 'string', example: 'Patient is allergic to Penicillin (Drug allergy). This drug contains Amoxicillin which belongs to the same group.' },
            blocked:     { type: 'boolean', example: true, description: 'True when this warning alone is a hard stop (e.g. allergy, autoBlock rule, carcinogenicity, contraindication keyword match).' }
          },
          example: { checkType: 'allergy', severity: 'Critical', statusColor: 'RED', message: 'Patient is allergic to Penicillin (Drug allergy). This drug contains Amoxicillin.', blocked: true }
        },
        SafetyEvalResult: {
          description: 'Pharma Safety Engine result attached to each drug in search responses when patientId is provided. null when patientId is omitted.',
          type: 'object',
          nullable: true,
          properties: {
            statusColor:  { type: 'string', enum: ['RED','ORANGE','GREEN'], example: 'RED', description: 'Aggregated color: RED if any warning is RED, ORANGE if any is ORANGE and none are RED, GREEN if all checks passed.' },
            blocked:      { type: 'boolean', example: true, description: 'True when at least one warning has blocked=true. UI should prevent prescribing.' },
            warnings:     { type: 'array', items: { $ref: '#/components/schemas/SafetyWarning' }, description: 'Full list of triggered warnings across all 7 checks.' },
            filteredData: {
              type: 'object',
              description: 'Subset of the drug\'s 183 fields relevant to this specific patient. Always includes fixed fields (excipients, medicationErrors, driving, labTests, ADR severity groups). Adds contextual fields based on patient profile: elderly → specialPopulationElderly + renal + hepatic; pregnant → reproductiveWarningFemale; children → specialPopulationChildren; patient diseases → their mapped ADR columns.',
              additionalProperties: true
            }
          },
          example: {
            statusColor: 'ORANGE',
            blocked: false,
            warnings: [{ checkType: 'disease', severity: 'Medium', statusColor: 'ORANGE', message: 'Patient has Hypertension. Drug has Vascular ADR data containing relevant keywords.', blocked: false }],
            filteredData: { excipients: 'Lactose', vascularWarning: 'Hypertension reported in ≥1% of patients.', specialPopulationElderly: 'Reduce dose in elderly patients.' }
          }
        },
        // ── Medicine suggestions
        CreateMedicineSuggestionRequest: { type: 'object', required: ['tradeName', 'activeSubstance'], properties: { tradeName: { type: 'string', example: 'Augmentin 1g' }, activeSubstance: { type: 'string', example: 'Amoxicillin + Clavulanate' }, concentration: { type: 'string', example: '1g' }, dosageForm: { type: 'string', example: 'Tablet' }, manufacturer: { type: 'string', example: 'GSK' }, reason: { type: 'string', example: 'Commonly prescribed, not yet in database' } }, example: { tradeName: 'Augmentin 1g', activeSubstance: 'Amoxicillin + Clavulanate', concentration: '1g', dosageForm: 'Tablet' } },
        ReviewMedicineSuggestionRequest: { type: 'object', properties: { status: { type: 'string', example: 'Approved' }, reviewNotes: { type: 'string', example: 'Added to database as of 2025-04-01' } }, example: { status: 'Approved', reviewNotes: 'Added to database as of 2025-04-01' } },
        ResolveAddMedicineRequestRequest: {
          description: 'Resolve an add medicine request: provide tradeNameId and/or activeSubstanceId (from admin-created Trade Name or Active Substance). Backend links the PatientMedicine and marks it verified, then marks the request Resolved.',
          type: 'object',
          properties: {
            tradeNameId:       { type: 'integer', example: 23, description: 'Optional. ID of the trade name to link (from GET /trade-names or newly created).' },
            activeSubstanceId: { type: 'integer', example: 11, description: 'Optional. ID of the active substance to link if only this was missing.' },
            resolutionNotes:   { type: 'string', example: 'Matched to existing DB entry for Ibuprofen 400mg', description: 'Optional notes for the resolution.' }
          },
          example: { tradeNameId: 23, resolutionNotes: 'Matched to existing DB entry for Ibuprofen 400mg' }
        },
        // ── Active substances (minimal for doc; full schema is large)
        CreateActiveSubstanceRequest: { type: 'object', required: ['activeSubstance'], properties: { activeSubstance: { type: 'string', example: 'Atorvastatin' }, concentration: { type: 'string', example: '20 mg' }, classification: { type: 'string', example: 'Statins' }, dosageForm: { type: 'string', example: 'Tablet' }, indication: { type: 'string', example: 'Hypercholesterolaemia' }, pregnancyWarning: { type: 'string' }, lactationWarning: { type: 'string' }, contraindications: {}, isActive: { type: 'boolean', example: true } }, example: { activeSubstance: 'Atorvastatin', concentration: '20 mg', classification: 'Statins', dosageForm: 'Tablet' } },
        UpdateActiveSubstanceRequest: { type: 'object', properties: { activeSubstance: { type: 'string', example: 'Atorvastatin' }, concentration: { type: 'string', example: '40 mg' }, classification: { type: 'string', example: 'Statins' }, isActive: { type: 'boolean', example: true } }, example: { concentration: '40 mg' } },
        // ── Trade names
        CreateTradeNameRequest: { type: 'object', required: ['title', 'activeSubstanceId', 'companyId'], properties: { title: { type: 'string', example: 'Lipitor 20mg' }, activeSubstanceId: { type: 'integer', example: 15 }, companyId: { type: 'integer', example: 1 }, barCode: { type: 'string', example: '6224000123456' }, warningNotification: { type: 'string' }, availabilityStatus: { type: 'string', enum: ['InStock', 'OutOfStock', 'Discontinued', 'Pending'], example: 'InStock' } }, example: { title: 'Lipitor 20mg', activeSubstanceId: 15, companyId: 1, availabilityStatus: 'InStock' } },
        UpdateTradeNameRequest: { type: 'object', properties: { title: { type: 'string', example: 'Lipitor 40mg' }, activeSubstanceId: { type: 'integer', example: 15 }, companyId: { type: 'integer', example: 1 }, availabilityStatus: { type: 'string', example: 'InStock' } }, example: { availabilityStatus: 'OutOfStock' } },
        Pagination: {
          description: 'Pagination metadata for search/list endpoints (GET /trade-names/search, GET /active-substances/search, GET /trade-names, etc.).',
          type: 'object',
          required: ['total', 'page', 'limit', 'totalPages'],
          properties: {
            total:      { type: 'integer', example: 48, description: 'Total rows matching filters across all pages.' },
            page:       { type: 'integer', example: 1, description: 'Current page number (1-based).' },
            limit:      { type: 'integer', example: 20, description: 'Page size.' },
            totalPages: { type: 'integer', example: 3, description: 'Total number of pages.' }
          }
        },
        TradeNameCompanyInstructionPdf: {
          description: 'Instruction PDF row linked via TradeName.companyInstructionsPdf.',
          type: 'object',
          properties: {
            id:          { type: 'integer', example: 1 },
            url:         { type: 'string', format: 'uri', example: 'https://storage.example.com/instructions/crestor.pdf' },
            views:       { type: 'integer', example: 3 },
            tradeNameId: { type: 'integer', example: 12 },
            createdAt:   { type: 'string', format: 'date-time', example: '2026-04-01T10:00:00.000Z' },
            updatedAt:   { type: 'string', format: 'date-time', example: '2026-04-01T10:00:00.000Z' }
          }
        },
        ExcipientTradeNameRow: {
          description: 'Excipient–trade-name link. Returned on GET /trade-names/search when `patientId` is provided (allergy-aware safety checks). Omitted when `patientId` is absent.',
          type: 'object',
          properties: {
            id:          { type: 'integer', example: 50 },
            excipientId: { type: 'integer', example: 3 },
            tradeNameId: { type: 'integer', example: 12 },
            isActive:    { type: 'boolean', example: true },
            createdAt:   { type: 'string', format: 'date-time' },
            updatedAt:   { type: 'string', format: 'date-time' },
            excipient:   {
              type: 'object',
              properties: {
                id:   { type: 'integer', example: 3 },
                name: { type: 'string', example: 'Lactose' }
              }
            }
          }
        },
        ActiveSubstance: {
          description: 'Active substance row from GET /active-substances/search. Responses include the full Prisma model; listed properties are the main ones clients use. Always includes `_count.tradeNames`.',
          type: 'object',
          properties: {
            id:               { type: 'integer', example: 11 },
            name:             { type: 'string', example: 'Atorvastatin' },
            classificationId: { type: 'integer', example: 2 },
            concentration:    { type: 'string', example: '20 mg' },
            dosageForm:       { type: 'string', example: 'Tablet' },
            isActive:         { type: 'boolean', example: true },
            createdAt:        { type: 'string', format: 'date-time' },
            updatedAt:        { type: 'string', format: 'date-time' },
            _count:           {
              type: 'object',
              properties: {
                tradeNames: { type: 'integer', example: 4, description: 'How many trade names reference this substance.' }
              }
            }
          },
          additionalProperties: true
        },
        TradeName: {
          description: 'Trade name row as returned by GET /trade-names/search, GET /trade-names (list), POST /trade-names/search-by-image, and create responses. GET /trade-names/search merges `safetyStatus` (see allOf in that path). With `patientId`, responses include `excipientTradeName`; without it, that field is omitted.',
          type: 'object',
          properties: {
            id:                  { type: 'integer', example: 12 },
            title:               { type: 'string', example: 'Crestor 5mg' },
            activeSubstanceId:   { type: 'integer', example: 7 },
            companyId:           { type: 'integer', nullable: true, example: 2 },
            warningNotification: { type: 'string', nullable: true, description: 'Optional notice shown to doctors.' },
            barCode:             { type: 'string', nullable: true, example: '6224000123456' },
            availabilityStatus:  { type: 'string', enum: ['InStock', 'OutOfStock', 'Discontinued', 'Pending'], example: 'InStock' },
            isActive:            { type: 'boolean', example: true },
            createdAt:           { type: 'string', format: 'date-time', example: '2026-01-15T08:00:00.000Z' },
            updatedAt:           { type: 'string', format: 'date-time', example: '2026-03-01T12:00:00.000Z' },
            deletedAt:           { type: 'string', format: 'date-time', nullable: true },
            activeSubstance:     {
              type: 'object',
              properties: {
                id:               { type: 'integer', example: 7 },
                name:             { type: 'string', example: 'Rosuvastatin' },
                classificationId: { type: 'integer', example: 4 },
                dosageForm:       { type: 'string', example: 'Tablet' }
              }
            },
            company:             {
              type: 'object',
              nullable: true,
              properties: {
                id:   { type: 'integer', example: 2 },
                name: { type: 'string', example: 'AstraZeneca' }
              }
            },
            companyInstructionsPdf: {
              nullable: true,
              allOf: [{ $ref: '#/components/schemas/TradeNameCompanyInstructionPdf' }]
            },
            excipientTradeName: {
              type: 'array',
              items: { $ref: '#/components/schemas/ExcipientTradeNameRow' }
            }
          }
        },
        // ── Diseases
        CreateDiseaseRequest: {
          type: 'object',
          required: ['name', 'severity'],
          description: 'Create a disease. Use triggersCancerCheck to flag diseases where family history activates the Cancer Risk check. Use contraindicationKeywords to list strings the Safety Engine scans for in the drug\'s contraindications text (case-insensitive). Use PUT /diseases/body-system-mappings/bulk to set which ActiveSubstance warning fields this disease maps to.',
          properties: {
            name:                       { type: 'string', example: 'Chronic Kidney Disease', description: 'Required.' },
            severity:                   { type: 'string', enum: ['None', 'Mild', 'Moderate', 'Severe'], example: 'Severe', description: 'Required.' },
            description:                { type: 'string', example: 'Progressive kidney function loss', description: 'Optional.' },
            triggersCancerCheck:        { type: 'boolean', example: false, default: false, description: 'Optional. When true, having a Father/Mother family history of this disease + a drug with carcinogenicityMutagenicity data → RED (Cancer Risk check).' },
            contraindicationKeywords:   { type: 'array', items: { type: 'string', example: 'renal failure' }, example: ['renal failure', 'kidney impairment', 'CKD'], description: 'Optional. Keywords the engine scans for (case-insensitive) inside the drug\'s contraindications text. A match → RED (Contraindication Keyword check).' }
          },
          example: { name: 'Chronic Kidney Disease', severity: 'Severe', triggersCancerCheck: false, contraindicationKeywords: ['renal failure', 'kidney impairment'] }
        },
        UpdateDiseaseRequest: {
          type: 'object',
          description: 'Update a disease. All fields optional.',
          properties: {
            name:                     { type: 'string', example: 'Chronic Kidney Disease (Stage 3)' },
            severity:                 { type: 'string', enum: ['None', 'Mild', 'Moderate', 'Severe'], example: 'Severe' },
            description:              { type: 'string', example: 'Stage 3 CKD with eGFR 30–59' },
            triggersCancerCheck:      { type: 'boolean', example: true, description: 'Toggle the Cancer Risk check flag.' },
            contraindicationKeywords: { type: 'array', items: { type: 'string' }, example: ['renal failure', 'CKD', 'kidney disease'], description: 'Replace all contraindication keywords. Send [] to clear.' }
          },
          example: { contraindicationKeywords: ['renal failure', 'CKD', 'kidney disease'] }
        },
        CreateDiseaseWarningRequest: { type: 'object', required: ['diseaseId', 'activeSubstanceId', 'warningFieldName', 'warningMessage', 'severity'], properties: { diseaseId: { type: 'integer', example: 3 }, activeSubstanceId: { type: 'integer', example: 11 }, warningFieldName: { type: 'string', example: 'renalWarning' }, warningMessage: { type: 'string', example: 'Avoid in CKD patients.' }, severity: { type: 'string', enum: ['Info', 'Low', 'Medium', 'High', 'Critical'], example: 'High' } }, example: { diseaseId: 3, activeSubstanceId: 11, warningFieldName: 'renalWarning', warningMessage: 'Avoid in CKD patients.', severity: 'High' } },
        // ── Body System Mapping schemas
        CreateBodySystemMappingRequest: {
          type: 'object',
          required: ['diseaseId', 'fieldName'],
          description: 'Map one disease to one ActiveSubstance warning field. The Safety Engine uses these mappings to know which field to check when a patient has this disease.',
          properties: {
            diseaseId: { type: 'integer', example: 3, description: 'Required. Get IDs from GET /diseases.' },
            fieldName: {
              type: 'string',
              example: 'renalWarning',
              description: 'Required. One of the 24 ActiveSubstanceWarningField enum values.',
              enum: ['vascularWarning','cardiacWarning','gitWarning','hepaticWarning','renalWarning','nervousSystemWarning','psychiatricWarning','pulmonaryWarning','metabolismWarning','bloodWarning','immuneSystemWarning','infectionWarning','musculoSkeletalWarning','skinConnectiveTissueWarning','eyeDisordersWarning','earDisordersWarning','electrolyteImbalanceWarning','reproductiveWarningFemale','reproductiveWarningMale','specialPopulationElderly','specialPopulationChildren','carcinogenicityMutagenicity','contraindications','medicationErrorWarning']
            }
          },
          example: { diseaseId: 3, fieldName: 'renalWarning' }
        },
        BulkBodySystemMappingRequest: {
          type: 'object',
          required: ['diseaseId', 'fieldNames'],
          description: 'Atomically replace all body-system-mappings for a disease. Existing mappings are deleted and the new set is inserted in a single transaction.',
          properties: {
            diseaseId:  { type: 'integer', example: 3, description: 'Required.' },
            fieldNames: { type: 'array', minItems: 1, items: { type: 'string', enum: ['vascularWarning','cardiacWarning','gitWarning','hepaticWarning','renalWarning','nervousSystemWarning','psychiatricWarning','pulmonaryWarning','metabolismWarning','bloodWarning','immuneSystemWarning','infectionWarning','musculoSkeletalWarning','skinConnectiveTissueWarning','eyeDisordersWarning','earDisordersWarning','electrolyteImbalanceWarning','reproductiveWarningFemale','reproductiveWarningMale','specialPopulationElderly','specialPopulationChildren','carcinogenicityMutagenicity','contraindications','medicationErrorWarning'] }, example: ['renalWarning', 'hepaticWarning'], description: 'Required. Full list of warning fields to assign. Replaces existing mappings.' }
          },
          example: { diseaseId: 3, fieldNames: ['renalWarning', 'hepaticWarning'] }
        },
        // ── Disease warning rules
        CreateDiseaseWarningRuleRequest: { type: 'object', required: ['diseaseId'], properties: { diseaseId: { type: 'integer', example: 3 }, ruleType: { type: 'string', example: 'Contraindication' }, targetActiveSubstanceId: { type: 'integer', example: 11 }, targetDrugClass: { type: 'string', example: 'NSAIDs' }, severity: { type: 'string', example: 'High' }, warningMessage: { type: 'string', example: 'NSAIDs contraindicated in renal failure.' }, autoBlock: { type: 'boolean', example: true }, requiresOverride: { type: 'boolean', example: false }, requiredMonitoring: { type: 'string', example: 'Monitor eGFR' } }, example: { diseaseId: 3, ruleType: 'Contraindication', targetDrugClass: 'NSAIDs', severity: 'High', warningMessage: 'NSAIDs contraindicated in renal failure.', autoBlock: true } },
        UpdateDiseaseWarningRuleRequest: { type: 'object', properties: { ruleType: { type: 'string' }, targetActiveSubstanceId: { type: 'integer' }, targetDrugClass: { type: 'string' }, severity: { type: 'string' }, warningMessage: { type: 'string' }, autoBlock: { type: 'boolean' }, requiresOverride: { type: 'boolean' }, requiredMonitoring: { type: 'string' } }, example: { autoBlock: false, requiredMonitoring: 'Monitor eGFR monthly' } },
        // ── Companies
        CreateCompanyRequest: { type: 'object', required: ['name'], properties: { name: { type: 'string', example: 'Pfizer Egypt' }, address: { type: 'string', example: '100 Industry St, 6th October City' }, governorate: { type: 'string', example: 'Giza' }, country: { type: 'string', example: 'Egypt' }, contactInfo: {}, phoneNumber: { type: 'string', example: '+20224501000' }, email: { type: 'string', format: 'email', example: 'info@pfizer.eg' }, website: { type: 'string', format: 'uri', example: 'https://www.pfizer.eg' } }, example: { name: 'Pfizer Egypt', governorate: 'Giza', country: 'Egypt', email: 'info@pfizer.eg' } },
        UpdateCompanyRequest: { type: 'object', properties: { name: { type: 'string', example: 'Pfizer Egypt LLC' }, address: { type: 'string' }, phoneNumber: { type: 'string' }, email: { type: 'string', example: 'contact@pfizer.eg' } }, example: { email: 'contact@pfizer.eg' } },
        // ── Pricing plans
        CreatePricingPlanRequest: { type: 'object', required: ['title', 'price'], properties: { title: { type: 'string', example: 'Professional' }, price: { type: 'number', example: 199 }, salePrice: { type: 'number', example: 149 }, duration: { type: 'integer', example: 30, description: 'Days' }, features: { type: 'array', items: { type: 'string' }, example: ['Unlimited prescriptions', 'Drug safety engine', 'Priority support'] }, isDefault: { type: 'boolean', example: false } }, example: { title: 'Professional', price: 199, salePrice: 149, duration: 30, features: ['Unlimited prescriptions', 'Drug safety engine'] } },
        UpdatePricingPlanRequest: { type: 'object', properties: { title: { type: 'string' }, price: { type: 'number', example: 229 }, salePrice: { type: 'number', example: 179 }, duration: { type: 'integer' }, features: { type: 'array', items: { type: 'string' } }, isDefault: { type: 'boolean' }, isActive: { type: 'boolean', example: true } }, example: { price: 229, isActive: true } },
        // ── Subscriptions & payments
        CreateSubscriptionRequest: { type: 'object', required: ['userId', 'pricingPlanId'], properties: { userId: { type: 'integer', example: 7 }, pricingPlanId: { type: 'integer', example: 2 }, autoRenew: { type: 'boolean', example: true } }, example: { userId: 7, pricingPlanId: 2, autoRenew: true } },
        UpdateSubscriptionRequest: { type: 'object', properties: { pricingPlanId: { type: 'integer', example: 3 }, autoRenew: { type: 'boolean', example: false }, status: { type: 'string', example: 'Active' } }, example: { autoRenew: false } },
        CreatePaymentRequest: { type: 'object', required: ['subscriptionId', 'amount'], properties: { subscriptionId: { type: 'integer', example: 4 }, amount: { type: 'number', example: 149 }, currency: { type: 'string', example: 'EGP' }, paymentMethod: { type: 'string', example: 'Card' }, transactionId: { type: 'string', example: 'TXN-2025-0001' } }, example: { subscriptionId: 4, amount: 149, currency: 'EGP', paymentMethod: 'Card', transactionId: 'TXN-2025-0001' } },
        UpdatePaymentStatusRequest: { type: 'object', properties: { status: { type: 'string', example: 'Completed' }, transactionId: { type: 'string', example: 'TXN-2025-0001' } }, example: { status: 'Completed' } },
        // ── Admin
        CreatePermissionRequest: { type: 'object', required: ['code', 'name'], properties: { code: { type: 'string', example: 'MANAGE_USERS' }, name: { type: 'string', example: 'Manage Users' }, description: { type: 'string', example: 'Can create, update, and delete users' }, adminOnly: { type: 'boolean', example: true } }, example: { code: 'MANAGE_USERS', name: 'Manage Users', adminOnly: true } },
        AddPermissionToRoleRequest: { type: 'object', required: ['permissionId'], properties: { permissionId: { type: 'integer', example: 5 } }, example: { permissionId: 5 } },
        RejectDoctorRequest: { type: 'object', properties: { reason: { type: 'string', example: 'License number could not be verified with the medical council' } }, example: { reason: 'License number could not be verified with the medical council' } },
        RejectPharmacistRequest: { type: 'object', properties: { reason: { type: 'string', example: 'License expired' } }, example: { reason: 'License expired' } },
        // ── Admin Side Effects Management
        AdminCreateSideEffectRequest: {
          description: 'Create side effect and optionally link to trade names (drugs). tradeNames = array of TradeName IDs (from GET /trade-names/search).',
          type: 'object',
          required: ['name'],
          properties: {
            name: { type: 'string', example: 'Headache', description: 'Required. Side effect name (e.g. Headache).' },
            nameAr: { type: 'string', example: 'صداع', description: 'Optional. Arabic name.' },
            tradeNames: { type: 'array', items: { type: 'integer' }, example: [23, 24], description: 'Optional. Trade name IDs to link.' }
          },
          example: { name: 'Headache', nameAr: 'صداع', tradeNames: [23] }
        },
        AdminUpdateSideEffectRequest: {
          description: 'Update side effect. All fields optional.',
          type: 'object',
          properties: { name: { type: 'string', example: 'Migraine' }, nameAr: { type: 'string', example: 'صداع نصفي' } },
          example: { name: 'Migraine' }
        },
        AdminAttachTradeNamesRequest: {
          description: 'Attach trade names (drugs) to side effect. tradeNames = array of TradeName IDs.',
          type: 'object',
          required: ['tradeNames'],
          properties: {
            tradeNames: { type: 'array', items: { type: 'integer' }, minItems: 1, example: [23, 24, 25] }
          },
          example: { tradeNames: [23, 24, 25] }
        },
        // ── Side effects
        AddSideEffectRequest: {
          description: 'Add a new side effect and link it to a medication. Required: medicationId (PatientMedicine id), name.',
          type: 'object',
          required: ['medicationId', 'name'],
          properties: {
            medicationId: { type: 'integer', example: 8, description: 'Required. PatientMedicine ID (from GET /patient-medicines/patient/:patientId).' },
            name: { type: 'string', example: 'Headache', description: 'Required. Name of the side effect (e.g. "Headache").' }
          },
          example: { medicationId: 8, name: 'Headache' }
        },
        ReportSideEffectsRequest: {
          description: 'Report side effects the patient experienced for a medication. Required: medicationId, sideEffects (array of SideEffect IDs).',
          type: 'object',
          required: ['medicationId', 'sideEffects'],
          properties: {
            medicationId: { type: 'integer', example: 8, description: 'Required. PatientMedicine ID.' },
            sideEffects: { type: 'array', items: { type: 'integer' }, example: [1, 3], description: 'Required. Array of SideEffect IDs (from GET /side-effects/by-medication/:id).' }
          },
          example: { medicationId: 8, sideEffects: [1, 3] }
        },
        SideEffectsByMedicationResponse: {
          description: 'Response for GET /side-effects/by-medication/:id. If the medication\'s company is contracted: { supported: true, sideEffects: [...] }. If NOT contracted: { supported: false, redirect: "https://edaegypt.gov.eg" }.',
          type: 'object',
          properties: {
            supported: { type: 'boolean', example: true },
            redirect: { type: 'string', example: 'https://edaegypt.gov.eg', description: 'Only present when supported=false. URL to EDA website.' },
            sideEffects: { type: 'array', items: { type: 'object', properties: { id: { type: 'integer', example: 1 }, name: { type: 'string', example: 'Headache' }, frequency: { type: 'string', nullable: true, example: 'Common' }, bodySystem: { type: 'string', nullable: true, example: 'Nervous System' } } }, description: 'Only present when supported=true.' }
          },
          example: { supported: true, sideEffects: [{ id: 1, name: 'Headache', frequency: 'Common', bodySystem: 'Nervous System' }, { id: 3, name: 'Nausea', frequency: 'Very Common', bodySystem: 'Gastrointestinal' }] }
        },
        SubmitBatchSideEffectsRequest: {
          description: 'Submit multiple side effects at once with severity and optional notes. Each side effect includes sideEffectId, severity level, and optional patient notes.',
          type: 'object',
          required: ['medicationId', 'sideEffects'],
          properties: {
            medicationId: { type: 'integer', example: 5, description: 'Required. PatientMedicine ID.' },
            sideEffects: {
              type: 'array',
              minItems: 1,
              maxItems: 50,
              items: {
                type: 'object',
                required: ['sideEffectId', 'severity'],
                properties: {
                  sideEffectId: { type: 'integer', example: 101, description: 'Required. SideEffect ID from GET /medicines/:tradeNameId/side-effects' },
                  severity: { type: 'string', enum: ['Mild', 'Moderate', 'Severe'], example: 'Moderate', description: 'Required. Severity level of the side effect.' },
                  notes: { type: 'string', maxLength: 500, nullable: true, example: 'Occurred after 2 hours of taking medication', description: 'Optional. Patient description or additional notes about the side effect.' }
                }
              },
              description: 'Required. Array of side effects to submit (1-50 items).'
            }
          },
          example: {
            medicationId: 5,
            sideEffects: [
              { sideEffectId: 101, severity: 'Moderate', notes: 'Occurred after 2 hours of taking medication' },
              { sideEffectId: 103, severity: 'Mild', notes: null }
            ]
          }
        },
        SubmitBatchSideEffectsResponse: {
          description: 'Response after submitting multiple side effects. Returns confirmation with list of submitted side effects.',
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: '2 side effects submitted pending approval' },
            submitted: { type: 'integer', example: 2, description: 'Number of side effects successfully submitted.' },
            sideEffects: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'integer', example: 45 },
                  name: { type: 'string', example: 'Headache' },
                  severity: { type: 'string', example: 'Moderate' },
                  notes: { type: 'string', nullable: true, example: 'Occurred after 2 hours of taking medication' },
                  status: { type: 'string', example: 'Pending', description: 'Always Pending until admin approves.' }
                }
              },
              description: 'List of successfully submitted side effects.'
            }
          },
          example: {
            success: true,
            message: '2 side effects submitted pending approval',
            submitted: 2,
            sideEffects: [
              { id: 45, name: 'Headache', severity: 'Moderate', notes: 'Occurred after 2 hours of taking medication', status: 'Pending' },
              { id: 46, name: 'Nausea', severity: 'Mild', notes: null, status: 'Pending' }
            ]
          }
        },
        ExtractSideEffectsResponse: {
          description: 'Response when extracting side effects for a trade name. Groups side effects by frequency (VeryCommon, Common, Uncommon, Rare, VeryRare, Unknown). Only includes Approved side effects. Requires active company contract.',
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            medicineId: { type: 'integer', example: 5 },
            tradeName: { type: 'string', example: 'Crestor 5mg' },
            hasContract: { type: 'boolean', example: true },
            instructionPdf: {
              nullable: true,
              description: 'Company instruction PDF linked to this trade name (Prisma relation companyInstructionsPdf). Null when none is configured.',
              type: 'object',
              properties: {
                id: { type: 'integer', example: 1 },
                url: { type: 'string', format: 'uri', example: 'https://storage.example.com/instructions/crestor.pdf' },
                views: { type: 'integer', example: 12 },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' }
              }
            },
            sideEffects: {
              type: 'object',
              properties: {
                veryCommon: { type: 'array', items: { type: 'object', properties: { id: { type: 'integer' }, name: { type: 'string' }, nameAr: { type: 'string', nullable: true }, frequency: { type: 'string' }, bodySystem: { type: 'string', nullable: true } } } },
                common: { type: 'array', items: { type: 'object', properties: { id: { type: 'integer' }, name: { type: 'string' }, nameAr: { type: 'string', nullable: true }, frequency: { type: 'string' }, bodySystem: { type: 'string', nullable: true } } } },
                uncommon: { type: 'array', items: { type: 'object', properties: { id: { type: 'integer' }, name: { type: 'string' }, nameAr: { type: 'string', nullable: true }, frequency: { type: 'string' }, bodySystem: { type: 'string', nullable: true } } } },
                rare: { type: 'array', items: { type: 'object', properties: { id: { type: 'integer' }, name: { type: 'string' }, nameAr: { type: 'string', nullable: true }, frequency: { type: 'string' }, bodySystem: { type: 'string', nullable: true } } } },
                veryRare: { type: 'array', items: { type: 'object', properties: { id: { type: 'integer' }, name: { type: 'string' }, nameAr: { type: 'string', nullable: true }, frequency: { type: 'string' }, bodySystem: { type: 'string', nullable: true } } } },
                unknown: { type: 'array', items: { type: 'object', properties: { id: { type: 'integer' }, name: { type: 'string' }, nameAr: { type: 'string', nullable: true }, frequency: { type: 'string' }, bodySystem: { type: 'string', nullable: true } } } }
              },
              description: 'Side effects grouped by frequency category.'
            }
          },
          example: {
            success: true,
            medicineId: 5,
            tradeName: 'Crestor 5mg',
            hasContract: true,
            instructionPdf: {
              id: 1,
              url: 'https://storage.example.com/instructions/crestor.pdf',
              views: 12,
              createdAt: '2026-04-01T10:30:00.000Z',
              updatedAt: '2026-04-02T15:45:00.000Z'
            },
            sideEffects: {
              veryCommon: [
                { id: 101, name: 'Headache', nameAr: 'صداع', frequency: 'VeryCommon', bodySystem: 'Nervous System' },
                { id: 102, name: 'Dizziness', nameAr: 'دوخة', frequency: 'VeryCommon', bodySystem: 'Nervous System' }
              ],
              common: [
                { id: 103, name: 'Nausea', nameAr: 'غثيان', frequency: 'Common', bodySystem: 'GIT' }
              ],
              uncommon: [],
              rare: [],
              veryRare: [],
              unknown: []
            }
          }
        },
        // ── Patient share token (QR code)
        RedeemShareTokenRequest: {
          description: 'Redeem a patient share QR token. Required: token (UUID string from the scanned QR code).',
          type: 'object',
          required: ['token'],
          properties: {
            token: { type: 'string', format: 'uuid', example: 'a3b4c5d6-e7f8-4a9b-0c1d-2e3f4a5b6c7d', description: 'Required. The token from the scanned QR code.' }
          },
          example: { token: 'a3b4c5d6-e7f8-4a9b-0c1d-2e3f4a5b6c7d' }
        },
        GenerateShareTokenResponse: {
          description: 'Response after generating a share token. Includes the raw token, expiration info, and QR code as a base64 data URL.',
          type: 'object',
          properties: {
            message:          { type: 'string', example: 'Share token generated successfully' },
            token:            { type: 'string', format: 'uuid', example: 'a3b4c5d6-e7f8-4a9b-0c1d-2e3f4a5b6c7d', description: 'The generated secure token.' },
            expiresAt:        { type: 'string', format: 'date-time', example: '2025-04-07T10:30:00.000Z', description: 'Token expiration timestamp.' },
            expiresInMinutes: { type: 'integer', example: 15, description: 'Token TTL in minutes.' },
            qrCode:           { type: 'string', example: 'data:image/png;base64,iVBOR...', description: 'QR code image as base64 data URL (image/png).' }
          },
          example: { message: 'Share token generated successfully', token: 'a3b4c5d6-e7f8-4a9b-0c1d-2e3f4a5b6c7d', expiresAt: '2025-04-07T10:30:00.000Z', expiresInMinutes: 15 }
        },
        RedeemShareTokenResponse: {
          description: 'Response after successfully redeeming a share token. Includes the new relationship and patient details.',
          type: 'object',
          properties: {
            message:      { type: 'string', example: 'Patient linked to doctor successfully' },
            relationship: { type: 'object', description: 'The created PatientDoctor relationship.' },
            patient:      { type: 'object', description: 'Patient details (id, name, email, age, gender, bloodType, diseases, allergies).' }
          },
          example: { message: 'Patient linked to doctor successfully', relationship: { id: 10, patientId: 5, doctorId: 2, relationshipType: 'PrimaryCare' }, patient: { id: 5, name: 'John Doe', email: 'patient@greenrx.com', age: 45, gender: 'Male' } }
        },
        VerifyDoctorRequest: { type: 'object', properties: { notes: { type: 'string', example: 'License verified with Egyptian Medical Syndicate' } }, example: { notes: 'License verified with Egyptian Medical Syndicate' } },
        // ── Drug-safety schemas
        WarningSeverity: { type: 'string', enum: ['Info', 'Low', 'Medium', 'High', 'Critical'], example: 'High' },
        WarningType: {
          type: 'string',
          enum: ['AllergyWarning', 'DiseaseContraindication', 'PregnancyWarning', 'LactationWarning',
                 'PediatricWarning', 'GeriatricWarning', 'RenalWarning', 'HepaticWarning',
                 'DrugInteraction', 'BatchDrugInteraction', 'FamilyHistoryRisk'],
          example: 'AllergyWarning'
        },
        Warning: {
          type: 'object',
          properties: {
            severity: { $ref: '#/components/schemas/WarningSeverity' },
            type:     { $ref: '#/components/schemas/WarningType' },
            message:  { type: 'string', example: 'Ibuprofen is contraindicated in patients with renal failure.' },
            blocked:  { type: 'boolean', example: true }
          },
          example: { severity: 'High', type: 'DiseaseContraindication', message: 'Ibuprofen is contraindicated in patients with renal failure.', blocked: true }
        },
        WarningResult: {
          type: 'object',
          properties: {
            blocked:  { type: 'boolean', example: true },
            warnings: { type: 'array', items: { $ref: '#/components/schemas/Warning' } }
          },
          example: { blocked: true, warnings: [{ severity: 'High', type: 'DiseaseContraindication', message: 'Contraindicated in CKD.', blocked: true }] }
        },
        PatientWarningsResponse: {
          description: 'GET /patients/:patientId/warnings. Aggregated warnings for all current medicines (prescriptions + self-reported).',
          type: 'object',
          properties: {
            warnings: { type: 'array', items: { $ref: '#/components/schemas/Warning' }, description: 'All warnings flattened.' },
            byMedicine: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  medicineName:       { type: 'string', example: 'Ibuprofen 400mg' },
                  tradeNameId:        { type: 'integer', example: 23 },
                  activeSubstanceId:  { type: 'integer', example: 11 },
                  warnings:           { type: 'array', items: { $ref: '#/components/schemas/Warning' } }
                }
              },
              description: 'Warnings grouped by medicine.'
            }
          },
          example: {
            warnings: [{ severity: 'High', type: 'DiseaseContraindication', message: 'Ibuprofen contraindicated in CKD.', blocked: true }],
            byMedicine: [{ medicineName: 'Ibuprofen 400mg', tradeNameId: 23, activeSubstanceId: 11, warnings: [{ severity: 'High', type: 'DiseaseContraindication', message: 'Ibuprofen contraindicated in CKD.', blocked: true }] }]
          }
        },
        // ── Instruction PDF schemas
        InstructionPdfData: {
          description: 'Instruction PDF row: stored file URL and view counter (POST .../instruction-pdf/view increments views). Does not return raw PDF bytes.',
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1, description: 'InstructionPdf record ID' },
            url: { type: 'string', format: 'uri', example: 'https://storage.example.com/instructions/crestor.pdf', description: 'Location of the PDF (e.g. S3 or CDN URL)' },
            views: { type: 'integer', example: 42, description: 'Times POST .../instruction-pdf/view succeeded for this trade name' },
            tradeNameId: { type: 'integer', example: 5, description: 'Associated TradeName ID' },
            tradeName: {
              type: 'object',
              properties: {
                id: { type: 'integer', example: 5 },
                title: { type: 'string', example: 'Crestor 5mg' }
              }
            },
            createdAt: { type: 'string', format: 'date-time', example: '2026-04-01T10:30:00.000Z' },
            updatedAt: { type: 'string', format: 'date-time', example: '2026-04-02T15:45:00.000Z' }
          }
        },
        ViewInstructionPdfResponse: {
          description: 'Response after viewing and incrementing the instruction PDF counter.',
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            instructionPdf: { $ref: '#/components/schemas/InstructionPdfData' }
          },
          example: {
            success: true,
            instructionPdf: {
              id: 1,
              url: 'https://storage.example.com/instructions/crestor.pdf',
              views: 43,
              tradeNameId: 5,
              tradeName: { id: 5, title: 'Crestor 5mg' },
              createdAt: '2026-04-01T10:30:00.000Z',
              updatedAt: '2026-04-02T15:45:00.000Z'
            }
          }
        },
        GetInstructionPdfStatsResponse: {
          description: 'Response containing instruction PDF statistics without incrementing views.',
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            stats: { $ref: '#/components/schemas/InstructionPdfData' }
          },
          example: {
            success: true,
            stats: {
              id: 1,
              url: 'https://storage.example.com/instructions/crestor.pdf',
              views: 42,
              tradeNameId: 5,
              tradeName: { id: 5, title: 'Crestor 5mg' },
              createdAt: '2026-04-01T10:30:00.000Z',
              updatedAt: '2026-04-02T15:45:00.000Z'
            }
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
