"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const diseaseWarningRule_controller_1 = __importDefault(require("../controllers/diseaseWarningRule.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const client_1 = require("../../generated/client/client");
const router = (0, express_1.Router)();
// All routes require authentication
router.use(auth_middleware_1.authenticate);
// Get all warning rules (with optional filters)
router.get('/', (0, auth_middleware_1.authorize)([client_1.UserRole.Admin, client_1.UserRole.SuperAdmin]), diseaseWarningRule_controller_1.default.getAllWarningRules);
// Get all rules for a specific disease
router.get('/disease/:diseaseId', diseaseWarningRule_controller_1.default.getWarningRulesForDisease);
// Get a single warning rule by ID
router.get('/:id', diseaseWarningRule_controller_1.default.getWarningRuleById);
// Create a new warning rule (Admin only)
router.post('/', (0, auth_middleware_1.authorize)([client_1.UserRole.Admin, client_1.UserRole.SuperAdmin]), diseaseWarningRule_controller_1.default.createWarningRule);
// Update a warning rule (Admin only)
router.patch('/:id', (0, auth_middleware_1.authorize)([client_1.UserRole.Admin, client_1.UserRole.SuperAdmin]), diseaseWarningRule_controller_1.default.updateWarningRule);
// Delete a warning rule (Admin only)
router.delete('/:id', (0, auth_middleware_1.authorize)([client_1.UserRole.Admin, client_1.UserRole.SuperAdmin]), diseaseWarningRule_controller_1.default.deleteWarningRule);
exports.default = router;
//# sourceMappingURL=diseaseWarningRule.routes.js.map