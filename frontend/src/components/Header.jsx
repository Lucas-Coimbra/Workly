import { useState } from "react";

export default function Header({
  userType = "member",
  onNavigate = () => {},
  onLogout = () => {},
  currentPage = "",
}) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navLinksFor = (type) => {
    if (type === "admin") {
      return [
        { label: "Dashboard", page: "admin-dashboard", icon: "home" },
        { label: "Espaços", page: "space-management", icon: "building" },
        { label: "Relatórios", page: "reports", icon: "bar-chart" },
      ];
    }
    if (type === "support") {
      return [
        { label: "Dashboard", page: "support-dashboard", icon: "home" },
        { label: "Tickets", page: "support-tickets", icon: "headphones" },
      ];
    }
    // default member
    return [
      { label: "Início", page: "member-dashboard", icon: "home" },
      { label: "Reservas", page: "reservations", icon: "calendar" },
      { label: "Pagamentos", page: "payment", icon: "credit-card" },
      { label: "Histórico", page: "history", icon: "file-text" },
    ];
  };

  const icon = (name) => {
    // pequenos ícones inline SVG, apenas o necessário
    switch (name) {
      case "calendar":
        return (
          <svg
            className="w-4 h-4 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        );
      case "credit-card":
        return (
          <svg
            className="w-4 h-4 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="1" y="4" width="22" height="16" rx="2" />
            <line x1="1" y1="10" x2="23" y2="10" />
          </svg>
        );
      case "file-text":
        return (
          <svg
            className="w-4 h-4 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
        );
      case "building":
        return (
          <svg
            className="w-4 h-4 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="4" y="2" width="16" height="20" rx="2" />
            <path d="M9 22v-4h6v4" />
          </svg>
        );
      case "bar-chart":
        return (
          <svg
            className="w-4 h-4 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="6" y1="20" x2="6" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="18" y1="20" x2="18" y2="14" />
          </svg>
        );
      case "headphones":
        return (
          <svg
            className="w-4 h-4 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
          </svg>
        );
      default:
        return (
          <svg
            className="w-4 h-4 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        );
    }
  };

  const navLinks = navLinksFor(userType);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* left: logo */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() =>
              onNavigate(
                userType === "admin"
                  ? "admin-dashboard"
                  : userType === "support"
                  ? "support-dashboard"
                  : "member-dashboard"
              )
            }
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
              <div className="text-xs text-slate-500">
                {userType === "admin"
                  ? "Administrador"
                  : userType === "support"
                  ? "Suporte"
                  : "Membro"}
              </div>
            </div>
          </div>

          {/* center: nav (hidden on small screens) */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const active = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => onNavigate(link.page)}
                  className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition ${
                    active
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {icon(link.icon)}
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* right: actions */}
          <div className="flex items-center gap-3">
            {/* search icon */}
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

            {/* notifications */}
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

            {/* user area */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu((s) => !s)}
                className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100"
                aria-haspopup="true"
                aria-expanded={showUserMenu}
              >
                <div className="w-8 h-8 rounded-full bg-slate-700 text-white flex items-center justify-center text-sm font-medium">
                  JS
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-sm font-medium text-slate-800">
                    João Silva
                  </div>
                  <div className="text-xs text-slate-500">Administrador</div>
                </div>
                <svg
                  className="w-4 h-4 text-gray-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg py-1 z-50">
                  <button
                    onClick={() => {
                      onNavigate("profile");
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
                  >
                    <svg
                      className="w-4 h-4 text-gray-600"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    Perfil
                  </button>

                  <button
                    onClick={() => {
                      onNavigate("settings");
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
                  >
                    <svg
                      className="w-4 h-4 text-gray-600"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="3" />
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09c.11.55.52 1 1 1.51h.09a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.49.48.9.99 1 1.51H21a2 2 0 0 1 0 4h-.09c-.55.11-1 .52-1.51 1z" />
                    </svg>
                    Configurações
                  </button>

                  <div className="border-t my-1"></div>

                  <button
                    onClick={() => {
                      onLogout();
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                  >
                    <svg
                      className="w-4 h-4 text-rose-600"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
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
