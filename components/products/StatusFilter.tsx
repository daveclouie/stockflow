"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StatusFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export default function StatusFilter({
  value,
  onChange,
}: StatusFilterProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-44">
        <SelectValue placeholder="All Status" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="all">All Status</SelectItem>
        <SelectItem value="Active">Active</SelectItem>
        <SelectItem value="Low Stock">Low Stock</SelectItem>
        <SelectItem value="Out of Stock">Out of Stock</SelectItem>
      </SelectContent>
    </Select>
  );
}
