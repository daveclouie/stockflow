"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategoryFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CategoryFilter({
  value,
  onChange,
}: CategoryFilterProps) {
  return (
    <Select
      value={value}
      onValueChange={onChange}
    >
      <SelectTrigger className="w-52">
        <SelectValue placeholder="All Categories" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="all">
          All Categories
        </SelectItem>

        <SelectItem value="Electronics">
          Electronics
        </SelectItem>

        <SelectItem value="Accessories">
          Accessories
        </SelectItem>

        <SelectItem value="Office">
          Office
        </SelectItem>

        <SelectItem value="Gaming">
          Gaming
        </SelectItem>

      </SelectContent>
    </Select>
  );
}
