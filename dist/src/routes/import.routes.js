"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const import_controller_1 = __importDefault(require("../controllers/import.controller"));
const multer_config_1 = require("../config/multer.config");
const router = express_1.default.Router();
// Import Active Substances from Excel/CSV
router.post('/active-substances', multer_config_1.upload.single('file'), import_controller_1.default.importActiveSubstances.bind(import_controller_1.default));
// Generic entity import
router.post('/:entityType', multer_config_1.upload.single('file'), import_controller_1.default.importEntity.bind(import_controller_1.default));
// Get import history
router.get('/history', import_controller_1.default.getImportHistory.bind(import_controller_1.default));
exports.default = router;
//# sourceMappingURL=import.routes.js.map