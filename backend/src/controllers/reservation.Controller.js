const reservationService = require("../services/reservationService");

class ReservationController {
  async create(req, res) {
    try {
      const reservation = await reservationService.create({
        ...req.body,
        userId: req.userId,
      });
      return res.status(201).json(reservation);
    } catch (err) {
      console.error(err);
      return res.status(400).json({ message: err.message });
    }
  }

  async listByUser(req, res) {
    try {
      const reservations = await reservationService.listByUser(req.userId);
      return res.json(reservations);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Erro ao listar reservas" });
    }
  }

  async listByWorkspace(req, res) {
    try {
      const workspaceId = Number(req.params.workspaceId);
      const reservations =
        await reservationService.listByWorkspace(workspaceId);
      return res.json(reservations);
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Erro ao listar reservas do workspace" });
    }
  }

  async markPaid(req, res) {
    try {
      const reservationId = Number(req.params.id);
      const reservation = await reservationService.markPaid(reservationId);
      return res.json(reservation);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Erro ao marcar pagamento" });
    }
  }

  async cancel(req, res) {
    try {
      const reservationId = Number(req.params.id);

      const reservation = await reservationService.cancel(
        reservationId,
        req.userId,
        req.userRole
      );

      return res.json(reservation);
    } catch (err) {
      console.error(err);
      return res.status(400).json({ message: err.message });
    }
  }
}

module.exports = new ReservationController();
