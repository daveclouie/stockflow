"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import ProductActions from "../ProductActions";
import type { Product } from "@/lib/data/products";

export const columns: ColumnDef<Product>[] = [
  {
  accessorKey: "name",
  header: ({ column }) => (
    <button
      className="font-semibold hover:text-blue-600"
      onClick={() =>
        column.toggleSorting(column.getIsSorted() === "asc")
      }
    >
      Product
    </button>
  ),
},
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => `?${row.original.price}`,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant={
          row.original.status === "Active"
            ? "default"
            : "destructive"
        }
      >
        {row.original.status}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: "",
    cell: () => <ProductActions />,
  },
];
