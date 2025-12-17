const router = require("express").Router();
const { verifyToken } = require("../middlewares/authMiddleware");
const notificationController = require("../controllers/notificationController");

router.use(verifyToken);

router.get("/", notificationController.list);
router.patch("/:id/read", notificationController.markAsRead);
router.patch("/read-all", notificationController.markAllAsRead);

module.exports = router;
