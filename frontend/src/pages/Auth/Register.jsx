import { useNavigate } from "react-router-dom";
import { registerRequest } from "@/services/auth.service";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import LayoutAuth from "../../components/LayoutAuth";
import ReCAPTCHA from "../../components/ReCAPTCHA";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    if (!captchaVerified) {
      setError("Por favor, verifique o reCAPTCHA");
      return;
    }

    try {
      setLoading(true);

      // 1. Cadastro
      await registerRequest({
        name,
        email,
        phone,
        password,
      });

      /**
       * Esperado do backend:
       * {
       *   token: "...",
       *   user: { id, name, email }
       * }
       */

      // 2. Login automático
      await login(email, password);

      // 3. Redireciona
      navigate("/member-dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Erro ao criar conta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LayoutAuth
      title="Crie sua conta"
      subtitle="Preencha seus dados para começar"
      backButton={{
        label: "Já tem uma conta? Faça login",
        onClick: () => navigate("/login"),
      }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nome */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Nome Completo
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <svg
              className="w-5 h-5 text-gray-400 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <input
              type="text"
              placeholder="Seu nome completo"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full focus:outline-none text-gray-700"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
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

        {/* Telefone */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Telefone
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <svg
              className="w-5 h-5 text-gray-400 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <input
              type="tel"
              placeholder="(00) 00000-0000"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full focus:outline-none text-gray-700"
            />
          </div>
        </div>

        {/* Senha */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Senha</label>
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <svg
              className="w-5 h-5 text-gray-400 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <input
              type="password"
              placeholder="Mínimo 8 caracteres"
              minLength={8}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full focus:outline-none text-gray-700"
            />
          </div>
        </div>

        {/* Confirmar senha */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Confirmar Senha
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <svg
              className="w-5 h-5 text-gray-400 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <input
              type="password"
              placeholder="Digite a senha novamente"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full focus:outline-none text-gray-700"
            />
          </div>
        </div>

        {/* Termos */}
        <label className="flex items-center text-gray-600 text-sm">
          <input type="checkbox" required className="mr-2 accent-blue-600" />
          <span>
            Aceito os{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Termos de Uso
            </a>{" "}
            e{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Política de Privacidade
            </a>
          </span>
        </label>

        {/* reCAPTCHA */}
        <ReCAPTCHA onVerify={setCaptchaVerified} />

        {/* Erro */}
        {error && <p className="text-sm text-red-600 text-center">{error}</p>}

        {/* Botão principal */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Criando conta..." : "Criar Conta"}
        </button>
      </form>
    </LayoutAuth>
  );
}
