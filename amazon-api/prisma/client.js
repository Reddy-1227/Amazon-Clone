// Prisma client setup for Node.js API
const { PrismaClient } = require("@prisma/client");

// Create a new instance each time to avoid prepared statement conflicts
const createPrismaClient = () => {
  return new PrismaClient({
    log: ["error"],
  });
};

const prisma = createPrismaClient();

// Add this to handle connection issues
process.on("beforeExit", async () => {
  await prisma.$disconnect();
});

module.exports = prisma;
