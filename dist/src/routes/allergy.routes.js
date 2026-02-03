"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const allergy_controller_1 = require("../controllers/allergy.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
// All routes require authentication
router.use(auth_middleware_1.authenticate);
// Allergy CRUD routes
router.post('/', allergy_controller_1.createAllergy);
router.get('/patient/:patientId', allergy_controller_1.getAllergiesByPatient);
router.get('/patient/:patientId/critical', allergy_controller_1.getCriticalAllergies);
router.get('/:id', allergy_controller_1.getAllergyById);
router.put('/:id', allergy_controller_1.updateAllergy);
router.delete('/:id', allergy_controller_1.deleteAllergy);
// Medicine conflict checking
router.get('/check/:patientId/:medicineId', allergy_controller_1.checkMedicineAllergies);
exports.default = router;
//# sourceMappingURL=allergy.routes.js.map