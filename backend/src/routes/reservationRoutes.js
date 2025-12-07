const router = require("express").Router();
const { verifyToken, requireRole } = require("../middlewares/authMiddleware");
const reservationController = require("../controllers/reservationController");

router.post("/", verifyToken, reservationController.create);
router.get("/mine", verifyToken, reservationController.listMine);
router.get("/:id", verifyToken, reservationController.get);
router.delete("/:id", verifyToken, reservationController.cancel);

module.exports = router;
