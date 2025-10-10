import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

/**
 * Envolve uma rota e garante que o usuário esteja autenticado.
 * - Se requireAuth = true e não estiver logado → redireciona pro /login.
 * - Se requireAuth = false e já estiver logado → redireciona pra /.
 */
export default function AuthWrapper({ children, requireAuth = true }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
