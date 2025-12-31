import { useEffect, useState } from "react";
import { getMyReservations } from "../services/reservation.service";
import { getTickets } from "../services/support.service";
import { getPlanByName } from "../services/plans";
import { useAuth } from "./useAuth";

export function useMemberDashboard() {
  const { loading: authLoading, isAuthenticated, user } = useAuth();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    if (authLoading) return;

    if (!isAuthenticated) {
      setData(null);
      setLoading(false);
      return;
    }

    async function load() {
      setLoading(true);
      setError(null);

      try {
        // Reservas
        const reservations = await getMyReservations();
        const upcomingReservations = reservations
          .filter(
            (r) => r.status !== "CANCELED" && new Date(r.date) >= new Date()
          )
          .sort((a, b) => new Date(a.date) - new Date(b.date));
        const activeReservations = reservations.filter(
          (r) => r.status === "CONFIRMED"
        ).length;
        const usedHours = reservations.reduce(
          (acc, r) => acc + (r.duration ?? 1),
          0
        );

        // Tickets
        const tickets = await getTickets();

        // Plano completo com fallback para BASIC
        let planName = (user?.plan?.name?.trim() ?? "BASIC").toUpperCase();
        let fullPlan = null;
        try {
          fullPlan = await getPlanByName(planName);
        } catch {
          // fallback mínimo se a API falhar
          fullPlan = { name: planName, monthlyHours: 0, renewalDate: null };
        }

        if (mounted) {
          setData({
            upcomingReservations,
            activeReservations,
            usedHours,
            recentTickets: tickets,
            userPlan: fullPlan,
          });
        }
      } catch (err) {
        if (mounted) setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, [authLoading, isAuthenticated, user]);

  return { data, loading, error };
}
