import { api } from "./api";

export async function registerRequest({ name, email, phone, password }) {
  const res = await api.post("/auth/register", {
    name,
    email,
    phone,
    password,
  });
  return res.data;
}

export async function loginRequest(email, password) {
  const res = await api.post("/auth/login", {
    email,
    password,
  });
  return res.data;
}

export async function logoutRequest() {
  return true;
}

export async function forgotPasswordRequest(email) {
  const res = await api.post("/auth/forgot-password", {
    email,
  });
  return res.data;
}

export async function resetPasswordRequest(token, password) {
  const res = await api.post("/auth/reset-password", {
    token,
    password,
  });
  return res.data;
}
