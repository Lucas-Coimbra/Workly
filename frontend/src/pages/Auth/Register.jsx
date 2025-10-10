import { useState } from "react";
import LayoutAuth from "../../components/LayoutAuth";
import ReCAPTCHA from "../../components/ReCAPTCHA";

export default function Register({ onNavigate }) {
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    if (!captchaVerified) {
      alert("Por favor, verifique o reCAPTCHA");
      return;
    }

    alert("Conta criada com sucesso! Faça login para continuar.");
    onNavigate("login");
  };

  return (
    <LayoutAuth
      title="Crie sua conta"
      subtitle="Preencha seus dados para começar"
      backButton={{
        label: "Já tem uma conta? Faça login",
        onClick: () => onNavigate("login"),
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

        {/* Botão principal */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Criar Conta
        </button>

        {/* Botões sociais */}
        <div className="flex gap-4 justify-center mt-4">
          {/* Google */}
          <button
            type="button"
            className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50"
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span>Google</span>
          </button>

          {/* Microsoft */}
          <button
            type="button"
            className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50"
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#00A4EF" d="M0 0h11.377v11.372H0z" />
              <path fill="#FFB900" d="M12.623 0H24v11.372H12.623z" />
              <path fill="#05A" d="M0 12.628h11.377V24H0z" />
              <path fill="#7FBA00" d="M12.623 12.628H24V24H12.623z" />
            </svg>
            <span>Microsoft</span>
          </button>
        </div>
      </form>
    </LayoutAuth>
  );
}
