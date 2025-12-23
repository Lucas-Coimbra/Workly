const router = require("express").Router();
const { verifyToken } = require("../middlewares/authMiddleware");
const dashboardController = require("../controllers/dashboardController");

router.use(verifyToken);

router.get("/member", dashboardController.memberDashboard);

module.exports = router;
