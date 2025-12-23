import { useState, useEffect, useCallback } from "react";
import { AuthContext } from "./AuthContext";
import { loginRequest, logoutRequest } from "../services/auth.service";
import { getMe } from "../services/me.service";
import { api } from "../services/api";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
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
        console.warn("Token inválido ou usuário não existe, limpando sessão");

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

    localStorage.setItem("authToken", data.token);
    api.defaults.headers.common.Authorization = `Bearer ${data.token}`;

    setToken(data.token);

    const me = await getMe();
    setUser(me);

    return data;
  }, []);

  // 🚪 logout
  const logout = useCallback(async () => {
    await logoutRequest();
    setUser(null);
    setToken(null);
    localStorage.clear();
    delete api.defaults.headers.common.Authorization;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
