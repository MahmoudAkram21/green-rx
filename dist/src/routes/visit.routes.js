"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const visit_controller_1 = __importDefault(require("../controllers/visit.controller"));
const router = express_1.default.Router();
// Create visit
router.post('/', visit_controller_1.default.createVisit);
// Get patient visits
router.get('/patient/:patientId', visit_controller_1.default.getPatientVisits);
// Get doctor visits
router.get('/doctor/:doctorId', visit_controller_1.default.getDoctorVisits);
// Get single visit
router.get('/:id', visit_controller_1.default.getVisit);
// Update visit
router.patch('/:id', visit_controller_1.default.updateVisit);
// Delete visit
router.delete('/:id', visit_controller_1.default.deleteVisit);
exports.default = router;
//# sourceMappingURL=visit.routes.js.map