"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const prisma_1 = require("../lib/prisma");
// Handle graceful shutdown
process.on("beforeExit", async () => {
    await prisma_1.prisma.$disconnect();
});
exports.default = prisma_1.prisma;
//# sourceMappingURL=database.js.map