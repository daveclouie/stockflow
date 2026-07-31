"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AddProductDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Product</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

          <Input placeholder="Product Name" />

          <Input placeholder="Category" />

          <Input type="number" placeholder="Stock" />

          <Input type="number" placeholder="Price" />

          <Button className="w-full">
            Save Product
          </Button>

        </div>
      </DialogContent>
    </Dialog>
  );
}
