import express from 'express';
import {
    createCompany,
    getCompanyById,
    getAllCompanies,
    updateCompany,
    deleteCompany
} from '../controllers/company.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../../generated/client/client';

const router = express.Router();

router.use(authenticate);

router.post('/', authorize([UserRole.Admin, UserRole.SuperAdmin]), createCompany);
router.get('/', getAllCompanies);
router.get('/:id', getCompanyById);
router.put('/:id', authorize([UserRole.Admin, UserRole.SuperAdmin, UserRole.Company]), updateCompany);
router.delete('/:id', authorize([UserRole.Admin, UserRole.SuperAdmin]), deleteCompany);

export default router;
