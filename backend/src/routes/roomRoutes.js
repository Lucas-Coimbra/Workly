const router = require("express").Router();
const { verifyToken, requireRole } = require("../middlewares/authMiddleware");
const roomController = require("../controllers/roomController");

router.get("/", verifyToken, roomController.listRooms);
router.post(
  "/",
  verifyToken,
  requireRole(["ADMIN"]),
  roomController.createRoom
);

module.exports = router;
