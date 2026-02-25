"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientMedicine_controller_1 = require("../controllers/patientMedicine.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const multer_config_1 = require("../config/multer.config");
const client_1 = require("../../generated/client/client");
const router = express_1.default.Router();
router.use(auth_middleware_1.authenticate);
// Admin: list all unverified image-uploaded medicines
router.get('/unverified', (0, auth_middleware_1.authorize)([client_1.UserRole.Admin, client_1.UserRole.SuperAdmin]), patientMedicine_controller_1.getUnverifiedMedicines);
// Get a single record
router.get('/:id', patientMedicine_controller_1.getPatientMedicineById);
// List all medicines for a patient
router.get('/patient/:patientId', patientMedicine_controller_1.getPatientMedicines);
// Patient adds a medicine that exists in the system
router.post('/patient/:patientId', (0, auth_middleware_1.authorize)([client_1.UserRole.Patient, client_1.UserRole.Doctor, client_1.UserRole.Admin, client_1.UserRole.SuperAdmin]), patientMedicine_controller_1.addPatientMedicine);
// Patient uploads an image because medicine is NOT in system
router.post('/patient/:patientId/upload-image', (0, auth_middleware_1.authorize)([client_1.UserRole.Patient]), multer_config_1.uploadMedicineImage.single('image'), patientMedicine_controller_1.addPatientMedicineByImage);
// Update dosage/frequency/status
router.patch('/:id', (0, auth_middleware_1.authorize)([client_1.UserRole.Patient, client_1.UserRole.Doctor, client_1.UserRole.Admin, client_1.UserRole.SuperAdmin]), patientMedicine_controller_1.updatePatientMedicine);
// Admin/Doctor verifies an image-uploaded medicine by linking it to a TradeName
router.patch('/:id/verify', (0, auth_middleware_1.authorize)([client_1.UserRole.Doctor, client_1.UserRole.Admin, client_1.UserRole.SuperAdmin]), patientMedicine_controller_1.verifyPatientMedicine);
// Delete
router.delete('/:id', (0, auth_middleware_1.authorize)([client_1.UserRole.Patient, client_1.UserRole.Doctor, client_1.UserRole.Admin, client_1.UserRole.SuperAdmin]), patientMedicine_controller_1.deletePatientMedicine);
exports.default = router;
//# sourceMappingURL=patientMedicine.routes.js.map