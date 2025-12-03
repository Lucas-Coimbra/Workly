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
import Payment from "./pages/Payment";
import History from "./pages/History";

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
      case "reservations":
        navigate("/reservations");
        break;
      case "payment":
        navigate("/payment");
        break;
      case "history":
        navigate("/history");
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

  const handleReserve = (reservationData) => {
    navigate("/payment", { state: { reservationData } });
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

      <Route
        path="/reservations"
        element={
          isAuthenticated && user?.role === "member" ? (
            <Reservations
              onNavigate={handleNavigate}
              onLogout={handleLogout}
              onReserve={handleReserve}
            />
          ) : (
            <Login onNavigate={handleNavigate} />
          )
        }
      />

      <Route
        path="/payment"
        element={
          isAuthenticated && user?.role === "member" ? (
            <Payment onNavigate={handleNavigate} onLogout={handleLogout} />
          ) : (
            <Login onNavigate={handleNavigate} />
          )
        }
      />

      <Route
        path="/history"
        element={
          isAuthenticated && user?.role === "member" ? (
            <History onNavigate={handleNavigate} onLogout={handleLogout} />
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
