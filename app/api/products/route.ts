import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

function formatProduct(product: {
  id: string;
  name: string;
  sku: string;
  costPrice: unknown;
  sellingPrice: unknown;
  quantity: number;
  minimumStock: number;
  description: string | null;
  category: { name: string };
  supplier: { companyName: string };
}) {
  const status =
    product.quantity === 0
      ? "Out of Stock"
      : product.quantity <= product.minimumStock
        ? "Low"
        : "Active";

  return {
    id: product.id,
    name: product.name,
    sku: product.sku,
    category: product.category.name,
    supplier: product.supplier.companyName,
    costPrice: Number(product.costPrice),
    sellingPrice: Number(product.sellingPrice),
    stock: product.quantity,
    minimumStock: product.minimumStock,
    description: product.description ?? "",
    status,
  } as const;
}

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        supplier: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products.map(formatProduct));
  } catch (error) {
    console.error("GET /api/products error:", error);

    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log("POST /api/products BODY:", body);

    const name = String(body.name ?? "").trim();
    const sku = String(body.sku ?? "").trim();
    const category = String(body.category ?? "").trim();
    const supplier = String(body.supplier ?? "").trim();

    const costPrice = Number(body.costPrice);
    const sellingPrice = Number(body.sellingPrice);
    const stock = Number(body.stock ?? 0);
    const minimumStock = Number(body.minimumStock ?? 5);
    const description = String(body.description ?? "").trim();

    console.log("POST /api/products CLEANED:", {
      name,
      sku,
      category,
      supplier,
      costPrice,
      sellingPrice,
      stock,
      minimumStock,
      description,
    });

    if (
      !name ||
      !sku ||
      !category ||
      !supplier ||
      !Number.isFinite(costPrice) ||
      !Number.isFinite(sellingPrice)
    ) {
      return NextResponse.json(
        { error: "Missing or invalid required product fields" },
        { status: 400 }
      );
    }

    const categoryRecord = await prisma.category.findFirst({
      where: {
        name: {
          equals: category,
          mode: "insensitive",
        },
      },
    });

    if (!categoryRecord) {
      console.error("CATEGORY NOT FOUND:", category);

      return NextResponse.json(
        { error: `Category "${category}" was not found` },
        { status: 400 }
      );
    }

    const supplierRecord = await prisma.supplier.findFirst({
      where: {
        companyName: {
          equals: supplier,
          mode: "insensitive",
        },
      },
    });

    if (!supplierRecord) {
      console.error("SUPPLIER NOT FOUND:", supplier);

      return NextResponse.json(
        { error: `Supplier "${supplier}" was not found` },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        sku,
        costPrice,
        sellingPrice,
        quantity: Number.isFinite(stock) ? stock : 0,
        minimumStock: Number.isFinite(minimumStock) ? minimumStock : 5,
        description: description || null,
        categoryId: categoryRecord.id,
        supplierId: supplierRecord.id,
      },
      include: {
        category: true,
        supplier: true,
      },
    });

    console.log("PRODUCT CREATED:", product.id);

    return NextResponse.json(formatProduct(product), {
      status: 201,
    });
  } catch (error) {
    console.error("POST /api/products error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to create product",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    const {
      id,
      name,
      sku,
      category,
      supplier,
      costPrice,
      sellingPrice,
      stock,
      minimumStock,
      description,
    } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    const categoryRecord = await prisma.category.findFirst({
      where: {
        name: {
          equals: String(category ?? "").trim(),
          mode: "insensitive",
        },
      },
    });

    if (!categoryRecord) {
      return NextResponse.json(
        { error: `Category "${category}" was not found` },
        { status: 400 }
      );
    }

    const supplierRecord = await prisma.supplier.findFirst({
      where: {
        companyName: {
          equals: String(supplier ?? "").trim(),
          mode: "insensitive",
        },
      },
    });

    if (!supplierRecord) {
      return NextResponse.json(
        { error: `Supplier "${supplier}" was not found` },
        { status: 400 }
      );
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        name: String(name ?? "").trim(),
        sku: String(sku ?? "").trim(),
        costPrice,
        sellingPrice,
        quantity: stock,
        minimumStock,
        description: description ? String(description).trim() : null,
        categoryId: categoryRecord.id,
        supplierId: supplierRecord.id,
      },
      include: {
        category: true,
        supplier: true,
      },
    });

    return NextResponse.json(formatProduct(product));
  } catch (error) {
    console.error("PATCH /api/products error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to update product",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();

    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("DELETE /api/products error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to delete product",
      },
      { status: 500 }
    );
  }
}
