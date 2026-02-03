"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const consultation_controller_1 = require("../controllers/consultation.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
// All routes require authentication
router.use(auth_middleware_1.authenticate);
// Consultation routes
router.post('/', consultation_controller_1.createConsultation);
router.get('/:id', consultation_controller_1.getConsultationById);
router.get('/patient/:patientId', consultation_controller_1.getConsultationsByPatient);
router.get('/doctor/:doctorId', consultation_controller_1.getConsultationsByDoctor);
router.get('/doctor/:doctorId/followups', consultation_controller_1.getUpcomingFollowUps);
router.put('/:id', consultation_controller_1.updateConsultation);
router.delete('/:id', consultation_controller_1.deleteConsultation);
exports.default = router;
//# sourceMappingURL=consultation.routes.js.map