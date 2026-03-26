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
  responses?: Record<string, string>
) => {
  const tagList = Array.isArray(tagOrTags) ? tagOrTags : [tagOrTags];
  const defaultResponses: Record<string, { description: string }> = { '200': { description: 'Success' } };
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
s('/auth/register', 'post', AUTH_TAGS, 'Register a new user', false, [], { schemaRef: 'RegisterRequest' });
s('/auth/login', 'post', AUTH_TAGS, 'Login and receive tokens', false, [], { schemaRef: 'LoginRequest' });
s('/auth/refresh', 'post', AUTH_TAGS, 'Refresh access token', false, [], { schemaRef: 'RefreshTokenRequest' });
s('/auth/logout', 'post', AUTH_TAGS, 'Logout (invalidate token)');
s('/auth/me', 'get', AUTH_TAGS, 'Get current authenticated user. When role is Patient, response includes full patient data (same as GET /patients/:id): user, medicalHistories, familyHistories, patientLifestyles, patientAllergies, childrenProfiles, patientDiseases, bodyMassIndex.');
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
s('/patients/me/full', 'get', PATIENT_TAGS.PROFILE, 'Get my full details (patient only). Same structure as GET /doctors/{doctorId}/patients/{patientId}: profile, vitals, medicalHistories, familyHistories, patientDiseases, patientLifestyles, patientAllergies, surgicalHistories, visits, medicalReports, name, email, phone, bodyMassIndex. No path params; use Bearer token.', true);
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
s('/patients/{patientId}/warnings', 'get', [PATIENT_TAGS.DRUG_SAFETY, PATIENT_TAGS.MEDICATIONS, DOCTOR_PATIENTS_SECTION], 'Get all warnings for a patient (all types: allergies, disease, interactions, etc.) for current prescriptions and self-reported medicines', true, [p('patientId')]);

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
s('/doctors/{doctorId}/patients/warnings', 'get', [DOCTOR_TAGS.MY_PATIENTS, DOCTOR_PATIENTS_SECTION, DOCTOR_TAGS.DRUG_SAFETY], 'Get all warnings for patients linked to this doctor. Returns { warnings: [ { patientId, name, patientName, email, type, severity, message, ... } ] } — one entry per warning with patient info on each.', true, [p('doctorId')]);
s('/doctors/{doctorId}/patients/{patientId}', 'get', [DOCTOR_TAGS.MY_PATIENTS, DOCTOR_PATIENTS_SECTION], 'Get full details of a patient (profile, vitals, health status, visit files). Only for patients linked to this doctor.', true, [p('doctorId'), p('patientId')]);
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
s('/prescriptions', 'get', [PATIENT_TAGS.PRESCRIPTIONS, DOCTOR_TAGS.PRESCRIPTIONS, DOCTOR_PATIENTS_SECTION], 'List prescriptions (filtered by role). Response includes prescriptionMedicines with patientMedicine (tradeName, activeSubstance).', true, [q('patientId'), q('doctorId')]);
s('/prescriptions', 'post', [DOCTOR_TAGS.PRESCRIPTIONS, DOCTOR_PATIENTS_SECTION, DOCTOR_ADD_DRUG_SECTION], 'Create prescription (First Visit: conditionDiagnosis, initialCheckUp, medicationPlan/items, testResultsOrScans, followUpAppointmentDate). Required: items or medicationPlan; each item: medicineName (required), tradeNameId? or manual, activeSubstanceId?, dosageAmount?, frequencyCount?, durationValue?, etc. Runs drug-safety check.', true, [], { schemaRef: 'CreatePrescriptionRequest' });
s('/prescriptions/batch', 'post', [DOCTOR_TAGS.PRESCRIPTIONS, DOCTOR_PATIENTS_SECTION], 'Batch-create prescriptions: one Prescription per medicine, each with one PatientMedicine + PrescriptionMedicine. Runs drug-safety and batch-interaction checks.', true, [], { schemaRef: 'BatchPrescriptionsRequest' });
s('/prescriptions/{prescriptionId}/medicines', 'post', [DOCTOR_TAGS.PRESCRIPTIONS, DOCTOR_PATIENTS_SECTION, DOCTOR_ADD_DRUG_SECTION], 'Add one medicine to an existing prescription (draft). Body: AddMedicineToPrescriptionRequest (medicineName required, tradeNameId?, activeSubstanceId?, dosageAmount?, frequencyCount?, durationValue?, etc.). Returns prescription with prescriptionMedicines and patientMedicine.', true, [p('prescriptionId')], { schemaRef: 'AddMedicineToPrescriptionRequest' });
s('/prescriptions/{id}', 'get', [PATIENT_TAGS.PRESCRIPTIONS, DOCTOR_TAGS.PRESCRIPTIONS, DOCTOR_PATIENTS_SECTION], 'Get prescription by ID. Response includes prescriptionMedicines (sortOrder) with nested patientMedicine (tradeName, activeSubstance, dosageAmount, frequencyCount, durationValue, notes).', true, [p('id')]);
s('/prescriptions/{id}', 'put', [DOCTOR_TAGS.PRESCRIPTIONS, DOCTOR_PATIENTS_SECTION], 'Update a prescription', true, [p('id')], { schemaRef: 'UpdatePrescriptionRequest' });
s('/prescriptions/{id}', 'delete', [PATIENT_TAGS.PRESCRIPTIONS, DOCTOR_TAGS.PRESCRIPTIONS, DOCTOR_PATIENTS_SECTION], 'Delete a prescription', true, [p('id')]);
s('/prescriptions/{prescriptionId}/interactions', 'get', [PATIENT_TAGS.PRESCRIPTIONS, PATIENT_TAGS.DRUG_SAFETY, DOCTOR_TAGS.DRUG_SAFETY, DOCTOR_PATIENTS_SECTION], 'Get drug interaction alerts for prescription', true, [p('prescriptionId')]);
s('/prescriptions/interactions/{alertId}/acknowledge', 'put', [PATIENT_TAGS.PRESCRIPTIONS, PATIENT_TAGS.DRUG_SAFETY, DOCTOR_TAGS.DRUG_SAFETY, DOCTOR_PATIENTS_SECTION], 'Acknowledge a drug interaction alert', true, [p('alertId')]);

// PRESCRIPTION VERSIONS
s('/prescription-versions/prescription/{prescriptionId}', 'get', [PATIENT_TAGS.PRESCRIPTIONS, DOCTOR_TAGS.PRESCRIPTIONS, DOCTOR_PATIENTS_SECTION], 'Get all versions of a prescription', true, [p('prescriptionId')]);
s('/prescription-versions/prescription/{prescriptionId}', 'post', [DOCTOR_TAGS.PRESCRIPTIONS, DOCTOR_PATIENTS_SECTION], 'Create a new prescription version', true, [p('prescriptionId')], { schemaRef: 'CreatePrescriptionVersionRequest' });
s('/prescription-versions/prescription/{prescriptionId}/compare', 'get', [PATIENT_TAGS.PRESCRIPTIONS, DOCTOR_TAGS.PRESCRIPTIONS, DOCTOR_PATIENTS_SECTION], 'Compare two prescription versions', true, [p('prescriptionId'), q('version1'), q('version2')]);
s('/prescription-versions/{id}', 'get', [PATIENT_TAGS.PRESCRIPTIONS, DOCTOR_TAGS.PRESCRIPTIONS, DOCTOR_PATIENTS_SECTION], 'Get a specific prescription version', true, [p('id')]);

// APPOINTMENTS (not in core patient-doctor flow; tag for Admin / future use)
s('/appointments', 'post', ADMIN_TAG, 'Create an appointment', true, [], { schemaRef: 'CreateAppointmentRequest' });
s('/appointments/{id}', 'get', ADMIN_TAG, 'Get appointment by ID', true, [p('id')]);
s('/appointments/{id}', 'put', ADMIN_TAG, 'Update an appointment', true, [p('id')], { schemaRef: 'UpdateAppointmentRequest' });
s('/appointments/{id}/cancel', 'post', ADMIN_TAG, 'Cancel an appointment', true, [p('id')]);
s('/appointments/{id}/confirm', 'post', ADMIN_TAG, 'Confirm an appointment (doctor)', true, [p('id')]);
s('/appointments/{id}/complete', 'post', ADMIN_TAG, 'Mark appointment as completed (doctor)', true, [p('id')]);
s('/appointments/patient/{patientId}', 'get', ADMIN_TAG, 'Get all appointments for a patient', true, [p('patientId')]);
s('/appointments/doctor/{doctorId}', 'get', [ADMIN_TAG, DOCTOR_PATIENTS_SECTION], 'Get all appointments for a doctor', true, [p('doctorId')]);
s('/appointments/doctor/{doctorId}/today', 'get', [ADMIN_TAG, DOCTOR_PATIENTS_SECTION], "Get today's appointments for a doctor", true, [p('doctorId')]);

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
s('/notifications', 'post', [PATIENT_TAGS.NOTIFICATIONS, DOCTOR_TAGS.NOTIFICATIONS, PHARMACIST_TAGS.NOTIFICATIONS], 'Create a notification', true, [], { schemaRef: 'CreateNotificationRequest' });
s('/notifications/user/{userId}', 'get', [PATIENT_TAGS.NOTIFICATIONS, DOCTOR_TAGS.NOTIFICATIONS, PHARMACIST_TAGS.NOTIFICATIONS], 'Get all notifications for a user', true, [p('userId')]);
s('/notifications/user/{userId}/read-all', 'patch', [PATIENT_TAGS.NOTIFICATIONS, DOCTOR_TAGS.NOTIFICATIONS, PHARMACIST_TAGS.NOTIFICATIONS], 'Mark all notifications as read', true, [p('userId')]);
s('/notifications/{id}/read', 'patch', [PATIENT_TAGS.NOTIFICATIONS, DOCTOR_TAGS.NOTIFICATIONS, PHARMACIST_TAGS.NOTIFICATIONS], 'Mark a single notification as read', true, [p('id')]);
s('/notifications/{id}', 'delete', [PATIENT_TAGS.NOTIFICATIONS, DOCTOR_TAGS.NOTIFICATIONS, PHARMACIST_TAGS.NOTIFICATIONS], 'Delete a notification', true, [p('id')]);
s('/notifications/appointment-reminders', 'post', ADMIN_TAG, 'Trigger appointment reminder notifications');

// BATCH NUMBER CHECK (trade name can have many batch numbers in BatchHistory)
s('/batch-check/trade-name/{tradeNameId}', 'get', [PATIENT_TAGS.MEDICATIONS, PATIENT_TAGS.DRUG_SAFETY, ADMIN_TAG], 'List all batch numbers for a trade name. A trade name can have many batches (e.g. last 3 months from contracted companies). Returns tradeNameId, count, and batches array.', false, [p('tradeNameId')]);
s('/batch-check', 'post', [PATIENT_TAGS.MEDICATIONS, PATIENT_TAGS.DRUG_SAFETY], 'Check if a batch number is approved (in our database). Send batchNumber in body or upload image of batch section for AI extraction. Returns status: approved | recalled | not_in_database. No auth required. Batch numbers are stored per trade name (one trade name has many batch numbers).', false, []);

// DRUG INTERACTIONS
s('/drug-interactions/check-by-trade-name', 'post', [DOCTOR_TAGS.DRUG_SAFETY, PATIENT_TAGS.DRUG_SAFETY, DOCTOR_PATIENTS_SECTION], 'Run full warning check for a drug by trade name ID. Returns blocked flag and all warnings (allergy, disease, lifestyle, pregnancy, lactation, age, organ, drug-drug). Doctor: any patient; Patient: own patientId only.', true, [], { schemaRef: 'CheckByTradeNameRequest' });
s('/drug-interactions/check', 'post', [DOCTOR_TAGS.DRUG_SAFETY, DOCTOR_PATIENTS_SECTION], 'Check drug safety before prescribing', true, [], { schemaRef: 'DrugSafetyCheckRequest' });
s('/drug-interactions/prescription/{prescriptionId}', 'get', [PATIENT_TAGS.DRUG_SAFETY, DOCTOR_TAGS.DRUG_SAFETY, DOCTOR_PATIENTS_SECTION], 'Get interaction alerts for a prescription', false, [p('prescriptionId')]);
s('/drug-interactions/patient/{patientId}', 'get', [PATIENT_TAGS.DRUG_SAFETY, DOCTOR_PATIENTS_SECTION], 'Get prescription-linked drug interaction alerts only (stored DrugInteractionAlert for this patient). For aggregated warnings including self-reported medicines use GET /patients/:patientId/warnings.', true, [p('patientId')]);
s('/drug-interactions/{id}/acknowledge-doctor', 'patch', [DOCTOR_TAGS.DRUG_SAFETY, DOCTOR_PATIENTS_SECTION], 'Doctor acknowledges an interaction alert', false, [p('id')]);
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
s('/active-substances/classifications', 'get', [DOCTOR_ADD_DRUG_SECTION, DOCTOR_TAGS.PRESCRIPTIONS], 'Step 1: Search classifications for the active substance (dropdown / autocomplete). Doctor only.', true, [q('q', 'Filter classifications by substring (case-insensitive)')]);
s('/active-substances/concentrations', 'get', [DOCTOR_ADD_DRUG_SECTION, DOCTOR_TAGS.PRESCRIPTIONS], 'List concentrations (Conc for this API). Optional: q, classification, activeSubstanceId. Returns { concentrations: string[] }. Doctor only.', true, [q('q'), q('classification'), q('activeSubstanceId')]);
s('/active-substances/dosage-forms', 'get', [DOCTOR_ADD_DRUG_SECTION, DOCTOR_TAGS.PRESCRIPTIONS], 'Step 3: List dosage forms (optionally filtered by classification and/or selected active substance). Doctor only.', true, [q('q'), q('classification'), q('activeSubstanceId')]);
s('/active-substances/search', 'get', [DOCTOR_ADD_DRUG_SECTION, DOCTOR_TAGS.PRESCRIPTIONS], 'Step 2: Search API (active substance) by classification; use selected classification from Step 1. Doctor only.', true, [q('q'), q('classification', 'Filter by classification (alias: therapeuticClass)'), q('therapeuticClass'), q('page'), q('limit')]);
s('/active-substances/{id}', 'get', [PATIENT_TAGS.MEDICATIONS, PHARMACIST_TAGS.MEDICATIONS_SEARCH], 'Get active substance by ID', true, [p('id')]);
s('/active-substances/{id}', 'put', ADMIN_TAG, 'Update active substance (Admin/Company)', true, [p('id')], { schemaRef: 'UpdateActiveSubstanceRequest' });
s('/active-substances/{id}', 'delete', ADMIN_TAG, 'Delete active substance (Admin)', true, [p('id')]);
s('/active-substances/{id}/interactions', 'get', [PATIENT_TAGS.DRUG_SAFETY, DOCTOR_TAGS.DRUG_SAFETY], 'Get all drug interactions for substance', true, [p('id')]);

// TRADE NAMES
s('/trade-names', 'get', [PATIENT_TAGS.MEDICATIONS, PHARMACIST_TAGS.MEDICATIONS_SEARCH], 'List all trade names');
s('/trade-names', 'post', ADMIN_TAG, 'Create a trade name (Admin/Company)', true, [], { schemaRef: 'CreateTradeNameRequest' });
s('/trade-names/search', 'get', [DOCTOR_ADD_DRUG_SECTION, DOCTOR_TAGS.PRESCRIPTIONS], 'Step 4: Get trade names matching classification, API, concentration, dosage form. Doctor only.', true, [q('q', 'Search text (title or active substance)'), q('search', 'Alias for q'), q('activeSubstanceId'), q('classification'), q('dosageForm'), q('concentration', 'Filter by active substance concentration e.g. 5 mg'), q('companyId'), q('isActive'), q('availabilityStatus', 'InStock | OutOfStock | Discontinued | Pending'), q('page'), q('limit')]);
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
s('/my-side-effects', 'post', PATIENT_TAGS.SIDE_EFFECTS, 'Report one or more side effects for a medication (Patient only)', true, [], { schemaRef: 'ReportSideEffectsRequest' }, { '201': 'Side effects reported successfully' });
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
        // ── Auth request bodies
        RegisterRequest: {
          description: 'Create a new user account. Send as multipart/form-data when role=Doctor or Pharmacist. Required: email, password. Optional: role (default Patient), name, phone. When role=Patient, a patient profile is auto-created and the response includes user.patientId. When role=Doctor: name, licenseNumber, specialization, and licenseImage (file) are required; license image is stored under uploads/doctor-licenses/ and the URL is saved as licenseImageUrl on the Doctor profile. When role=Pharmacist: name, licenseNumber, and licenseImage (file) are required; license image is stored under uploads/pharmacist-licenses/ and the URL is saved as licenseImageUrl on the Pharmacist profile. Response includes user.doctorId or user.pharmacistId when applicable.',
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email:           { type: 'string', format: 'email', example: 'user@example.com', description: 'Required.' },
            password:        { type: 'string', minLength: 6, example: 'secret123', description: 'Required. Min 6 characters.' },
            role:            { type: 'string', enum: ['Patient', 'Doctor', 'Pharmacist', 'Admin', 'SuperAdmin'], default: 'Patient', description: 'Optional. Default: Patient.' },
            name:            { type: 'string', minLength: 2, example: 'John Doe', description: 'Required when role=Doctor or Pharmacist.' },
            phone:           { type: 'string', example: '+201145441141', description: 'Optional. E.164 format.' },
            licenseNumber:   { type: 'string', description: 'Required when role=Pharmacist or Doctor. Professional license number. For Pharmacist: send this in the request; it is stored on the Pharmacist profile.' },
            specialization:  { type: 'string', description: 'Required when role=Doctor. Omit for Pharmacist.' },
            licenseImage:    { type: 'string', format: 'binary', description: 'Required when role=Pharmacist or Doctor. License image file (PNG, JPG, etc., max 10MB). Server stores it under uploads/pharmacist-licenses/ (Pharmacist) or uploads/doctor-licenses/ (Doctor) and saves the file URL as licenseImageUrl on the Pharmacist/Doctor profile.' },
            licenseImageUrl: { type: 'string', readOnly: true, description: 'Set by server from uploaded licenseImage. Do not send when registering. After registration, the stored URL is available on the Pharmacist/Doctor profile (e.g. GET /pharmacists or GET /doctors/me).' }
          }
        },
        LoginRequest: {
          description: 'Authenticate and get tokens. Required: email, password. Response includes accessToken, refreshToken, user (id, email, role, etc.). When role is Patient, user also includes patientId (use for /patients/me or /patients/:patientId).',
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email:    { type: 'string', format: 'email', example: 'user@example.com', description: 'Required.' },
            password: { type: 'string', example: 'secret123', description: 'Required.' }
          }
        },
        LoginResponse: {
          description: 'Login and register response. user.patientId when role is Patient; user.doctorId and user.isVerified when role is Doctor; user.pharmacistId and user.isVerified when role is Pharmacist. isVerified indicates whether the admin has verified the doctor/pharmacist.',
          type: 'object',
          properties: {
            accessToken:  { type: 'string' },
            refreshToken: { type: 'string' },
            user:         {
              type: 'object',
              properties: {
                id:          { type: 'integer' },
                email:       { type: 'string' },
                role:        { type: 'string' },
                patientId:   { type: 'integer', description: 'Present when role is Patient.' },
                doctorId:    { type: 'integer', description: 'Present when role is Doctor.' },
                pharmacistId: { type: 'integer', description: 'Present when role is Pharmacist.' },
                isVerified:  { type: 'boolean', description: 'Present when role is Doctor or Pharmacist. True if admin has verified the profile.' }
              }
            }
          }
        },
        RefreshTokenRequest: {
          description: 'Get a new access token. Required: refreshToken (from login/register response).',
          type: 'object',
          required: ['refreshToken'],
          properties: {
            refreshToken: { type: 'string', example: 'eyJhbGci...', description: 'Required.' }
          }
        },
        AuthMeResponse: {
          description: 'Current authenticated user (GET /auth/me). When role is Patient, patient contains full profile (same structure as GET /patients/:id): user, medicalHistories, familyHistories, patientLifestyles, patientAllergies, childrenProfiles, patientDiseases, bodyMassIndex.',
          type: 'object',
          properties: {
            id:        { type: 'integer', description: 'User ID.' },
            email:     { type: 'string', description: 'User email.' },
            name:      { type: 'string', nullable: true, description: 'Display name (e.g. set at registration).' },
            role:      { type: 'string', enum: ['Patient', 'Doctor', 'Pharmacist', 'Admin', 'SuperAdmin'] },
            isActive:  { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
            patient:   { type: 'object', nullable: true, description: 'When role is Patient: full patient profile (same as GET /patients/:id): user, medicalHistories, familyHistories, patientLifestyles, patientAllergies, childrenProfiles, patientDiseases, bodyMassIndex.' },
            doctor:    { type: 'object', nullable: true, description: 'Doctor profile if role is Doctor.' },
            pharmacist: { type: 'object', nullable: true, description: 'Pharmacist profile if role is Pharmacist.' }
          }
        },
        CreatePatientRequest: {
          description: 'Step 1 "Enter Your Personal Information". Required: userId, gender. Optional: dateOfBirth (when provided, age and ageClassification are computed by backend), age, ageClassification, height (cm), weight (kg). BMI is computed from height and weight and returned as bodyMassIndex in patient responses when both are set. Patient name comes from User (e.g. set at registration). Smoking is covered by lifestyle questions. Get userId from GET /auth/me or register response.',
          type: 'object',
          required: ['userId', 'gender'],
          properties: {
            userId:           { type: 'integer', description: 'Required. From GET /auth/me or register response.' },
            gender:           { type: 'string', enum: ['Male', 'Female', 'Other'], description: 'Required.' },
            dateOfBirth:      { type: 'string', format: 'date-time', description: 'Optional. ISO 8601. When provided, age and ageClassification are computed by the backend.' },
            age:              { type: 'integer', minimum: 0, maximum: 150, description: 'Optional. Ignored if dateOfBirth is provided. Fallback when dateOfBirth not sent.' },
            ageClassification: { type: 'string', enum: ['Neonates', 'Infants', 'Toddlers', 'Children', 'Adolescents', 'Adults', 'Elderly'], description: 'Optional. Computed from dateOfBirth when provided.' },
            height:           { type: 'number', description: 'Optional. Height in cm. With weight, used to compute bodyMassIndex in responses.' },
            weight:           { type: 'number', description: 'Optional. Weight in kg. With height, used to compute bodyMassIndex in responses.' },
            bloodType:        { type: 'string', example: 'A+', description: 'Optional. e.g. A+, A-, B+, B-, AB+, AB-, O+, O-' },
            pregnancyWarning: { type: 'boolean', default: false, description: 'Optional.' },
            pregnancyStatus:  { type: 'boolean', description: 'Optional.' },
            trimester:        { type: 'integer', minimum: 1, maximum: 3, description: 'Optional. 1–3.' },
            lactation:        { type: 'boolean', default: false, description: 'Optional.' },
            contracipient:    { type: 'boolean', description: 'Optional. Female only.' },
            isContracipientHormonal: { type: 'boolean', description: 'Optional. Female only.' },
          }
        },
        // ── User
        CreateUserRequest: { type: 'object', required: ['email', 'role'], properties: { email: { type: 'string', format: 'email' }, passwordHash: { type: 'string' }, role: { type: 'string', enum: ['Patient', 'Doctor', 'Pharmacist', 'Admin', 'SuperAdmin'] } } },
        UpdateUserRequest: { description: 'All fields optional. Send only fields to update.', type: 'object', properties: { email: { type: 'string', format: 'email' }, isActive: { type: 'boolean' } } },
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
            diseaseId:    { type: 'integer', description: 'Required. Get IDs from GET /diseases.' },
            severity:     { $ref: '#/components/schemas/DiseaseSeverity', description: 'Required.' },
            status:       { $ref: '#/components/schemas/DiseaseStatus', description: 'Required.' },
            diagnosisDate: { type: 'string', format: 'date-time', description: 'Optional.' },
            treatment:    { type: 'string', description: 'Optional.' },
            notes:        { type: 'string', description: 'Optional.' }
          }
        },
        BatchMedicalHistoryRequest: {
          description: 'One or more medical history entries. Send a single object to add one disease, or an array of objects to add multiple diseases in one request. Each entry: diseaseId, severity, status required; diagnosisDate, treatment, notes optional. Get diseaseId from GET /diseases.',
          type: 'array',
          minItems: 1,
          items: { $ref: '#/components/schemas/MedicalHistoryRequest' }
        },

        FamilyHistoryRequest: {
          description: 'One family history entry. Required: diseaseId, severity. Optional: notes. Get diseaseId from GET /diseases.',
          type: 'object',
          required: ['diseaseId', 'severity'],
          properties: {
            diseaseId: { type: 'integer', description: 'Required. Get IDs from GET /diseases.' },
            severity: { $ref: '#/components/schemas/DiseaseSeverity', description: 'Required.' },
            notes: { type: 'string', description: 'Optional.' },
          }
        },
        BatchFamilyHistoryRequest: { type: 'array', minItems: 1, items: { $ref: '#/components/schemas/FamilyHistoryRequest' }, description: 'Send multiple family history entries in one request. Body: array of FamilyHistoryRequest.' },
        SurgicalHistoryRequest: {
          description: 'One surgical history entry. Required: organId (from GET /operations). Use "me" as patientId for the logged-in patient.',
          type: 'object',
          required: ['organId'],
          properties: {
            organId:  { type: 'integer', description: 'Required. ID from GET /operations.' }
          }
        },
        BatchSurgicalHistoryRequest: {
          description: 'One or more surgical history entries. Send a single object or array. Each entry: organId required. GET /patients/:id/surgeries returns each entry with organ: { id, name }.',
          type: 'array',
          minItems: 1,
          items: { $ref: '#/components/schemas/SurgicalHistoryRequest' }
        },
        CreateLifestyleRequest: {
          description: 'Create lifestyle question (catalog). activeSubstanceField must be one of the ActiveSubstance field names used for warnings (e.g. interactionAlcohol, interactionXanthines). See backend enum ACTIVE_SUBSTANCE_LIFESTYLE_FIELDS.',
          type: 'object',
          required: ['question', 'activeSubstanceField'],
          properties: { question: { type: 'string', description: 'e.g. Alcohol use' }, activeSubstanceField: { type: 'string', description: 'Field on ActiveSubstance to check when adding a medicine (enum)' } }
        },
        UpdateLifestyleRequest: {
          description: 'Update lifestyle question. All fields optional.',
          type: 'object',
          properties: { question: { type: 'string' }, activeSubstanceField: { type: 'string' } }
        },
        PatientLifestyleItemRequest: {
          description: 'One lifestyle answer. lifestyleId from GET /lifestyles, value = boolean.',
          type: 'object',
          required: ['lifestyleId'],
          properties: { lifestyleId: { type: 'integer' }, value: { type: 'boolean', default: false } }
        },
        BatchPatientLifestyleRequest: {
          description: 'Array of { lifestyleId, value }. Upserts patient lifestyle answers.',
          type: 'array',
          minItems: 1,
          items: { $ref: '#/components/schemas/PatientLifestyleItemRequest' }
        },
        Operation: {
          description: 'Organ (admin-managed). Returned from GET /operations and used in Add Surgeries dropdown.',
          type: 'object',
          properties: { id: { type: 'integer' }, name: { type: 'string' }, createdAt: { type: 'string', format: 'date-time' }, updatedAt: { type: 'string', format: 'date-time' } }
        },
        CreateOperationRequest: {
          description: 'Create organ. Required: name.',
          type: 'object',
          required: ['name'],
          properties: { name: { type: 'string', description: 'Organ name (e.g. Heart, Liver, Kidney)' } }
        },
        UpdateOperationRequest: {
          description: 'Update organ. All fields optional.',
          type: 'object',
          properties: { name: { type: 'string' } }
        },
        ChildProfileRequest: { type: 'object', required: ['name', 'dateOfBirth', 'gender', 'ageClassification'], properties: { name: { type: 'string' }, dateOfBirth: { type: 'string', format: 'date-time' }, gender: { type: 'string', enum: ['Male', 'Female', 'Other'] }, ageClassification: { type: 'string', enum: ['Neonates', 'Infants', 'Toddlers', 'Children', 'Adolescents', 'Adults', 'Elderly'] }, weight: { type: 'number' }, height: { type: 'number' }, allergies: {}, diseases: {}, medicalHistory: {} } },
        // ── Doctor & Pharmacist
        CreateDoctorRequest: {
          description: 'Create/update doctor profile. Required: userId, name, specialization, licenseNumber. Optional: licenseImageUrl (URL of uploaded license image, e.g. from register or /uploads/doctor-licenses/...), phoneNumber, clinicAddress, yearsOfExperience, qualifications, consultationFee. Get userId from GET /auth/me.',
          type: 'object',
          required: ['userId', 'name', 'specialization', 'licenseNumber'],
          properties: { userId: { type: 'integer', description: 'Required. From GET /auth/me.' }, name: { type: 'string', description: 'Required.' }, specialization: { type: 'string', description: 'Required.' }, licenseNumber: { type: 'string', description: 'Required.' }, licenseImageUrl: { type: 'string', description: 'Optional. URL of uploaded license image (e.g. /uploads/doctor-licenses/...).' }, phoneNumber: { type: 'string', description: 'Optional.' }, clinicAddress: { type: 'string', description: 'Optional.' }, yearsOfExperience: { type: 'integer', description: 'Optional.' }, qualifications: { type: 'string', description: 'Optional.' }, consultationFee: { type: 'number', description: 'Optional.' } }
        },
        UpdateDoctorMeRequest: {
          description: 'PATCH /doctors/me. All fields optional. clinics: optional array of clinic objects (name?, address?, city?, latitude?, longitude?, workingHours? array of { day, startTime, endTime }); when provided, replaces all doctor clinics.',
          type: 'object',
          properties: { name: { type: 'string' }, specialization: { type: 'string' }, licenseNumber: { type: 'string' }, licenseImageUrl: { type: 'string' }, phoneNumber: { type: 'string' }, clinicAddress: { type: 'string' }, yearsOfExperience: { type: 'integer' }, qualifications: { type: 'string' }, consultationFee: { type: 'number' }, clinics: { type: 'array', items: { $ref: '#/components/schemas/CreateDoctorClinicRequest' }, description: 'Replace all clinics for this doctor; each item same shape as POST /doctors/:doctorId/clinics body.' } }
        },
        DoctorMeStatsResponse: {
          description: 'GET /doctors/me/stats. Statistics for the current doctor.',
          type: 'object',
          properties: {
            totalPatients: { type: 'integer', description: 'Number of patients linked to this doctor' },
            totalPrescriptions: { type: 'integer', description: 'Number of prescriptions written' },
            totalConsultations: { type: 'integer', description: 'Number of consultations' },
            totalAppointments: { type: 'integer', description: 'Number of appointments' },
            totalVisits: { type: 'integer', description: 'Number of visit records' },
            totalRatings: { type: 'integer', description: 'Number of ratings received' },
            totalClinics: { type: 'integer', description: 'Number of clinics (locations)' },
            averageRating: { type: 'number', nullable: true, description: 'Average rating (1–5) or null if none' }
          }
        },
        PutNearbyDoctorsRadiusRequest: {
          description: 'PUT /settings/nearby-doctors-radius. Admin sets the radius in km used by GET /doctors/nearby.',
          type: 'object',
          required: ['radiusKm'],
          properties: { radiusKm: { type: 'integer', minimum: 1, maximum: 500, description: 'Radius in kilometres (1–500)' } }
        },
        AssignPatientRequest: {
          description: 'Assign patient to doctor. Required: patientId, relationshipType. Optional: startDate, endDate. Used in POST /doctors/:doctorId/patients.',
          type: 'object',
          required: ['patientId', 'relationshipType'],
          properties: { patientId: { type: 'integer', description: 'Required.' }, relationshipType: { type: 'string', enum: ['PrimaryCare', 'Specialist', 'Consultation', 'Other'], description: 'Required.' }, startDate: { type: 'string', format: 'date-time', description: 'Optional.' }, endDate: { type: 'string', format: 'date-time', description: 'Optional.' } }
        },
        WorkingHoursSlot: {
          description: 'One slot: day (weekday e.g. "monday" or ISO date), startTime (e.g. "09:00"), endTime (e.g. "17:00").',
          type: 'object',
          required: ['day', 'startTime', 'endTime'],
          properties: { day: { type: 'string' }, startTime: { type: 'string' }, endTime: { type: 'string' } }
        },
        CreateDoctorClinicRequest: {
          description: 'Create a doctor clinic. All optional. workingHours: array of { day, startTime, endTime }.',
          type: 'object',
          properties: { name: { type: 'string' }, address: { type: 'string' }, city: { type: 'string' }, latitude: { type: 'number' }, longitude: { type: 'number' }, workingHours: { type: 'array', items: { $ref: '#/components/schemas/WorkingHoursSlot' } } }
        },
        UpdateDoctorClinicRequest: {
          description: 'Update a doctor clinic. All optional. workingHours: array of { day, startTime, endTime }.',
          type: 'object',
          properties: { name: { type: 'string' }, address: { type: 'string' }, city: { type: 'string' }, latitude: { type: 'number' }, longitude: { type: 'number' }, workingHours: { type: 'array', items: { $ref: '#/components/schemas/WorkingHoursSlot' } } }
        },
        CreatePharmacistRequest: {
          description: 'Create/update pharmacist profile. Required: userId, name, licenseNumber. Optional: phoneNumber, pharmacyName, pharmacyAddress. Get userId from GET /auth/me.',
          type: 'object',
          required: ['userId', 'name', 'licenseNumber'],
          properties: { userId: { type: 'integer', description: 'Required.' }, name: { type: 'string', description: 'Required.' }, licenseNumber: { type: 'string', description: 'Required.' }, phoneNumber: { type: 'string', description: 'Optional.' }, pharmacyName: { type: 'string', description: 'Optional.' }, pharmacyAddress: { type: 'string', description: 'Optional.' } }
        },
        // ── Patient-Doctor
        CreatePatientDoctorRequest: {
          description: 'Create patient-doctor relationship. Required: patientId, doctorId, relationshipType. Get doctor IDs from GET /doctors/search.',
          type: 'object',
          required: ['patientId', 'doctorId', 'relationshipType'],
          properties: { patientId: { type: 'integer', description: 'Required.' }, doctorId: { type: 'integer', description: 'Required. Get from GET /doctors/search.' }, relationshipType: { type: 'string', enum: ['PrimaryCare', 'Specialist', 'Consultation', 'Other'], description: 'Required.' } }
        },
        UpdatePatientDoctorRequest: { description: 'All fields optional. Send only fields to update.', type: 'object', properties: { relationshipType: { type: 'string', enum: ['PrimaryCare', 'Specialist', 'Consultation', 'Other'] }, isActive: { type: 'boolean' }, endDate: { type: 'string', format: 'date-time' } } },
        // ── Allergen categories (catalog)
        AllergenCategoryName: {
          description: 'Bilingual category name object.',
          type: 'object',
          required: ['en'],
          properties: { en: { type: 'string', description: 'English name. Required.' }, ar: { type: 'string', description: 'Arabic name. Optional.' } }
        },
        AllergenCategory: {
          description: 'Allergen category (admin-managed). Used for grouping allergens in the patient form.',
          type: 'object',
          properties: {
            id:        { type: 'integer' },
            name:      { $ref: '#/components/schemas/AllergenCategoryName' },
            _count:    { type: 'object', properties: { allergens: { type: 'integer' } }, description: 'Number of allergens in this category.' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        CreateAllergenCategoryRequest: {
          description: 'Create allergen category. Required: name.en. Optional: name.ar.',
          type: 'object',
          required: ['name'],
          properties: { name: { $ref: '#/components/schemas/AllergenCategoryName' } }
        },
        UpdateAllergenCategoryRequest: {
          description: 'Update allergen category. All fields optional.',
          type: 'object',
          properties: { name: { $ref: '#/components/schemas/AllergenCategoryName' } }
        },
        // ── Allergens (catalog — GET /allergens for dropdown)
        Allergen: {
          description: 'Allergen catalog entry (admin-managed). Patients link via POST /patients/:patientId/allergies with allergenId. Response includes allergenCategory.',
          type: 'object',
          properties: {
            id:                  { type: 'integer' },
            name:                { type: 'string' },
            allergenType:        { type: 'string', nullable: true, enum: ['Drug', 'Food', 'Pollen', 'Dust', 'Pet', 'Fragrance', 'Other'] },
            allergenCategoryId:  { type: 'integer', description: 'FK to AllergenCategory.' },
            allergenCategory:    { $ref: '#/components/schemas/AllergenCategory', nullable: true, description: 'Included in GET responses.' },
            createdAt:           { type: 'string', format: 'date-time' },
            updatedAt:           { type: 'string', format: 'date-time' }
          }
        },
        CreateAllergenRequest: {
          description: 'Create allergen. Required: name, allergenCategoryId. Optional: allergenType.',
          type: 'object',
          required: ['name', 'allergenCategoryId'],
          properties: {
            name:               { type: 'string', description: 'Required. e.g. Penicillin, Peanuts.' },
            allergenCategoryId: { type: 'integer', description: 'Required. ID from GET /allergen-categories.' },
            allergenType:       { type: 'string', enum: ['Drug', 'Food', 'Pollen', 'Dust', 'Pet', 'Fragrance', 'Other'], description: 'Optional.' }
          }
        },
        UpdateAllergenRequest: {
          description: 'Update allergen. All fields optional.',
          type: 'object',
          properties: {
            name:               { type: 'string' },
            allergenType:       { type: 'string', enum: ['Drug', 'Food', 'Pollen', 'Dust', 'Pet', 'Fragrance', 'Other'], nullable: true },
            allergenCategoryId: { type: 'integer', description: 'Optional. Move allergen to a different category.' }
          }
        },
        // ── Excipients (catalog)
        Excipient: {
          description: 'Excipient catalog entry used in allergy reports and trade-name composition.',
          type: 'object',
          properties: {
            id:          { type: 'integer' },
            name:        { type: 'string' },
            description: { type: 'string', nullable: true },
            isActive:    { type: 'boolean' },
            createdAt:   { type: 'string', format: 'date-time' },
            updatedAt:   { type: 'string', format: 'date-time' }
          }
        },
        CreateExcipientRequest: {
          description: 'Create excipient (Admin).',
          type: 'object',
          required: ['name'],
          properties: {
            name:        { type: 'string' },
            description: { type: 'string', nullable: true },
            isActive:    { type: 'boolean', default: true }
          }
        },
        UpdateExcipientRequest: {
          description: 'Update excipient (Admin). All fields optional.',
          type: 'object',
          properties: {
            name:        { type: 'string' },
            description: { type: 'string', nullable: true },
            isActive:    { type: 'boolean' }
          }
        },
        // ── Patient allergies (report + relation tables)
        PatientAllergyReportRequest: {
          description: 'Create/replace a patient allergy report. Provide any combination of tradeNameId, allergenIds, activeSubstanceIds, excipientIds, classificationIds. At least one source must be provided.',
          type: 'object',
          properties: {
            tradeNameId:       { type: 'integer', description: 'Optional trade name ID from GET /trade-names/search.' },
            allergenIds:       { type: 'array', items: { type: 'integer' }, description: 'Optional catalog allergen IDs from GET /allergens.' },
            activeSubstanceIds:{ type: 'array', items: { type: 'integer' }, description: 'Optional active substance IDs from GET /active-substances/search.' },
            excipientIds:      { type: 'array', items: { type: 'integer' }, description: 'Optional excipient IDs.' },
            classificationIds: { type: 'array', items: { type: 'integer' }, description: 'Optional classification IDs.' },
            reaction:          { type: 'string', nullable: true },
            notes:             { type: 'string', nullable: true }
          },
          example: {
            tradeNameId: 17,
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
            id:                { type: 'integer' },
            patientId:         { type: 'integer' },
            tradeNameId:       { type: 'integer', nullable: true },
            reaction:          { type: 'string', nullable: true },
            notes:             { type: 'string', nullable: true },
            createdAt:         { type: 'string', format: 'date-time' },
            updatedAt:         { type: 'string', format: 'date-time' },
            tradeName: { nullable: true, type: 'object', properties: { id: { type: 'integer' }, title: { type: 'string' } } },
            patientAllergies: { type: 'array', items: { type: 'object', properties: { id: { type: 'integer' }, allergenId: { type: 'integer' } } } },
            activeSubstancePatientAllergies: { type: 'array', items: { type: 'object', properties: { id: { type: 'integer' }, activeSubstanceId: { type: 'integer' } } } },
            excipientPatientAllergies: { type: 'array', items: { type: 'object', properties: { id: { type: 'integer' }, excipientId: { type: 'integer' } } } },
            classificationPatientAllergies: { type: 'array', items: { type: 'object', properties: { id: { type: 'integer' }, classificationId: { type: 'integer' } } } }
          }
        },
        // ── Patient diseases
        AddPatientDiseaseRequest: {
          description: 'One current disease. Required: diseaseId, severity. Optional: diagnosisDate, notes. No status field (removed). Get diseaseId from GET /diseases.',
          type: 'object',
          required: ['diseaseId', 'severity'],
          properties: {
            diseaseId:    { type: 'integer', description: 'Required. Get IDs from GET /diseases.' },
            severity:    { type: 'string', enum: ['None', 'Mild', 'Moderate', 'Severe'], description: 'Required.' },
            diagnosisDate: { type: 'string', format: 'date-time', description: 'Optional. ISO 8601.' },
            notes:       { type: 'string', description: 'Optional.' }
          },
          example: { diseaseId: 1, severity: 'Moderate', diagnosisDate: '2024-01-15T00:00:00.000Z', notes: 'Optional notes' }
        },
        BatchPatientDiseasesRequest: { type: 'array', minItems: 1, items: { $ref: '#/components/schemas/AddPatientDiseaseRequest' }, description: 'Send multiple current diseases in one request. Body: array of AddPatientDiseaseRequest. Single object also accepted.' },
        UpdatePatientDiseaseRequest: { description: 'All fields optional. Send only fields to update. severity: None|Mild|Moderate|Severe.', type: 'object', properties: { severity: { type: 'string', enum: ['None', 'Mild', 'Moderate', 'Severe'] }, notes: { type: 'string' } } },
        // ── Patient medicines
        FrequencyUnit: { type: 'string', enum: ['Hours', 'Days', 'Weeks', 'Months', 'Years'], description: 'Unit for frequency (repetitions per X).' },
        DurationUnit: { type: 'string', enum: ['Days', 'Weeks', 'Months', 'Years'], description: 'Unit for duration of treatment.' },
        AddPatientMedicineRequest: {
          description: 'One medication. Required: medicineName. Optional: tradeNameId (GET /trade-names/search), dosageAmount, frequencyCount/Period/Unit, durationValue/Unit, startDate, endDate, isOngoing, notes, reminderEnabled, reminderTimes (array of "HH:mm" e.g. ["08:00","14:00","20:00"]).',
          type: 'object',
          required: ['medicineName'],
          properties: {
            medicineName:     { type: 'string', description: 'Required.' },
            tradeNameId:     { type: 'integer', description: 'Optional. Get IDs from GET /trade-names/search?q=...' },
            dosageAmount:    { type: 'number', format: 'float', description: 'Optional. Numeric dose (e.g. 500, 0.5).' },
            frequencyCount:  { type: 'integer', description: 'Optional. Number of repetitions (e.g. 2 for twice).' },
            frequencyPeriod: { type: 'integer', description: 'Optional. Every X (e.g. 8 for every 8 hours).' },
            frequencyUnit:   { $ref: '#/components/schemas/FrequencyUnit' },
            durationValue:  { type: 'integer', description: 'Optional. Length of treatment (e.g. 7).' },
            durationUnit:   { $ref: '#/components/schemas/DurationUnit' },
            startDate:      { type: 'string', format: 'date-time', description: 'Optional.' },
            endDate:        { type: 'string', format: 'date-time', description: 'Optional.' },
            isOngoing:      { type: 'boolean', description: 'Optional.' },
            notes:          { type: 'string', description: 'Optional.' },
            reminderEnabled: { type: 'boolean', description: 'Optional. Enable in-app medicine reminders.' },
            reminderTimes:   { type: 'array', items: { type: 'string', example: '08:00' }, description: 'Optional. Daily reminder times in HH:mm (e.g. ["08:00","14:00","20:00"]).' }
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
          description: 'One drug in medicationPlan or items. medicineName required; use tradeNameId when selected from system, or omit for manual trade name.',
          type: 'object',
          required: ['medicineName'],
          properties: {
            medicineName:      { type: 'string', description: 'Required. Trade name title or manual entry.' },
            tradeNameId:       { type: 'integer', nullable: true, description: 'Optional. Omit if doctor entered manual trade name. From GET /trade-names/search.' },
            activeSubstanceId: { type: 'integer', nullable: true, description: 'Optional. From API step; can be derived from tradeNameId if not sent.' },
            dosageAmount:      { type: 'number', nullable: true, description: 'e.g. 5.' },
            frequencyCount:    { type: 'integer', nullable: true, description: 'e.g. 2 for twice.' },
            frequencyPeriod:   { type: 'integer', nullable: true, description: 'e.g. 8 for every 8.' },
            frequencyUnit:     { type: 'string', nullable: true, description: 'e.g. Daily, Weekly (FrequencyUnit).' },
            durationValue:     { type: 'integer', nullable: true, description: 'e.g. 3.' },
            durationUnit:      { type: 'string', nullable: true, description: 'e.g. Weeks, Months (DurationUnit).' },
            startDate:         { type: 'string', format: 'date-time', nullable: true },
            endDate:           { type: 'string', format: 'date-time', nullable: true },
            notes:             { type: 'string', nullable: true }
          }
        },
        CreatePrescriptionRequest: {
          description: 'First Visit: doctorId, patientId, conditionDiagnosis, initialCheckUp (vitals), medicationPlan or items (array of drugs), testResultsOrScans, followUpAppointmentDate. Required: doctorId, patientId, and items or medicationPlan (at least one item with medicineName). Response: prescription with prescriptionMedicines (each with patientMedicine including tradeName, activeSubstance), and warnings.',
          type: 'object',
          required: ['doctorId', 'patientId'],
          properties: {
            doctorId:                 { type: 'integer', description: 'Required.' },
            patientId:                { type: 'integer', description: 'Required.' },
            items:                    { type: 'array', items: { $ref: '#/components/schemas/MedicationPlanItem' }, description: 'Required for submit. Array of drugs (medicineName required per item).' },
            medicationPlan:           { type: 'array', items: { $ref: '#/components/schemas/MedicationPlanItem' }, description: 'Alias for items. Same structure.' },
            conditionDiagnosis:       { type: 'string', description: 'Diagnosis of the condition.' },
            initialCheckUp:           {
              type: 'object',
              description: 'Initial check-up vitals (all optional). Height/weight can be pre-filled from patient if doctor does not measure.',
              properties: {
                height:             { type: 'number', description: 'e.g. 170 (Cm).' },
                weight:             { type: 'number', description: 'e.g. 68 (Kg).' },
                bloodPressure:      { type: 'string', description: 'e.g. 120/80 MmHg.' },
                bloodGlucose:       { type: 'number', description: 'e.g. 140 Mg/DL.' },
                bodyTemperature:    { type: 'number', description: 'e.g. 38 °C.' },
                heartRate:          { type: 'number', description: 'e.g. 100 Bpm.' },
                respiratoryRate:    { type: 'string', description: 'e.g. 12-20 Breaths/Min.' },
                oxygenSaturation:   { type: 'number', description: 'e.g. 95 (%).' }
              }
            },
            testResultsOrScans:       { type: 'array', items: { type: 'string' }, description: 'File names or URLs of uploaded tests/scans.' },
            followUpAppointmentDate:  { type: 'string', format: 'date-time', description: 'Follow-up appointment date (e.g. DD/MM/YYYY).' },
            visitId:                  { type: 'integer', nullable: true, description: 'Optional. Link to visit.' },
            validFrom:                { type: 'string', format: 'date-time', description: 'Optional. Default: now.' },
            validUntil:               { type: 'string', format: 'date-time', description: 'Optional. Default e.g. 30 days.' },
            maxRefills:               { type: 'integer', description: 'Optional. Default 0.' },
            notes:                    { type: 'string', nullable: true, description: 'Optional.' }
          }
        },
        AddMedicineToPrescriptionRequest: {
          description: 'Body for POST /prescriptions/:prescriptionId/medicines. One medication plan item (same shape as element of medicationPlan).',
          type: 'object',
          required: ['medicineName'],
          properties: {
            medicineName:      { type: 'string' },
            tradeNameId:       { type: 'integer', nullable: true },
            activeSubstanceId: { type: 'integer', nullable: true },
            dosageAmount:      { type: 'number', nullable: true },
            frequencyCount:    { type: 'integer', nullable: true },
            frequencyPeriod:   { type: 'integer', nullable: true },
            frequencyUnit:     { type: 'string', nullable: true },
            durationValue:     { type: 'integer', nullable: true },
            durationUnit:      { type: 'string', nullable: true },
            startDate:         { type: 'string', format: 'date-time', nullable: true },
            endDate:           { type: 'string', format: 'date-time', nullable: true },
            notes:             { type: 'string', nullable: true }
          }
        },
        ConcentrationsResponse: {
          description: 'GET /active-substances/concentrations. Distinct concentration values (e.g. "5 mg", "5 mg/ 20 mg") filtered by classification and/or activeSubstanceId.',
          type: 'object',
          properties: { concentrations: { type: 'array', items: { type: 'string' } } }
        },
        BatchPrescriptionsRequest: {
          description: 'Batch: one Prescription per medicine; each prescription gets one PatientMedicine + PrescriptionMedicine. Required: doctorId, patientId, medicines (array). Each medicine: tradeNameId (from GET /trade-names/search), dosage, frequency, duration, instructions, notes. Runs drug-safety and batch-interaction checks.',
          type: 'object',
          required: ['doctorId', 'patientId', 'medicines'],
          properties: {
            doctorId:   { type: 'integer', description: 'Required.' },
            patientId:  { type: 'integer', description: 'Required.' },
            medicines:  {
              type: 'array',
              items: {
                type: 'object',
                required: ['tradeNameId'],
                properties: {
                  tradeNameId:  { type: 'integer', description: 'From GET /trade-names/search.' },
                  dosage:       { type: 'string', nullable: true },
                  frequency:    { type: 'string', nullable: true },
                  duration:     { type: 'string', nullable: true },
                  instructions: { type: 'string', nullable: true },
                  notes:        { type: 'string', nullable: true }
                }
              }
            },
            validFrom:  { type: 'string', format: 'date-time', nullable: true },
            validUntil: { type: 'string', format: 'date-time', nullable: true },
            maxRefills: { type: 'integer', nullable: true }
          }
        },
        UpdatePrescriptionRequest: { description: 'All fields optional. Send only fields to update.', type: 'object', properties: { status: { type: 'string' }, dosage: { type: 'string' }, frequency: { type: 'string' }, duration: { type: 'string' }, instructions: { type: 'string' }, notes: { type: 'string' }, changedBy: { type: 'string' }, conditionDiagnosis: { type: 'string' }, initialCheckUp: { type: 'object' }, testResultsOrScans: { type: 'array', items: { type: 'string' } }, followUpAppointmentDate: { type: 'string', format: 'date-time' } } },
        CreatePrescriptionVersionRequest: { type: 'object', properties: { changes: { type: 'string' } } },
        // ── Appointments
        CreateAppointmentRequest: { description: 'Required: patientId, doctorId, appointmentDate. Optional: duration, notes. Get doctorId from GET /doctors/search.', type: 'object', required: ['patientId', 'doctorId', 'appointmentDate'], properties: { patientId: { type: 'integer', description: 'Required.' }, doctorId: { type: 'integer', description: 'Required. Get from GET /doctors/search.' }, appointmentDate: { type: 'string', format: 'date-time', description: 'Required. ISO 8601.' }, duration: { type: 'integer', description: 'Optional. Minutes.' }, notes: { type: 'string', description: 'Optional.' } } },
        UpdateAppointmentRequest: { description: 'All fields optional. Send only fields to update.', type: 'object', properties: { appointmentDate: { type: 'string', format: 'date-time' }, duration: { type: 'integer' }, status: { type: 'string' }, notes: { type: 'string' } } },
        // ── Consultations
        CreateConsultationRequest: { description: 'Required: patientId, doctorId. Optional: consultationDate, notes, diagnosis, followUpRequired, followUpDate. Get doctorId from GET /doctors/search.', type: 'object', required: ['patientId', 'doctorId'], properties: { patientId: { type: 'integer', description: 'Required.' }, doctorId: { type: 'integer', description: 'Required. Get from GET /doctors/search.' }, consultationDate: { type: 'string', format: 'date-time', description: 'Optional.' }, notes: { type: 'string', description: 'Optional.' }, diagnosis: { type: 'string', description: 'Optional.' }, followUpRequired: { type: 'boolean', description: 'Optional.' }, followUpDate: { type: 'string', format: 'date-time', description: 'Optional.' } } },
        UpdateConsultationRequest: { description: 'All fields optional. Send only fields to update.', type: 'object', properties: { notes: { type: 'string' }, diagnosis: { type: 'string' }, followUpRequired: { type: 'boolean' }, followUpDate: { type: 'string', format: 'date-time' } } },
        // ── Visits
        CreateVisitRequest: { description: 'Required: patientId, doctorId, visitDate. Optional: visitType, diagnosis, treatmentPlan, notes. Get doctorId from GET /doctors/search.', type: 'object', required: ['patientId', 'doctorId', 'visitDate'], properties: { patientId: { type: 'integer', description: 'Required.' }, doctorId: { type: 'integer', description: 'Required. Get from GET /doctors/search.' }, visitDate: { type: 'string', format: 'date-time', description: 'Required. ISO 8601.' }, visitType: { type: 'string', enum: ['FirstVisit', 'FollowUp', 'Emergency', 'Consultation'], description: 'Optional.' }, diagnosis: { type: 'string', description: 'Optional.' }, treatmentPlan: { type: 'string', description: 'Optional.' }, notes: { type: 'string', description: 'Optional.' } } },
        UpdateVisitRequest: { description: 'All fields optional. Send only fields to update.', type: 'object', properties: { visitDate: { type: 'string', format: 'date-time' }, visitType: { type: 'string' }, diagnosis: { type: 'string' }, treatmentPlan: { type: 'string' }, notes: { type: 'string' } } },
        // ── Medical reports
        CreateMedicalReportRequest: { description: 'Required: patientId, fileName, fileUrl, fileType, uploadedBy. Optional: reportType, reportDate, notes, fileSize. uploadedBy is the user ID (e.g. from GET /auth/me).', type: 'object', required: ['patientId', 'fileName', 'fileUrl', 'fileType', 'uploadedBy'], properties: { patientId: { type: 'integer', description: 'Required.' }, fileName: { type: 'string', description: 'Required.' }, fileUrl: { type: 'string', description: 'Required. URL of uploaded file.' }, fileType: { type: 'string', description: 'Required. MIME type.' }, uploadedBy: { type: 'integer', description: 'Required. User ID from GET /auth/me.' }, reportType: { type: 'string', enum: ['LabTest', 'Imaging', 'Consultation', 'Procedure', 'Other'], description: 'Optional.' }, reportDate: { type: 'string', description: 'Optional.' }, notes: { type: 'string', description: 'Optional.' }, fileSize: { type: 'number', description: 'Optional.' } } },
        UpdateMedicalReportRequest: { description: 'All fields optional. Send only fields to update.', type: 'object', properties: { notes: { type: 'string' }, reportType: { type: 'string' }, reportDate: { type: 'string' } } },
        // ── Share links
        GenerateShareLinkRequest: { type: 'object', properties: { expiresInDays: { type: 'integer', default: 7 } } },
        UpdateShareLinkRequest: { type: 'object', properties: { expiresAt: { type: 'string', format: 'date-time' } } },
        // ── Ratings
        CreateRatingRequest: { description: 'Required: patientId, ratedType, rating (1–5). For Doctor: include doctorId; for Pharmacist: include pharmacistId. Optional: review.', type: 'object', required: ['patientId', 'ratedType', 'rating'], properties: { patientId: { type: 'integer', description: 'Required.' }, ratedType: { type: 'string', enum: ['Doctor', 'Pharmacist'], description: 'Required.' }, doctorId: { type: 'integer', description: 'Required when ratedType=Doctor.' }, pharmacistId: { type: 'integer', description: 'Required when ratedType=Pharmacist.' }, rating: { type: 'integer', minimum: 1, maximum: 5, description: 'Required. 1–5.' }, review: { type: 'string', description: 'Optional.' } } },
        // ── Notifications
        CreateNotificationRequest: { type: 'object', required: ['userId', 'type', 'title', 'message'], properties: { userId: { type: 'integer' }, type: { type: 'string', enum: ['PrescriptionReady', 'DrugInteraction', 'AppointmentReminder', 'SystemAlert'] }, title: { type: 'string' }, message: { type: 'string' } } },
        // ── Drug safety
        CheckByTradeNameRequest: { description: 'POST /drug-interactions/check-by-trade-name. Run full 8-check warning logic for this patient and drug.', type: 'object', required: ['patientId', 'tradeNameId'], properties: { patientId: { type: 'integer', description: 'Patient to check against (Doctor: any; Patient: must be own id)' }, tradeNameId: { type: 'integer', description: 'Drug trade name ID (from GET /trade-names or search)' } } },
        CheckByTradeNameResponse: {
          description: 'Response: blocked (true if any check would block prescribing), warnings array, tradeName (id, title, activeSubstanceName).',
          type: 'object',
          properties: {
            blocked: { type: 'boolean' },
            warnings: { type: 'array', items: { $ref: '#/components/schemas/Warning' } },
            tradeName: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                title: { type: 'string' },
                activeSubstanceName: { type: 'string' }
              }
            }
          }
        },
        DrugSafetyCheckRequest: { type: 'object', required: ['patientId', 'activeSubstanceId'], properties: { patientId: { type: 'integer' }, activeSubstanceId: { type: 'integer' }, tradeNameId: { type: 'integer' } } },
        // ── ADR
        CreateAdrRequest: { type: 'object', required: ['patientId', 'tradeNameId', 'companyId', 'severity', 'reaction', 'startDate'], properties: { patientId: { type: 'integer' }, tradeNameId: { type: 'integer' }, companyId: { type: 'integer' }, activeSubstanceId: { type: 'integer' }, severity: { type: 'string', enum: ['Mild', 'Moderate', 'Severe', 'LifeThreatening'] }, reaction: { type: 'string' }, startDate: { type: 'string', format: 'date-time' }, endDate: { type: 'string', format: 'date-time' }, isAnonymous: { type: 'boolean' } } },
        UpdateAdrRequest: { type: 'object', properties: { status: { type: 'string', enum: ['Pending', 'UnderReview', 'Confirmed', 'Rejected'] }, adminNotes: { type: 'string' } } },
        // ── Medicine suggestions
        CreateMedicineSuggestionRequest: { type: 'object', required: ['tradeName', 'activeSubstance'], properties: { tradeName: { type: 'string' }, activeSubstance: { type: 'string' }, concentration: { type: 'string' }, dosageForm: { type: 'string' }, manufacturer: { type: 'string' }, reason: { type: 'string' } } },
        ReviewMedicineSuggestionRequest: { type: 'object', properties: { status: { type: 'string' }, reviewNotes: { type: 'string' } } },
        ResolveAddMedicineRequestRequest: {
          description: 'Resolve an add medicine request: provide tradeNameId and/or activeSubstanceId (from admin-created Trade Name or Active Substance). Backend links the PatientMedicine and marks it verified, then marks the request Resolved.',
          type: 'object',
          properties: {
            tradeNameId:       { type: 'integer', description: 'Optional. ID of the trade name to link (from GET /trade-names or newly created).' },
            activeSubstanceId: { type: 'integer', description: 'Optional. ID of the active substance to link if only this was missing.' },
            resolutionNotes:   { type: 'string', description: 'Optional notes for the resolution.' }
          }
        },
        // ── Active substances (minimal for doc; full schema is large)
        CreateActiveSubstanceRequest: { type: 'object', required: ['activeSubstance'], properties: { activeSubstance: { type: 'string' }, concentration: { type: 'string' }, classification: { type: 'string' }, dosageForm: { type: 'string' }, indication: { type: 'string' }, pregnancyWarning: { type: 'string' }, lactationWarning: { type: 'string' }, contraindications: {}, isActive: { type: 'boolean' } } },
        UpdateActiveSubstanceRequest: { type: 'object', properties: { activeSubstance: { type: 'string' }, concentration: { type: 'string' }, classification: { type: 'string' }, isActive: { type: 'boolean' } } },
        // ── Trade names
        CreateTradeNameRequest: { type: 'object', required: ['title', 'activeSubstanceId', 'companyId'], properties: { title: { type: 'string' }, activeSubstanceId: { type: 'integer' }, companyId: { type: 'integer' }, barCode: { type: 'string' }, warningNotification: { type: 'string' }, availabilityStatus: { type: 'string', enum: ['InStock', 'OutOfStock', 'Discontinued', 'Pending'] } } },
        UpdateTradeNameRequest: { type: 'object', properties: { title: { type: 'string' }, activeSubstanceId: { type: 'integer' }, companyId: { type: 'integer' }, availabilityStatus: { type: 'string' } } },
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
        // ── Admin Side Effects Management
        AdminCreateSideEffectRequest: {
          description: 'Create side effect and optionally link to trade names (drugs). tradeNames = array of TradeName IDs (from GET /trade-names/search).',
          type: 'object',
          required: ['name'],
          properties: {
            name: { type: 'string', description: 'Required. Side effect name (e.g. Headache).' },
            nameAr: { type: 'string', description: 'Optional. Arabic name.' },
            tradeNames: { type: 'array', items: { type: 'integer' }, description: 'Optional. Trade name IDs to link.' }
          }
        },
        AdminUpdateSideEffectRequest: {
          description: 'Update side effect. All fields optional.',
          type: 'object',
          properties: { name: { type: 'string' }, nameAr: { type: 'string' } }
        },
        AdminAttachTradeNamesRequest: {
          description: 'Attach trade names (drugs) to side effect. tradeNames = array of TradeName IDs.',
          type: 'object',
          required: ['tradeNames'],
          properties: {
            tradeNames: { type: 'array', items: { type: 'integer' }, minItems: 1 }
          }
        },
        // ── Side effects
        AddSideEffectRequest: {
          description: 'Add a new side effect and link it to a medication. Required: medicationId (PatientMedicine id), name.',
          type: 'object',
          required: ['medicationId', 'name'],
          properties: {
            medicationId: { type: 'integer', description: 'Required. PatientMedicine ID (from GET /patient-medicines/patient/:patientId).' },
            name: { type: 'string', description: 'Required. Name of the side effect (e.g. "Headache").' }
          }
        },
        ReportSideEffectsRequest: {
          description: 'Report side effects the patient experienced for a medication. Required: medicationId, sideEffects (array of SideEffect IDs).',
          type: 'object',
          required: ['medicationId', 'sideEffects'],
          properties: {
            medicationId: { type: 'integer', description: 'Required. PatientMedicine ID.' },
            sideEffects: { type: 'array', items: { type: 'integer' }, description: 'Required. Array of SideEffect IDs (from GET /side-effects/by-medication/:id).' }
          }
        },
        SideEffectsByMedicationResponse: {
          description: 'Response for GET /side-effects/by-medication/:id. If the medication\'s company is contracted: { supported: true, sideEffects: [...] }. If NOT contracted: { supported: false, redirect: "https://edaegypt.gov.eg" }.',
          type: 'object',
          properties: {
            supported: { type: 'boolean' },
            redirect: { type: 'string', description: 'Only present when supported=false. URL to EDA website.' },
            sideEffects: { type: 'array', items: { type: 'object', properties: { id: { type: 'integer' }, name: { type: 'string' }, frequency: { type: 'string', nullable: true }, bodySystem: { type: 'string', nullable: true } } }, description: 'Only present when supported=true.' }
          }
        },
        // ── Patient share token (QR code)
        RedeemShareTokenRequest: {
          description: 'Redeem a patient share QR token. Required: token (UUID string from the scanned QR code).',
          type: 'object',
          required: ['token'],
          properties: {
            token: { type: 'string', format: 'uuid', description: 'Required. The token from the scanned QR code.' }
          }
        },
        GenerateShareTokenResponse: {
          description: 'Response after generating a share token. Includes the raw token, expiration info, and QR code as a base64 data URL.',
          type: 'object',
          properties: {
            message:          { type: 'string' },
            token:            { type: 'string', format: 'uuid', description: 'The generated secure token.' },
            expiresAt:        { type: 'string', format: 'date-time', description: 'Token expiration timestamp.' },
            expiresInMinutes: { type: 'integer', description: 'Token TTL in minutes.' },
            qrCode:           { type: 'string', description: 'QR code image as base64 data URL (image/png).' }
          }
        },
        RedeemShareTokenResponse: {
          description: 'Response after successfully redeeming a share token. Includes the new relationship and patient details.',
          type: 'object',
          properties: {
            message:      { type: 'string' },
            relationship: { type: 'object', description: 'The created PatientDoctor relationship.' },
            patient:      { type: 'object', description: 'Patient details (id, name, email, age, gender, bloodType, diseases, allergies).' }
          }
        },
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
                  medicineName: { type: 'string' },
                  tradeNameId: { type: 'integer' },
                  activeSubstanceId: { type: 'integer' },
                  warnings: { type: 'array', items: { $ref: '#/components/schemas/Warning' } }
                }
              },
              description: 'Warnings grouped by medicine.'
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
