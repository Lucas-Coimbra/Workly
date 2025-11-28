import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";

import MemberDashboard from "./pages/MemberDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import SupportDashboard from "./pages/SupportDashboard";
import Reservations from "./pages/Reservations";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RoutesWrapper />
      </AuthProvider>
    </BrowserRouter>
  );
}

function RoutesWrapper() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useContext(AuthContext);

  const handleNavigate = (page) => {
    switch (page) {
      case "login":
        navigate("/login");
        break;
      case "register":
        navigate("/register");
        break;
      case "forgot-password":
        navigate("/forgot-password");
        break;
      case "member-dashboard":
        navigate("/member-dashboard");
        break;
      case "reservations": // ✅ rota de reservas
        navigate("/reservations");
        break;
      case "admin-dashboard":
        navigate("/admin-dashboard");
        break;
      case "support-dashboard":
        navigate("/support-dashboard");
        break;
      case "home":
      default:
        navigate("/");
        break;
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <Routes>
      <Route path="/" element={<Home onNavigate={handleNavigate} />} />
      <Route
        path="/register"
        element={<Register onNavigate={handleNavigate} />}
      />
      <Route
        path="/forgot-password"
        element={<ForgotPassword onNavigate={handleNavigate} />}
      />
      <Route path="/login" element={<Login onNavigate={handleNavigate} />} />

      {/* Dashboard do membro */}
      <Route
        path="/member-dashboard"
        element={
          isAuthenticated && user?.role === "member" ? (
            <MemberDashboard
              onNavigate={handleNavigate}
              onLogout={handleLogout}
            />
          ) : (
            <Login onNavigate={handleNavigate} />
          )
        }
      />

      {/* ✅ Página de Reservas (somente membro) */}
      <Route
        path="/reservations"
        element={
          isAuthenticated && user?.role === "member" ? (
            <Reservations onNavigate={handleNavigate} onLogout={handleLogout} />
          ) : (
            <Login onNavigate={handleNavigate} />
          )
        }
      />

      {/* Dashboard do admin */}
      <Route
        path="/admin-dashboard"
        element={
          isAuthenticated && user?.role === "admin" ? (
            <AdminDashboard
              onNavigate={handleNavigate}
              onLogout={handleLogout}
            />
          ) : (
            <Login onNavigate={handleNavigate} />
          )
        }
      />

      {/* Dashboard do suporte */}
      <Route
        path="/support-dashboard"
        element={
          isAuthenticated && user?.role === "support" ? (
            <SupportDashboard
              onNavigate={handleNavigate}
              onLogout={handleLogout}
            />
          ) : (
            <Login onNavigate={handleNavigate} />
          )
        }
      />
    </Routes>
  );
}
