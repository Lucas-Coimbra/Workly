const prisma = require("../config/prisma");

async function listTickets(userId, role) {
  const where = role === "SUPPORT" ? {} : { userId };

  return prisma.supportTicket.findMany({
    where,
    orderBy: { updatedAt: "desc" },
    include: {
      messages: {
        orderBy: { createdAt: "asc" },
      },
    },
  });
}

async function getTicketById(ticketId, userId, role) {
  const ticket = await prisma.supportTicket.findUnique({
    where: { id: Number(ticketId) },
    include: {
      messages: {
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!ticket) throw new Error("Ticket não encontrado");

  if (role !== "SUPPORT" && ticket.userId !== userId) {
    throw new Error("Acesso negado");
  }

  return ticket;
}

async function createTicket(userId, data) {
  const ticket = await prisma.supportTicket.create({
    data: {
      title: data.title,
      description: data.description,
      category: data.category,
      priority: data.priority,
      userId,
      messages: {
        create: {
          message: data.description,
          authorId: userId,
          isSupport: false,
        },
      },
    },
    include: {
      messages: true,
    },
  });

  return ticket;
}

async function addMessage(ticketId, userId, role, message) {
  const ticket = await prisma.supportTicket.findUnique({
    where: { id: Number(ticketId) },
  });

  if (!ticket) throw new Error("Ticket não encontrado");

  if (role !== "SUPPORT" && ticket.userId !== userId) {
    throw new Error("Acesso negado");
  }

  const newMessage = await prisma.supportMessage.create({
    data: {
      message,
      ticketId: ticket.id,
      authorId: userId,
      isSupport: role === "SUPPORT",
    },
  });

  // 🔄 Atualiza status automaticamente
  if (role === "SUPPORT" && ticket.status === "open") {
    await prisma.supportTicket.update({
      where: { id: ticket.id },
      data: { status: "progress" },
    });
  }

  // 🔔 NOTIFICAÇÃO AUTOMÁTICA
  if (role === "SUPPORT") {
    await prisma.notification.create({
      data: {
        title: "Resposta do Suporte",
        message: "O suporte respondeu seu chamado.",
        type: "SUPPORT",
        userId: ticket.userId,
      },
    });
  }

  return newMessage;
}

async function updateStatus(ticketId, role, status) {
  if (role !== "SUPPORT") {
    throw new Error("Apenas suporte pode alterar status");
  }

  const data = { status };

  if (status === "resolved") {
    data.resolvedAt = new Date();
  }

  return prisma.supportTicket.update({
    where: { id: Number(ticketId) },
    data,
  });
}

async function getAverageResolutionTime() {
  const tickets = await prisma.supportTicket.findMany({
    where: {
      status: "resolved",
      resolvedAt: { not: null },
    },
    select: {
      createdAt: true,
      resolvedAt: true,
    },
  });

  if (tickets.length === 0) return null;

  const avgMs =
    tickets.reduce((acc, t) => {
      return acc + (t.resolvedAt - t.createdAt);
    }, 0) / tickets.length;

  return Math.round(avgMs / 60000); // minutos
}

module.exports = {
  listTickets,
  getTicketById,
  createTicket,
  addMessage,
  updateStatus,
  getAverageResolutionTime,
};
