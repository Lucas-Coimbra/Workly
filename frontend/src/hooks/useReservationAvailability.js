import { useEffect, useState } from "react";
import { getReservationAvailability } from "../services/reservation.service";

export function useReservationAvailability({
  workspaceId,
  date,
  mode,
  enabled = true,
}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!enabled || !workspaceId || !date || !mode) return;

    setLoading(true);
    setError(null);

    getReservationAvailability({ workspaceId, date, mode })
      .then(setData)
      .catch(() => setError("Erro ao carregar disponibilidade"))
      .finally(() => setLoading(false));
  }, [workspaceId, date, mode, enabled]);

  return { availability: data, loading, error };
}
