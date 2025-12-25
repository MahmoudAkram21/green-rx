import { Router } from 'express';
import diseaseWarningRuleController from '../controllers/diseaseWarningRule.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Get all warning rules (with optional filters)
router.get('/', authorize(['Admin', 'SuperAdmin']), diseaseWarningRuleController.getAllWarningRules);

// Get all rules for a specific disease
router.get('/disease/:diseaseId', diseaseWarningRuleController.getWarningRulesForDisease);

// Get a single warning rule by ID
router.get('/:id', diseaseWarningRuleController.getWarningRuleById);

// Create a new warning rule (Admin only)
router.post('/', authorize(['Admin', 'SuperAdmin']), diseaseWarningRuleController.createWarningRule);

// Update a warning rule (Admin only)
router.patch('/:id', authorize(['Admin', 'SuperAdmin']), diseaseWarningRuleController.updateWarningRule);

// Delete a warning rule (Admin only)
router.delete('/:id', authorize(['Admin', 'SuperAdmin']), diseaseWarningRuleController.deleteWarningRule);

export default router;
