"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const medicalReport_controller_1 = __importDefault(require("../controllers/medicalReport.controller"));
const multer_config_1 = require("../config/multer.config");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.use(auth_middleware_1.authenticate);
router.post('/', medicalReport_controller_1.default.createReport);
router.get('/patient/:patientId', medicalReport_controller_1.default.getPatientReports);
router.get('/:id', medicalReport_controller_1.default.getReport);
router.patch('/:id', medicalReport_controller_1.default.updateReport);
router.delete('/:id', medicalReport_controller_1.default.deleteReport);
router.post('/:id/upload', multer_config_1.upload.single('file'), medicalReport_controller_1.default.uploadReportFile);
exports.default = router;
//# sourceMappingURL=medicalReport.routes.js.map