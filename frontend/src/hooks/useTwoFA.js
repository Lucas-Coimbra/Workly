import { useState } from "react";
import * as twoFAService from "../services/twoFA.service";

export function useTwoFA() {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const enable2FA = async () => {
    try {
      setLoading(true);
      await twoFAService.enable2FA();
      setShowModal(true); // abrir modal pedindo código
    } catch (err) {
      setError(err?.response?.data?.message || "Erro ao ativar 2FA");
    } finally {
      setLoading(false);
    }
  };

  const verify2FA = async (code) => {
    try {
      setLoading(true);
      await twoFAService.verify2FA(code);
      setIs2FAEnabled(true);
      setShowModal(false);
    } catch (err) {
      setError(err?.response?.data?.message || "Código inválido");
    } finally {
      setLoading(false);
    }
  };

  const disable2FA = async () => {
    try {
      setLoading(true);
      await twoFAService.disable2FA();
      setIs2FAEnabled(false);
    } catch (err) {
      setError(err?.response?.data?.message || "Erro ao desativar 2FA");
    } finally {
      setLoading(false);
    }
  };

  return {
    is2FAEnabled,
    loading,
    error,
    showModal,
    setShowModal,
    enable2FA,
    verify2FA,
    disable2FA,
  };
}
