import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-blue-700 rounded flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <span className="text-lg font-bold text-gray-800">Workly</span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <a
            href="#features"
            className="text-gray-600 hover:text-gray-900 transition"
          >
            Recursos
          </a>
          <a
            href="#plans"
            className="text-gray-600 hover:text-gray-900 transition"
          >
            Planos
          </a>
          <a
            href="#about"
            className="text-gray-600 hover:text-gray-900 transition"
          >
            Sobre
          </a>

          <button
            onClick={() => navigate("/space-request")}
            className="px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50 hover:scale-105 transition-transform duration-200"
          >
            Cadastre seu Espaço
          </button>

          <button
            onClick={() => navigate("login")}
            className="px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50 hover:scale-105 transition-transform duration-200"
          >
            Entrar
          </button>
        </div>
      </div>
    </nav>
  );
}
