const prisma = require("../config/prisma");
const { createNotification } = require("./notificationService");

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

  const reservation = await prisma.reservation.create({
    data: {
      userId,
      roomId,
      date: new Date(date),
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      paid: false,
    },
  });

  await createNotification({
    userId,
    title: "Reserva confirmada",
    message: "Sua reserva foi criada com sucesso.",
    type: "SUCCESS",
  });

  return reservation;
}

async function getReservation(id) {
  return prisma.reservation.findUnique({ where: { id } });
}

async function listReservationsForUser(userId) {
  return prisma.reservation.findMany({ where: { userId } });
}

async function cancelReservation(id) {
  const reservation = await prisma.reservation.delete({
    where: { id },
  });

  await createNotification({
    userId: reservation.userId,
    title: "Reserva cancelada",
    message: "Sua reserva foi cancelada.",
    type: "WARNING",
  });

  return reservation;
}

module.exports = {
  createReservation,
  getReservation,
  listReservationsForUser,
  cancelReservation,
};
