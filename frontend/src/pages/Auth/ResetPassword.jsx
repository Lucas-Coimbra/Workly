import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { resetPasswordRequest } from "../..//services/auth.service";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      setError("Token inválido ou ausente.");
    }
  }, [token]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!token) return;

    if (password.length < 8) {
      setError("A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await resetPasswordRequest(token, password);

      setSuccess(true);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao redefinir senha.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 p-4">
      <Card className="w-full max-w-md shadow-xl bg-white/95 backdrop-blur">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold">
            Redefinir senha
          </CardTitle>
        </CardHeader>

        <CardContent>
          {success ? (
            <p className="text-green-600 text-center font-medium">
              Senha redefinida com sucesso.
              <br />
              Redirecionando para o login...
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="password"
                placeholder="Nova senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <Input
                type="password"
                placeholder="Confirmar nova senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              {error && (
                <p className="text-sm text-red-500 text-center">{error}</p>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Salvando..." : "Redefinir senha"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
