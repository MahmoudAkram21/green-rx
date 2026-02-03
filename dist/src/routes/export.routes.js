"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const export_controller_1 = __importDefault(require("../controllers/export.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const client_1 = require("../generated/client");
const router = express_1.default.Router();
// All export routes require authentication
router.use(auth_middleware_1.authenticate);
// Export Active Substances to Excel
router.get('/active-substances', (0, auth_middleware_1.authorize)([client_1.UserRole.Admin, client_1.UserRole.SuperAdmin, client_1.UserRole.Company]), export_controller_1.default.exportActiveSubstances.bind(export_controller_1.default));
// Export Trade Names
router.get('/trade-names', (0, auth_middleware_1.authorize)([client_1.UserRole.Admin, client_1.UserRole.SuperAdmin, client_1.UserRole.Company]), export_controller_1.default.exportTradeNames.bind(export_controller_1.default));
// Export Diseases
router.get('/diseases', (0, auth_middleware_1.authorize)([client_1.UserRole.Admin, client_1.UserRole.SuperAdmin, client_1.UserRole.Company]), export_controller_1.default.exportDiseases.bind(export_controller_1.default));
// Export Companies
router.get('/companies', (0, auth_middleware_1.authorize)([client_1.UserRole.Admin, client_1.UserRole.SuperAdmin, client_1.UserRole.Company]), export_controller_1.default.exportCompanies.bind(export_controller_1.default));
// Get export history
router.get('/history', (0, auth_middleware_1.authorize)([client_1.UserRole.Admin, client_1.UserRole.SuperAdmin]), export_controller_1.default.getExportHistory.bind(export_controller_1.default));
exports.default = router;
//# sourceMappingURL=export.routes.js.map