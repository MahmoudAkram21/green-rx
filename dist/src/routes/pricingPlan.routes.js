"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pricingPlan_controller_1 = require("../controllers/pricingPlan.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
// Public routes (no auth required for viewing plans)
router.get('/', pricingPlan_controller_1.getPricingPlans);
router.get('/default', pricingPlan_controller_1.getDefaultPricingPlan);
router.get('/:id', pricingPlan_controller_1.getPricingPlanById);
// Admin routes (require authentication and admin role)
router.post('/', auth_middleware_1.authenticate, pricingPlan_controller_1.createPricingPlan); // TODO: Add admin role check
router.put('/:id', auth_middleware_1.authenticate, pricingPlan_controller_1.updatePricingPlan); // TODO: Add admin role check
router.delete('/:id', auth_middleware_1.authenticate, pricingPlan_controller_1.deletePricingPlan); // TODO: Add admin role check
exports.default = router;
//# sourceMappingURL=pricingPlan.routes.js.map