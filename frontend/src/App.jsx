import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";

import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";

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
      case "home":
      default:
        navigate("/");
        break;
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Home onNavigate={handleNavigate} />} />
      <Route path="/login" element={<Login onNavigate={handleNavigate} />} />
      <Route
        path="/register"
        element={<Register onNavigate={handleNavigate} />}
      />
      <Route
        path="/forgot-password"
        element={<ForgotPassword onNavigate={handleNavigate} />}
      />
    </Routes>
  );
}
