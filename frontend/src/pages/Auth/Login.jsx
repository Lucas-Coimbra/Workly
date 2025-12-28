import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "../../components/ReCAPTCHA";
import { useAuth } from "../../hooks/useAuth";
import LayoutAuth from "../../components/LayoutAuth";
import Modal2FA from "../../components/settingsM/TwoFAModal";

export default function Login() {
  const navigate = useNavigate();
  const { login, verify2FA } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const [show2FAModal, setShow2FAModal] = useState(false);
  const [twoFAError, setTwoFAError] = useState("");

  const handleRedirect = (role) => {
    switch (role) {
      case "MEMBER":
        navigate("/member-dashboard");
        break;
      case "ADMIN":
        navigate("/admin-dashboard");
        break;
      case "SUPPORT":
        navigate("/support-dashboard");
        break;
      default:
        navigate("/");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!captchaVerified) {
      alert("Por favor, verifique o reCAPTCHA");
      return;
    }

    setLoading(true);

    try {
      const result = await login(email, password);

      // 🔐 exige 2FA → só abre o modal
      if (result.requires2FA) {
        setShow2FAModal(true);
        return;
      }

      // ✅ login direto
      handleRedirect(result.user.role);
    } catch (err) {
      alert(err?.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  const handle2FASubmit = async (code) => {
    setLoading(true);

    try {
      const verifiedData = await verify2FA(code);

      setShow2FAModal(false);
      setTwoFAError("");

      handleRedirect(verifiedData.role);
    } catch {
      setTwoFAError("Código inválido. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async (role) => {
    if (!import.meta.env.DEV) return;

    const map = {
      MEMBER: {
        email: import.meta.env.VITE_DEV_MEMBER_EMAIL,
        password: import.meta.env.VITE_DEV_MEMBER_PASSWORD,
      },
      ADMIN: {
        email: import.meta.env.VITE_DEV_ADMIN_EMAIL,
        password: import.meta.env.VITE_DEV_ADMIN_PASSWORD,
      },
      SUPPORT: {
        email: import.meta.env.VITE_DEV_SUPPORT_EMAIL,
        password: import.meta.env.VITE_DEV_SUPPORT_PASSWORD,
      },
    };

    const creds = map[role];
    if (!creds) return;

    setLoading(true);

    try {
      const result = await login(creds.email, creds.password);

      if (result.twoFAEnabled) {
        setShow2FAModal(true);
        return;
      }

      handleRedirect(result.user.role);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LayoutAuth
      title="Bem-vindo de volta"
      subtitle="Entre com sua conta para continuar"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full focus:outline-none text-gray-700"
            />
          </div>
        </div>

        {/* Lembrar-me / Esqueceu a senha */}
        <div className="flex justify-between items-center text-sm text-gray-600">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-600 rounded border-gray-300"
            />
            Lembrar-me
          </label>
          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="text-blue-600 hover:underline"
          >
            Esqueceu a senha?
          </button>
        </div>

        {/* reCAPTCHA */}
        <ReCAPTCHA onVerify={setCaptchaVerified} />

        {/* Botão Entrar */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

        {/* Quick Demo */}
        {import.meta.env.DEV && (
          <div className="mt-4 space-y-2 text-center">
            <p className="text-gray-500 text-sm">Acesso rápido (demo):</p>
            <div className="flex justify-center gap-2 flex-wrap">
              <button
                type="button"
                disabled={loading}
                onClick={() => handleQuickLogin("MEMBER")}
                className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 transition"
              >
                Entrar como Membro
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={() => handleQuickLogin("ADMIN")}
                className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 transition"
              >
                Entrar como Admin
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={() => handleQuickLogin("SUPPORT")}
                className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 transition"
              >
                Entrar como Suporte
              </button>
            </div>
          </div>
        )}

        {/* Registro */}
        <div className="mt-4 text-center text-gray-600 text-sm">
          Não tem uma conta?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-blue-600 hover:underline font-medium"
          >
            Cadastre-se gratuitamente
          </button>
        </div>
      </form>

      {/* Modal 2FA */}
      {show2FAModal && (
        <Modal2FA
          open={show2FAModal}
          onClose={() => {
            setShow2FAModal(false);
            setTwoFAError("");
          }}
          onConfirm={handle2FASubmit}
          loading={loading}
          error={twoFAError}
        />
      )}
    </LayoutAuth>
  );
}
