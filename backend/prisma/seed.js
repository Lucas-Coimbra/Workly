const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const plans = [
    {
      name: "BASIC",
      price: 0,
      monthlyHours: 20,
    },
    {
      name: "GOLD",
      price: 99.9,
      monthlyHours: 60,
    },
    {
      name: "PREMIUM",
      price: 199.9,
      monthlyHours: 120,
    },
  ];

  for (const plan of plans) {
    await prisma.plan.upsert({
      where: { name: plan.name },
      update: {},
      create: plan,
    });
  }

  console.log("✅ Plans seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
