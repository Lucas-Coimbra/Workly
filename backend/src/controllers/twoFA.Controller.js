const twoFAService = require("../services/twoFAService");

async function enable2FA(req, res, next) {
  try {
    const result = await twoFAService.enable2FA(req.userId);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function verify2FA(req, res, next) {
  try {
    const { code } = req.body;
    if (!code) {
      const error = new Error("Código 2FA é obrigatório");
      error.status = 400;
      throw error;
    }

    const result = await twoFAService.verify2FACode(req.userId, code);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function loginWith2FA(req, res, next) {
  try {
    const { tempToken, code } = req.body;

    if (!tempToken || !code) {
      const error = new Error("tempToken e código 2FA são obrigatórios");
      error.status = 400;
      throw error;
    }

    const result = await twoFAService.verify2FACodeForLogin(tempToken, code);

    res.json({
      token: result.token,
      user: {
        role: result.role,
      },
    });
  } catch (err) {
    next(err);
  }
}

async function disable2FAWithCode(req, res, next) {
  try {
    const { code } = req.body;
    if (!code) {
      const error = new Error("Código 2FA é obrigatório");
      error.status = 400;
      throw error;
    }

    const result = await twoFAService.disable2FAWithCode(req.userId, code);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function requestDisable2FA(req, res, next) {
  try {
    const result = await twoFAService.requestDisable2FACode(req.userId);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  enable2FA,
  verify2FA,
  disable2FAWithCode,
  loginWith2FA,
  requestDisable2FA,
};
