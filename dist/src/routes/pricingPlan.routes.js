"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pricingPlan_controller_1 = require("../controllers/pricingPlan.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const client_1 = require("../../generated/client/client");
const router = express_1.default.Router();
// Public routes (no auth required for viewing plans)
router.get('/', pricingPlan_controller_1.getPricingPlans);
router.get('/default', pricingPlan_controller_1.getDefaultPricingPlan);
router.get('/:id', pricingPlan_controller_1.getPricingPlanById);
// Admin-only routes
router.post('/', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)([client_1.UserRole.Admin, client_1.UserRole.SuperAdmin]), pricingPlan_controller_1.createPricingPlan);
router.put('/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)([client_1.UserRole.Admin, client_1.UserRole.SuperAdmin]), pricingPlan_controller_1.updatePricingPlan);
router.delete('/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)([client_1.UserRole.Admin, client_1.UserRole.SuperAdmin]), pricingPlan_controller_1.deletePricingPlan);
exports.default = router;
//# sourceMappingURL=pricingPlan.routes.js.map