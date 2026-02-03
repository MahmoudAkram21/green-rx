"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientDoctor_controller_1 = require("../controllers/patientDoctor.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
// All routes require authentication
router.use(auth_middleware_1.authenticate);
// Patient-Doctor relationship routes
router.post('/', patientDoctor_controller_1.createPatientDoctor);
router.get('/patient/:patientId', patientDoctor_controller_1.getRelationshipsByPatient);
router.get('/doctor/:doctorId', patientDoctor_controller_1.getRelationshipsByDoctor);
router.get('/:id', patientDoctor_controller_1.getRelationshipById);
router.put('/:id', patientDoctor_controller_1.updatePatientDoctor);
router.post('/:id/end', patientDoctor_controller_1.endRelationship);
exports.default = router;
//# sourceMappingURL=patientDoctor.routes.js.map