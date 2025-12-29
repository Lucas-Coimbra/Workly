const router = require("express").Router();
const { verifyToken } = require("../middlewares/authMiddleware");
const validateSchema = require("../middlewares/validateSchema");
const meController = require("../controllers/me.Controller");

const {
  updateNotificationsSchema,
  updatePreferencesSchema,
  updateSecuritySchema,
  deleteAccountSchema,
} = require("../validations/meSettingsSchema");

router.get("/", verifyToken, meController.me);

// SETTINGS
router.put(
  "/settings/notifications",
  verifyToken,
  validateSchema(updateNotificationsSchema),
  meController.updateNotifications
);

router.put(
  "/settings/preferences",
  verifyToken,
  validateSchema(updatePreferencesSchema),
  meController.updatePreferences
);

router.patch(
  "/settings/security",
  verifyToken,
  validateSchema(updateSecuritySchema),
  meController.updateSecurity
);

router.post(
  "/delete",
  verifyToken,
  validateSchema(deleteAccountSchema),
  meController.deleteAccount
);

module.exports = router;
