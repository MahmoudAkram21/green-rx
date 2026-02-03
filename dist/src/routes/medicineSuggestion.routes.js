"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const medicineSuggestion_controller_1 = __importDefault(require("../controllers/medicineSuggestion.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// All routes require authentication
router.use(auth_middleware_1.authenticate);
// Get all suggestions (Admin sees all, Doctor sees own)
router.get("/", medicineSuggestion_controller_1.default.getSuggestions);
// Get a single suggestion by ID
router.get("/:id", medicineSuggestion_controller_1.default.getSuggestionById);
// Create a new suggestion (Doctor only)
router.post("/", (0, auth_middleware_1.authorize)(["Doctor"]), medicineSuggestion_controller_1.default.createSuggestion);
// Review a suggestion (Admin only)
router.patch("/:id/review", (0, auth_middleware_1.authorize)(["Admin", "SuperAdmin"]), medicineSuggestion_controller_1.default.reviewSuggestion);
// Delete a suggestion
router.delete("/:id", medicineSuggestion_controller_1.default.deleteSuggestion);
exports.default = router;
//# sourceMappingURL=medicineSuggestion.routes.js.map