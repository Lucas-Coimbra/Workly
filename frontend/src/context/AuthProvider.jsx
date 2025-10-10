import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { mockLogin, mockLogout } from "../mocks/auth";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Recupera dados do localStorage ao iniciar
  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    const savedUser = localStorage.getItem("authUser");
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  /**
   * Login usando mock
   * @param {string} email
   * @param {string} password
   */
  const login = async (email, password) => {
    try {
      const userData = await mockLogin(email, password);
      setUser(userData);
      setToken(userData.token);
      localStorage.setItem("authUser", JSON.stringify(userData));
      localStorage.setItem("authToken", userData.token);
      return userData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // Logout usando mock
  const logout = async () => {
    await mockLogout();
    setUser(null);
    setToken(null);
    localStorage.removeItem("authUser");
    localStorage.removeItem("authToken");
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
