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

export const getWorkspaceReservationModes = async (workspaceId) => {
  const response = await api.get(
    `/workspaces/${workspaceId}/reservation-modes`
  );
  return response.data;
};

export const getReservationAvailability = async ({
  workspaceId,
  date,
  mode,
}) => {
  const response = await api.get("/reservations/availability", {
    params: {
      workspaceId,
      date,
      mode,
    },
  });

  return response.data;
};

export const getReservationById = async (id) => {
  const response = await api.get(`/reservations/${id}`);
  return response.data;
};

export const markReservationPaidByUser = async (id) => {
  const response = await api.patch(`/reservations/${id}/pay-user`);
  return response.data;
};
