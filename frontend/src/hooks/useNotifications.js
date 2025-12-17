import { useEffect, useState } from "react";
import {
  getNotifications,
  markNotificationRead,
} from "../services/notificationService";

export function useNotifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getNotifications().then(setNotifications);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = async (id) => {
    await markNotificationRead(id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return { notifications, unreadCount, markAsRead };
}
