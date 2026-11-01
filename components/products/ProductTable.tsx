"use client";

import type { Product } from "@/types/product";

import { columns } from "./table/columns";
import { DataTable } from "./table/data-table";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export default function ProductTable({
  products,
  onEdit,
  onDelete,
}: ProductTableProps) {
  return (
    <DataTable
      columns={columns(onEdit, onDelete)}
      data={products}
    />
  );
}
