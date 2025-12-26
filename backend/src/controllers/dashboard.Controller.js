const dashboardService = require("../services/dashboardService");

async function memberDashboard(req, res, next) {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const data = await dashboardService.member(req.userId);
    res.json(data);
  } catch (err) {
    next(err);
  }
}

module.exports = { memberDashboard };
