const router = require("express").Router();
const authController = require("../controllers/auth.Controller");
const {
  forgotPasswordLimiter,
  loginLimiter,
} = require("../middlewares/rateLimit");

router.post("/register", authController.register);
router.post("/login", loginLimiter, authController.login);

router.post(
  "/forgot-password",
  forgotPasswordLimiter,
  authController.forgotPassword
);
router.post("/reset-password", authController.resetPassword);

module.exports = router;
