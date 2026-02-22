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
// Swagger / OpenAPI
app.get('/api/openapi.json', (_req, res) => {
    res.json(swagger_1.default);
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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    logger_1.default.info(`Server is running on port ${PORT}`);
});
exports.default = app;
//# sourceMappingURL=server.js.map