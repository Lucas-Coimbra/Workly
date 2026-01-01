const { verifyRecaptcha } = require("../services/recaptchaService");

async function recaptchaMiddleware(req, res, next) {
  try {
    const { recaptchaToken } = req.body;
    await verifyRecaptcha(recaptchaToken);
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = recaptchaMiddleware;
