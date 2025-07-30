// Prisma client setup for Node.js API
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  log: ['error'],
});

// Add this to handle connection issues
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

module.exports = prisma;
