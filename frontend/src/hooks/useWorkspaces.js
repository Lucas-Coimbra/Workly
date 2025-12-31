import { useEffect, useState } from "react";
import { listWorkspaces } from "../services/workspace.service";

export function useWorkspaces() {
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    listWorkspaces()
      .then(setWorkspaces)
      .catch(() => setError("Erro ao carregar espaços"))
      .finally(() => setLoading(false));
  }, []);

  return { workspaces, loading, error };
}
