"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rating_controller_1 = __importDefault(require("../controllers/rating.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.use(auth_middleware_1.authenticate);
router.post('/', rating_controller_1.default.createRating);
router.get('/doctor/:doctorId', rating_controller_1.default.getDoctorRatings);
router.get('/pharmacist/:pharmacistId', rating_controller_1.default.getPharmacistRatings);
router.get('/patient/:patientId', rating_controller_1.default.getPatientRatings);
router.delete('/:id', rating_controller_1.default.deleteRating);
exports.default = router;
//# sourceMappingURL=rating.routes.js.map