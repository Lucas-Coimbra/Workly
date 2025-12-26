import { useState } from "react";
import { createSpaceRequest } from "../../services/spaceRequest.service";

export function useCreateSpaceRequest() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const submit = async (data) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await createSpaceRequest(data);
      setSuccess(true);
      return response; // 👈 IMPORTANTE
    } catch (err) {
      setError(err.response?.data || "Erro ao enviar solicitação");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    submit,
    loading,
    error,
    success,
  };
}
