import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";

import ProtectedRoute from "./routes/ProtectedRoute";
import { Navigate } from "react-router-dom";

import Home from "./pages/Home";
import SpaceRequest from "./pages/SpaceRequest";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";

import MemberDashboard from "./pages/MemberDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import SupportDashboard from "./pages/SupportDashboard";
import Reservations from "./pages/Reservations";
import Payment from "./pages/Payment";
import History from "./pages/History";
import MemberSupport from "./pages/MemberSupport";
import MemberSettings from "./pages/MemberSettings";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/space-request" element={<SpaceRequest />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* MEMBER */}
        <Route element={<ProtectedRoute allowedRoles={["MEMBER"]} />}>
          <Route path="/member-dashboard" element={<MemberDashboard />} />
          <Route path="/member-settings" element={<MemberSettings />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/history" element={<History />} />
          <Route path="/support" element={<MemberSupport />} />
        </Route>

        {/* ADMIN */}
        <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Route>

        {/* SUPPORT */}
        <Route element={<ProtectedRoute allowedRoles={["SUPPORT"]} />}>
          <Route path="/support-dashboard" element={<SupportDashboard />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
