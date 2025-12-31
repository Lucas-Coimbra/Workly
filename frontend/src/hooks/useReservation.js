import { useState } from "react";
import * as reservationService from "../services/reservation.service";

export const useCreateReservation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = async (data) => {
    setLoading(true);
    setError(null);

    try {
      /**
       * =========================
       * Validações básicas
       * =========================
       */
      if (!data.workspaceId || !data.mode || !data.date || !data.total) {
        throw new Error("Campos obrigatórios faltando");
      }

      const dateObj = new Date(data.date);
      if (isNaN(dateObj.getTime())) {
        throw new Error("Data inválida");
      }

      let startTime = null;
      let endTime = null;
      let endDate = null;
      let months = null;

      /**
       * =========================
       * HOURLY
       * =========================
       * Enviar SOMENTE "HH:mm"
       */
      if (data.mode === "HOURLY") {
        if (!data.startTime || !data.endTime) {
          throw new Error(
            "Horários de início e término são obrigatórios para reservas por hora"
          );
        }

        // valida formato HH:mm
        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

        if (!timeRegex.test(data.startTime) || !timeRegex.test(data.endTime)) {
          throw new Error("Formato de horário inválido (HH:mm)");
        }

        if (data.endTime <= data.startTime) {
          throw new Error("Horário de término deve ser após o início");
        }

        startTime = data.startTime; // "16:19"
        endTime = data.endTime; // "17:19"
      }

      /**
       * =========================
       * MONTHLY
       * =========================
       */
      if (data.mode === "MONTHLY") {
        months = data.months && data.months > 0 ? data.months : 1;

        const tempEnd = new Date(dateObj);
        tempEnd.setMonth(tempEnd.getMonth() + months);
        tempEnd.setHours(0, 0, 0, 0);

        endDate = tempEnd.toISOString();
      }

      /**
       * =========================
       * DAILY
       * =========================
       */
      if (data.mode === "DAILY") {
        endDate = null;
      }

      /**
       * =========================
       * Payload final
       * =========================
       */
      const payload = {
        workspaceId: data.workspaceId,
        mode: data.mode,
        date: dateObj.toISOString().split("T")[0], // YYYY-MM-DD
        total: data.total,
        startTime,
        endTime,
        endDate,
        months,
      };

      const res = await reservationService.createReservation(payload);
      return res;
    } catch (err) {
      console.error(
        "Erro ao criar reserva:",
        err.response?.data || err.message
      );

      setError(
        err.response?.data?.message || err.message || "Erro ao criar reserva"
      );

      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    submit,
    loading,
    error,
  };
};
