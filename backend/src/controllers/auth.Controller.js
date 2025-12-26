const { registerSchema, loginSchema } = require("../validations/authSchema");
const authService = require("../services/authService");

exports.register = async (req, res, next) => {
  try {
    const data = registerSchema.parse(req.body);
    const out = await authService.register(data);
    res.status(201).json(out);
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    console.log("LOGIN BODY:", req.body);

    const data = loginSchema.parse(req.body);
    const out = await authService.login(data);

    res.json(out);
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    next(err);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    await authService.forgotPassword(email);

    res.json({
      message: "Se o email existir, enviaremos um link de recuperação.",
    });
  } catch (err) {
    next(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    await authService.resetPassword(token, password);

    res.json({
      message: "Senha redefinida com sucesso.",
    });
  } catch (err) {
    next(err);
  }
};
