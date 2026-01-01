const router = require("express").Router();
const authController = require("../controllers/auth.Controller");
const {
  forgotPasswordLimiter,
  loginLimiter,
} = require("../middlewares/rateLimit");
const recaptchaMiddleware = require("../middlewares/verifyRecaptcha");

router.post("/login", recaptchaMiddleware, authController.login);

router.post("/register", recaptchaMiddleware, authController.register);

router.post(
  "/forgot-password",
  forgotPasswordLimiter,
  authController.forgotPassword
);
router.post("/reset-password", authController.resetPassword);

module.exports = router;
