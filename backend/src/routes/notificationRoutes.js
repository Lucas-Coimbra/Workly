const router = require("express").Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const notificationController = require("../controllers/notificationController");

router.use(authMiddleware);

router.get("/", notificationController.list);
router.patch("/:id/read", notificationController.markAsRead);
router.patch("/read-all", notificationController.markAllAsRead);

module.exports = router;
