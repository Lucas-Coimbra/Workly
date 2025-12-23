const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAllPlans() {
  return prisma.plan.findMany({
    orderBy: { price: "asc" },
  });
}

async function getPlanByName(name) {
  return prisma.plan.findUnique({
    where: { name },
  });
}

module.exports = {
  getAllPlans,
  getPlanByName,
};
