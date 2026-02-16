"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientDisease_controller_1 = require("../controllers/patientDisease.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const client_1 = require("../../generated/client/client");
const router = express_1.default.Router();
// All routes require authentication
router.use(auth_middleware_1.authenticate);
// Patient Disease Management
router.post('/patient/:patientId', (0, auth_middleware_1.authorize)([client_1.UserRole.Patient, client_1.UserRole.Doctor, client_1.UserRole.Admin]), patientDisease_controller_1.addPatientDisease);
router.get('/patient/:patientId', patientDisease_controller_1.getPatientDiseases);
router.get('/patient/:patientId/active', patientDisease_controller_1.getActivePatientDiseases);
router.patch('/:id', (0, auth_middleware_1.authorize)([client_1.UserRole.Patient, client_1.UserRole.Doctor, client_1.UserRole.Admin]), patientDisease_controller_1.updatePatientDiseaseStatus);
router.delete('/:id', (0, auth_middleware_1.authorize)([client_1.UserRole.Patient, client_1.UserRole.Doctor, client_1.UserRole.Admin]), patientDisease_controller_1.deletePatientDisease);
exports.default = router;
//# sourceMappingURL=patientDisease.routes.js.map