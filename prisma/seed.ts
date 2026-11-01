import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/lib/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("Seeding StockFlow database...");

  const accessories = await prisma.category.upsert({
    where: {
      name: "Accessories",
    },
    update: {},
    create: {
      name: "Accessories",
      description: "Computer and gaming accessories",
    },
  });

  const display = await prisma.category.upsert({
    where: {
      name: "Display",
    },
    update: {},
    create: {
      name: "Display",
      description: "Monitors and display equipment",
    },
  });

  const electronics = await prisma.category.upsert({
    where: {
      name: "Electronics",
    },
    update: {},
    create: {
      name: "Electronics",
      description: "Electronic equipment and devices",
    },
  });

  const logitech = await prisma.supplier.upsert({
    where: {
      id: "seed-logitech",
    },
    update: {},
    create: {
      id: "seed-logitech",
      companyName: "Logitech",
      contactName: "Logitech Supplier",
      email: "supplier@logitech.example",
    },
  });

  const keychron = await prisma.supplier.upsert({
    where: {
      id: "seed-keychron",
    },
    update: {},
    create: {
      id: "seed-keychron",
      companyName: "Keychron",
      contactName: "Keychron Supplier",
      email: "supplier@keychron.example",
    },
  });

  const aoc = await prisma.supplier.upsert({
    where: {
      id: "seed-aoc",
    },
    update: {},
    create: {
      id: "seed-aoc",
      companyName: "AOC",
      contactName: "AOC Supplier",
      email: "supplier@aoc.example",
    },
  });

  console.log("Categories created:");
  console.log(accessories.name);
  console.log(display.name);
  console.log(electronics.name);

  console.log("Suppliers created:");
  console.log(logitech.companyName);
  console.log(keychron.companyName);
  console.log(aoc.companyName);

  console.log("Seed completed successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
