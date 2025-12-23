import { api } from "./api";

export async function getNotifications() {
  const res = await api.get("/notifications");
  return res.data;
}

export async function getUnreadCount() {
  const res = await api.get("/notifications/unread-count");
  return res.data.count;
}

export async function markNotificationAsRead(id) {
  await api.patch(`/notifications/${id}/read`);
}

export async function markAllAsRead() {
  await api.patch("/notifications/read-all");
}

export async function deleteNotification(id) {
  await api.delete(`/notifications/${id}`);
}
