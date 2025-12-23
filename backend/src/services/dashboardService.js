const prisma = require("../config/prisma");

async function member(userId) {
  const [reservationsCount, upcomingReservations, unreadNotifications] =
    await Promise.all([
      prisma.reservation.count({ where: { userId } }),
      prisma.reservation.findMany({
        where: {
          userId,
          startTime: { gte: new Date() },
        },
        orderBy: { startTime: "asc" },
        take: 3,
      }),
      prisma.notification.count({
        where: {
          userId,
          read: false,
        },
      }),
    ]);

  return {
    stats: {
      reservationsCount,
      unreadNotifications,
    },
    upcomingReservations,
  };
}

module.exports = { member };
