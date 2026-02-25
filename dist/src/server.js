"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const index_1 = __importDefault(require("./routes/index"));
const morgan_1 = require("./config/morgan");
const logger_1 = __importDefault(require("./config/logger"));
const prisma_1 = require("./lib/prisma");
const password_util_1 = require("./utils/password.util");
const DEFAULT_ADMIN_EMAIL = 'superadmin@greenrx.com';
const DEFAULT_ADMIN_PASSWORD = 'Password@123';
/** In development: ensure default SuperAdmin exists so login works without running seed. */
async function ensureDefaultAdmin() {
    if (process.env.NODE_ENV !== 'development' && process.env.CREATE_DEFAULT_ADMIN !== 'true')
        return;
    try {
        const existing = await prisma_1.prisma.user.findUnique({ where: { email: DEFAULT_ADMIN_EMAIL } });
        if (existing)
            return;
        const passwordHash = await (0, password_util_1.hashPassword)(DEFAULT_ADMIN_PASSWORD);
        await prisma_1.prisma.user.create({
            data: {
                email: DEFAULT_ADMIN_EMAIL,
                passwordHash,
                role: 'SuperAdmin',
                emailVerified: true,
                isActive: true,
            },
        });
        logger_1.default.info(`Default admin created: ${DEFAULT_ADMIN_EMAIL}`);
        console.log(`[RMMSY] Default admin created: ${DEFAULT_ADMIN_EMAIL} / ${DEFAULT_ADMIN_PASSWORD}`);
    }
    catch (e) {
        logger_1.default.error('Failed to create default admin', e);
    }
}
const swagger_1 = __importDefault(require("./config/swagger"));
// Use require here to avoid ts-node declaration resolution issues in dev mode.
const swaggerUi = require('swagger-ui-express');
const app = (0, express_1.default)();
// HTTP request logging (Morgan)
app.use(morgan_1.morganMiddleware);
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Swagger / OpenAPI (served at /api/docs; redirect /api-docs for convenience)
app.get('/api/openapi.json', (_req, res) => {
    res.json(swagger_1.default);
});
app.get('/api-docs', (_req, res) => {
    res.redirect(302, '/api/docs');
});
app.get('/api-docs/', (_req, res) => {
    res.redirect(302, '/api/docs');
});
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swagger_1.default, { explorer: true }));
// Routes
app.use('/api', index_1.default);
// Health check (root and under /api for consistency)
app.get('/health', (_req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});
app.get('/api/health', (_req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});
// 404 handler
app.use((_req, res) => {
    res.status(404).json({ error: 'Route not found' });
});
// Error handler
app.use((err, _req, res, _next) => {
    logger_1.default.error(err.stack);
    const status = err.status || 500;
    res.status(status).json({
        error: err.message || 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
    logger_1.default.info(`Server is running on port ${PORT}`);
    ensureDefaultAdmin().catch((err) => {
        logger_1.default.error('ensureDefaultAdmin failed (server still running)', err);
        console.error('[RMMSY] Default admin setup failed:', err?.message ?? err);
    });
});
exports.default = app;
//# sourceMappingURL=server.js.map