const dashboardService = require("../services/dashboardService");

async function memberDashboard(req, res, next) {
  try {
    const data = await dashboardService.member(req.userId);
    res.json(data);
  } catch (err) {
    next(err);
  }
}

module.exports = { memberDashboard };
