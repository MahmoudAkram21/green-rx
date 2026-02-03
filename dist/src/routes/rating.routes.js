"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rating_controller_1 = __importDefault(require("../controllers/rating.controller"));
const router = express_1.default.Router();
// Create/Update a rating
router.post('/', rating_controller_1.default.createRating);
// Get ratings for a doctor
router.get('/doctor/:doctorId', rating_controller_1.default.getDoctorRatings);
// Get ratings for a pharmacist
router.get('/pharmacist/:pharmacistId', rating_controller_1.default.getPharmacistRatings);
// Get patient's ratings
router.get('/patient/:patientId', rating_controller_1.default.getPatientRatings);
// Delete a rating
router.delete('/:id', rating_controller_1.default.deleteRating);
exports.default = router;
//# sourceMappingURL=rating.routes.js.map