import express from 'express';
import { getSideEffectsByTradeName } from '../controllers/sideEffect.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../../generated/client/client';

const router = express.Router();

router.use(authenticate);

// GET /medicines/:tradeNameId/side-effects
// Extract pre-defined side effects for a trade name
// Returns grouped by frequency with contract validation
router.get(
  '/:tradeNameId/side-effects',
  authorize([UserRole.Patient, UserRole.Doctor, UserRole.Admin]),
  getSideEffectsByTradeName
);

export default router;
