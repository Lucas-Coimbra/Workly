const router = require("express").Router();
const controller = require("../controllers/workspace.Controller");

// Público: listar e ver detalhes de espaços
router.get("/", controller.list);
router.get("/:id", controller.getById);

module.exports = router;
