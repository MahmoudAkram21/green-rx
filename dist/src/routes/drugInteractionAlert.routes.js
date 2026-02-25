"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const drugInteractionAlert_controller_1 = __importDefault(require("../controllers/drugInteractionAlert.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.use(auth_middleware_1.authenticate);
router.post('/check', drugInteractionAlert_controller_1.default.checkDrugSafety);
router.get('/prescription/:prescriptionId', drugInteractionAlert_controller_1.default.getAlertsByPrescription);
router.get('/patient/:patientId', drugInteractionAlert_controller_1.default.getPatientAlerts);
router.patch('/:id/acknowledge-doctor', drugInteractionAlert_controller_1.default.acknowledgeByDoctor);
router.patch('/:id/acknowledge-patient', drugInteractionAlert_controller_1.default.acknowledgeByPatient);
exports.default = router;
//# sourceMappingURL=drugInteractionAlert.routes.js.map