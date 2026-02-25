"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.authenticate = void 0;
const jwt_util_1 = require("../utils/jwt.util");
const prisma_1 = require("../lib/prisma");
const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ error: 'Unauthorized: No token provided' });
            return;
        }
        const token = authHeader.split(' ')[1];
        try {
            const decoded = (0, jwt_util_1.verifyAccessToken)(token);
            const user = await prisma_1.prisma.user.findUnique({ where: { id: decoded.userId } });
            if (!user || !user.isActive) {
                res.status(401).json({ error: 'Unauthorized: Account is inactive or deleted' });
                return;
            }
            req.user = decoded;
            next();
        }
        catch (error) {
            res.status(401).json({ error: 'Unauthorized: Invalid token' });
            return;
        }
    }
    catch (error) {
        next(error);
    }
};
exports.authenticate = authenticate;
const authorize = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            res.status(401).json({ error: 'Unauthorized: Not authenticated' });
            return;
        }
        if (!roles.includes(req.user.role)) {
            res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
            return;
        }
        next();
    };
};
exports.authorize = authorize;
//# sourceMappingURL=auth.middleware.js.map