require("dotenv").config();

console.log("DATABASE_URL no Render:", process.env.DATABASE_URL);

const app = require("./app");

const prisma = require("./config/prisma");

const PORT = process.env.PORT || 4000;

// limpeza ao subir o servidor
async function cleanupExpiredTokens() {
  await prisma.passwordResetToken.deleteMany({
    where: {
      expiresAt: {
        lt: new Date(),
      },
    },
  });
}

cleanupExpiredTokens();

app.listen(PORT, () => {
  console.log(`🚀 Workly API rodando na porta ${PORT}`);
});
