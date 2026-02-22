import path from 'path';

type SwaggerJSDoc = (options: unknown) => unknown;
const swaggerJSDoc = require('swagger-jsdoc') as SwaggerJSDoc;

const port = process.env.PORT || 3000;
const apiBase = process.env.API_BASE_URL || `http://localhost:${port}/api`;

type Method = 'get' | 'post' | 'put' | 'patch' | 'delete';

const bearerSecurity = [{ bearerAuth: [] }];
const paths: Record<string, any> = {};

const p = (name: string) => ({ name, in: 'path', required: true, schema: { type: 'integer' } });
const s = (pathKey: string, method: Method, tag: string, summary: string, secure = true, params: any[] = []) => {
  paths[pathKey] = paths[pathKey] || {};
  paths[pathKey][method] = {
    tags: [tag],
    summary,
    ...(secure ? { security: bearerSecurity } : {}),
    ...(params.length ? { parameters: params } : {}),
    responses: { '200': { description: 'Success' } }
  };
};

// System/Auth
s('/health', 'get', 'System', 'Health check', false);
s('/auth/register', 'post', 'Auth', 'Register', false);
s('/auth/login', 'post', 'Auth', 'Login', false);
s('/auth/refresh', 'post', 'Auth', 'Refresh token', false);
s('/auth/logout', 'post', 'Auth', 'Logout');
s('/auth/me', 'get', 'Auth', 'Current user');

// Patient Mobile
s('/patients', 'post', 'Patient Mobile', 'Create/update patient profile');
s('/patients/{id}', 'get', 'Patient Mobile', 'Get patient by ID', true, [p('id')]);
s('/patients/user/{userId}', 'get', 'Patient Mobile', 'Get patient by user ID', true, [p('userId')]);
s('/patients/{patientId}/medical-history', 'get', 'Patient Mobile', 'Get patient medical history', true, [p('patientId')]);
s('/patients/{patientId}/medical-history', 'post', 'Patient Mobile', 'Add medical history', true, [p('patientId')]);
s('/patients/{patientId}/family-history', 'post', 'Patient Mobile', 'Add family history', true, [p('patientId')]);
s('/patients/{patientId}/lifestyle', 'put', 'Patient Mobile', 'Update lifestyle', true, [p('patientId')]);
s('/patients/{patientId}/allergies', 'post', 'Patient Mobile', 'Add allergy to profile', true, [p('patientId')]);
s('/patients/allergies/{allergyId}', 'delete', 'Patient Mobile', 'Delete allergy from profile', true, [p('allergyId')]);
s('/patients/{patientId}/children', 'get', 'Patient Mobile', 'Get child profiles', true, [p('patientId')]);
s('/patients/{patientId}/children', 'post', 'Patient Mobile', 'Add child profiles', true, [p('patientId')]);
s('/patients/children/{childId}', 'delete', 'Patient Mobile', 'Delete child profile', true, [p('childId')]);
s('/patient-diseases/patient/{patientId}', 'get', 'Patient Mobile', 'Get patient diseases', true, [p('patientId')]);
s('/patient-diseases/patient/{patientId}', 'post', 'Patient Mobile', 'Add patient disease', true, [p('patientId')]);
s('/patient-diseases/patient/{patientId}/active', 'get', 'Patient Mobile', 'Get active patient diseases', true, [p('patientId')]);
s('/patient-diseases/{id}', 'patch', 'Patient Mobile', 'Update patient disease', true, [p('id')]);
s('/patient-diseases/{id}', 'delete', 'Patient Mobile', 'Delete patient disease', true, [p('id')]);
s('/appointments/patient/{patientId}', 'get', 'Patient Mobile', 'Get appointments by patient', true, [p('patientId')]);
s('/consultations/patient/{patientId}', 'get', 'Patient Mobile', 'Get consultations by patient', true, [p('patientId')]);
s('/visits/patient/{patientId}', 'get', 'Patient Mobile', 'Get visits by patient', false, [p('patientId')]);
s('/medical-reports/patient/{patientId}', 'get', 'Patient Mobile', 'Get patient medical reports', false, [p('patientId')]);
s('/share-links/patient/{patientId}', 'get', 'Patient Mobile', 'Get patient share links', false, [p('patientId')]);
s('/share-links/patient/{patientId}', 'post', 'Patient Mobile', 'Generate share link', false, [p('patientId')]);
s('/share-links/{id}/revoke', 'patch', 'Patient Mobile', 'Revoke share link', false, [p('id')]);
s('/share-links/{id}', 'patch', 'Patient Mobile', 'Update share link', false, [p('id')]);
s('/share-links/{id}', 'delete', 'Patient Mobile', 'Delete share link', false, [p('id')]);
s('/ratings', 'post', 'Patient Mobile', 'Create/update rating', false);
s('/ratings/pharmacist/{pharmacistId}', 'get', 'Patient Mobile', 'Get pharmacist ratings', false, [p('pharmacistId')]);
s('/ratings/patient/{patientId}', 'get', 'Patient Mobile', 'Get patient ratings', false, [p('patientId')]);
s('/ratings/{id}', 'delete', 'Patient Mobile', 'Delete rating', false, [p('id')]);
s('/adverse-drug-reactions/patient/{patientId}', 'get', 'Patient Mobile', 'Get patient ADRs', false, [p('patientId')]);
s('/drug-interactions/{id}/acknowledge-patient', 'patch', 'Patient Mobile', 'Acknowledge interaction alert (patient)', false, [p('id')]);

// Doctor Mobile
s('/doctors', 'post', 'Doctor Mobile', 'Create/update doctor profile');
s('/doctors/{id}', 'get', 'Doctor Mobile', 'Get doctor by ID', true, [p('id')]);
s('/doctors/user/{userId}', 'get', 'Doctor Mobile', 'Get doctor by user ID', true, [p('userId')]);
s('/doctors/{doctorId}/patients', 'get', 'Doctor Mobile', 'Get assigned patients', true, [p('doctorId')]);
s('/doctors/{doctorId}/patients', 'post', 'Doctor Mobile', 'Assign patient', true, [p('doctorId')]);
s('/doctors/{doctorId}/patients/{patientId}', 'delete', 'Doctor Mobile', 'Remove patient assignment', true, [p('doctorId'), p('patientId')]);
s('/prescriptions', 'post', 'Doctor Mobile', 'Create prescription with warnings');
s('/prescriptions/batch', 'post', 'Doctor Mobile', 'Create batch prescriptions');
s('/prescriptions/{id}', 'put', 'Doctor Mobile', 'Update prescription', true, [p('id')]);
s('/prescriptions/{id}', 'delete', 'Doctor Mobile', 'Delete prescription', true, [p('id')]);
s('/appointments/doctor/{doctorId}', 'get', 'Doctor Mobile', 'Get appointments by doctor', true, [p('doctorId')]);
s('/appointments/doctor/{doctorId}/today', 'get', 'Doctor Mobile', 'Get today appointments', true, [p('doctorId')]);
s('/appointments/{id}/confirm', 'post', 'Doctor Mobile', 'Confirm appointment', true, [p('id')]);
s('/appointments/{id}/complete', 'post', 'Doctor Mobile', 'Complete appointment', true, [p('id')]);
s('/consultations', 'post', 'Doctor Mobile', 'Create consultation');
s('/consultations/{id}', 'put', 'Doctor Mobile', 'Update consultation', true, [p('id')]);
s('/consultations/{id}', 'delete', 'Doctor Mobile', 'Delete consultation', true, [p('id')]);
s('/consultations/doctor/{doctorId}', 'get', 'Doctor Mobile', 'Get consultations by doctor', true, [p('doctorId')]);
s('/consultations/doctor/{doctorId}/followups', 'get', 'Doctor Mobile', 'Get doctor followups', true, [p('doctorId')]);
s('/visits', 'post', 'Doctor Mobile', 'Create visit', false);
s('/visits/{id}', 'patch', 'Doctor Mobile', 'Update visit', false, [p('id')]);
s('/visits/{id}', 'delete', 'Doctor Mobile', 'Delete visit', false, [p('id')]);
s('/visits/doctor/{doctorId}', 'get', 'Doctor Mobile', 'Get visits by doctor', false, [p('doctorId')]);
s('/medicine-suggestions', 'get', 'Doctor Mobile', 'Get medicine suggestions');
s('/medicine-suggestions', 'post', 'Doctor Mobile', 'Create medicine suggestion');
s('/medicine-suggestions/{id}', 'get', 'Doctor Mobile', 'Get suggestion by ID', true, [p('id')]);
s('/medicine-suggestions/{id}', 'delete', 'Doctor Mobile', 'Delete suggestion', true, [p('id')]);
s('/medicine-suggestions/{id}/review', 'patch', 'Doctor Mobile', 'Review suggestion', true, [p('id')]);
s('/adverse-drug-reactions', 'get', 'Doctor Mobile', 'Get all ADRs', false);
s('/adverse-drug-reactions/statistics/summary', 'get', 'Doctor Mobile', 'Get ADR statistics summary', false);
s('/adverse-drug-reactions/drug/{drugType}/{drugId}', 'get', 'Doctor Mobile', 'Get ADRs by drug', false, [
  { name: 'drugType', in: 'path', required: true, schema: { type: 'string' } },
  p('drugId')
]);
s('/adverse-drug-reactions/{id}', 'get', 'Doctor Mobile', 'Get ADR by ID', false, [p('id')]);
s('/adverse-drug-reactions/{id}', 'patch', 'Doctor Mobile', 'Update ADR', false, [p('id')]);
s('/drug-interactions/{id}/acknowledge-doctor', 'patch', 'Doctor Mobile', 'Acknowledge interaction alert (doctor)', false, [p('id')]);

// Shared Mobile
s('/doctors/search', 'get', 'Shared Mobile', 'Search doctors');
s('/active-substances/search', 'get', 'Shared Mobile', 'Search active substances');
s('/active-substances/{id}', 'get', 'Shared Mobile', 'Get active substance by ID', true, [p('id')]);
s('/allergies', 'post', 'Shared Mobile', 'Create allergy record');
s('/allergies/patient/{patientId}', 'get', 'Shared Mobile', 'Get allergies by patient', true, [p('patientId')]);
s('/allergies/patient/{patientId}/critical', 'get', 'Shared Mobile', 'Get critical allergies', true, [p('patientId')]);
s('/allergies/{id}', 'get', 'Shared Mobile', 'Get allergy by ID', true, [p('id')]);
s('/allergies/{id}', 'put', 'Shared Mobile', 'Update allergy', true, [p('id')]);
s('/allergies/{id}', 'delete', 'Shared Mobile', 'Delete allergy', true, [p('id')]);
s('/prescriptions', 'get', 'Shared Mobile', 'List prescriptions');
s('/prescriptions/{id}', 'get', 'Shared Mobile', 'Get prescription by ID', true, [p('id')]);
s('/appointments', 'post', 'Shared Mobile', 'Create appointment');
s('/appointments/{id}', 'get', 'Shared Mobile', 'Get appointment by ID', true, [p('id')]);
s('/appointments/{id}', 'put', 'Shared Mobile', 'Update appointment', true, [p('id')]);
s('/appointments/{id}/cancel', 'post', 'Shared Mobile', 'Cancel appointment', true, [p('id')]);
s('/consultations/{id}', 'get', 'Shared Mobile', 'Get consultation by ID', true, [p('id')]);
s('/visits/{id}', 'get', 'Shared Mobile', 'Get visit by ID', false, [p('id')]);
s('/medical-reports', 'post', 'Shared Mobile', 'Create medical report', false);
s('/medical-reports/{id}', 'get', 'Shared Mobile', 'Get medical report by ID', false, [p('id')]);
s('/medical-reports/{id}', 'patch', 'Shared Mobile', 'Update medical report', false, [p('id')]);
s('/medical-reports/{id}', 'delete', 'Shared Mobile', 'Delete medical report', false, [p('id')]);
s('/medical-reports/{id}/upload', 'post', 'Shared Mobile', 'Upload medical report file', false, [p('id')]);
s('/share-links/shared/{token}', 'get', 'Shared Mobile', 'Access shared data token', false, [
  { name: 'token', in: 'path', required: true, schema: { type: 'string' } }
]);
s('/ratings/doctor/{doctorId}', 'get', 'Shared Mobile', 'Get doctor ratings', false, [p('doctorId')]);
s('/adverse-drug-reactions', 'post', 'Shared Mobile', 'Report adverse drug reaction', false);

// Notifications
s('/notifications', 'post', 'Notifications', 'Create notification', false);
s('/notifications/user/{userId}', 'get', 'Notifications', 'Get user notifications', false, [p('userId')]);
s('/notifications/user/{userId}/read-all', 'patch', 'Notifications', 'Mark all notifications read', false, [p('userId')]);
s('/notifications/{id}/read', 'patch', 'Notifications', 'Mark notification read', false, [p('id')]);
s('/notifications/{id}', 'delete', 'Notifications', 'Delete notification', false, [p('id')]);
s('/notifications/appointment-reminders', 'post', 'Notifications', 'Send appointment reminders', false);

// Drug safety
s('/drug-interactions/check', 'post', 'Drug Safety', 'Check drug safety before prescribing', false);
s('/drug-interactions/prescription/{prescriptionId}', 'get', 'Drug Safety', 'Get interaction alerts by prescription', false, [p('prescriptionId')]);
s('/drug-interactions/patient/{patientId}', 'get', 'Drug Safety', 'Get interaction alerts by patient', false, [p('patientId')]);
s('/prescriptions/{prescriptionId}/interactions', 'get', 'Drug Safety', 'Get prescription interaction alerts', true, [p('prescriptionId')]);
s('/prescriptions/interactions/{alertId}/acknowledge', 'put', 'Drug Safety', 'Acknowledge interaction alert', true, [p('alertId')]);
s('/allergies/check/{patientId}/{medicineId}', 'get', 'Drug Safety', 'Check allergy conflict with medicine', true, [p('patientId'), p('medicineId')]);
s('/active-substances/{id}/interactions', 'get', 'Drug Safety', 'Get active substance interactions', true, [p('id')]);

const options: Record<string, unknown> = {
  definition: {
    openapi: '3.0.3',
    info: { title: 'Green RX Backend API', version: '1.0.0', description: 'Doctor and Patient mobile API documentation.' },
    servers: [{ url: apiBase, description: 'Primary API server' }],
    tags: [
      { name: 'System', description: 'System endpoints' },
      { name: 'Auth', description: 'Authentication endpoints' },
      { name: 'Patient Mobile', description: 'Patient app endpoints' },
      { name: 'Doctor Mobile', description: 'Doctor app endpoints' },
      { name: 'Shared Mobile', description: 'Used by both patient and doctor apps' },
      { name: 'Drug Safety', description: 'Warnings and interactions' },
      { name: 'Notifications', description: 'Notification endpoints' }
    ],
    components: {
      securitySchemes: { bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' } },
      schemas: {
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

