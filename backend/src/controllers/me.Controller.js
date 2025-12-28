const meService = require("../services/meService");

async function me(req, res, next) {
  try {
    const user = await meService.getMe(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
}

async function updateNotifications(req, res, next) {
  try {
    await meService.updateNotifications(req.userId, req.body);
    res.json({ message: "Notificações atualizadas com sucesso" });
  } catch (err) {
    next(err);
  }
}

async function updatePreferences(req, res, next) {
  try {
    await meService.updatePreferences(req.userId, req.body);
    res.json({ message: "Preferências atualizadas com sucesso" });
  } catch (err) {
    next(err);
  }
}

async function updateSecurity(req, res, next) {
  try {
    await meService.updateSecurity(req.userId, req.body);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

async function deleteAccount(req, res, next) {
  try {
    const { password } = req.body;

    if (!password) {
      const err = new Error("Senha é obrigatória para excluir a conta");
      err.status = 400;
      throw err;
    }

    await meService.deleteAccount(req.userId, password);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  me,
  updateNotifications,
  updatePreferences,
  updateSecurity,
  deleteAccount,
};
