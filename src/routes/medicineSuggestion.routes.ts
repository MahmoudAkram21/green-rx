import { Router } from "express";
import medicineSuggestionController from "../controllers/medicineSuggestion.controller";
import { authenticate, authorize } from "../middleware/auth.middleware";
import { UserRole } from "../../generated/client/client";

const router = Router();

// All routes require authentication
router.use(authenticate);

// Get all suggestions (Admin sees all, Doctor sees own)
router.get("/", medicineSuggestionController.getSuggestions);

// Get a single suggestion by ID
router.get("/:id", medicineSuggestionController.getSuggestionById);

// Create a new suggestion (Doctor only)
router.post(
  "/",
  authorize([UserRole.Doctor]),
  medicineSuggestionController.createSuggestion
);

// Review a suggestion (Admin only)
router.patch(
  "/:id/review",
  authorize([UserRole.Admin, UserRole.SuperAdmin]),
  medicineSuggestionController.reviewSuggestion
);

// Delete a suggestion
router.delete("/:id", medicineSuggestionController.deleteSuggestion);

export default router;
