"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const drugInteractionAlert_controller_1 = __importDefault(require("../controllers/drugInteractionAlert.controller"));
const router = express_1.default.Router();
// Check drug safety (before prescribing)
router.post('/check', drugInteractionAlert_controller_1.default.checkDrugSafety);
// Get alerts for a prescription
router.get('/prescription/:prescriptionId', drugInteractionAlert_controller_1.default.getAlertsByPrescription);
// Get alerts for a patient
router.get('/patient/:patientId', drugInteractionAlert_controller_1.default.getPatientAlerts);
// Acknowledge alert by doctor
router.patch('/:id/acknowledge-doctor', drugInteractionAlert_controller_1.default.acknowledgeByDoctor);
// Acknowledge alert by patient
router.patch('/:id/acknowledge-patient', drugInteractionAlert_controller_1.default.acknowledgeByPatient);
exports.default = router;
//# sourceMappingURL=drugInteractionAlert.routes.js.map