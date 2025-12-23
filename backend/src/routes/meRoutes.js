const router = require("express").Router();
const { verifyToken } = require("../middlewares/authMiddleware");
const meController = require("../controllers/meController");

router.get("/", verifyToken, meController.me);

module.exports = router;
