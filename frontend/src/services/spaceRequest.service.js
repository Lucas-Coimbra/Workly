import { api } from "./api";

/**
 * Cria uma nova solicitação de espaço (público)
 */
export const createSpaceRequest = async (data) => {
  const response = await api.post("/space-requests", data, {
    headers: {
      Authorization: undefined, // força a remoção do header
    },
  });
  return response.data;
};

/**
 * Lista solicitações pendentes (ADMIN)
 */
export const listPendingSpaceRequests = async () => {
  const response = await api.get("/space-requests");
  return response.data;
};

/**
 * Busca solicitação por ID (ADMIN)
 */
export const getSpaceRequestById = async (id) => {
  const response = await api.get(`/space-requests/${id}`);
  return response.data;
};

/**
 * Aprova solicitação (ADMIN)
 */
export const approveSpaceRequest = async (id) => {
  const response = await api.patch(`/space-requests/${id}/approve`);
  return response.data;
};

/**
 * Rejeita solicitação (ADMIN)
 */
export const rejectSpaceRequest = async (id) => {
  const response = await api.patch(`/space-requests/${id}/reject`);
  return response.data;
};
