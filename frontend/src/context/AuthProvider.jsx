import { useState, useEffect, useCallback } from "react";
import { AuthContext } from "./AuthContext";
import { loginRequest, logoutRequest } from "../services/auth.service";
import { api } from "../services/api";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    const savedUser = localStorage.getItem("authUser");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      api.defaults.headers.common.Authorization = `Bearer ${savedToken}`;
    }

    setLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    const data = await loginRequest(email, password);

    setUser(data.user);
    setToken(data.token);

    localStorage.setItem("authUser", JSON.stringify(data.user));
    localStorage.setItem("authToken", data.token);

    api.defaults.headers.common.Authorization = `Bearer ${data.token}`;

    return data;
  }, []);

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
