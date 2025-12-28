import { useState } from "react";
import * as reservationService from "../services/reservation.service";

export const useCreateReservation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const res = await reservationService.createReservation(data);
      return res;
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao criar reserva");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, error };
};
