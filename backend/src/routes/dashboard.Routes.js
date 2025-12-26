const router = require("express").Router();
const { verifyToken } = require("../middlewares/authMiddleware");
const dashboardController = require("../controllers/dashboard.Controller");

router.use(verifyToken);

router.get("/member", dashboardController.memberDashboard);

module.exports = router;
