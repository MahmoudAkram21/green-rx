"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const import_controller_1 = __importDefault(require("../controllers/import.controller"));
const multer_config_1 = require("../config/multer.config");
const auth_middleware_1 = require("../middleware/auth.middleware");
const client_1 = require("../../generated/client/client");
const router = express_1.default.Router();
router.use(auth_middleware_1.authenticate);
router.use((0, auth_middleware_1.authorize)([client_1.UserRole.Admin, client_1.UserRole.SuperAdmin]));
router.post('/active-substances', multer_config_1.upload.single('file'), import_controller_1.default.importActiveSubstances.bind(import_controller_1.default));
router.post('/:entityType', multer_config_1.upload.single('file'), import_controller_1.default.importEntity.bind(import_controller_1.default));
router.get('/history', import_controller_1.default.getImportHistory.bind(import_controller_1.default));
exports.default = router;
//# sourceMappingURL=import.routes.js.map