"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import type { SupplierFormValues } from "@/lib/validations/supplier";

import SupplierForm from "../forms/SupplierForm";

interface AddSupplierDialogProps {
  onSupplierAdded: (
    data: SupplierFormValues
  ) => Promise<void>;
}

export default function AddSupplierDialog({
  onSupplierAdded,
}: AddSupplierDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSupplierAdded = async (
    data: SupplierFormValues
  ) => {
    await onSupplierAdded(data);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Supplier</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            Add Supplier
          </DialogTitle>
        </DialogHeader>

        <SupplierForm
          onSupplierSaved={handleSupplierAdded}
        />
      </DialogContent>
    </Dialog>
  );
}
