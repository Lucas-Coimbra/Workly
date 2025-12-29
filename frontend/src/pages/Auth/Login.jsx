import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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
      toast.error("Confirme que você não é um robô.");
      return;
    }

    setLoading(true);

    try {
      const result = await login(email, password);

      // 🔐 Exige 2FA
      if (result.requires2FA) {
        toast("Digite o código de verificação 🔐");
        setShow2FAModal(true);
        return;
      }

      toast.success("Login realizado com sucesso!");
      handleRedirect(result.user.role);
    } catch (err) {
      toast.error(parseLoginError(err));
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

      toast.success("Verificação concluída!");
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

      if (result.requires2FA) {
        toast("Digite o código 2FA 🔐");
        setShow2FAModal(true);
        return;
      }

      toast.success("Login rápido realizado!");
      handleRedirect(result.user.role);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LayoutAuth
      title="Bem-vindo de volta"
      subtitle="Entre com sua conta para continuar"
      backButton={{
        label: "Voltar para a página inicial",
        onClick: () => navigate("/"),
      }}
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

        {/* Lembrar-me / Esqueceu */}
        <div className="flex justify-between items-center text-sm text-gray-600">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="h-4 w-4" />
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

        <ReCAPTCHA onVerify={setCaptchaVerified} />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

        {import.meta.env.DEV && (
          <div className="mt-4 text-center space-y-2">
            <p className="text-sm text-gray-500">Acesso rápido (demo):</p>
            <div className="flex justify-center gap-2 flex-wrap">
              {["MEMBER", "ADMIN", "SUPPORT"].map((role) => (
                <button
                  key={role}
                  type="button"
                  disabled={loading}
                  onClick={() => handleQuickLogin(role)}
                  className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
                >
                  Entrar como {role}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 text-center text-sm text-gray-600">
          Não tem uma conta?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-blue-600 hover:underline font-medium"
          >
            Cadastre-se gratuitamente
          </button>
        </div>
      </form>

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

/* =====================
   Error Translator
===================== */
function parseLoginError(err) {
  const code = err?.response?.data?.code;

  switch (code) {
    case "INVALID_CREDENTIALS":
      return "Email ou senha incorretos.";
    case "USER_BLOCKED":
      return "Sua conta está bloqueada.";
    case "TOO_MANY_ATTEMPTS":
      return "Muitas tentativas. Aguarde alguns minutos.";
    default:
      return "Erro ao fazer login. Tente novamente.";
  }
}
