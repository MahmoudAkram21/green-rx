"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const subscription_controller_1 = require("../controllers/subscription.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const client_1 = require("../../generated/client/client");
const router = express_1.default.Router();
// All routes require authentication
router.use(auth_middleware_1.authenticate);
router.post('/', subscription_controller_1.createSubscription);
router.get('/user/:userId', subscription_controller_1.getSubscriptionByUserId);
router.get('/', (0, auth_middleware_1.authorize)([client_1.UserRole.Admin, client_1.UserRole.SuperAdmin]), subscription_controller_1.getAllSubscriptions);
router.put('/:userId', subscription_controller_1.updateSubscription);
router.post('/:userId/cancel', subscription_controller_1.cancelSubscription);
router.post('/:userId/renew', subscription_controller_1.renewSubscription);
exports.default = router;
//# sourceMappingURL=subscription.routes.js.map