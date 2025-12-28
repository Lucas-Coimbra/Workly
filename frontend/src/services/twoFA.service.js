import { api } from "./api";

// Ativar 2FA (envia código por e-mail)
export async function enable2FA() {
  const res = await api.post("/2fa/enable"); // token já é enviado pelo interceptor
  return res.data;
}

// Verificar código 2FA
export async function verify2FA(code) {
  const res = await api.post("/2fa/verify", { code });
  return res.data;
}

// Desativar 2FA
export async function requestDisable2FA() {
  const res = await api.post("/2fa/disable/request");
  return res.data;
}

export async function disable2FAWithCode(code) {
  const res = await api.post("/2fa/disable/confirm", { code });
  return res.data;
}
