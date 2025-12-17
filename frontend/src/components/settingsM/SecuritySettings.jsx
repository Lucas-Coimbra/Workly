import { Card, Label, Switch, Input, Button, Separator } from "../ui";
import { Lock, Shield, Eye, EyeOff } from "lucide-react";

export default function SecuritySettings({
  twoFactorAuth,
  setTwoFactorAuth,
  currentPassword,
  setCurrentPassword,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  showCurrentPassword,
  setShowCurrentPassword,
  showNewPassword,
  setShowNewPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  handleChangePassword,
}) {
  const passwordFields = [
    {
      label: "Senha Atual",
      value: currentPassword,
      setter: setCurrentPassword,
      show: showCurrentPassword,
      setShow: setShowCurrentPassword,
      placeholder: "Digite sua senha atual",
    },
    {
      label: "Nova Senha",
      value: newPassword,
      setter: setNewPassword,
      show: showNewPassword,
      setShow: setShowNewPassword,
      placeholder: "Digite sua nova senha",
      note: "Mínimo de 8 caracteres",
    },
    {
      label: "Confirmar Nova Senha",
      value: confirmPassword,
      setter: setConfirmPassword,
      show: showConfirmPassword,
      setShow: setShowConfirmPassword,
      placeholder: "Confirme sua nova senha",
    },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
          <Lock className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <h2 className="text-gray-900">Segurança</h2>
          <p className="text-sm text-gray-600">Proteja sua conta</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* 2FA */}
        <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-blue-600" />
            <div>
              <Label className="text-gray-900">
                Autenticação de Dois Fatores
              </Label>
              <p className="text-sm text-gray-600">
                Adicione uma camada extra de segurança
              </p>
            </div>
          </div>
          <Switch checked={twoFactorAuth} onCheckedChange={setTwoFactorAuth} />
        </div>

        <Separator />

        {/* Alterar Senha */}
        <div className="space-y-4">
          {passwordFields.map((f, i) => (
            <div key={i}>
              <Label>{f.label}</Label>
              <div className="relative mt-2">
                <Input
                  type={f.show ? "text" : "password"}
                  placeholder={f.placeholder}
                  value={f.value}
                  onChange={(e) => f.setter(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => f.setShow(!f.show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {f.show ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {f.note && <p className="text-xs text-gray-500 mt-1">{f.note}</p>}
            </div>
          ))}
          <Button
            className="w-full mt-4 bg-green-600 hover:bg-green-700"
            onClick={handleChangePassword}
          >
            Alterar Senha
          </Button>
        </div>
      </div>
    </Card>
  );
}
