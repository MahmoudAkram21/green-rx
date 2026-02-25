"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientShareLink_controller_1 = __importDefault(require("../controllers/patientShareLink.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
// Public: token-based shared data access (no auth required)
router.get('/shared/:token', patientShareLink_controller_1.default.getSharedData);
// All remaining routes require authentication
router.post('/patient/:patientId', auth_middleware_1.authenticate, patientShareLink_controller_1.default.generateShareLink);
router.get('/patient/:patientId', auth_middleware_1.authenticate, patientShareLink_controller_1.default.getPatientShareLinks);
router.patch('/:id/revoke', auth_middleware_1.authenticate, patientShareLink_controller_1.default.revokeShareLink);
router.patch('/:id', auth_middleware_1.authenticate, patientShareLink_controller_1.default.updateShareLink);
router.delete('/:id', auth_middleware_1.authenticate, patientShareLink_controller_1.default.deleteShareLink);
exports.default = router;
//# sourceMappingURL=patientShareLink.routes.js.map