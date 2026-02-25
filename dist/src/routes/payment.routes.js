"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const payment_controller_1 = require("../controllers/payment.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const client_1 = require("../../generated/client/client");
const router = express_1.default.Router();
// All routes require authentication
router.use(auth_middleware_1.authenticate);
router.post('/', payment_controller_1.createPayment);
router.get('/:id', payment_controller_1.getPaymentById);
router.get('/subscription/:subscriptionId', payment_controller_1.getPaymentsBySubscription);
router.get('/', (0, auth_middleware_1.authorize)([client_1.UserRole.Admin, client_1.UserRole.SuperAdmin]), payment_controller_1.getAllPayments);
router.put('/:id/status', (0, auth_middleware_1.authorize)([client_1.UserRole.Admin, client_1.UserRole.SuperAdmin]), payment_controller_1.updatePaymentStatus);
router.post('/:id/process', payment_controller_1.processPayment);
router.post('/:id/refund', (0, auth_middleware_1.authorize)([client_1.UserRole.Admin, client_1.UserRole.SuperAdmin]), payment_controller_1.refundPayment);
exports.default = router;
//# sourceMappingURL=payment.routes.js.map