"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notification_controller_1 = __importDefault(require("../controllers/notification.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.use(auth_middleware_1.authenticate);
router.post('/', notification_controller_1.default.createNotification);
router.get('/user/:userId', notification_controller_1.default.getUserNotifications);
router.patch('/:id/read', notification_controller_1.default.markAsRead);
router.patch('/user/:userId/read-all', notification_controller_1.default.markAllAsRead);
router.delete('/:id', notification_controller_1.default.deleteNotification);
router.post('/appointment-reminders', notification_controller_1.default.sendAppointmentReminders);
exports.default = router;
//# sourceMappingURL=notification.routes.js.map