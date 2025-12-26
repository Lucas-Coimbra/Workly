const router = require("express").Router();
const { verifyToken } = require("../middlewares/authMiddleware");
const notificationController = require("../controllers/notification.Controller");

router.use(verifyToken);

router.use(verifyToken);

router.get("/unread-count", notificationController.unreadCount);
router.get("/", notificationController.list);
router.patch("/read-all", notificationController.markAllAsRead);
router.patch("/:id/read", notificationController.markAsRead);
router.delete("/:id", notificationController.remove);

module.exports = router;
