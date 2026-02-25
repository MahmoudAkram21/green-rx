"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const visit_controller_1 = __importDefault(require("../controllers/visit.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.use(auth_middleware_1.authenticate);
router.post('/', visit_controller_1.default.createVisit);
router.get('/patient/:patientId', visit_controller_1.default.getPatientVisits);
router.get('/doctor/:doctorId', visit_controller_1.default.getDoctorVisits);
router.get('/:id', visit_controller_1.default.getVisit);
router.patch('/:id', visit_controller_1.default.updateVisit);
router.delete('/:id', visit_controller_1.default.deleteVisit);
exports.default = router;
//# sourceMappingURL=visit.routes.js.map