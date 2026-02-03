"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const disease_controller_1 = require("../controllers/disease.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const client_1 = require("../generated/client");
const router = express_1.default.Router();
router.use(auth_middleware_1.authenticate);
// Disease CRUD
router.post('/', (0, auth_middleware_1.authorize)([client_1.UserRole.Admin, client_1.UserRole.SuperAdmin]), disease_controller_1.createDisease);
router.get('/', disease_controller_1.getAllDiseases);
router.get('/:id', disease_controller_1.getDiseaseById);
router.put('/:id', (0, auth_middleware_1.authorize)([client_1.UserRole.Admin, client_1.UserRole.SuperAdmin]), disease_controller_1.updateDisease);
router.delete('/:id', (0, auth_middleware_1.authorize)([client_1.UserRole.Admin, client_1.UserRole.SuperAdmin]), disease_controller_1.deleteDisease);
// Disease Warnings
router.post('/warnings', (0, auth_middleware_1.authorize)([client_1.UserRole.Admin, client_1.UserRole.SuperAdmin]), disease_controller_1.createDiseaseWarning);
router.get('/:diseaseId/warnings', disease_controller_1.getDiseaseWarnings);
exports.default = router;
//# sourceMappingURL=disease.routes.js.map