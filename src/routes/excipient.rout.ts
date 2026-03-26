import express from 'express';
import { UserRole } from '../../generated/client/client';
import { authenticate, authorize } from '../middleware/auth.middleware';
import {
  createExcipient,
  deleteExcipient,
  getExcipientById,
  listExcipients,
  searchExcipientsForPatient,
  updateExcipient,
} from '../controllers/excipient.controller';

const router = express.Router();

router.use(authenticate);

// Patient + Admin: read endpoints (patient sees active only; admin can pass ?scope=admin)
router.get('/', listExcipients);
router.get('/search', searchExcipientsForPatient);
router.get('/:id', getExcipientById);

// Admin only: write endpoints
router.post('/', authorize([UserRole.Admin, UserRole.SuperAdmin]), createExcipient);
router.put('/:id', authorize([UserRole.Admin, UserRole.SuperAdmin]), updateExcipient);
router.delete('/:id', authorize([UserRole.Admin, UserRole.SuperAdmin]), deleteExcipient);

export default router;
