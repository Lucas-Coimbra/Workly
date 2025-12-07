// singleton prisma client (Prisma 6)
const { PrismaClient } = require("@prisma/client");

let prisma;
if (global.__prisma) {
  prisma = global.__prisma;
} else {
  prisma = new PrismaClient();
  if (process.env.NODE_ENV !== "production") global.__prisma = prisma;
}

module.exports = prisma;
