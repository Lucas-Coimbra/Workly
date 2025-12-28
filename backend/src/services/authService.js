const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { createNotification } = require("./notificationService");
const twoFAService = require("./twoFAService");

async function register({ name, email, password, phone }) {
  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    throw { status: 409, message: "Email já registrado!" };
  }

  const hash = await bcrypt.hash(password, 10);

  const basicPlan = await prisma.plan.findUnique({
    where: { name: "BASIC" },
  });

  if (!basicPlan) {
    throw new Error("Plano BASIC não encontrado");
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      phone,
      password: hash,
      planId: basicPlan.id,
    },
  });

  await prisma.notification.create({
    data: {
      userId: user.id,
      title: "Bem-vindo ao Workly 🎉",
      message:
        "Sua conta foi criada com sucesso! Agora você já pode reservar espaços, gerenciar suas atividades e muito mais.",
    },
  });

  // 🔐 gera token igual ao login
  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  const { password: _, ...userSafe } = user;

  return {
    token,
    user: userSafe,
  };
}

async function login({ email, password }) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw { status: 401, message: "Credenciais inválidas" };

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) throw { status: 401, message: "Credenciais inválidas" };

  const settings = await prisma.userSettings.findUnique({
    where: { userId: user.id },
  });

  const twoFactorAuth = settings?.twoFactorAuth === true;

  const { password: _, ...userSafe } = user;

  if (twoFactorAuth) {
    const tempToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_TEMP_SECRET,
      { expiresIn: "10m" }
    );

    // envia código
    await twoFAService.enable2FA(user.id);

    return {
      twoFAEnabled: true,
      tempToken,
      user: userSafe, // 🔥 contrato respeitado
    };
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    token,
    user: userSafe,
  };
}

async function forgotPassword(email) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  // Segurança: não revela se existe
  if (!user) return;

  const token = crypto.randomBytes(32).toString("hex");

  await prisma.passwordResetToken.create({
    data: {
      token,
      userId: user.id,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1h
    },
  });

  // 🔜 Envio de email entra aqui
  console.log(
    `🔐 Link de recuperação: http://localhost:5173/reset-password?token=${token}`
  );
}

async function resetPassword(token, newPassword) {
  const record = await prisma.passwordResetToken.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!record || record.used || record.expiresAt < new Date()) {
    throw new Error("Token inválido ou expirado");
  }

  const hashed = await bcrypt.hash(newPassword, 10);

  await prisma.$transaction([
    prisma.user.update({
      where: { id: record.userId },
      data: { password: hashed },
    }),
    prisma.passwordResetToken.update({
      where: { token },
      data: { used: true },
    }),
  ]);

  await createNotification({
    userId: record.userId,
    title: "Senha alterada",
    message: "Sua senha foi alterada com sucesso.",
    type: "WARNING",
  });
}

async function generateFinalJWT(userId) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw { status: 404, message: "Usuário não encontrado" };

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
  return token;
}

function verifyTempToken(tempToken) {
  try {
    const payload = jwt.verify(tempToken, process.env.JWT_TEMP_SECRET);
    return payload.userId;
  } catch {
    throw { status: 401, message: "Token temporário inválido ou expirado" };
  }
}

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
  generateFinalJWT,
  verifyTempToken,
};
