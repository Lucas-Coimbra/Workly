import { useState } from "react";
import {
  approveSpaceRequest,
  rejectSpaceRequest,
} from "../../services/spaceRequest.service";

export function useSpaceRequestActions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const approve = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const response = await approveSpaceRequest(id);
      return response; // 👈 aqui vem approvedWorkspaceId
    } catch {
      setError("Erro ao aprovar solicitação");
      throw new Error();
    } finally {
      setLoading(false);
    }
  };

  const reject = async (id) => {
    setLoading(true);
    setError(null);

    try {
      await rejectSpaceRequest(id);
      return true;
    } catch {
      setError("Erro ao rejeitar solicitação");
      throw new Error();
    } finally {
      setLoading(false);
    }
  };

  return {
    approve,
    reject,
    loading,
    error,
  };
}
