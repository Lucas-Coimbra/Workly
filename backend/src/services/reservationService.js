const prisma = require("../config/prisma");

async function createReservation({ userId, roomId, date, startTime, endTime }) {
  // Check double booking: same room overlapping
  const overlapping = await prisma.reservation.findFirst({
    where: {
      roomId,
      OR: [
        {
          AND: [
            { startTime: { lte: new Date(endTime) } },
            { endTime: { gte: new Date(startTime) } },
          ],
        },
      ],
    },
  });
  if (overlapping) throw { status: 409, message: "Time slot already booked" };

  return prisma.reservation.create({
    data: {
      userId,
      roomId,
      date: new Date(date),
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      paid: false,
    },
  });
}

async function getReservation(id) {
  return prisma.reservation.findUnique({ where: { id } });
}

async function listReservationsForUser(userId) {
  return prisma.reservation.findMany({ where: { userId } });
}

async function cancelReservation(id) {
  return prisma.reservation.delete({ where: { id } });
}

module.exports = {
  createReservation,
  getReservation,
  listReservationsForUser,
  cancelReservation,
};
