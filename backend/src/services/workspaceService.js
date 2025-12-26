const prisma = require("../config/prisma");

class WorkspaceService {
  async list() {
    return prisma.workspace.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  async getById(id) {
    return prisma.workspace.findUnique({
      where: { id },
      include: {
        // incluir detalhes úteis para reserva
        rooms: true,
      },
    });
  }
}

module.exports = new WorkspaceService();
