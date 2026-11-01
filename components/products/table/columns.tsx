"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import ProductActions from "../ProductActions";
import type { Product } from "@/types/product";

export const columns = (
  onEdit: (product: Product) => void,
  onDelete: (product: Product) => void
): ColumnDef<Product>[] => [
  {
    id: "select",

    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),

    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) =>
          row.toggleSelected(!!value)
        }
        aria-label="Select row"
      />
    ),

    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "name",

    header: ({ column }) => (
      <button
        className="font-semibold hover:text-blue-600"
        onClick={() =>
          column.toggleSorting(
            column.getIsSorted() === "asc"
          )
        }
      >
        Product
      </button>
    ),
  },

  {
    accessorKey: "sku",
    header: "SKU",
  },

  {
    accessorKey: "category",
    header: "Category",

    cell: ({ row }) => {
      return row.original.category;
    },
  },

  {
    accessorKey: "stock",
    header: "Stock",
  },

  {
    accessorKey: "sellingPrice",

    header: "Selling Price",

    cell: ({ row }) => {
      const price = row.original.sellingPrice;

      return `PHP ${price.toLocaleString("en-PH", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    },
  },

  {
    accessorKey: "status",

    header: "Status",

    cell: ({ row }) => {
      const status = row.original.status;

      return (
        <Badge
          variant={
            status === "Active"
              ? "default"
              : status === "Low"
                ? "secondary"
                : "destructive"
          }
        >
          {status}
        </Badge>
      );
    },
  },

  {
    id: "actions",

    header: "",

    cell: ({ row }) => (
      <ProductActions
        product={row.original}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    ),
  },
];
