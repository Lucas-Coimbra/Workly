import { useEffect, useState, useCallback } from "react";
import {
  getNotifications,
  getUnreadCount,
  markNotificationAsRead,
  markAllAsRead,
  deleteNotification,
} from "../services/notificationService";

export function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);

    const [list, count] = await Promise.all([
      getNotifications(),
      getUnreadCount(),
    ]);

    setNotifications(list);
    setUnreadCount(count);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // 🔹 Marcar uma como lida (optimistic)
  const markRead = async (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );

    setUnreadCount((c) => Math.max(c - 1, 0));

    try {
      await markNotificationAsRead(id);
    } catch {
      // fallback simples
      refresh();
    }
  };

  // 🔹 Marcar todas como lidas
  const markAll = async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);

    try {
      await markAllAsRead();
    } catch {
      refresh();
    }
  };

  // 🔹 Excluir notificação
  const remove = async (id) => {
    const removed = notifications.find((n) => n.id === id);

    setNotifications((prev) => prev.filter((n) => n.id !== id));

    if (removed && !removed.read) {
      setUnreadCount((c) => Math.max(c - 1, 0));
    }

    try {
      await deleteNotification(id);
    } catch {
      refresh();
    }
  };

  // 🔹 Re-render periódico para atualizar tempo relativo
  useEffect(() => {
    if (notifications.length === 0) return;

    const interval = setInterval(() => {
      setNotifications((prev) => [...prev]);
    }, 60_000); // 1 minuto

    return () => clearInterval(interval);
  }, [notifications.length]);

  return {
    notifications,
    unreadCount,
    loading,
    refresh,
    markRead,
    markAll,
    remove,
  };
}
