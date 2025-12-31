const service = require("../services/workspaceService");
const prisma = require("../config/prisma");

class WorkspaceController {
  // USADO NA TELA DE RESERVAS
  async list(req, res) {
    try {
      const workspaces = await service.listForReservations();

      return res.json(workspaces);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Erro ao listar espaços" });
    }
  }

  async getById(req, res) {
    try {
      const id = Number(req.params.id);
      const workspace = await service.getById(id);

      if (!workspace) {
        return res.status(404).json({ message: "Espaço não encontrado" });
      }

      return res.json(workspace);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Erro ao buscar espaço" });
    }
  }

  async reservationModes(req, res) {
    const id = Number(req.params.id);

    const workspace = await prisma.workspace.findUnique({
      where: { id },
      select: {
        pricePerHour: true,
        pricePerDay: true,
        pricePerMonth: true,
      },
    });

    if (!workspace) {
      return res.status(404).json({ message: "Workspace não encontrado" });
    }

    const availableModes = [];

    if (workspace.pricePerHour) availableModes.push("HOURLY");
    if (workspace.pricePerDay) availableModes.push("DAILY");
    if (workspace.pricePerMonth) availableModes.push("MONTHLY");

    return res.json({
      workspaceId: id,
      availableModes,
      prices: {
        hourly: workspace.pricePerHour,
        daily: workspace.pricePerDay,
        monthly: workspace.pricePerMonth,
      },
    });
  }
}

module.exports = new WorkspaceController();
