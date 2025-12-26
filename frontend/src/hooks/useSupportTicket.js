import { useEffect, useState, useCallback } from "react";
import {
  getTicketById,
  addTicketMessage,
  updateTicketStatus,
} from "../services/support.service";
import { useAuth } from "./useAuth";
import { SUPPORT_STATUS } from "../constants/support.constants";

export function useSupportTicket(ticketId) {
  const { user } = useAuth();

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTicket = useCallback(async () => {
    if (!ticketId) return;

    try {
      setError(null);
      setLoading(true);
      const data = await getTicketById(ticketId);
      setTicket(data);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [ticketId]);

  async function sendMessage(message) {
    if (!message?.trim()) return;

    await addTicketMessage(ticketId, message);
    await loadTicket();
  }

  async function changeStatus(status) {
    if (user?.role !== "SUPPORT") return;

    // 🔒 Garantia de contrato
    if (!Object.values(SUPPORT_STATUS).includes(status)) {
      throw new Error("Status inválido");
    }

    await updateTicketStatus(ticketId, status);
    await loadTicket();
  }

  const isResolved = ticket?.status === SUPPORT_STATUS.RESOLVED;
  const isOpen = ticket?.status === SUPPORT_STATUS.OPEN;
  const isInProgress = ticket?.status === SUPPORT_STATUS.PROGRESS;

  useEffect(() => {
    loadTicket();
  }, [loadTicket]);

  return {
    ticket,
    loading,
    error,
    sendMessage,
    changeStatus,

    // 👇 helpers prontos pra UI
    isResolved,
    isOpen,
    isInProgress,
  };
}
