import {
  getMe,
  updateNotificationSettings,
  updatePreferencesSettings,
  updateSecuritySettings,
  deleteMe,
} from "../services/me.service";

import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NotificationSettings from "../components/settingsM/NotificationSettings";
import PreferencesSettings from "../components/settingsM/PreferencesSettings";
import SecuritySettings from "../components/settingsM/SecuritySettings";
import DangerZone from "../components/settingsM/DangerZone";
import SaveMessage from "../components/settingsM/SaveMessage";
import DeleteAccountModal from "../components/settingsM/DeleteAccountModal";
import TwoFAModal from "../components/settingsM/TwoFAModal";
import { useNavigate } from "react-router-dom";
import { languages, timezones, currencies } from "../mocks/settingsData";
import * as twoFAService from "../services/twoFA.service";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

export default function MemberSettings({ onLogout }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // ================== NOTIFICATIONS ==================
  const [emailNotifications, setEmailNotifications] = useState(null);
  const [smsNotifications, setSmsNotifications] = useState(null);
  const [reservationReminders, setReservationReminders] = useState(null);
  const [promotionalEmails, setPromotionalEmails] = useState(null);
  const [weeklyReport, setWeeklyReport] = useState(null);

  // ================== PREFERENCES ==================
  const [language, setLanguage] = useState("pt-BR");
  const [timezone, setTimezone] = useState("America/Sao_Paulo");
  const [currency, setCurrency] = useState("BRL");

  useEffect(() => {
    if (language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  // ================== SECURITY ==================
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ================== UI STATES ==================
  const [settingsLoading, setSettingsLoading] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const errorTimeoutRef = useRef(null);

  // ================== 2FA STATES ==================
  const [showTwoFAModal, setShowTwoFAModal] = useState(false);
  const [twoFAError, setTwoFAError] = useState("");
  const [twoFALoading, setTwoFALoading] = useState(false);
  const [twoFAAction, setTwoFAAction] = useState("enable");

  // ================== LOAD USER ==================
  useEffect(() => {
    async function loadMe() {
      try {
        const me = await getMe();

        if (me?.settings) {
          setEmailNotifications(me.settings.emailNotifications);
          setSmsNotifications(me.settings.smsNotifications);
          setReservationReminders(me.settings.reservationReminders);
          setPromotionalEmails(me.settings.promotionalEmails);
          setWeeklyReport(me.settings.weeklyReport);
          setLanguage(me.settings.language);
          setTimezone(me.settings.timezone);
          setCurrency(me.settings.currency);
          setTwoFactorAuth(me.settings.twoFactorAuth);
          i18n.changeLanguage(me.settings.language);
        }
      } catch (err) {
        setSaveError(err?.response?.data?.message || t("errors.loadSettings"));
      } finally {
        setSettingsLoading(false);
      }
    }

    loadMe();
  }, [t]);

  // ================== HELPERS ==================
  const showError = (message, timeout = 4000) => {
    setSaveError(message);
    if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);
    errorTimeoutRef.current = setTimeout(() => {
      setSaveError("");
      errorTimeoutRef.current = null;
    }, timeout);
  };

  // ================== NOTIFICATIONS ==================
  const handleSaveNotifications = async () => {
    try {
      setSaveError("");
      await updateNotificationSettings({
        emailNotifications,
        smsNotifications,
        reservationReminders,
        promotionalEmails,
        weeklyReport,
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      showError(err?.response?.data?.message || t("errors.saveNotification"));
    }
  };

  // ================== PREFERENCES ==================
  const handleSavePreferences = async (
    newLanguage,
    newTimezone,
    newCurrency
  ) => {
    try {
      setSaveError("");

      await updatePreferencesSettings({
        language: newLanguage,
        timezone: newTimezone,
        currency: newCurrency,
      });

      setLanguage(newLanguage);
      setTimezone(newTimezone);
      setCurrency(newCurrency);

      i18n.changeLanguage(newLanguage);

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      showError(err?.response?.data?.message || t("errors.savePreferences"));
    }
  };

  // ================== PASSWORD ==================
  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword)
      return showError(t("errors.passwordEmpty"));

    if (newPassword !== confirmPassword)
      return showError(t("errors.passwordMismatch"));

    if (newPassword.length < 8) return showError(t("errors.passwordTooShort"));

    try {
      await updateSecuritySettings({
        currentPassword,
        newPassword,
        twoFactorAuth,
      });

      setSaveSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      showError(err?.response?.data?.message || t("errors.securityUpdate"));
    }
  };

  // ================== DELETE ACCOUNT ==================
  const handleDeleteAccount = async (password) => {
    setDeleting(true);
    setDeleteError("");

    try {
      await deleteMe(password);
      await onLogout();
      navigate("/login");
    } catch (err) {
      setDeleteError(
        err?.response?.data?.message || t("errors.incorrectPassword")
      );
    } finally {
      setDeleting(false);
    }
  };

  // ================== 2FA ==================
  const handleToggleTwoFA = async (newValue) => {
    setTwoFAError("");

    if (newValue) {
      try {
        setTwoFALoading(true);
        await twoFAService.enable2FA();
        setTwoFAAction("enable");
        setShowTwoFAModal(true);
      } catch (err) {
        showError(err?.response?.data?.message || t("errors.twoFAEnable"));
      } finally {
        setTwoFALoading(false);
      }
    } else {
      try {
        setTwoFALoading(true);
        await twoFAService.requestDisable2FA();
        setTwoFAAction("disable");
        setShowTwoFAModal(true);
      } catch (err) {
        showError(err?.response?.data?.message || t("errors.twoFADisable"));
      } finally {
        setTwoFALoading(false);
      }
    }
  };

  const handleConfirmTwoFA = async (code) => {
    try {
      setTwoFALoading(true);

      if (twoFAAction === "enable") {
        await twoFAService.verify2FA(code);
        setTwoFactorAuth(true);
      } else {
        await twoFAService.disable2FAWithCode(code);
        setTwoFactorAuth(false);
      }

      setShowTwoFAModal(false);
      setTwoFAError("");
    } catch (err) {
      setTwoFAError(err?.response?.data?.message || t("errors.invalidCode"));
    } finally {
      setTwoFALoading(false);
    }
  };

  // ================== RENDER ==================
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
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            {t("settings")}
          </h1>

          <p className="text-base text-gray-600 mb-6">
            {t("settingsDescription")}
          </p>

          <SaveMessage success={saveSuccess} error={saveError} />

          {settingsLoading ? (
            <div className="text-gray-500">{t("loadingSettings")}</div>
          ) : (
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
                  onToggleTwoFA: handleToggleTwoFA,
                }}
              />

              <DangerZone onDelete={() => setShowDeleteModal(true)} />

              <DeleteAccountModal
                open={showDeleteModal}
                onClose={() => {
                  setShowDeleteModal(false);
                  setDeleteError("");
                }}
                onConfirm={handleDeleteAccount}
                loading={deleting}
                error={deleteError}
              />

              <TwoFAModal
                open={showTwoFAModal}
                onClose={() => {
                  setShowTwoFAModal(false);
                  setTwoFAError("");
                }}
                onConfirm={handleConfirmTwoFA}
                loading={twoFALoading}
                error={twoFAError}
              />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
