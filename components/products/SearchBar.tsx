"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({
  value,
  onChange,
}: SearchBarProps) {
  return (
    <div className="relative max-w-sm">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />

      <Input
        className="pl-10"
        placeholder="Search products..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
