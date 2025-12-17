import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NotificationSettings from "../components/settingsM/NotificationSettings";
import PreferencesSettings from "../components/settingsM/PreferencesSettings";
import SecuritySettings from "../components/settingsM/SecuritySettings";
import PaymentMethods from "../components/settingsM/PaymentMethods";
import DangerZone from "../components/settingsM/DangerZone";
import SaveMessage from "../components/settingsM/SaveMessage";
import { useNavigate } from "react-router-dom";
import {
  languages,
  timezones,
  currencies,
  mockCards,
} from "../mocks/settingsData";

export default function Settings({ onLogout }) {
  const navigate = useNavigate();

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [reservationReminders, setReservationReminders] = useState(true);
  const [promotionalEmails, setPromotionalEmails] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(false);

  const [language, setLanguage] = useState("pt-BR");
  const [timezone, setTimezone] = useState("America/Sao_Paulo");
  const [currency, setCurrency] = useState("BRL");

  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");

  const handleSaveNotifications = () => {
    setSaveSuccess(true);
    setSaveError("");
    setTimeout(() => setSaveSuccess(false), 3000);
  };
  const handleSavePreferences = () => {
    setSaveSuccess(true);
    setSaveError("");
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword)
      return setSaveError("Preencha todos os campos de senha");
    if (newPassword !== confirmPassword)
      return setSaveError("As senhas não coincidem");
    if (newPassword.length < 8)
      return setSaveError("A nova senha deve ter pelo menos 8 caracteres");
    setSaveSuccess(true);
    setSaveError("");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleDeleteAccount = () => {
    if (confirm("Tem certeza que deseja excluir sua conta?"))
      alert("Funcionalidade de exclusão de conta será implementada");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        userType="member"
        navigate={navigate}
        onLogout={onLogout}
        currentPage="settings"
      />
      <main className="flex-1 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-gray-900">Configurações</h1>
          <p className="text-gray-600 mt-1">
            Gerencie suas preferências e configurações da conta
          </p>

          <SaveMessage success={saveSuccess} error={saveError} />

          <div className="space-y-6">
            <NotificationSettings
              {...{
                emailNotifications,
                setEmailNotifications,
                smsNotifications,
                setSmsNotifications,
                reservationReminders,
                setReservationReminders,
                promotionalEmails,
                setPromotionalEmails,
                weeklyReport,
                setWeeklyReport,
                handleSaveNotifications,
              }}
            />
            <PreferencesSettings
              {...{
                language,
                setLanguage,
                timezone,
                setTimezone,
                currency,
                setCurrency,
                handleSavePreferences,
                languages,
                timezones,
                currencies,
              }}
            />
            <SecuritySettings
              {...{
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
              }}
            />
            <PaymentMethods cards={mockCards} />
            <DangerZone handleDeleteAccount={handleDeleteAccount} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
