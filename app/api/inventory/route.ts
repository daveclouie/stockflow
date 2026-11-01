import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const transactions =
      await prisma.inventoryTransaction.findMany({
        orderBy: {
          createdAt: "desc",
        },
        include: {
          product: true,
          profile: true,
        },
      });

    return NextResponse.json(transactions);
  } catch (error) {
    console.error("GET /api/inventory error:", error);

    return NextResponse.json(
      { error: "Failed to fetch inventory transactions" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      productId,
      profileId,
      quantity,
      type,
      notes,
    } = body;

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    if (!profileId) {
      return NextResponse.json(
        { error: "Profile ID is required" },
        { status: 400 }
      );
    }

    if (!quantity || quantity <= 0) {
      return NextResponse.json(
        { error: "Quantity must be greater than 0" },
        { status: 400 }
      );
    }

    if (type !== "STOCK_IN" && type !== "STOCK_OUT") {
      return NextResponse.json(
        { error: "Invalid transaction type" },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    const profile = await prisma.profile.findUnique({
      where: {
        id: profileId,
      },
    });

    if (!profile) {
      return NextResponse.json(
        { error: "Profile not found" },
        { status: 404 }
      );
    }

    if (
      type === "STOCK_OUT" &&
      product.quantity < quantity
    ) {
      return NextResponse.json(
        {
          error: `Insufficient stock. Current stock: ${product.quantity}`,
        },
        { status: 400 }
      );
    }

    const stockChange =
      type === "STOCK_IN" ? quantity : -quantity;

    const transaction =
      await prisma.$transaction(async (tx) => {
        const updatedProduct =
          await tx.product.update({
            where: {
              id: productId,
            },
            data: {
              quantity: {
                increment: stockChange,
              },
            },
          });

        const inventoryTransaction =
          await tx.inventoryTransaction.create({
            data: {
              productId,
              profileId,
              quantity,
              type,
              notes: notes || null,
            },
            include: {
              product: true,
              profile: true,
            },
          });

        return {
          transaction: inventoryTransaction,
          product: updatedProduct,
        };
      });

    return NextResponse.json(transaction, {
      status: 201,
    });
  } catch (error) {
    console.error("POST /api/inventory error:", error);

    return NextResponse.json(
      { error: "Failed to process inventory transaction" },
      { status: 500 }
    );
  }
}
