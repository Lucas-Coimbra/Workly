import React from "react";

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-slate-200 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Grid Principal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
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
              <h3 className="text-lg font-semibold">Workly</h3>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Gestão de espaços de coworking de forma simples e eficiente.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-3">Links</h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Planos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Suporte */}
          <div>
            <h4 className="text-white font-semibold mb-3">Suporte</h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Ajuda
                </a>
              </li>
            </ul>
          </div>

          {/* Contato rápido */}
          <div>
            <h4 className="text-white font-semibold mb-3">Contato</h4>
            <p className="text-sm text-slate-400">
              contato@workly.com.br <br />
              (11) 3000-0000
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-slate-700 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-2">
          <p>© 2025 Workly. Todos os direitos reservados.</p>
          <div className="flex gap-3">
            <a href="#" className="hover:text-white transition">
              Termos
            </a>
            <span>•</span>
            <a href="#" className="hover:text-white transition">
              Privacidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
