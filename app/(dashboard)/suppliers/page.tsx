"use client";

import { useEffect, useState } from "react";

import AddSupplierDialog from "@/components/suppliers/dialogs/AddSupplierDialog";
import EditSupplierDialog from "@/components/suppliers/dialogs/EditSupplierDialog";
import SupplierTable from "@/components/suppliers/tables/SupplierTable";

import type { Supplier } from "@/types/supplier";
import type { SupplierFormValues } from "@/lib/validations/supplier";

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [selectedSupplier, setSelectedSupplier] =
    useState<Supplier | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadSuppliers() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/suppliers");

        if (!response.ok) {
          throw new Error("Failed to fetch suppliers");
        }

        const data = await response.json();

        setSuppliers(
          data.map((supplier: Supplier) => ({
            id: supplier.id,
            companyName: supplier.companyName,
            contactName: supplier.contactName ?? "",
            email: supplier.email ?? "",
            phone: supplier.phone ?? "",
            address: supplier.address ?? "",
          }))
        );
      } catch (error) {
        console.error("Failed to load suppliers:", error);
        setError("Failed to load suppliers.");
      } finally {
        setLoading(false);
      }
    }

    loadSuppliers();
  }, []);

  const handleSupplierAdded = async (
    data: SupplierFormValues
  ) => {
    const response = await fetch("/api/suppliers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const result = await response.json().catch(() => null);

      throw new Error(
        result?.error || "Failed to create supplier"
      );
    }

    const createdSupplier: Supplier =
      await response.json();

    setSuppliers((currentSuppliers) => [
      createdSupplier,
      ...currentSuppliers,
    ]);
  };

  const handleEdit = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
  };

  const handleSupplierUpdated = async (
    data: SupplierFormValues
  ) => {
    if (!selectedSupplier) {
      return;
    }

    const response = await fetch("/api/suppliers", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: selectedSupplier.id,
        ...data,
      }),
    });

    if (!response.ok) {
      const result = await response.json().catch(() => null);

      throw new Error(
        result?.error || "Failed to update supplier"
      );
    }

    const updatedSupplier: Supplier =
      await response.json();

    setSuppliers((currentSuppliers) =>
      currentSuppliers.map((supplier) =>
        supplier.id === updatedSupplier.id
          ? updatedSupplier
          : supplier
      )
    );
  };

  const handleDelete = async (supplier: Supplier) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${supplier.companyName}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch("/api/suppliers", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: supplier.id,
        }),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);

        throw new Error(
          result?.error || "Failed to delete supplier"
        );
      }

      setSuppliers((currentSuppliers) =>
        currentSuppliers.filter(
          (currentSupplier) =>
            currentSupplier.id !== supplier.id
        )
      );
    } catch (error) {
      console.error("Failed to delete supplier:", error);

      window.alert(
        error instanceof Error
          ? error.message
          : "Failed to delete supplier"
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            Suppliers
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage your product suppliers.
          </p>
        </div>

        <AddSupplierDialog
          onSupplierAdded={handleSupplierAdded}
        />
      </div>

      {loading && (
        <div className="rounded-lg border p-6 text-sm text-muted-foreground">
          Loading suppliers...
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-200 p-6 text-sm text-red-600">
          {error}
        </div>
      )}

      {!loading && !error && (
        <SupplierTable
          suppliers={suppliers}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {selectedSupplier && (
        <EditSupplierDialog
          supplier={selectedSupplier}
          open={Boolean(selectedSupplier)}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedSupplier(null);
            }
          }}
          onSupplierUpdated={handleSupplierUpdated}
        />
      )}
    </div>
  );
}

