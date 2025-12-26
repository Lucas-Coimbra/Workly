import { useEffect, useState } from "react";
import { getAverageResolutionTime } from "../services/support.service";

export function useSupportMetrics() {
  const [averageResolutionTime, setAverageResolutionTime] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMetrics() {
      try {
        const data = await getAverageResolutionTime();
        setAverageResolutionTime(data.averageResolutionTime);
      } catch (err) {
        console.error("Erro ao carregar métricas de suporte", err);
      } finally {
        setLoading(false);
      }
    }

    loadMetrics();
  }, []);

  return {
    averageResolutionTime,
    loading,
  };
}
