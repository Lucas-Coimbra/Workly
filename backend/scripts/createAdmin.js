const prisma = require("../src/config/prisma");
const bcrypt = require("bcryptjs");

async function main() {
  const password = await bcrypt.hash("admin123", 10);

  const admin = await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@workly.com",
      password,
      role: "ADMIN",
    },
  });

  console.log("Admin criado:", admin.email);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
