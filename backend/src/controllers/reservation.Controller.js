const reservationService = require("../services/reservationService");

class ReservationController {
  async create(req, res) {
    try {
      const { workspaceId, mode, total } = req.body;

      if (!workspaceId || !mode || !total) {
        return res.status(400).json({
          message: "Dados obrigatórios não informados",
        });
      }

      const reservation = await reservationService.create({
        ...req.body,
        userId: req.userId,
      });

      return res.status(201).json(reservation);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  async listByUser(req, res) {
    try {
      const reservations = await reservationService.listByUser(req.userId);
      return res.json(reservations);
    } catch {
      return res.status(500).json({ message: "Erro ao listar reservas" });
    }
  }

  async listByWorkspace(req, res) {
    try {
      const workspaceId = Number(req.params.workspaceId);
      const reservations =
        await reservationService.listByWorkspace(workspaceId);
      return res.json(reservations);
    } catch {
      return res
        .status(500)
        .json({ message: "Erro ao listar reservas do workspace" });
    }
  }

  async markPaid(req, res) {
    try {
      if (req.userRole !== "ADMIN") {
        return res.status(403).json({ message: "Acesso negado" });
      }

      const reservationId = Number(req.params.id);
      const reservation = await reservationService.markPaid(reservationId);
      return res.json(reservation);
    } catch {
      return res.status(500).json({ message: "Erro ao marcar pagamento" });
    }
  }

  async userMarkPaid(req, res) {
    try {
      const reservationId = Number(req.params.id);

      // opcional: verificar se a reserva pertence ao user
      if (req.userId) {
        const reservation = await reservationService.markPaid(reservationId);
        return res.json(reservation);
      } else {
        return res.status(403).json({ message: "Acesso negado" });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Erro ao marcar pagamento" });
    }
  }

  async cancel(req, res) {
    try {
      const { id } = req.params;

      const reservation = await reservationService.cancel(
        id,
        req.userId,
        req.userRole // ✅ GARANTIDO
      );

      return res.json(reservation);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  async availability(req, res) {
    try {
      const { workspaceId, date, mode } = req.query;

      if (!workspaceId || !date || !mode) {
        return res.status(400).json({
          message: "workspaceId, date e mode são obrigatórios",
        });
      }

      const data = await reservationService.availability({
        workspaceId: Number(workspaceId),
        date,
        mode,
      });

      return res.json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: "Erro ao buscar disponibilidade",
      });
    }
  }

  async getById(req, res, next) {
    try {
      const reservation = await reservationService.getById(
        req.params.id,
        req.userId,
        req.userRole
      );
      res.json(reservation);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ReservationController();
