const router = require("express").Router();
const controller = require("../controllers/spaceRequest.controller");
const { verifyToken, requireRole } = require("../middlewares/authMiddleware");
const multer = require("multer");

// Define pasta de uploads temporária
const upload = multer({ dest: "uploads/" });

// ============================
// Público (sem login)
// ============================
router.post("/space-requests", upload.array("images"), controller.create);

// ============================
// ADMIN
// ============================
router.use(verifyToken);
router.use(requireRole(["ADMIN"]));

router.get("/space-requests", controller.list);
router.get("/space-requests/:id", controller.getById);
router.patch("/space-requests/:id/approve", controller.approve);
router.patch("/space-requests/:id/reject", controller.reject);

module.exports = router;
