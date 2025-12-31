const prisma = require("../config/prisma");

class WorkspaceService {
  // usado para ADMIN ou listagens internas
  async list() {
    return prisma.workspace.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  // usado pela tela de reservas
  async listForReservations() {
    return prisma.workspace.findMany({
      where: {
        // opcional: só espaços ativos, se existir status no futuro
      },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        description: true,
        spaceType: true,

        capacity: true,
        totalRooms: true,

        pricePerHour: true,
        pricePerDay: true,
        pricePerMonth: true,
        minimumBooking: true,

        amenities: true,
        images: true,

        street: true,
        number: true,
        neighborhood: true,
        city: true,
        state: true,
        zipCode: true,
      },
    });
  }

  async getById(id) {
    return prisma.workspace.findUnique({
      where: { id },
      include: {
        rooms: true,
      },
    });
  }
}

module.exports = new WorkspaceService();
