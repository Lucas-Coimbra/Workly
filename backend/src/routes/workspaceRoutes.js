const router = require("express").Router();
const { verifyToken, requireRole } = require("../middlewares/authMiddleware");
const workspaceController = require("../controllers/workspaceController");

router.post("/", verifyToken, workspaceController.createWorkspace);
router.get("/", verifyToken, workspaceController.listWorkspaces);

module.exports = router;
