import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

import { registerRequest } from "@/services/auth.service";
import { useAuth } from "@/hooks/useAuth";
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

  const onlyNumbers = (value) => value.replace(/\D/g, "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validações locais (UX rápida)
    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem.");
      return;
    }

    if (phone.length !== 11) {
      toast.error("O telefone deve conter 11 números (DDD + número).");
      return;
    }

    if (!captchaVerified) {
      toast.error("Confirme que você não é um robô.");
      return;
    }

    setLoading(true);

    try {
      await registerRequest({
        name,
        email,
        phone,
        password,
      });

      toast.success("Conta criada com sucesso!");

      await login(email, password);

      toast.success("Login realizado!");
      navigate("/member-dashboard");
    } catch (err) {
      toast.error(parseRegisterError(err));
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
            <input
              type="tel"
              inputMode="numeric"
              placeholder="Somente números"
              required
              value={phone}
              onChange={(e) =>
                setPhone(onlyNumbers(e.target.value).slice(0, 11))
              }
              className="w-full focus:outline-none text-gray-700"
            />
          </div>
        </div>

        {/* Senha */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Senha</label>
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
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
          Aceito os Termos de Uso e Política de Privacidade
        </label>

        <ReCAPTCHA onVerify={setCaptchaVerified} />

        {/* Botão */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Criando conta..." : "Criar Conta"}
        </button>
      </form>
    </LayoutAuth>
  );
}

/* =========================
   Error Translator
========================= */
function parseRegisterError(err) {
  const data = err?.response?.data;

  if (data?.code === "INVALID_PHONE") {
    return "O telefone deve conter 11 números (DDD + número).";
  }

  if (data?.code === "EMAIL_ALREADY_EXISTS") {
    return "Este email já está em uso.";
  }

  if (data?.code === "WEAK_PASSWORD") {
    return "A senha não é forte o suficiente.";
  }

  if (typeof data?.message === "string") {
    if (data.message.toLowerCase().includes("phone")) {
      return "Telefone inválido. Use DDD + número.";
    }
  }

  return "Erro ao criar conta. Tente novamente.";
}
