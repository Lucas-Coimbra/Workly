const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const emailService = require("./emailService");

// TTL do código: 10 minutos
const TWO_FA_EXPIRES_MIN = 10;

// Gera código temporário 6 dígitos
function generate2FACode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Função interna para validar código 2FA
async function validate2FACode(userId, code, checkEnabled = true) {
  const settings = await prisma.userSettings.findUnique({ where: { userId } });

  if (!settings)
    throw { status: 400, message: "Configurações do usuário não encontradas" };
  if (checkEnabled && !settings.twoFactorAuth)
    throw { status: 401, message: "2FA não ativado" };
  if (!settings.twoFactorTempCode || !settings.twoFactorExpiresAt)
    throw { status: 400, message: "Nenhum código 2FA ativo" };
  if (settings.twoFactorExpiresAt < new Date())
    throw { status: 400, message: "Código 2FA expirou" };
  if (settings.twoFactorTempCode !== code)
    throw { status: 401, message: "Código 2FA inválido" };

  return settings;
}

// Ativar 2FA (envia código por e-mail)
async function enable2FA(userId) {
  const code = generate2FACode();
  const expiresAt = new Date(Date.now() + TWO_FA_EXPIRES_MIN * 60 * 1000);

  await prisma.userSettings.upsert({
    where: { userId },
    update: { twoFactorTempCode: code, twoFactorExpiresAt: expiresAt },
    create: {
      userId,
      twoFactorTempCode: code,
      twoFactorExpiresAt: expiresAt,
      twoFactorAuth: false,
    },
  });

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw { status: 404, message: "Usuário não encontrado" };

  await emailService.sendMail({
    to: user.email,
    subject: "Código de verificação 2FA",
    html: `<p>Seu código temporário de 2FA é: <strong>${code}</strong>. Válido por ${TWO_FA_EXPIRES_MIN} minutos.</p>`,
  });

  return { message: "Código 2FA enviado por e-mail" };
}

// Verificar código para ativação 2FA
async function verify2FACode(userId, code) {
  await validate2FACode(userId, code, false);

  // Ativa 2FA e limpa campos temporários
  await prisma.userSettings.update({
    where: { userId },
    data: {
      twoFactorAuth: true,
      twoFactorTempCode: null,
      twoFactorExpiresAt: null,
    },
  });

  return { message: "2FA ativado com sucesso" };
}

// Gera JWT final
async function generateJWT(userId) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw { status: 404, message: "Usuário não encontrado" };

  return jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" } // mantido consistência com login normal
  );
}

// Retorna role do usuário
async function getUserRole(userId) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw { status: 404, message: "Usuário não encontrado" };
  return user.role;
}

// Verifica código 2FA para login com tempToken
async function verify2FACodeForLogin(tempToken, code) {
  let payload;
  try {
    payload = jwt.verify(tempToken, process.env.JWT_TEMP_SECRET);
  } catch {
    throw { status: 401, message: "Token temporário inválido ou expirado" };
  }

  const userId = payload.userId;

  // Valida o código 2FA
  await validate2FACode(userId, code, true);

  // Limpa código temporário
  await prisma.userSettings.update({
    where: { userId },
    data: { twoFactorTempCode: null, twoFactorExpiresAt: null },
  });

  const token = await generateJWT(userId);
  const role = await getUserRole(userId);

  return {
    token,
    user: {
      role,
    },
  };
}

async function disable2FAWithCode(userId, code) {
  await validate2FACode(userId, code); // valida 2FA
  await prisma.userSettings.update({
    where: { userId },
    data: {
      twoFactorAuth: false,
      twoFactorTempCode: null,
      twoFactorExpiresAt: null,
    },
  });
  return { message: "2FA desativado com sucesso" };
}

async function requestDisable2FACode(userId) {
  const code = generate2FACode();
  const expiresAt = new Date(Date.now() + TWO_FA_EXPIRES_MIN * 60 * 1000);

  await prisma.userSettings.update({
    where: { userId },
    data: {
      twoFactorTempCode: code,
      twoFactorExpiresAt: expiresAt,
    },
  });

  const user = await prisma.user.findUnique({ where: { id: userId } });

  await emailService.sendMail({
    to: user.email,
    subject: "Confirmação para desativar o 2FA",
    html: `<p>Seu código para desativar o 2FA é <strong>${code}</strong></p>`,
  });

  return { message: "Código enviado para desativação do 2FA" };
}

module.exports = {
  enable2FA,
  verify2FACode,
  generateJWT,
  getUserRole,
  verify2FACodeForLogin,
  disable2FAWithCode,
  requestDisable2FACode,
};
