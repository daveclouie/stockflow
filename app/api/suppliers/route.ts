import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const suppliers = await prisma.supplier.findMany({
      orderBy: {
        companyName: "asc",
      },
    });

    return NextResponse.json(suppliers);
  } catch (error) {
    console.error("GET /api/suppliers error:", error);

    return NextResponse.json(
      { error: "Failed to fetch suppliers" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      companyName,
      contactName,
      email,
      phone,
      address,
    } = body;

    if (!companyName) {
      return NextResponse.json(
        { error: "Company name is required" },
        { status: 400 }
      );
    }

    const existingSupplier =
      await prisma.supplier.findFirst({
        where: {
          companyName,
        },
      });

    if (existingSupplier) {
      return NextResponse.json(
        { error: "Supplier already exists" },
        { status: 400 }
      );
    }

    const supplier = await prisma.supplier.create({
      data: {
        companyName,
        contactName: contactName || null,
        email: email || null,
        phone: phone || null,
        address: address || null,
      },
    });

    return NextResponse.json(supplier, {
      status: 201,
    });
  } catch (error) {
    console.error("POST /api/suppliers error:", error);

    return NextResponse.json(
      { error: "Failed to create supplier" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    const {
      id,
      companyName,
      contactName,
      email,
      phone,
      address,
    } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Supplier ID is required" },
        { status: 400 }
      );
    }

    if (!companyName) {
      return NextResponse.json(
        { error: "Company name is required" },
        { status: 400 }
      );
    }

    const existingSupplier =
      await prisma.supplier.findUnique({
        where: {
          id,
        },
      });

    if (!existingSupplier) {
      return NextResponse.json(
        { error: "Supplier not found" },
        { status: 404 }
      );
    }

    const duplicateSupplier =
      await prisma.supplier.findFirst({
        where: {
          companyName,
          NOT: {
            id,
          },
        },
      });

    if (duplicateSupplier) {
      return NextResponse.json(
        { error: "Another supplier already uses this company name" },
        { status: 400 }
      );
    }

    const supplier = await prisma.supplier.update({
      where: {
        id,
      },
      data: {
        companyName,
        contactName: contactName || null,
        email: email || null,
        phone: phone || null,
        address: address || null,
      },
    });

    return NextResponse.json(supplier);
  } catch (error) {
    console.error("PATCH /api/suppliers error:", error);

    return NextResponse.json(
      { error: "Failed to update supplier" },
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
        { error: "Supplier ID is required" },
        { status: 400 }
      );
    }

    const existingSupplier =
      await prisma.supplier.findUnique({
        where: {
          id,
        },
      });

    if (!existingSupplier) {
      return NextResponse.json(
        { error: "Supplier not found" },
        { status: 404 }
      );
    }

    const productsUsingSupplier =
      await prisma.product.count({
        where: {
          supplierId: id,
        },
      });

    if (productsUsingSupplier > 0) {
      return NextResponse.json(
        {
          error:
            "Cannot delete supplier because products are using it",
        },
        { status: 400 }
      );
    }

    await prisma.supplier.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Supplier deleted successfully",
    });
  } catch (error) {
    console.error("DELETE /api/suppliers error:", error);

    return NextResponse.json(
      { error: "Failed to delete supplier" },
      { status: 500 }
    );
  }
}
