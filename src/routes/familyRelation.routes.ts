import express from 'express';
import { getFamilyRelations } from '../controllers/familyRelation.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

router.use(authenticate);
router.get('/', getFamilyRelations);

export default router;
