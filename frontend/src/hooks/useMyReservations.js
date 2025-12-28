import { useEffect, useState } from "react";
import { getMyReservations } from "../services/reservation.service";

export function useMyReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getMyReservations();
      setReservations(data);
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao carregar reservas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return { reservations, loading, error, refresh };
}
