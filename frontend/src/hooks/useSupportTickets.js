import { useEffect, useState } from "react";
import { getTickets } from "../services/support.service";
import { SUPPORT_STATUS } from "../constants/support.constants";

export function useSupportTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadTickets() {
    try {
      setError(null);
      setLoading(true);
      const data = await getTickets();
      setTickets(data);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTickets();
  }, []);

  // Exemplo de derivação útil (opcional)
  const openTickets = tickets.filter(
    (t) => t.status !== SUPPORT_STATUS.RESOLVED
  );

  return {
    tickets,
    openTickets,
    loading,
    error,
    reload: loadTickets,
  };
}
