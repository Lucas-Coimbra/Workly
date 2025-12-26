const prisma = require("../config/prisma");

async function member(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      plan: {
        select: {
          name: true,
          monthlyHours: true,
        },
      },
    },
  });

  let reservationsCount = 0;
  let upcomingReservations = [];
  let unreadNotifications = 0;

  // Notifications (já existe)
  try {
    unreadNotifications = await prisma.notification.count({
      where: { userId, read: false },
    });
  } catch {
    unreadNotifications = 0;
  }

  // Reservations (ainda em desenvolvimento)
  try {
    reservationsCount = await prisma.reservation.count({
      where: { userId },
    });

    upcomingReservations = await prisma.reservation.findMany({
      where: {
        userId,
        startTime: { gte: new Date() },
      },
      orderBy: { startTime: "asc" },
      take: 3,
      select: {
        id: true,
        startTime: true,
        endTime: true,
        status: true,
        room: {
          select: { name: true },
        },
      },
    });
  } catch {
    reservationsCount = 0;
    upcomingReservations = [];
  }

  let recentTickets = [];

  try {
    recentTickets = await prisma.supportTicket.findMany({
      where: {
        userId: Number(userId),
        status: {
          in: ["open", "progress"],
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: 3,
      select: {
        id: true,
        title: true,
        status: true,
        updatedAt: true,
      },
    });
  } catch {
    recentTickets = [];
  }

  return {
    user,
    stats: {
      reservationsCount,
      unreadNotifications,
      usedHoursThisMonth: 0,
      credits: 0,
    },
    upcomingReservations: upcomingReservations.map((r) => ({
      id: r.id,
      space: r.room?.name ?? "—",
      startTime: r.startTime,
      endTime: r.endTime,
      status: r.status,
    })),
    recentTickets,
  };
}

module.exports = { member };
