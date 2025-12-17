const prisma = require("../config/prisma");

async function list(req, res, next) {
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: req.user.userId },
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
    const result = await prisma.notification.updateMany({
      where: {
        id: Number(req.params.id),
        userId: req.user.userId,
      },
      data: { read: true },
    });

    if (result.count === 0) {
      return res.sendStatus(404);
    }

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
}

async function markAllAsRead(req, res, next) {
  try {
    await prisma.notification.updateMany({
      where: {
        userId: req.user.userId,
        read: false,
      },
      data: { read: true },
    });

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
}

module.exports = { list, markAsRead, markAllAsRead };
