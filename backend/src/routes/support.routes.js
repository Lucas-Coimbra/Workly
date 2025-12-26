const router = require("express").Router();
const { verifyToken } = require("../middlewares/authMiddleware");
const supportController = require("../controllers/support.Controller");

router.use(verifyToken);

// MEMBER ou SUPPORT
router.get("/tickets", supportController.listTickets);
router.get("/tickets/:id", supportController.getTicketById);
router.post("/tickets", supportController.createTicket);
router.post("/tickets/:id/messages", supportController.addMessage);
router.get("/metrics", supportController.getMetrics);

// apenas SUPPORT
router.patch("/tickets/:id/status", supportController.updateStatus);

module.exports = router;
