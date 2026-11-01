"use client";

import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import StatusFilter from "./StatusFilter";
import AddProductDialog from "./dialogs/AddProductDialog";

import type { ProductFormValues } from "@/lib/validations/product";

interface ProductToolbarProps {
  search: string;
  category: string;
  status: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onProductAdded: (data: ProductFormValues) => Promise<void>;
}

export default function ProductToolbar({
  search,
  category,
  status,
  onSearchChange,
  onCategoryChange,
  onStatusChange,
  onProductAdded,
}: ProductToolbarProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <SearchBar
          value={search}
          onChange={onSearchChange}
        />

        <AddProductDialog
          onProductAdded={onProductAdded}
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <CategoryFilter
          value={category}
          onChange={onCategoryChange}
        />

        <StatusFilter
          value={status}
          onChange={onStatusChange}
        />
      </div>
    </div>
  );
}
