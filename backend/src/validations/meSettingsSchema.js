const { z } = require("zod");

/**
 * ========================
 * Notifications
 * ========================
 */
exports.updateNotificationsSchema = z.object({
  emailNotifications: z.boolean().optional(),
  smsNotifications: z.boolean().optional(),
  reservationReminders: z.boolean().optional(),
  promotionalEmails: z.boolean().optional(),
  weeklyReport: z.boolean().optional(),
});

/**
 * ========================
 * Preferences
 * ========================
 */
exports.updatePreferencesSchema = z.object({
  language: z.string().min(2),
  timezone: z.string().min(3),
  currency: z.string().min(3).max(3),
});

/**
 * ========================
 * Security
 * ========================
 */
exports.updateSecuritySchema = z
  .object({
    currentPassword: z.string().min(1).optional(),
    newPassword: z.string().min(8).optional(),
    twoFactorAuth: z.boolean().optional(),
  })
  .refine(
    (data) => {
      // se newPassword existir, currentPassword é obrigatório
      if (data.newPassword && !data.currentPassword) {
        return false;
      }
      return true;
    },
    {
      message: "Current password is required to change password",
      path: ["currentPassword"],
    }
  );

/**
 * ========================
 * Delete Account
 * ========================
 */
exports.deleteAccountSchema = z.object({
  password: z.string().min(1, "Senha é obrigatória"),
});
