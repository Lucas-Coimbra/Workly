const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservation.Controller");
const { verifyToken, requireRole } = require("../middlewares/authMiddleware");

// Criação de reserva (MEMBER)
router.post(
  "/",
  verifyToken,
  requireRole(["MEMBER"]),
  reservationController.create
);

// Lista reservas do usuário (MEMBER)
router.get(
  "/me",
  verifyToken,
  requireRole(["MEMBER"]),
  reservationController.listByUser
);

// Lista reservas do workspace (ADMIN)
router.get(
  "/workspace/:workspaceId",
  verifyToken,
  requireRole(["ADMIN"]),
  reservationController.listByWorkspace
);

// Marca pagamento (ADMIN)
router.patch(
  "/:id/pay",
  verifyToken,
  requireRole(["ADMIN"]),
  reservationController.markPaid
);

// Cancelar reserva (MEMBER ou ADMIN)
router.patch(
  "/:id/cancel",
  verifyToken,
  requireRole(["MEMBER", "ADMIN"]),
  reservationController.cancel
);

module.exports = router;
