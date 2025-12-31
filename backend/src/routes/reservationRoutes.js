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

// para usuário normal
router.patch("/:id/pay-user", verifyToken, reservationController.userMarkPaid);

// Cancelar reserva (MEMBER ou ADMIN)
router.patch(
  "/:id/cancel",
  verifyToken,
  requireRole(["MEMBER", "ADMIN"]),
  reservationController.cancel
);

router.get(
  "/:id",
  verifyToken,
  requireRole(["MEMBER", "ADMIN"]),
  reservationController.getById
);

// Público (sem login)
router.get("/availability", reservationController.availability);

module.exports = router;
