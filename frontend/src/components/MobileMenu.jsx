import { useLocation, useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";

const icons = {
  Início: (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  ),
  Dashboard: (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" />
    </svg>
  ),
  Reservas: (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),

  Pagamentos: (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
      <line x1="6" y1="15" x2="10" y2="15" />
    </svg>
  ),

  Histórico: (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v4l3 3" />
    </svg>
  ),
  Suporte: (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M4 15v-3a8 8 0 0116 0v3" />
      <path d="M4 15a2 2 0 002 2h1v-6H6a2 2 0 00-2 2z" />
      <path d="M20 15a2 2 0 01-2 2h-1v-6h1a2 2 0 012 2z" />
    </svg>
  ),
};

export default function MobileMenu({
  open,
  onClose,
  user,
  roleLabel,
  navLinks,
  handleLogout,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  if (!open) return null;

  return createPortal(
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 z-[60] md:hidden"
      />

      {/* Drawer */}
      <aside
        className="
          fixed top-0 right-0 z-[70] md:hidden
          h-dvh w-[64vw] max-w-[260px]
          bg-white shadow-2xl
          flex flex-col
          rounded-l-2xl
        "
      >
        {/* Header */}
        <div className="shrink-0 px-4 py-3 border-b flex items-center gap-3">
          {/* Botão voltar */}
          <button
            onClick={onClose}
            className="flex items-center justify-center w-10 h-10 rounded-full
              bg-slate-100 hover:bg-slate-200 text-slate-700"
            aria-label="Fechar menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-slate-700 to-slate-900 text-white flex items-center justify-center text-sm font-semibold shrink-0">
            {user.name
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")
              .toUpperCase()}
          </div>
          {/* Nome + plano */}
          <div>
            <div className="text-sm font-semibold text-slate-800">
              {user.name}
            </div>
            <div className="text-xs text-slate-500">
              {roleLabel} • Plano {user.plan?.name}
            </div>
          </div>
        </div>

        {/* Navegação */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navLinks.map((link) => {
            const active = location.pathname === link.path;

            return (
              <button
                key={link.path}
                onClick={() => {
                  navigate(link.path);
                  onClose();
                }}
                className={`
                  w-full flex items-center gap-3
                  px-3 py-3 rounded-xl
                  text-sm font-medium transition
                  ${
                    active
                      ? "bg-blue-600 text-white shadow"
                      : "text-slate-700 hover:bg-slate-100"
                  }
                `}
              >
                <span className="shrink-0 opacity-80">{icons[link.label]}</span>
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="shrink-0 border-t px-3 py-3">
          <button
            onClick={handleLogout}
            className="
              w-full flex items-center gap-3
              px-3 py-3 rounded-xl
              text-sm font-semibold
              text-rose-600
              hover:bg-rose-50 transition
            "
          >
            🚪 Sair
          </button>
        </div>
      </aside>
    </>,
    document.body
  );
}
