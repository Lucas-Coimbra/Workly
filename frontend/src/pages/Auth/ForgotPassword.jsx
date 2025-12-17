import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LayoutAuth from "../../components/LayoutAuth";
import { forgotPasswordRequest } from "../../services/auth.service";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await forgotPasswordRequest(email);
      setMessage(res.message);

      // opcional: redirecionar após alguns segundos
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch {
      setMessage("Erro ao enviar link de recuperação.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LayoutAuth
      title="Recuperar Senha"
      subtitle="Informe seu email e enviaremos instruções para redefinir sua senha"
      backButton={{
        label: "Voltar para o login",
        onClick: () => navigate("/login"),
      }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>

          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white">
            <svg
              className="w-5 h-5 text-gray-400 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>

            <input
              type="email"
              placeholder="seu@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full focus:outline-none text-gray-700"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
        >
          {loading ? "Enviando..." : "Enviar Link de Recuperação"}
        </button>
      </form>

      {message && (
        <p className="mt-4 text-sm text-center text-blue-700">{message}</p>
      )}

      {/* Instruções */}
      <div className="flex items-start mt-6 p-4 bg-blue-50 rounded-lg text-blue-700 text-sm">
        <svg
          className="w-5 h-5 mr-2 flex-shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#2563eb"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
        <div>
          <strong className="font-semibold">Como funciona:</strong>
          <p>
            Enviaremos um link seguro para seu email. Clique no link e crie uma
            nova senha. O link expira em 1 hora.
          </p>
        </div>
      </div>
    </LayoutAuth>
  );
}
