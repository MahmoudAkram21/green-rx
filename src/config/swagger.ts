import path from 'path';

type SwaggerJSDoc = (options: unknown) => unknown;
const swaggerJSDoc = require('swagger-jsdoc') as SwaggerJSDoc;

const port = process.env.PORT || 3000;
const apiBase = process.env.API_BASE_URL || `http://localhost:${port}/api`;

type Method = 'get' | 'post' | 'put' | 'patch' | 'delete';

const bearerSecurity = [{ bearerAuth: [] }];
const paths: Record<string, any> = {};

const p = (name: string, type: 'integer' | 'string' = 'integer') => ({ name, in: 'path', required: true, schema: { type } });
const q = (name: string, description?: string) => ({ name, in: 'query', required: false, schema: { type: 'string' }, ...(description ? { description } : {}) });

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

// ─────────────────────────────────────────────
// System / Auth
// ─────────────────────────────────────────────
s('/health', 'get', 'System', 'Health check', false);
s('/auth/register', 'post', 'Auth', 'Register user', false, [], { schemaRef: 'RegisterRequest' });
s('/auth/login', 'post', 'Auth', 'Login', false, [], { schemaRef: 'LoginRequest' });
s('/auth/refresh', 'post', 'Auth', 'Refresh token', false, [], { schemaRef: 'RefreshTokenRequest' });
s('/auth/logout', 'post', 'Auth', 'Logout');
s('/auth/me', 'get', 'Auth', 'Get current user');
s('/auth/dev-reset-superadmin-password', 'post', 'Auth', 'Dev: reset superadmin password', false);

// ─────────────────────────────────────────────
// Users
// ─────────────────────────────────────────────
s('/users', 'get', 'Users', 'List all users');
s('/users', 'post', 'Users', 'Create user');
s('/users/{id}', 'get', 'Users', 'Get user by ID', true, [p('id')]);
s('/users/{id}', 'put', 'Users', 'Update user', true, [p('id')]);
s('/users/{id}', 'delete', 'Users', 'Delete user', true, [p('id')]);

// ─────────────────────────────────────────────
// Patient
// ─────────────────────────────────────────────
s('/patients', 'get', 'Patient', 'List all patients (Admin)');
s('/patients', 'post', 'Patient', 'Create or update patient profile');
s('/patients/{id}', 'get', 'Patient', 'Get patient by ID', true, [p('id')]);
s('/patients/user/{userId}', 'get', 'Patient', 'Get patient by user ID', true, [p('userId')]);
s('/patients/{patientId}/medical-history', 'get', 'Patient', 'Get medical history', true, [p('patientId')]);
s('/patients/{patientId}/medical-history', 'post', 'Patient', 'Add medical history', true, [p('patientId')]);
s('/patients/{patientId}/family-history', 'post', 'Patient', 'Add family history', true, [p('patientId')]);
s('/patients/{patientId}/lifestyle', 'put', 'Patient', 'Update lifestyle', true, [p('patientId')]);
s('/patients/{patientId}/allergies', 'post', 'Patient', 'Add allergy to profile', true, [p('patientId')]);
s('/patients/allergies/{allergyId}', 'delete', 'Patient', 'Delete allergy from profile', true, [p('allergyId')]);
s('/patients/{patientId}/children', 'get', 'Patient', 'Get child profiles', true, [p('patientId')]);
s('/patients/{patientId}/children', 'post', 'Patient', 'Add child profile', true, [p('patientId')]);
s('/patients/children/{childId}', 'delete', 'Patient', 'Delete child profile', true, [p('childId')]);

// ─────────────────────────────────────────────
// Doctor
// ─────────────────────────────────────────────
s('/doctors', 'post', 'Doctor', 'Create or update doctor profile');
s('/doctors/search', 'get', 'Doctor', 'Search / list all doctors');
s('/doctors/{id}', 'get', 'Doctor', 'Get doctor by ID', true, [p('id')]);
s('/doctors/user/{userId}', 'get', 'Doctor', 'Get doctor by user ID', true, [p('userId')]);
s('/doctors/{id}/verify', 'put', 'Doctor', 'Verify doctor (Admin)', true, [p('id')]);
s('/doctors/{doctorId}/patients', 'get', 'Doctor', 'Get assigned patients', true, [p('doctorId')]);
s('/doctors/{doctorId}/patients', 'post', 'Doctor', 'Assign patient to doctor', true, [p('doctorId')]);
s('/doctors/{doctorId}/patients/{patientId}', 'delete', 'Doctor', 'Remove patient assignment', true, [p('doctorId'), p('patientId')]);

// ─────────────────────────────────────────────
// Pharmacist
// ─────────────────────────────────────────────
s('/pharmacists', 'post', 'Pharmacist', 'Create or update pharmacist profile');
s('/pharmacists/search', 'get', 'Pharmacist', 'List / search all pharmacists');
s('/pharmacists/{id}', 'get', 'Pharmacist', 'Get pharmacist by ID', true, [p('id')]);
s('/pharmacists/user/{userId}', 'get', 'Pharmacist', 'Get pharmacist by user ID', true, [p('userId')]);

// ─────────────────────────────────────────────
// Patient-Doctor Relationships
// ─────────────────────────────────────────────
s('/patient-doctors', 'post', 'Patient-Doctor', 'Create patient-doctor relationship');
s('/patient-doctors/patient/{patientId}', 'get', 'Patient-Doctor', 'Get relationships by patient', true, [p('patientId')]);
s('/patient-doctors/doctor/{doctorId}', 'get', 'Patient-Doctor', 'Get relationships by doctor', true, [p('doctorId')]);
s('/patient-doctors/{id}', 'get', 'Patient-Doctor', 'Get relationship by ID', true, [p('id')]);
s('/patient-doctors/{id}', 'put', 'Patient-Doctor', 'Update relationship', true, [p('id')]);
s('/patient-doctors/{id}/end', 'post', 'Patient-Doctor', 'End relationship', true, [p('id')]);

// ─────────────────────────────────────────────
// Prescriptions
// ─────────────────────────────────────────────
s('/prescriptions', 'get', 'Prescriptions', 'List prescriptions');
s('/prescriptions', 'post', 'Prescriptions', 'Create prescription (with drug-safety check)');
s('/prescriptions/batch', 'post', 'Prescriptions', 'Create batch prescriptions');
s('/prescriptions/{id}', 'get', 'Prescriptions', 'Get prescription by ID', true, [p('id')]);
s('/prescriptions/{id}', 'put', 'Prescriptions', 'Update prescription', true, [p('id')]);
s('/prescriptions/{id}', 'delete', 'Prescriptions', 'Delete prescription', true, [p('id')]);
s('/prescriptions/{prescriptionId}/interactions', 'get', 'Prescriptions', 'Get drug interaction alerts', true, [p('prescriptionId')]);
s('/prescriptions/interactions/{alertId}/acknowledge', 'put', 'Prescriptions', 'Acknowledge interaction alert', true, [p('alertId')]);

// ─────────────────────────────────────────────
// Prescription Versions
// ─────────────────────────────────────────────
s('/prescription-versions/prescription/{prescriptionId}', 'get', 'Prescription Versions', 'Get all versions of a prescription', true, [p('prescriptionId')]);
s('/prescription-versions/prescription/{prescriptionId}', 'post', 'Prescription Versions', 'Create a new prescription version', true, [p('prescriptionId')]);
s('/prescription-versions/prescription/{prescriptionId}/compare', 'get', 'Prescription Versions', 'Compare two versions', true, [p('prescriptionId')]);
s('/prescription-versions/{id}', 'get', 'Prescription Versions', 'Get a specific version', true, [p('id')]);

// ─────────────────────────────────────────────
// Appointments
// ─────────────────────────────────────────────
s('/appointments', 'post', 'Appointments', 'Create appointment');
s('/appointments/{id}', 'get', 'Appointments', 'Get appointment by ID', true, [p('id')]);
s('/appointments/{id}', 'put', 'Appointments', 'Update appointment', true, [p('id')]);
s('/appointments/{id}/cancel', 'post', 'Appointments', 'Cancel appointment', true, [p('id')]);
s('/appointments/{id}/confirm', 'post', 'Appointments', 'Confirm appointment', true, [p('id')]);
s('/appointments/{id}/complete', 'post', 'Appointments', 'Complete appointment', true, [p('id')]);
s('/appointments/patient/{patientId}', 'get', 'Appointments', 'Get appointments by patient', true, [p('patientId')]);
s('/appointments/doctor/{doctorId}', 'get', 'Appointments', 'Get appointments by doctor', true, [p('doctorId')]);
s('/appointments/doctor/{doctorId}/today', 'get', 'Appointments', 'Get today\'s appointments for doctor', true, [p('doctorId')]);

// ─────────────────────────────────────────────
// Consultations
// ─────────────────────────────────────────────
s('/consultations', 'post', 'Consultations', 'Create consultation');
s('/consultations/{id}', 'get', 'Consultations', 'Get consultation by ID', true, [p('id')]);
s('/consultations/{id}', 'put', 'Consultations', 'Update consultation', true, [p('id')]);
s('/consultations/{id}', 'delete', 'Consultations', 'Delete consultation', true, [p('id')]);
s('/consultations/patient/{patientId}', 'get', 'Consultations', 'Get consultations by patient', true, [p('patientId')]);
s('/consultations/doctor/{doctorId}', 'get', 'Consultations', 'Get consultations by doctor', true, [p('doctorId')]);
s('/consultations/doctor/{doctorId}/followups', 'get', 'Consultations', 'Get upcoming follow-ups for doctor', true, [p('doctorId')]);

// ─────────────────────────────────────────────
// Visits
// ─────────────────────────────────────────────
s('/visits', 'post', 'Visits', 'Create visit');
s('/visits/{id}', 'get', 'Visits', 'Get visit by ID', false, [p('id')]);
s('/visits/{id}', 'patch', 'Visits', 'Update visit', false, [p('id')]);
s('/visits/{id}', 'delete', 'Visits', 'Delete visit', false, [p('id')]);
s('/visits/patient/{patientId}', 'get', 'Visits', 'Get visits by patient', false, [p('patientId')]);
s('/visits/doctor/{doctorId}', 'get', 'Visits', 'Get visits by doctor', false, [p('doctorId')]);

// ─────────────────────────────────────────────
// Allergies
// ─────────────────────────────────────────────
s('/allergies', 'post', 'Allergies', 'Create allergy record');
s('/allergies/patient/{patientId}', 'get', 'Allergies', 'Get allergies by patient', true, [p('patientId')]);
s('/allergies/patient/{patientId}/critical', 'get', 'Allergies', 'Get critical allergies by patient', true, [p('patientId')]);
s('/allergies/{id}', 'get', 'Allergies', 'Get allergy by ID', true, [p('id')]);
s('/allergies/{id}', 'put', 'Allergies', 'Update allergy', true, [p('id')]);
s('/allergies/{id}', 'delete', 'Allergies', 'Delete allergy', true, [p('id')]);
s('/allergies/check/{patientId}/{medicineId}', 'get', 'Allergies', 'Check allergy conflict with medicine', true, [p('patientId'), p('medicineId')]);

// ─────────────────────────────────────────────
// Patient Diseases
// ─────────────────────────────────────────────
s('/patient-diseases/patient/{patientId}', 'get', 'Patient Diseases', 'Get patient diseases', true, [p('patientId')]);
s('/patient-diseases/patient/{patientId}', 'post', 'Patient Diseases', 'Add patient disease', true, [p('patientId')]);
s('/patient-diseases/patient/{patientId}/active', 'get', 'Patient Diseases', 'Get active patient diseases', true, [p('patientId')]);
s('/patient-diseases/{id}', 'patch', 'Patient Diseases', 'Update patient disease status', true, [p('id')]);
s('/patient-diseases/{id}', 'delete', 'Patient Diseases', 'Delete patient disease', true, [p('id')]);

// ─────────────────────────────────────────────
// Medical Reports
// ─────────────────────────────────────────────
s('/medical-reports', 'post', 'Medical Reports', 'Create medical report', false);
s('/medical-reports/patient/{patientId}', 'get', 'Medical Reports', 'Get patient medical reports', false, [p('patientId')]);
s('/medical-reports/{id}', 'get', 'Medical Reports', 'Get medical report by ID', false, [p('id')]);
s('/medical-reports/{id}', 'patch', 'Medical Reports', 'Update medical report', false, [p('id')]);
s('/medical-reports/{id}', 'delete', 'Medical Reports', 'Delete medical report', false, [p('id')]);
s('/medical-reports/{id}/upload', 'post', 'Medical Reports', 'Upload report file', false, [p('id')]);

// ─────────────────────────────────────────────
// Share Links
// ─────────────────────────────────────────────
s('/share-links/patient/{patientId}', 'get', 'Share Links', 'Get patient share links', false, [p('patientId')]);
s('/share-links/patient/{patientId}', 'post', 'Share Links', 'Generate share link', false, [p('patientId')]);
s('/share-links/shared/{token}', 'get', 'Share Links', 'Access shared data by token', false, [p('token', 'string')]);
s('/share-links/{id}/revoke', 'patch', 'Share Links', 'Revoke share link', false, [p('id')]);
s('/share-links/{id}', 'patch', 'Share Links', 'Update share link settings', false, [p('id')]);
s('/share-links/{id}', 'delete', 'Share Links', 'Delete share link', false, [p('id')]);

// ─────────────────────────────────────────────
// Ratings
// ─────────────────────────────────────────────
s('/ratings', 'post', 'Ratings', 'Create or update rating', false);
s('/ratings/doctor/{doctorId}', 'get', 'Ratings', 'Get doctor ratings', false, [p('doctorId')]);
s('/ratings/pharmacist/{pharmacistId}', 'get', 'Ratings', 'Get pharmacist ratings', false, [p('pharmacistId')]);
s('/ratings/patient/{patientId}', 'get', 'Ratings', 'Get patient ratings', false, [p('patientId')]);
s('/ratings/{id}', 'delete', 'Ratings', 'Delete rating', false, [p('id')]);

// ─────────────────────────────────────────────
// Notifications
// ─────────────────────────────────────────────
s('/notifications', 'post', 'Notifications', 'Create notification', false);
s('/notifications/user/{userId}', 'get', 'Notifications', 'Get user notifications', false, [p('userId')]);
s('/notifications/user/{userId}/read-all', 'patch', 'Notifications', 'Mark all notifications as read', false, [p('userId')]);
s('/notifications/{id}/read', 'patch', 'Notifications', 'Mark notification as read', false, [p('id')]);
s('/notifications/{id}', 'delete', 'Notifications', 'Delete notification', false, [p('id')]);
s('/notifications/appointment-reminders', 'post', 'Notifications', 'Send appointment reminders', false);

// ─────────────────────────────────────────────
// Drug Safety
// ─────────────────────────────────────────────
s('/drug-interactions/check', 'post', 'Drug Safety', 'Check drug safety before prescribing', false);
s('/drug-interactions/prescription/{prescriptionId}', 'get', 'Drug Safety', 'Get interaction alerts by prescription', false, [p('prescriptionId')]);
s('/drug-interactions/patient/{patientId}', 'get', 'Drug Safety', 'Get interaction alerts by patient', false, [p('patientId')]);
s('/drug-interactions/{id}/acknowledge-doctor', 'patch', 'Drug Safety', 'Acknowledge alert (doctor)', false, [p('id')]);
s('/drug-interactions/{id}/acknowledge-patient', 'patch', 'Drug Safety', 'Acknowledge alert (patient)', false, [p('id')]);

// ─────────────────────────────────────────────
// Adverse Drug Reactions
// ─────────────────────────────────────────────
s('/adverse-drug-reactions', 'post', 'Adverse Drug Reactions', 'Report adverse drug reaction', false);
s('/adverse-drug-reactions', 'get', 'Adverse Drug Reactions', 'Get all ADRs (Admin)', false);
s('/adverse-drug-reactions/statistics/summary', 'get', 'Adverse Drug Reactions', 'Get ADR statistics summary', false);
s('/adverse-drug-reactions/patient/{patientId}', 'get', 'Adverse Drug Reactions', 'Get patient ADRs', false, [p('patientId')]);
s('/adverse-drug-reactions/drug/{drugType}/{drugId}', 'get', 'Adverse Drug Reactions', 'Get ADRs by drug', false, [
  { name: 'drugType', in: 'path', required: true, schema: { type: 'string' } },
  p('drugId')
]);
s('/adverse-drug-reactions/{id}', 'get', 'Adverse Drug Reactions', 'Get ADR by ID', false, [p('id')]);
s('/adverse-drug-reactions/{id}', 'patch', 'Adverse Drug Reactions', 'Update ADR', false, [p('id')]);

// ─────────────────────────────────────────────
// Medicine Suggestions
// ─────────────────────────────────────────────
s('/medicine-suggestions', 'get', 'Medicine Suggestions', 'List medicine suggestions');
s('/medicine-suggestions', 'post', 'Medicine Suggestions', 'Create medicine suggestion (Doctor)');
s('/medicine-suggestions/{id}', 'get', 'Medicine Suggestions', 'Get suggestion by ID', true, [p('id')]);
s('/medicine-suggestions/{id}', 'delete', 'Medicine Suggestions', 'Delete suggestion', true, [p('id')]);
s('/medicine-suggestions/{id}/review', 'patch', 'Medicine Suggestions', 'Review suggestion (Admin)', true, [p('id')]);

// ─────────────────────────────────────────────
// Active Substances
// ─────────────────────────────────────────────
s('/active-substances', 'post', 'Active Substances', 'Create active substance (Admin/Company)');
s('/active-substances/search', 'get', 'Active Substances', 'Search active substances');
s('/active-substances/{id}', 'get', 'Active Substances', 'Get active substance by ID', true, [p('id')]);
s('/active-substances/{id}', 'put', 'Active Substances', 'Update active substance', true, [p('id')]);
s('/active-substances/{id}', 'delete', 'Active Substances', 'Delete active substance', true, [p('id')]);
s('/active-substances/{id}/interactions', 'get', 'Active Substances', 'Get substance drug interactions', true, [p('id')]);

// ─────────────────────────────────────────────
// Trade Names
// ─────────────────────────────────────────────
s('/trade-names', 'get', 'Trade Names', 'List all trade names');
s('/trade-names', 'post', 'Trade Names', 'Create trade name (Admin/Company)');
s('/trade-names/search', 'get', 'Trade Names', 'Search trade names', true, [q('q', 'Search query')]);
s('/trade-names/{id}', 'get', 'Trade Names', 'Get trade name by ID', true, [p('id')]);
s('/trade-names/{id}', 'put', 'Trade Names', 'Update trade name', true, [p('id')]);
s('/trade-names/{id}', 'delete', 'Trade Names', 'Delete trade name', true, [p('id')]);

// ─────────────────────────────────────────────
// Diseases
// ─────────────────────────────────────────────
s('/diseases', 'get', 'Diseases', 'List all diseases');
s('/diseases', 'post', 'Diseases', 'Create disease (Admin)');
s('/diseases/{id}', 'get', 'Diseases', 'Get disease by ID', true, [p('id')]);
s('/diseases/{id}', 'put', 'Diseases', 'Update disease', true, [p('id')]);
s('/diseases/{id}', 'delete', 'Diseases', 'Delete disease', true, [p('id')]);
s('/diseases/warnings', 'post', 'Diseases', 'Create disease warning (Admin)');
s('/diseases/{diseaseId}/warnings', 'get', 'Diseases', 'Get warnings for disease', true, [p('diseaseId')]);

// ─────────────────────────────────────────────
// Disease Warning Rules
// ─────────────────────────────────────────────
s('/disease-warning-rules', 'get', 'Disease Warning Rules', 'Get all warning rules (Admin)');
s('/disease-warning-rules', 'post', 'Disease Warning Rules', 'Create warning rule (Admin)');
s('/disease-warning-rules/disease/{diseaseId}', 'get', 'Disease Warning Rules', 'Get rules for a disease', true, [p('diseaseId')]);
s('/disease-warning-rules/{id}', 'get', 'Disease Warning Rules', 'Get warning rule by ID', true, [p('id')]);
s('/disease-warning-rules/{id}', 'patch', 'Disease Warning Rules', 'Update warning rule', true, [p('id')]);
s('/disease-warning-rules/{id}', 'delete', 'Disease Warning Rules', 'Delete warning rule', true, [p('id')]);

// ─────────────────────────────────────────────
// Companies
// ─────────────────────────────────────────────
s('/companies', 'get', 'Companies', 'List all companies');
s('/companies', 'post', 'Companies', 'Create company (Admin)');
s('/companies/{id}', 'get', 'Companies', 'Get company by ID', true, [p('id')]);
s('/companies/{id}', 'put', 'Companies', 'Update company', true, [p('id')]);
s('/companies/{id}', 'delete', 'Companies', 'Delete company (Admin)', true, [p('id')]);

// ─────────────────────────────────────────────
// Pricing Plans
// ─────────────────────────────────────────────
s('/pricing-plans', 'get', 'Pricing Plans', 'List all pricing plans', false);
s('/pricing-plans/default', 'get', 'Pricing Plans', 'Get default pricing plan', false);
s('/pricing-plans/{id}', 'get', 'Pricing Plans', 'Get pricing plan by ID', false, [p('id')]);
s('/pricing-plans', 'post', 'Pricing Plans', 'Create pricing plan (Admin)');
s('/pricing-plans/{id}', 'put', 'Pricing Plans', 'Update pricing plan (Admin)', true, [p('id')]);
s('/pricing-plans/{id}', 'delete', 'Pricing Plans', 'Delete pricing plan (Admin)', true, [p('id')]);

// ─────────────────────────────────────────────
// Subscriptions
// ─────────────────────────────────────────────
s('/subscriptions', 'post', 'Subscriptions', 'Create subscription');
s('/subscriptions', 'get', 'Subscriptions', 'List all subscriptions (Admin)');
s('/subscriptions/user/{userId}', 'get', 'Subscriptions', 'Get subscription by user', true, [p('userId')]);
s('/subscriptions/{userId}', 'put', 'Subscriptions', 'Update subscription', true, [p('userId')]);
s('/subscriptions/{userId}/cancel', 'post', 'Subscriptions', 'Cancel subscription', true, [p('userId')]);
s('/subscriptions/{userId}/renew', 'post', 'Subscriptions', 'Renew subscription', true, [p('userId')]);

// ─────────────────────────────────────────────
// Payments
// ─────────────────────────────────────────────
s('/payments', 'post', 'Payments', 'Create payment');
s('/payments', 'get', 'Payments', 'List all payments (Admin)');
s('/payments/subscription/{subscriptionId}', 'get', 'Payments', 'Get payments by subscription', true, [p('subscriptionId')]);
s('/payments/{id}', 'get', 'Payments', 'Get payment by ID', true, [p('id')]);
s('/payments/{id}/status', 'put', 'Payments', 'Update payment status (Admin)', true, [p('id')]);
s('/payments/{id}/process', 'post', 'Payments', 'Process payment', true, [p('id')]);
s('/payments/{id}/refund', 'post', 'Payments', 'Refund payment (Admin)', true, [p('id')]);

// ─────────────────────────────────────────────
// Admin
// ─────────────────────────────────────────────
s('/admin/permissions', 'get', 'Admin', 'List permissions');
s('/admin/permissions', 'post', 'Admin', 'Create permission');
s('/admin/permissions/{id}', 'delete', 'Admin', 'Delete permission', true, [p('id')]);
s('/admin/roles/{role}/permissions', 'get', 'Admin', 'Get role permissions', true, [{ name: 'role', in: 'path', required: true, schema: { type: 'string' } }]);
s('/admin/roles/{role}/permissions', 'post', 'Admin', 'Add permission to role', true, [{ name: 'role', in: 'path', required: true, schema: { type: 'string' } }]);
s('/admin/roles/{role}/permissions/{permissionId}', 'delete', 'Admin', 'Remove permission from role', true, [
  { name: 'role', in: 'path', required: true, schema: { type: 'string' } },
  p('permissionId')
]);
s('/admin/doctors/pending', 'get', 'Admin', 'Get pending doctor verifications');
s('/admin/doctors/{id}/verify', 'patch', 'Admin', 'Verify doctor', true, [p('id')]);
s('/admin/doctors/{id}/reject', 'patch', 'Admin', 'Reject doctor', true, [p('id')]);
s('/admin/pharmacists/pending', 'get', 'Admin', 'Get pending pharmacist verifications');
s('/admin/pharmacists/{id}/verify', 'patch', 'Admin', 'Verify pharmacist', true, [p('id')]);
s('/admin/pharmacists/{id}/reject', 'patch', 'Admin', 'Reject pharmacist', true, [p('id')]);
s('/admin/statistics', 'get', 'Admin', 'Get platform statistics');
s('/admin/audit-logs', 'get', 'Admin', 'Get audit logs');

// ─────────────────────────────────────────────
// Settings
// ─────────────────────────────────────────────
s('/settings/logo', 'get', 'Settings', 'Get logo (public)', false);
s('/settings/logo', 'post', 'Settings', 'Upload logo (Admin)');

// ─────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────
s('/import/active-substances', 'post', 'Import', 'Import active substances from Excel/CSV');
s('/import/{entityType}', 'post', 'Import', 'Generic entity import', true, [{ name: 'entityType', in: 'path', required: true, schema: { type: 'string' } }]);
s('/import/history', 'get', 'Import', 'Get import history');

// ─────────────────────────────────────────────
// Export
// ─────────────────────────────────────────────
s('/export/active-substances', 'get', 'Export', 'Export active substances to Excel');
s('/export/trade-names', 'get', 'Export', 'Export trade names');
s('/export/diseases', 'get', 'Export', 'Export diseases');
s('/export/companies', 'get', 'Export', 'Export companies');
s('/export/history', 'get', 'Export', 'Get export history');

// ─────────────────────────────────────────────
// OpenAPI definition
// ─────────────────────────────────────────────
const options: Record<string, unknown> = {
  definition: {
    openapi: '3.0.3',
    info: { title: 'Green RX Backend API', version: '1.0.0', description: 'Doctor and Patient mobile API documentation.' },
    servers: [
      { url: 'https://green-back.developteam.site/api', description: 'Production server' },
      { url: apiBase, description: 'Local development server' }
    ],
    tags: [
      { name: 'System', description: 'System endpoints' },
      { name: 'Auth', description: 'Authentication' },
      { name: 'Users', description: 'User management' },
      { name: 'Patient', description: 'Patient profile & health data' },
      { name: 'Doctor', description: 'Doctor profile & patient management' },
      { name: 'Pharmacist', description: 'Pharmacist profile' },
      { name: 'Patient-Doctor', description: 'Patient-doctor relationships' },
      { name: 'Prescriptions', description: 'Prescription management' },
      { name: 'Prescription Versions', description: 'Prescription version history' },
      { name: 'Appointments', description: 'Appointment scheduling' },
      { name: 'Consultations', description: 'Medical consultations' },
      { name: 'Visits', description: 'Visit records' },
      { name: 'Allergies', description: 'Allergy management' },
      { name: 'Patient Diseases', description: 'Patient disease records' },
      { name: 'Medical Reports', description: 'Medical report management' },
      { name: 'Share Links', description: 'Patient data sharing' },
      { name: 'Ratings', description: 'Doctor & pharmacist ratings' },
      { name: 'Notifications', description: 'Notification management' },
      { name: 'Drug Safety', description: 'Drug interaction alerts' },
      { name: 'Adverse Drug Reactions', description: 'ADR reporting & management' },
      { name: 'Medicine Suggestions', description: 'Doctor medicine suggestions' },
      { name: 'Active Substances', description: 'Active substance catalog' },
      { name: 'Trade Names', description: 'Trade name catalog' },
      { name: 'Diseases', description: 'Disease catalog & warnings' },
      { name: 'Disease Warning Rules', description: 'Disease warning rule management' },
      { name: 'Companies', description: 'Pharmaceutical company management' },
      { name: 'Pricing Plans', description: 'Subscription pricing plans' },
      { name: 'Subscriptions', description: 'User subscriptions' },
      { name: 'Payments', description: 'Payment processing' },
      { name: 'Admin', description: 'Admin-only operations' },
      { name: 'Settings', description: 'Application settings' },
      { name: 'Import', description: 'Bulk data import' },
      { name: 'Export', description: 'Bulk data export' },
    ],
    components: {
      securitySchemes: { bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' } },
      schemas: {
        // Auth request bodies
        RegisterRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email', example: 'user@example.com' },
            password: { type: 'string', minLength: 6, example: 'secret123' },
            role: { type: 'string', enum: ['Patient', 'Doctor', 'Pharmacist', 'Admin', 'SuperAdmin'], default: 'Patient' },
            name: { type: 'string', minLength: 2, example: 'John Doe' }
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
        // Warning schemas
        WarningSeverity: { type: 'string', enum: ['Info', 'Low', 'Medium', 'High', 'Critical'] },
        WarningType: { type: 'string', enum: ['AllergyWarning', 'DiseaseContraindication', 'PregnancyWarning', 'LactationWarning', 'PediatricWarning', 'GeriatricWarning', 'RenalWarning', 'HepaticWarning', 'DrugInteraction', 'BatchDrugInteraction', 'FamilyHistoryRisk'] },
        Warning: { type: 'object', properties: { severity: { $ref: '#/components/schemas/WarningSeverity' }, type: { $ref: '#/components/schemas/WarningType' }, message: { type: 'string' }, blocked: { type: 'boolean' } } },
        WarningResult: { type: 'object', properties: { blocked: { type: 'boolean' }, warnings: { type: 'array', items: { $ref: '#/components/schemas/Warning' } } } }
      }
    },
    paths
  },
  apis: [path.join(__dirname, '../routes/*.ts'), path.join(__dirname, '../controllers/*.ts')]
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
