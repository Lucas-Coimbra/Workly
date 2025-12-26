import { useEffect, useState } from "react";
import { listPendingSpaceRequests } from "../../services/spaceRequest.service";

export function useListSpaceRequests() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      const response = await listPendingSpaceRequests();
      setData(response);
    } catch {
      setError("Erro ao carregar solicitações");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: load, // 👈 FUNDAMENTAL pro fluxo ADMIN
  };
}
