"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { Supplier } from "@/types/supplier";
import type { SupplierFormValues } from "@/lib/validations/supplier";

import SupplierForm from "../forms/SupplierForm";

interface EditSupplierDialogProps {
  supplier: Supplier;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSupplierUpdated: (
    data: SupplierFormValues
  ) => Promise<void>;
}

export default function EditSupplierDialog({
  supplier,
  open,
  onOpenChange,
  onSupplierUpdated,
}: EditSupplierDialogProps) {
  const [saving, setSaving] = useState(false);

  const handleSupplierUpdated = async (
    data: SupplierFormValues
  ) => {
    try {
      setSaving(true);

      await onSupplierUpdated(data);

      onOpenChange(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            Edit Supplier
          </DialogTitle>
        </DialogHeader>

        <SupplierForm
          supplier={supplier}
          onSupplierSaved={handleSupplierUpdated}
        />

        {saving && (
          <p className="text-center text-sm text-muted-foreground">
            Saving changes...
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
