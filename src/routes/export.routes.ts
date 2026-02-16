import express from 'express';
import exportController from '../controllers/export.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../../generated/client/client';

const router = express.Router();

// All export routes require authentication
router.use(authenticate);

// Export Active Substances to Excel
router.get(
    '/active-substances',
    authorize([UserRole.Admin, UserRole.SuperAdmin, UserRole.Company]),
    exportController.exportActiveSubstances.bind(exportController)
);

// Export Trade Names
router.get(
    '/trade-names',
    authorize([UserRole.Admin, UserRole.SuperAdmin, UserRole.Company]),
    exportController.exportTradeNames.bind(exportController)
);

// Export Diseases
router.get(
    '/diseases',
    authorize([UserRole.Admin, UserRole.SuperAdmin, UserRole.Company]),
    exportController.exportDiseases.bind(exportController)
);

// Export Companies
router.get(
    '/companies',
    authorize([UserRole.Admin, UserRole.SuperAdmin, UserRole.Company]),
    exportController.exportCompanies.bind(exportController)
);

// Get export history
router.get(
    '/history',
    authorize([UserRole.Admin, UserRole.SuperAdmin]),
    exportController.getExportHistory.bind(exportController)
);

export default router;
