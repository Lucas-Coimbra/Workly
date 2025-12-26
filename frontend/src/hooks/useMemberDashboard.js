import { useEffect, useState } from "react";
import { getMemberDashboard } from "../services/dashboard.service";
import { useAuth } from "./useAuth";

export function useMemberDashboard() {
  const { loading: authLoading, isAuthenticated } = useAuth();

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
        const res = await getMemberDashboard();
        if (mounted) setData(res);
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
  }, [authLoading, isAuthenticated]);

  return { data, loading, error };
}
