"use client";

import type { Product } from "@/lib/data/products";

import { columns } from "./table/columns";
import { DataTable } from "./table/data-table";

interface ProductTableProps {
  products: Product[];
}

export default function ProductTable({
  products,
}: ProductTableProps) {
  return (
    <DataTable
      columns={columns}
      data={products}
    />
  );
}
