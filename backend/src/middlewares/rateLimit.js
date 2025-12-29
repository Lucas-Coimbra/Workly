const rateLimit = require("express-rate-limit");

// Limite para recuperação de senha
const forgotPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // no máximo 5 tentativas por IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message:
      "Muitas tentativas de recuperação de senha. Tente novamente em alguns minutos.",
  },
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    message: "Muitas tentativas de login. Aguarde alguns minutos.",
  },
});

module.exports = {
  forgotPasswordLimiter,
  loginLimiter,
};
