const prisma = require("../src/config/prisma");
const bcrypt = require("bcryptjs");

async function main() {
  const email = "support@workly.com";

  const exists = await prisma.user.findUnique({
    where: { email },
  });

  if (exists) {
    console.log("Usuário de suporte já existe");
    return;
  }

  const password = await bcrypt.hash("support123", 10);

  await prisma.user.create({
    data: {
      name: "Support User",
      email,
      password,
      role: "SUPPORT",
    },
  });

  console.log("Suporte criado:", email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
