const service = require("../services/workspaceService");

class WorkspaceController {
  async list(req, res) {
    try {
      const workspaces = await service.list();
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
}

module.exports = new WorkspaceController();
