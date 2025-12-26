const express = require("express");
const router = express.Router();

const planController = require("../controllers/plan.Controller");

// público
router.get("/", planController.listPlans);
router.get("/:name", planController.getPlan);

module.exports = router;
