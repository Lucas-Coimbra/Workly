const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { createNotification } = require("./notificationService");

async function register({ name, email, password, phone }) {
  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    throw { status: 409, message: "Email already registered" };
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      phone,
      password: hash,
    },
  });

  await createNotification({
    userId: user.id,
    title: "Bem-vindo ao Workly 🎉",
    message: "Sua conta foi criada com sucesso. Aproveite a plataforma!",
    type: "SUCCESS",
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
  if (!user) throw { status: 401, message: "Invalid credentials" };
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) throw { status: 401, message: "Invalid credentials" };

  console.log("JWT_SECRET:", process.env.JWT_SECRET);

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  const { password: _, ...userSafe } = user;

  await createNotification({
    userId: user.id,
    title: "Novo login",
    message: "Você entrou na sua conta.",
    type: "INFO",
  });

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

module.exports = { register, login, forgotPassword, resetPassword };
