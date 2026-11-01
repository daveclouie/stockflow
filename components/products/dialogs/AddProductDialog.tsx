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

import type { ProductFormValues } from "@/lib/validations/product";

import ProductForm from "../forms/ProductForm";

interface AddProductDialogProps {
  onProductAdded: (data: ProductFormValues) => Promise<void>;
}

export default function AddProductDialog({
  onProductAdded,
}: AddProductDialogProps) {
  const [open, setOpen] = useState(false);

  const handleProductAdded = async (data: ProductFormValues) => {
    await onProductAdded(data);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Product</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
        </DialogHeader>

        <ProductForm
          onProductSaved={handleProductAdded}
        />
      </DialogContent>
    </Dialog>
  );
}
