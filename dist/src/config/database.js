import "dotenv/config";
import { prisma } from "../lib/prisma";
// Handle graceful shutdown
process.on("beforeExit", async () => {
    await prisma.$disconnect();
});
export default prisma;
//# sourceMappingURL=database.js.map