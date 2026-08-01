"use client";

import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SortButtonProps {
  label: string;
  onClick: () => void;
}

export default function SortButton({
  label,
  onClick,
}: SortButtonProps) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className="h-auto p-0 font-semibold hover:bg-transparent"
    >
      {label}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
}
