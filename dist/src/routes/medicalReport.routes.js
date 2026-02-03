"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const medicalReport_controller_1 = __importDefault(require("../controllers/medicalReport.controller"));
const multer_config_1 = require("../config/multer.config");
const router = express_1.default.Router();
// Create medical report
router.post('/', medicalReport_controller_1.default.createReport);
// Get all reports for a patient
router.get('/patient/:patientId', medicalReport_controller_1.default.getPatientReports);
// Get single report
router.get('/:id', medicalReport_controller_1.default.getReport);
// Update medical report
router.patch('/:id', medicalReport_controller_1.default.updateReport);
// Delete medical report
router.delete('/:id', medicalReport_controller_1.default.deleteReport);
// Upload report file
router.post('/:id/upload', multer_config_1.upload.single('file'), medicalReport_controller_1.default.uploadReportFile);
exports.default = router;
//# sourceMappingURL=medicalReport.routes.js.map