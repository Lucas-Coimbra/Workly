const { registerSchema, loginSchema } = require("../validations/authSchema");
const authService = require("../services/authService");

exports.register = async (req, res, next) => {
  try {
    const data = registerSchema.parse(req.body);
    const user = await authService.register(data);
    res
      .status(201)
      .json({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const data = loginSchema.parse(req.body);
    const out = await authService.login(data);
    res.json(out);
  } catch (err) {
    next(err);
  }
};
