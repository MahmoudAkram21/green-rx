"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prescriptionVersion_controller_1 = __importDefault(require("../controllers/prescriptionVersion.controller"));
const router = express_1.default.Router();
// Get all versions of a prescription
router.get('/prescription/:prescriptionId', prescriptionVersion_controller_1.default.getPrescriptionVersions);
// Get a specific version
router.get('/:id', prescriptionVersion_controller_1.default.getVersion);
// Create a new version
router.post('/prescription/:prescriptionId', prescriptionVersion_controller_1.default.createVersion);
// Compare two versions
router.get('/prescription/:prescriptionId/compare', prescriptionVersion_controller_1.default.compareVersions);
exports.default = router;
//# sourceMappingURL=prescriptionVersion.routes.js.map