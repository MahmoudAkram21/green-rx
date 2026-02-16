"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const company_controller_1 = require("../controllers/company.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const client_1 = require("../../generated/client/client");
const router = express_1.default.Router();
router.use(auth_middleware_1.authenticate);
router.post('/', (0, auth_middleware_1.authorize)([client_1.UserRole.Admin, client_1.UserRole.SuperAdmin]), company_controller_1.createCompany);
router.get('/', company_controller_1.getAllCompanies);
router.get('/:id', company_controller_1.getCompanyById);
router.put('/:id', (0, auth_middleware_1.authorize)([client_1.UserRole.Admin, client_1.UserRole.SuperAdmin, client_1.UserRole.Company]), company_controller_1.updateCompany);
router.delete('/:id', (0, auth_middleware_1.authorize)([client_1.UserRole.Admin, client_1.UserRole.SuperAdmin]), company_controller_1.deleteCompany);
exports.default = router;
//# sourceMappingURL=company.routes.js.map