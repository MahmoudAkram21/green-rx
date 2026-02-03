"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = __importDefault(require("../controllers/admin.controller"));
const router = express_1.default.Router();
// Doctor verification
router.get('/doctors/pending', admin_controller_1.default.getPendingDoctors);
router.patch('/doctors/:id/verify', admin_controller_1.default.verifyDoctor);
router.patch('/doctors/:id/reject', admin_controller_1.default.rejectDoctor);
// Statistics
router.get('/statistics', admin_controller_1.default.getStatistics);
// Audit logs
router.get('/audit-logs', admin_controller_1.default.getAuditLogs);
exports.default = router;
//# sourceMappingURL=admin.routes.js.map