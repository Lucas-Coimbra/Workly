import { useState } from "react";
import { createTicket } from "../services/support.service";
import { SUPPORT_PRIORITY } from "../constants/support.constants";

export function useCreateSupportTicket() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function submitTicket(payload) {
    try {
      setError(null);
      setLoading(true);

      // 🔒 Validação defensiva (opcional, mas segura)
      if (
        payload?.priority &&
        !Object.values(SUPPORT_PRIORITY).includes(payload.priority)
      ) {
        throw new Error("Prioridade inválida");
      }

      const data = await createTicket(payload);
      return data;
    } catch (err) {
      console.error(err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return {
    submitTicket,
    loading,
    error,
  };
}
