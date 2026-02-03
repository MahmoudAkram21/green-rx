"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const activeSubstance_controller_1 = require("../controllers/activeSubstance.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const client_1 = require("../generated/client");
const router = express_1.default.Router();
// All routes require authentication
router.use(auth_middleware_1.authenticate);
// Active Substance CRUD
router.post('/', (0, auth_middleware_1.authorize)([client_1.UserRole.Admin, client_1.UserRole.SuperAdmin, client_1.UserRole.Company]), activeSubstance_controller_1.createActiveSubstance);
router.get('/search', activeSubstance_controller_1.searchActiveSubstances); // All authenticated users can search
router.get('/:id', activeSubstance_controller_1.getActiveSubstanceById);
router.put('/:id', (0, auth_middleware_1.authorize)([client_1.UserRole.Admin, client_1.UserRole.SuperAdmin, client_1.UserRole.Company]), activeSubstance_controller_1.updateActiveSubstance);
router.delete('/:id', (0, auth_middleware_1.authorize)([client_1.UserRole.Admin, client_1.UserRole.SuperAdmin]), activeSubstance_controller_1.deleteActiveSubstance);
// Drug Interactions
router.get('/:id/interactions', activeSubstance_controller_1.getDrugInteractions);
exports.default = router;
//# sourceMappingURL=activeSubstance.routes.js.map