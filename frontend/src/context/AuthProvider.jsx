import { useState, useEffect, useCallback } from "react";
import { AuthContext } from "./AuthContext";
import {
  loginRequest,
  logoutRequest,
  verify2FARequest,
} from "../services/auth.service";
import { getMe } from "../services/me.service";
import { api } from "../services/api";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [tempToken, setTempToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 bootstrap
  useEffect(() => {
    async function init() {
      const savedToken = localStorage.getItem("authToken");
      if (!savedToken) {
        setLoading(false);
        return;
      }

      try {
        api.defaults.headers.common.Authorization = `Bearer ${savedToken}`;
        setToken(savedToken);

        const me = await getMe();
        setUser(me);
      } catch {
        localStorage.removeItem("authToken");
        setUser(null);
        setToken(null);
        delete api.defaults.headers.common.Authorization;
      } finally {
        setLoading(false);
      }
    }

    init();
  }, []);

  // 🔐 login
  const login = useCallback(async (email, password) => {
    const data = await loginRequest(email, password);

    // 🛑 Login com 2FA → não autentica ainda
    if (data.twoFAEnabled) {
      setTempToken(data.tempToken);
      return { requires2FA: true };
    }

    // ✅ Login normal
    localStorage.setItem("authToken", data.token);
    api.defaults.headers.common.Authorization = `Bearer ${data.token}`;
    setToken(data.token);

    const me = await getMe();
    setUser(me);

    return { requires2FA: false, user: me };
  }, []);

  // 🔑 confirmar 2FA
  const verify2FA = useCallback(
    async (code) => {
      if (!tempToken) {
        throw new Error("Token temporário inexistente");
      }

      const data = await verify2FARequest(tempToken, code);

      localStorage.setItem("authToken", data.token);
      api.defaults.headers.common.Authorization = `Bearer ${data.token}`;
      setToken(data.token);
      setTempToken(null);

      const me = await getMe();
      setUser(me);

      return me;
    },
    [tempToken]
  );

  // 🚪 logout
  const logout = useCallback(async () => {
    await logoutRequest();
    setUser(null);
    setToken(null);
    setTempToken(null);
    localStorage.clear();
    delete api.defaults.headers.common.Authorization;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        tempToken,
        isAuthenticated: !!user && !!token,
        login,
        verify2FA,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
