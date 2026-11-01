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

import type { CategoryFormValues } from "@/lib/validations/category";

import CategoryForm from "../forms/CategoryForm";

interface AddCategoryDialogProps {
  onCategoryAdded: (data: CategoryFormValues) => Promise<void>;
}

export default function AddCategoryDialog({
  onCategoryAdded,
}: AddCategoryDialogProps) {
  const [open, setOpen] = useState(false);

  const handleCategoryAdded = async (
    data: CategoryFormValues
  ) => {
    await onCategoryAdded(data);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Category</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
        </DialogHeader>

        <CategoryForm
          onCategorySaved={handleCategoryAdded}
        />
      </DialogContent>
    </Dialog>
  );
}
