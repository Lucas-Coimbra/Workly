export default function LayoutAuth({
  title,
  subtitle,
  children,
  backButton,
  extraNavigation,
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Logo + Título */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto bg-gradient-to-tr from-blue-600 to-blue-700 flex items-center justify-center mb-2 rounded-[10px]">
            <svg
              width="32" // aumenta o SVG proporcionalmente
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>

        {/* Conteúdo do formulário */}
        <div>{children}</div>

        {/* Extra navigation (links tipo "Não tem conta?") */}
        {extraNavigation && (
          <div className="mt-4 text-center">{extraNavigation}</div>
        )}

        {/* Botão de voltar */}
        {backButton && (
          <div className="mt-4 text-center">
            <button
              onClick={backButton.onClick}
              className="inline-flex items-center gap-1 text-gray-600 hover:underline text-sm"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              {backButton.label}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
