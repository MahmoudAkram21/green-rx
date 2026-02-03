"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prescription_controller_1 = require("../controllers/prescription.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
// All routes require authentication
router.use(auth_middleware_1.authenticate);
// Prescription routes
router.post('/', prescription_controller_1.createPrescription);
router.post('/batch', prescription_controller_1.createBatchPrescriptions); // NEW: Batch prescription creation
router.get('/', prescription_controller_1.getPrescriptions);
router.get('/:id', prescription_controller_1.getPrescriptionById);
router.put('/:id', prescription_controller_1.updatePrescription);
router.delete('/:id', prescription_controller_1.deletePrescription);
// Drug interaction routes
router.get('/:prescriptionId/interactions', prescription_controller_1.getDrugInteractionAlerts);
router.put('/interactions/:alertId/acknowledge', prescription_controller_1.acknowledgeDrugInteraction);
exports.default = router;
//# sourceMappingURL=prescription.routes.js.map