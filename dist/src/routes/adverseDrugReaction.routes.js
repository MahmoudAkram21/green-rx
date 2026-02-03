"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adverseDrugReaction_controller_1 = __importDefault(require("../controllers/adverseDrugReaction.controller"));
const router = express_1.default.Router();
// Report an ADR
router.post('/', adverseDrugReaction_controller_1.default.reportADR);
// Get all ADRs for a patient
router.get('/patient/:patientId', adverseDrugReaction_controller_1.default.getPatientADRs);
// Get ADRs for a specific drug
router.get('/drug/:drugType/:drugId', adverseDrugReaction_controller_1.default.getDrugADRs);
// Get all ADRs (admin)
router.get('/', adverseDrugReaction_controller_1.default.getAllADRs);
// Update ADR
router.patch('/:id', adverseDrugReaction_controller_1.default.updateADR);
// Get ADR statistics
router.get('/statistics/summary', adverseDrugReaction_controller_1.default.getADRStatistics);
exports.default = router;
//# sourceMappingURL=adverseDrugReaction.routes.js.map