"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { Product } from "@/types/product";
import type { ProductFormValues } from "@/lib/validations/product";

import ProductForm from "../forms/ProductForm";

interface EditProductDialogProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProductSaved: (data: ProductFormValues) => Promise<void>;
}

export default function EditProductDialog({
  product,
  open,
  onOpenChange,
  onProductSaved,
}: EditProductDialogProps) {
  const [formKey, setFormKey] = useState(0);

  const handleSaved = async (data: ProductFormValues) => {
    await onProductSaved(data);
    onOpenChange(false);
    setFormKey((current) => current + 1);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>

        <ProductForm
          key={`${product.id}-${formKey}`}
          product={product}
          onProductSaved={handleSaved}
        />
      </DialogContent>
    </Dialog>
  );
}
