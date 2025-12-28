const router = require("express").Router();
const { verifyToken } = require("../middlewares/authMiddleware");
const twoFAController = require("../controllers/twoFA.Controller");

router.post("/2fa/enable", verifyToken, twoFAController.enable2FA);
router.post("/2fa/verify", verifyToken, twoFAController.verify2FA);
router.post("/2fa/login", twoFAController.loginWith2FA);
router.post(
  "/2fa/disable/request",
  verifyToken,
  twoFAController.requestDisable2FA
);
router.post(
  "/2fa/disable/confirm",
  verifyToken,
  twoFAController.disable2FAWithCode
);

module.exports = router;
