const planService = require("../services/planService");

async function listPlans(req, res) {
  try {
    const plans = await planService.getAllPlans();
    return res.json(plans);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro ao buscar planos" });
  }
}

async function getPlan(req, res) {
  try {
    const { name } = req.params;

    // não precisa forçar uppercase
    const plan = await planService.getPlanByName(name);

    if (!plan) {
      return res.status(404).json({ message: "Plano não encontrado" });
    }

    return res.json(plan);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro ao buscar plano" });
  }
}

module.exports = {
  listPlans,
  getPlan,
};
