"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prescriptionVersion_controller_1 = __importDefault(require("../controllers/prescriptionVersion.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.use(auth_middleware_1.authenticate);
router.get('/prescription/:prescriptionId', prescriptionVersion_controller_1.default.getPrescriptionVersions);
router.get('/:id', prescriptionVersion_controller_1.default.getVersion);
router.post('/prescription/:prescriptionId', prescriptionVersion_controller_1.default.createVersion);
router.get('/prescription/:prescriptionId/compare', prescriptionVersion_controller_1.default.compareVersions);
exports.default = router;
//# sourceMappingURL=prescriptionVersion.routes.js.map