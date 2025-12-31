const prisma = require("../config/prisma");

class ReservationService {
  async create(data) {
    let {
      userId,
      workspaceId,
      date,
      startTime,
      endTime,
      endDate,
      mode,
      total,
    } = data;

    // =========================
    // Workspace
    // =========================
    const workspace = await prisma.workspace.findUnique({
      where: { id: workspaceId },
    });

    if (!workspace) {
      throw new Error("Workspace não encontrado");
    }

    // =========================
    // Validação de preço
    // =========================
    if (mode === "HOURLY" && !workspace.pricePerHour) {
      throw new Error("Este espaço não aceita reservas por hora");
    }

    if (mode === "DAILY" && !workspace.pricePerDay) {
      throw new Error("Este espaço não aceita reservas diárias");
    }

    if (mode === "MONTHLY" && !workspace.pricePerMonth) {
      throw new Error("Este espaço não aceita reservas mensais");
    }

    // =========================
    // Data base (sempre local)
    // =========================
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);

    let finalEndDate = null;

    // =========================
    // HOURLY
    // =========================
    if (mode === "HOURLY") {
      if (!startTime || !endTime) {
        throw new Error("startTime e endTime são obrigatórios");
      }

      const [startHour, startMinute] = startTime.split(":").map(Number);
      const [endHour, endMinute] = endTime.split(":").map(Number);

      const normalizedStartTime = new Date(startDate);
      normalizedStartTime.setHours(startHour, startMinute, 0, 0);

      const normalizedEndTime = new Date(startDate);
      normalizedEndTime.setHours(endHour, endMinute, 0, 0);

      if (normalizedStartTime >= normalizedEndTime) {
        throw new Error("Horário inválido");
      }

      startTime = normalizedStartTime;
      endTime = normalizedEndTime;
      finalEndDate = null;
    }

    // =========================
    // DAILY
    // =========================
    if (mode === "DAILY") {
      startTime = null;
      endTime = null;
      finalEndDate = startDate;
    }

    // =========================
    // MONTHLY
    // =========================
    if (mode === "MONTHLY") {
      if (!endDate) {
        throw new Error("endDate é obrigatório para reservas mensais");
      }

      startTime = null;
      endTime = null;

      finalEndDate = new Date(endDate);
      finalEndDate.setHours(0, 0, 0, 0);

      if (finalEndDate < startDate) {
        throw new Error("endDate não pode ser anterior à data inicial");
      }
    }

    // =========================
    // Conflitos
    // =========================
    const conflicts = await prisma.reservation.findMany({
      where: {
        workspaceId,
        status: "CONFIRMED",
        OR: [
          // DAILY / MONTHLY
          {
            AND: [
              { date: { lte: finalEndDate || startDate } },
              {
                OR: [{ endDate: null }, { endDate: { gte: startDate } }],
              },
            ],
          },

          // HOURLY
          ...(mode === "HOURLY"
            ? [
                {
                  AND: [
                    { date: startDate },
                    { startTime: { lt: endTime } },
                    { endTime: { gt: startTime } },
                  ],
                },
              ]
            : []),
        ],
      },
    });

    if (conflicts.length > 0) {
      throw new Error("Workspace indisponível no período escolhido");
    }

    // =========================
    // Criação
    // =========================
    return prisma.reservation.create({
      data: {
        userId,
        workspaceId,
        date: startDate,
        startTime,
        endTime,
        endDate: finalEndDate,
        mode,
        total,
        status: "PENDING",
        paid: false,
      },
    });
  }

  async listByUser(userId) {
    return prisma.reservation.findMany({
      where: { userId },
      include: { workspace: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async listByWorkspace(workspaceId) {
    return prisma.reservation.findMany({
      where: { workspaceId },
      include: { user: true },
      orderBy: { createdAt: "desc" },
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
      where: { id: Number(reservationId) },
    });

    if (!reservation) {
      throw new Error("Reserva não encontrada");
    }

    if (reservation.status === "CANCELED") {
      throw new Error("Reserva já cancelada");
    }

    // MEMBER só pode cancelar a própria reserva
    if (role === "MEMBER" && Number(reservation.userId) !== Number(userId)) {
      throw new Error("Você não pode cancelar esta reserva");
    }

    // MEMBER não pode cancelar reservas CONFIRMED
    if (role === "MEMBER" && reservation.status === "CONFIRMED") {
      throw new Error(
        "Reservas confirmadas só podem ser canceladas pelo administrador"
      );
    }

    return prisma.reservation.update({
      where: { id: reservation.id },
      data: {
        status: "CANCELED",
        canceledAt: new Date(),
      },
    });
  }

  async availability({ workspaceId, date, mode }) {
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);

    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);

    if (mode === "HOURLY") {
      return prisma.reservation.findMany({
        where: {
          workspaceId,
          status: "CONFIRMED",
          date: {
            gte: dayStart,
            lte: dayEnd,
          },
        },
        select: {
          startTime: true,
          endTime: true,
        },
      });
    }

    // DAILY / MONTHLY
    return prisma.reservation.findMany({
      where: {
        workspaceId,
        status: "CONFIRMED",
        AND: [
          { date: { lte: new Date(date) } },
          {
            OR: [{ endDate: null }, { endDate: { gte: new Date(date) } }],
          },
        ],
      },
      select: {
        date: true,
        endDate: true,
      },
    });
  }

  async getById(reservationId, userId, role) {
    const reservation = await prisma.reservation.findUnique({
      where: { id: Number(reservationId) },
      include: { workspace: true },
    });

    if (!reservation) {
      throw new Error("Reserva não encontrada");
    }

    // MEMBER só vê a própria reserva
    if (role === "MEMBER" && reservation.userId !== userId) {
      throw new Error("Acesso negado");
    }

    return reservation;
  }
}

module.exports = new ReservationService();
