import express from 'express';
import {
    createTradeName,
    listTradeNames,
    getTradeNameById,
    searchTradeNames,
    searchTradeNamesByImage,
    updateTradeName,
    deleteTradeName
} from '../controllers/tradeName.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { uploadImageMemory } from '../config/multer.config';
import { UserRole } from '../../generated/client/client';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Trade Name CRUD
router.post('/', authorize([UserRole.Admin, UserRole.SuperAdmin, UserRole.Company]), createTradeName);
router.get('/', listTradeNames);
router.get('/search', searchTradeNames);
router.post('/search-by-image', uploadImageMemory.single('image'), searchTradeNamesByImage);
router.get('/:id', getTradeNameById);
router.put('/:id', authorize([UserRole.Admin, UserRole.SuperAdmin, UserRole.Company]), updateTradeName);
router.delete('/:id', authorize([UserRole.Admin, UserRole.SuperAdmin]), deleteTradeName);

export default router;
