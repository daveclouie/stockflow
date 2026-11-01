import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/lib/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding StockFlow products...");

  const accessories = await prisma.category.findUnique({
    where: {
      name: "Accessories",
    },
  });

  const display = await prisma.category.findUnique({
    where: {
      name: "Display",
    },
  });

  const logitech = await prisma.supplier.findFirst({
    where: {
      companyName: "Logitech",
    },
  });

  const keychron = await prisma.supplier.findFirst({
    where: {
      companyName: "Keychron",
    },
  });

  const aoc = await prisma.supplier.findFirst({
    where: {
      companyName: "AOC",
    },
  });

  if (!accessories || !display || !logitech || !keychron || !aoc) {
    throw new Error(
      "Required categories or suppliers were not found."
    );
  }

  await prisma.product.upsert({
    where: {
      sku: "GM-001",
    },
    update: {},
    create: {
      name: "Gaming Mouse",
      sku: "GM-001",
      categoryId: accessories.id,
      supplierId: logitech.id,
      costPrice: 650,
      sellingPrice: 950,
      quantity: 42,
      minimumStock: 5,
      description: "Gaming mouse",
    },
  });

  await prisma.product.upsert({
    where: {
      sku: "KB-001",
    },
    update: {},
    create: {
      name: "Mechanical Keyboard",
      sku: "KB-001",
      categoryId: accessories.id,
      supplierId: keychron.id,
      costPrice: 1800,
      sellingPrice: 2500,
      quantity: 8,
      minimumStock: 10,
      description: "Mechanical keyboard",
    },
  });

  await prisma.product.upsert({
    where: {
      sku: "MON-001",
    },
    update: {},
    create: {
      name: "24-inch Monitor",
      sku: "MON-001",
      categoryId: display.id,
      supplierId: aoc.id,
      costPrice: 5500,
      sellingPrice: 7200,
      quantity: 15,
      minimumStock: 5,
      description: "24-inch monitor",
    },
  });

  console.log("Products seeded successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
