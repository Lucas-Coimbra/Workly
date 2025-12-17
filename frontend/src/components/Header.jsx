import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) return null;

  const role = user.role; // MEMBER | ADMIN | SUPPORT

  const navLinksFor = (role) => {
    if (role === "ADMIN") {
      return [
        { label: "Dashboard", path: "/admin-dashboard" },
        { label: "Espaços", path: "/space-management" },
        { label: "Relatórios", path: "/reports" },
      ];
    }

    if (role === "SUPPORT") {
      return [
        { label: "Dashboard", path: "/support-dashboard" },
        { label: "Tickets", path: "/support-tickets" },
      ];
    }

    return [
      { label: "Início", path: "/member-dashboard" },
      { label: "Reservas", path: "/reservations" },
      { label: "Pagamentos", path: "/payment" },
      { label: "Histórico", path: "/history" },
    ];
  };

  const navLinks = navLinksFor(role);

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const roleLabel =
    role === "ADMIN"
      ? "Administrador"
      : role === "SUPPORT"
      ? "Suporte"
      : "Membro";

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate(navLinks[0].path)}
          >
            <div className="w-12 h-12 rounded-[10px] bg-gradient-to-tr from-blue-600 to-purple-700 flex items-center justify-center">
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>

            <div className="hidden sm:block">
              <div className="text-lg font-semibold text-slate-800">Workly</div>
              <div className="text-xs text-slate-500">{roleLabel}</div>
            </div>
          </div>

          {/* Navegação */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;

              return (
                <button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                    active
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Ações */}
          <div className="flex items-center gap-3">
            {/* Busca */}
            <button className="p-2 rounded-md hover:bg-gray-100">
              <svg
                className="w-5 h-5 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            {/* Notificações */}
            <div className="relative">
              <button className="p-2 rounded-md hover:bg-gray-100">
                <svg
                  className="w-5 h-5 text-gray-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 8a6 6 0 10-12 0v4l-2 2h16l-2-2V8" />
                  <path d="M13.73 21a2 2 0 01-3.46 0" />
                </svg>
              </button>
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white"></span>
            </div>

            {/* Usuário */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu((s) => !s)}
                className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100"
              >
                <div className="w-8 h-8 rounded-full bg-slate-700 text-white flex items-center justify-center text-sm font-medium">
                  {initials}
                </div>

                <div className="hidden sm:block text-left">
                  <div className="text-sm font-medium text-slate-800">
                    {user.name}
                  </div>
                  <div className="text-xs text-slate-500">{roleLabel}</div>
                </div>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg py-1 z-50">
                  <button
                    onClick={() => navigate("/profile")}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                  >
                    Perfil
                  </button>

                  <button
                    onClick={() => navigate("/member-settings")}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                  >
                    Configurações
                  </button>

                  <div className="border-t my-1"></div>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50"
                  >
                    Sair
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
