"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const payment_controller_1 = require("../controllers/payment.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
// All routes require authentication
router.use(auth_middleware_1.authenticate);
// Payment routes
router.post('/', payment_controller_1.createPayment);
router.get('/:id', payment_controller_1.getPaymentById);
router.get('/subscription/:subscriptionId', payment_controller_1.getPaymentsBySubscription);
router.get('/', payment_controller_1.getAllPayments); // Admin only - TODO: Add admin check
router.put('/:id/status', payment_controller_1.updatePaymentStatus); // Admin only - TODO: Add admin check
router.post('/:id/process', payment_controller_1.processPayment);
router.post('/:id/refund', payment_controller_1.refundPayment); // Admin only - TODO: Add admin check
exports.default = router;
//# sourceMappingURL=payment.routes.js.map