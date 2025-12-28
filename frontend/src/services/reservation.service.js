import { api } from "./api";

export const createReservation = async (data) => {
  const response = await api.post("/reservations", data);
  return response.data;
};

export const getMyReservations = async () => {
  const response = await api.get("/reservations/me");
  return response.data;
};

export const getReservationsByWorkspace = async (workspaceId) => {
  const response = await api.get(`/reservations/workspace/${workspaceId}`);
  return response.data;
};

export const markReservationPaid = async (id) => {
  const response = await api.patch(`/reservations/${id}/pay`);
  return response.data;
};

export const cancelReservation = async (id) => {
  const response = await api.patch(`/reservations/${id}/cancel`);
  return response.data;
};
