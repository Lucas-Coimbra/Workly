const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getMe(userId) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      createdAt: true,

      plan: {
        select: {
          name: true,
          price: true,
          monthlyHours: true,
        },
      },

      notifications: {
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          message: true,
          readAt: true,
          createdAt: true,
        },
      },
    },
  });
}

module.exports = {
  getMe,
};
