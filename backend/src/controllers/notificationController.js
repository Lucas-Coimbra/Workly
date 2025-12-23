const prisma = require("../config/prisma");

async function list(req, res, next) {
  try {
    const notifications = await prisma.notification.findMany({
      where: {
        userId: req.userId,
        deletedAt: null,
      },
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    res.json(notifications);
  } catch (err) {
    next(err);
  }
}

async function markAsRead(req, res, next) {
  try {
    await prisma.notification.updateMany({
      where: {
        id: Number(req.params.id),
        userId: req.userId,
        deletedAt: null,
      },
      data: { read: true },
    });

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
}

async function markAllAsRead(req, res, next) {
  try {
    await prisma.notification.updateMany({
      where: {
        userId: req.userId,
        read: false,
        deletedAt: null,
      },
      data: { read: true },
    });

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
}

async function unreadCount(req, res, next) {
  try {
    const count = await prisma.notification.count({
      where: {
        userId: req.userId,
        read: false,
        deletedAt: null,
      },
    });

    res.json({ count });
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const id = Number(req.params.id);

    const notification = await prisma.notification.findFirst({
      where: {
        id,
        userId: req.userId,
        deletedAt: null,
      },
    });

    if (!notification) {
      return res.status(404).json({ message: "Notificação não encontrada" });
    }

    await prisma.notification.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  list,
  markAsRead,
  markAllAsRead,
  unreadCount,
  remove,
};
