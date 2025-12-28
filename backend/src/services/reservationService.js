const prisma = require("../config/prisma");

class ReservationService {
  async create(data) {
    const {
      userId,
      workspaceId,
      date,
      startTime,
      endTime,
      endDate,
      paymentType,
      total,
    } = data;

    // 1. Verifica se workspace existe
    const workspace = await prisma.workspace.findUnique({
      where: { id: workspaceId },
    });
    if (!workspace) throw new Error("Workspace não encontrado");

    // 2. Checa disponibilidade
    const conflicts = await prisma.reservation.findMany({
      where: {
        workspaceId,
        status: "CONFIRMED",
        OR: [
          {
            date: {
              lte: endDate || date,
            },
            endDate: {
              gte: date,
            },
          },
          {
            AND: [
              { date: date },
              { startTime: { lte: endTime } },
              { endTime: { gte: startTime } },
            ],
          },
        ],
      },
    });

    if (conflicts.length > 0) {
      throw new Error("Workspace indisponível no período escolhido");
    }

    // 3. Cria a reserva
    const reservation = await prisma.reservation.create({
      data: {
        userId,
        workspaceId,
        date,
        startTime: startTime || null,
        endTime: endTime || null,
        endDate: endDate || null,
        paymentType,
        total,
        status: "PENDING",
        paid: false,
      },
    });

    return reservation;
  }

  async listByUser(userId) {
    return prisma.reservation.findMany({
      where: { userId },
      include: { workspace: true },
      orderBy: { date: "desc" },
    });
  }

  async listByWorkspace(workspaceId) {
    return prisma.reservation.findMany({
      where: { workspaceId },
      include: { user: true },
      orderBy: { date: "desc" },
    });
  }

  async markPaid(reservationId) {
    return prisma.reservation.update({
      where: { id: reservationId },
      data: {
        paid: true,
        status: "CONFIRMED",
      },
    });
  }

  async cancel(reservationId, userId, role) {
    const reservation = await prisma.reservation.findUnique({
      where: { id: reservationId },
    });

    if (!reservation) {
      throw new Error("Reserva não encontrada");
    }

    if (reservation.status === "CANCELED") {
      throw new Error("Reserva já cancelada");
    }

    // MEMBER só pode cancelar a própria reserva
    if (role === "MEMBER" && reservation.userId !== userId) {
      throw new Error("Você não pode cancelar esta reserva");
    }

    return prisma.reservation.update({
      where: { id: reservationId },
      data: {
        status: "CANCELED",
      },
    });
  }
}

module.exports = new ReservationService();
