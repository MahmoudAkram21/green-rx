"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pharmacist_controller_1 = require("../controllers/pharmacist.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const client_1 = require("../../generated/client/client");
const router = express_1.default.Router();
// All pharmacist routes require authentication
router.use(auth_middleware_1.authenticate);
// Pharmacist Profile
router.post('/', (0, auth_middleware_1.authorize)([client_1.UserRole.Pharmacist, client_1.UserRole.Admin]), pharmacist_controller_1.createOrUpdatePharmacist);
router.get('/search', pharmacist_controller_1.getAllPharmacists);
router.get('/:id', pharmacist_controller_1.getPharmacistById);
router.get('/user/:userId', pharmacist_controller_1.getPharmacistByUserId);
exports.default = router;
//# sourceMappingURL=pharmacist.routes.js.map