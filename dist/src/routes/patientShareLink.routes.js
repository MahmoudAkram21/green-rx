"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientShareLink_controller_1 = __importDefault(require("../controllers/patientShareLink.controller"));
const router = express_1.default.Router();
// Generate a share link
router.post('/patient/:patientId', patientShareLink_controller_1.default.generateShareLink);
// Access shared data (public endpoint)
router.get('/shared/:token', patientShareLink_controller_1.default.getSharedData);
// Get all share links for a patient
router.get('/patient/:patientId', patientShareLink_controller_1.default.getPatientShareLinks);
// Revoke a share link
router.patch('/:id/revoke', patientShareLink_controller_1.default.revokeShareLink);
// Update share link settings
router.patch('/:id', patientShareLink_controller_1.default.updateShareLink);
// Delete a share link
router.delete('/:id', patientShareLink_controller_1.default.deleteShareLink);
exports.default = router;
//# sourceMappingURL=patientShareLink.routes.js.map