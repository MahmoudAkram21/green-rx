import express from 'express';
import {
    createTradeName,
    getTradeNameById,
    searchTradeNames,
    updateTradeName,
    deleteTradeName
} from '../controllers/tradeName.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../generated/client';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Trade Name CRUD
router.post('/', authorize([UserRole.Admin, UserRole.SuperAdmin, UserRole.Company]), createTradeName);
router.get('/search', searchTradeNames);
router.get('/:id', getTradeNameById);
router.put('/:id', authorize([UserRole.Admin, UserRole.SuperAdmin, UserRole.Company]), updateTradeName);
router.delete('/:id', authorize([UserRole.Admin, UserRole.SuperAdmin]), deleteTradeName);

export default router;
