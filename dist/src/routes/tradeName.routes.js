"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tradeName_controller_1 = require("../controllers/tradeName.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const client_1 = require("../../generated/client/client");
const router = express_1.default.Router();
// All routes require authentication
router.use(auth_middleware_1.authenticate);
// Trade Name CRUD
router.post('/', (0, auth_middleware_1.authorize)([client_1.UserRole.Admin, client_1.UserRole.SuperAdmin, client_1.UserRole.Company]), tradeName_controller_1.createTradeName);
router.get('/', tradeName_controller_1.listTradeNames);
router.get('/search', tradeName_controller_1.searchTradeNames);
router.get('/:id', tradeName_controller_1.getTradeNameById);
router.put('/:id', (0, auth_middleware_1.authorize)([client_1.UserRole.Admin, client_1.UserRole.SuperAdmin, client_1.UserRole.Company]), tradeName_controller_1.updateTradeName);
router.delete('/:id', (0, auth_middleware_1.authorize)([client_1.UserRole.Admin, client_1.UserRole.SuperAdmin]), tradeName_controller_1.deleteTradeName);
exports.default = router;
//# sourceMappingURL=tradeName.routes.js.map