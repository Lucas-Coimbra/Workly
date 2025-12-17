const prisma = require("../config/prisma");

/**
 * Cria uma notificação para um usuário
 * @param {Object} params
 * @param {number} params.userId
 * @param {string} params.title
 * @param {string} params.message
 * @param {string} [params.type] - INFO | SUCCESS | WARNING | ERROR
 */
async function createNotification({ userId, title, message, type = "INFO" }) {
  if (!userId || !title || !message) {
    throw new Error("createNotification: parâmetros obrigatórios ausentes");
  }

  return prisma.notification.create({
    data: {
      userId,
      title,
      message,
      type,
    },
  });
}

/**
 * Cria notificações em lote (ex: admin → vários usuários)
 */
async function createManyNotifications(notifications) {
  if (!Array.isArray(notifications) || notifications.length === 0) {
    return;
  }

  return prisma.notification.createMany({
    data: notifications,
  });
}

module.exports = {
  createNotification,
  createManyNotifications,
};
