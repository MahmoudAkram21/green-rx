"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notification_controller_1 = __importDefault(require("../controllers/notification.controller"));
const router = express_1.default.Router();
// Create notification
router.post('/', notification_controller_1.default.createNotification);
// Get all notifications for a user
router.get('/user/:userId', notification_controller_1.default.getUserNotifications);
// Mark notification as read
router.patch('/:id/read', notification_controller_1.default.markAsRead);
// Mark all as read for a user
router.patch('/user/:userId/read-all', notification_controller_1.default.markAllAsRead);
// Delete notification
router.delete('/:id', notification_controller_1.default.deleteNotification);
// Send appointment reminder
router.post('/appointment-reminders', notification_controller_1.default.sendAppointmentReminders);
exports.default = router;
//# sourceMappingURL=notification.routes.js.map