"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patient_controller_1 = require("../controllers/patient.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const client_1 = require("../../generated/client/client");
const router = express_1.default.Router();
// All patient routes require authentication
router.use(auth_middleware_1.authenticate);
// Patient Profile
router.get('/', (0, auth_middleware_1.authorize)([client_1.UserRole.Admin, client_1.UserRole.SuperAdmin]), patient_controller_1.getAllPatients);
router.post('/', (0, auth_middleware_1.authorize)([client_1.UserRole.Patient, client_1.UserRole.Admin]), patient_controller_1.createOrUpdatePatient);
router.get('/:id', patient_controller_1.getPatientById);
router.get('/user/:userId', patient_controller_1.getPatientByUserId);
// Medical History
router.post('/:patientId/medical-history', (0, auth_middleware_1.authorize)([client_1.UserRole.Patient, client_1.UserRole.Doctor, client_1.UserRole.Admin]), patient_controller_1.addMedicalHistory);
router.get('/:patientId/medical-history', patient_controller_1.getMedicalHistories);
// Family History
router.post('/:patientId/family-history', (0, auth_middleware_1.authorize)([client_1.UserRole.Patient, client_1.UserRole.Doctor, client_1.UserRole.Admin]), patient_controller_1.addFamilyHistory);
// Lifestyle
router.put('/:patientId/lifestyle', (0, auth_middleware_1.authorize)([client_1.UserRole.Patient, client_1.UserRole.Doctor, client_1.UserRole.Admin]), patient_controller_1.updateLifestyle);
// Allergies
router.post('/:patientId/allergies', (0, auth_middleware_1.authorize)([client_1.UserRole.Patient, client_1.UserRole.Doctor, client_1.UserRole.Admin]), patient_controller_1.addAllergy);
router.delete('/allergies/:allergyId', (0, auth_middleware_1.authorize)([client_1.UserRole.Patient, client_1.UserRole.Doctor, client_1.UserRole.Admin]), patient_controller_1.deleteAllergy);
// Child Profiles
router.get('/:patientId/children', patient_controller_1.getChildProfiles);
router.post('/:patientId/children', (0, auth_middleware_1.authorize)([client_1.UserRole.Patient, client_1.UserRole.Admin]), patient_controller_1.addChildProfile);
router.delete('/children/:childId', (0, auth_middleware_1.authorize)([client_1.UserRole.Patient, client_1.UserRole.Admin]), patient_controller_1.deleteChildProfile);
exports.default = router;
//# sourceMappingURL=patient.routes.js.map