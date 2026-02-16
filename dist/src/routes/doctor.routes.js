"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const doctor_controller_1 = require("../controllers/doctor.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const client_1 = require("../../generated/client/client");
const router = express_1.default.Router();
// All doctor routes require authentication
router.use(auth_middleware_1.authenticate);
// Doctor Profile
router.post('/', (0, auth_middleware_1.authorize)([client_1.UserRole.Doctor, client_1.UserRole.Admin]), doctor_controller_1.createOrUpdateDoctor);
router.get('/search', doctor_controller_1.getAllDoctors); // Public search for patients to find doctors
router.get('/:id', doctor_controller_1.getDoctorById);
router.get('/user/:userId', doctor_controller_1.getDoctorByUserId);
// Doctor Verification (Admin only)
router.put('/:id/verify', (0, auth_middleware_1.authorize)([client_1.UserRole.Admin, client_1.UserRole.SuperAdmin]), doctor_controller_1.verifyDoctor);
// Patient-Doctor Relationships
router.post('/:doctorId/patients', (0, auth_middleware_1.authorize)([client_1.UserRole.Doctor, client_1.UserRole.Admin]), doctor_controller_1.assignPatient);
router.get('/:doctorId/patients', (0, auth_middleware_1.authorize)([client_1.UserRole.Doctor, client_1.UserRole.Admin]), doctor_controller_1.getDoctorPatients);
router.delete('/:doctorId/patients/:patientId', (0, auth_middleware_1.authorize)([client_1.UserRole.Doctor, client_1.UserRole.Admin]), doctor_controller_1.removePatient);
exports.default = router;
//# sourceMappingURL=doctor.routes.js.map