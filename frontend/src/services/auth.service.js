import { api } from "./api";

export async function registerRequest({
  name,
  email,
  phone,
  password,
  recaptchaToken,
}) {
  const res = await api.post("/auth/register", {
    name,
    email,
    phone,
    password,
    recaptchaToken,
  });
  return res.data;
}

export async function loginRequest(email, password, recaptchaToken) {
  const res = await api.post("/auth/login", {
    email,
    password,
    recaptchaToken,
  });
  return res.data;
}

// 🔑 Nova função para validar 2FA
export async function verify2FARequest(tempToken, code) {
  const res = await api.post("/2fa/login", { tempToken, code });
  return res.data;
}

export async function logoutRequest() {
  return true;
}

export async function forgotPasswordRequest(email) {
  const res = await api.post("/auth/forgot-password", { email });
  return res.data;
}

export async function resetPasswordRequest(token, password) {
  const res = await api.post("/auth/reset-password", { token, password });
  return res.data;
}
