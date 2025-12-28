import { Card, Label, Input, Button } from "@/components/ui";
import { Lock, Shield, Eye, EyeOff } from "lucide-react";
import ToggleSwitch from "../ToggleSwitch";
import { useTranslation } from "react-i18next";

export default function SecuritySettings({
  twoFactorAuth,
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
  onToggleTwoFA,
}) {
  const { t } = useTranslation();

  const passwordFields = [
    {
      label: t("security.password.currentLabel"),
      value: currentPassword,
      setter: setCurrentPassword,
      show: showCurrentPassword,
      setShow: setShowCurrentPassword,
      placeholder: t("security.password.currentPlaceholder"),
    },
    {
      label: t("security.password.newLabel"),
      value: newPassword,
      setter: setNewPassword,
      show: showNewPassword,
      setShow: setShowNewPassword,
      placeholder: t("security.password.newPlaceholder"),
      note: t("security.password.note"),
    },
    {
      label: t("security.password.confirmLabel"),
      value: confirmPassword,
      setter: setConfirmPassword,
      show: showConfirmPassword,
      setShow: setShowConfirmPassword,
      placeholder: t("security.password.confirmPlaceholder"),
    },
  ];

  return (
    <Card className="p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
          <Lock className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <h2 className="text-gray-900">{t("security.title")}</h2>
          <p className="text-sm text-gray-600">{t("security.description")}</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Two-Factor Auth */}
        <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-blue-600" />
            <div>
              <Label className="text-gray-900">
                {t("security.twoFactorAuth.label")}
              </Label>
              <p className="text-sm text-gray-600">
                {t("security.twoFactorAuth.description")}
              </p>
            </div>
          </div>

          <ToggleSwitch isChecked={twoFactorAuth} onChange={onToggleTwoFA} />
        </div>

        <div className="border-t border-gray-200"></div>

        {/* Change Password */}
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
                  className="pr-10 bg-gray-100 border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 transition-colors duration-200"
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
            {t("security.password.changeButton")}
          </Button>
        </div>
      </div>
    </Card>
  );
}
