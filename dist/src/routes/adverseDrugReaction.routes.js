"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adverseDrugReaction_controller_1 = __importDefault(require("../controllers/adverseDrugReaction.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const client_1 = require("../../generated/client/client");
const router = express_1.default.Router();
router.use(auth_middleware_1.authenticate);
router.post('/', adverseDrugReaction_controller_1.default.reportADR);
router.get('/patient/:patientId', adverseDrugReaction_controller_1.default.getPatientADRs);
router.get('/drug/:drugType/:drugId', adverseDrugReaction_controller_1.default.getDrugADRs);
router.get('/', (0, auth_middleware_1.authorize)([client_1.UserRole.Admin, client_1.UserRole.SuperAdmin]), adverseDrugReaction_controller_1.default.getAllADRs);
router.get('/statistics/summary', (0, auth_middleware_1.authorize)([client_1.UserRole.Admin, client_1.UserRole.SuperAdmin]), adverseDrugReaction_controller_1.default.getADRStatistics);
router.get('/:id', adverseDrugReaction_controller_1.default.getADRById);
router.patch('/:id', adverseDrugReaction_controller_1.default.updateADR);
exports.default = router;
//# sourceMappingURL=adverseDrugReaction.routes.js.map