"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const appointment_controller_1 = require("../controllers/appointment.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
// All routes require authentication
router.use(auth_middleware_1.authenticate);
// Appointment routes
router.post('/', appointment_controller_1.createAppointment);
router.get('/:id', appointment_controller_1.getAppointmentById);
router.get('/patient/:patientId', appointment_controller_1.getAppointmentsByPatient);
router.get('/doctor/:doctorId', appointment_controller_1.getAppointmentsByDoctor);
router.get('/doctor/:doctorId/today', appointment_controller_1.getTodayAppointments);
router.put('/:id', appointment_controller_1.updateAppointment);
router.post('/:id/cancel', appointment_controller_1.cancelAppointment);
router.post('/:id/confirm', appointment_controller_1.confirmAppointment);
router.post('/:id/complete', appointment_controller_1.completeAppointment);
exports.default = router;
//# sourceMappingURL=appointment.routes.js.map