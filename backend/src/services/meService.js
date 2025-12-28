const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

async function getMe(userId) {
  // garante que o userSettings exista
  await prisma.userSettings.upsert({
    where: { userId },
    update: {},
    create: { userId },
  });

  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      createdAt: true,

      plan: {
        select: {
          name: true,
          price: true,
          monthlyHours: true,
        },
      },

      // 👇 NOVO
      settings: {
        select: {
          emailNotifications: true,
          smsNotifications: true,
          reservationReminders: true,
          promotionalEmails: true,
          weeklyReport: true,
          language: true,
          timezone: true,
          currency: true,
          twoFactorAuth: true,
        },
      },

      notifications: {
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          message: true,
          type: true,
          readAt: true,
          createdAt: true,
        },
      },
    },
  });
}

async function updateNotifications(userId, data) {
  const updateData = {};

  if (data.emailNotifications !== undefined)
    updateData.emailNotifications = data.emailNotifications;

  if (data.smsNotifications !== undefined)
    updateData.smsNotifications = data.smsNotifications;

  if (data.reservationReminders !== undefined)
    updateData.reservationReminders = data.reservationReminders;

  if (data.promotionalEmails !== undefined)
    updateData.promotionalEmails = data.promotionalEmails;

  if (data.weeklyReport !== undefined)
    updateData.weeklyReport = data.weeklyReport;

  return prisma.userSettings.update({
    where: { userId },
    data: updateData,
  });
}

async function updatePreferences(userId, data) {
  const { language, timezone, currency } = data;

  return prisma.userSettings.update({
    where: { userId },
    data: {
      language,
      timezone,
      currency,
    },
  });
}

async function updateSecurity(userId, data) {
  const { currentPassword, newPassword, twoFactorAuth } = data;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (newPassword) {
    const valid = await bcrypt.compare(currentPassword, user.password);
    if (!valid) {
      throw new Error("Invalid current password");
    }

    const samePassword = await bcrypt.compare(newPassword, user.password);
    if (samePassword) {
      const err = new Error("New password must be different from current");
      err.status = 400;
      throw err;
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashed },
    });
  }

  if (typeof twoFactorAuth === "boolean") {
    await prisma.userSettings.update({
      where: { userId },
      data: { twoFactorAuth },
    });
  }
}

async function deleteAccount(userId, password) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    const err = new Error("Usuário não encontrado");
    err.status = 404;
    throw err;
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    const err = new Error("Senha incorreta");
    err.status = 401;
    throw err;
  }

  await prisma.user.delete({
    where: { id: userId },
  });
}

module.exports = {
  getMe,
  updateNotifications,
  updatePreferences,
  updateSecurity,
  deleteAccount,
};
