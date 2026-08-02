"use client";

import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import StatusFilter from "./StatusFilter";
import AddProductDialog from "./dialogs/AddProductDialog";

interface ProductToolbarProps {
  search: string;
  category: string;
  status: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export default function ProductToolbar({
  search,
  category,
  status,
  onSearchChange,
  onCategoryChange,
  onStatusChange,
}: ProductToolbarProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

      <div className="flex flex-col gap-4 md:flex-row">

        <SearchBar
          value={search}
          onChange={onSearchChange}
        />

        <CategoryFilter
          value={category}
          onChange={onCategoryChange}
        />

        <StatusFilter
          value={status}
          onChange={onStatusChange}
        />

      </div>

      <AddProductDialog />

    </div>
  );
}
