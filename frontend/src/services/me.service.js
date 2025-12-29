import { api } from "./api";

/**
 * =========================
 * GET
 * =========================
 */
export const getMe = async () => {
  try {
    const { data } = await api.get("/me");
    return data;
  } catch (err) {
    if (err.response?.status === 401) {
      return null; // usuário não autenticado
    }
    throw err;
  }
};

/**
 * =========================
 * SETTINGS – Notifications
 * =========================
 */
export async function updateNotificationSettings(payload) {
  const res = await api.put("/me/settings/notifications", payload);
  return res.data;
}

/**
 * =========================
 * SETTINGS – Preferences
 * =========================
 */
export async function updatePreferencesSettings(payload) {
  const res = await api.put("/me/settings/preferences", payload);
  return res.data;
}

/**
 * =========================
 * SETTINGS – Security
 * =========================
 */
export async function updateSecuritySettings(payload) {
  const res = await api.patch("/me/settings/security", payload);
  return res.data;
}

/**
 * =========================
 * Danger Zone
 * =========================
 */
export async function deleteMe(password) {
  const res = await api.post("/me/delete", { password });
  return res.data;
}

export async function sendTwoFACode() {
  return api.post("/me/2fa/send");
}

export async function verifyTwoFACode(code) {
  return api.post("/me/2fa/verify", { code });
}
