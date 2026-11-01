"use client";

import type { Supplier } from "@/types/supplier";

interface SupplierTableProps {
  suppliers: Supplier[];
  onEdit: (supplier: Supplier) => void;
  onDelete: (supplier: Supplier) => void;
}

export default function SupplierTable({
  suppliers,
  onEdit,
  onDelete,
}: SupplierTableProps) {
  if (suppliers.length === 0) {
    return (
      <div className="rounded-lg border p-8 text-center text-sm text-muted-foreground">
        No suppliers found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        <thead className="border-b bg-muted/50">
          <tr>
            <th className="px-4 py-3 text-left font-medium">
              Company
            </th>

            <th className="px-4 py-3 text-left font-medium">
              Contact Person
            </th>

            <th className="px-4 py-3 text-left font-medium">
              Email
            </th>

            <th className="px-4 py-3 text-left font-medium">
              Phone
            </th>

            <th className="px-4 py-3 text-left font-medium">
              Address
            </th>

            <th className="px-4 py-3 text-right font-medium">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {suppliers.map((supplier) => (
            <tr
              key={supplier.id}
              className="border-b last:border-0"
            >
              <td className="px-4 py-3 font-medium">
                {supplier.companyName}
              </td>

              <td className="px-4 py-3">
                {supplier.contactName || "—"}
              </td>

              <td className="px-4 py-3">
                {supplier.email || "—"}
              </td>

              <td className="px-4 py-3">
                {supplier.phone || "—"}
              </td>

              <td className="max-w-xs truncate px-4 py-3 text-muted-foreground">
                {supplier.address || "—"}
              </td>

              <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => onEdit(supplier)}
                    className="rounded-md border px-3 py-1.5 text-sm hover:bg-muted"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => onDelete(supplier)}
                    className="rounded-md border border-red-200 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
