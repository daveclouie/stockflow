"use client";

import { Button } from "@/components/ui/button";

interface BulkActionsProps {
  selectedCount: number;
}

export default function BulkActions({
  selectedCount,
}: BulkActionsProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 p-4">
      <p className="font-medium text-red-700">
        {selectedCount} product{selectedCount > 1 ? "s" : ""} selected
      </p>

      <Button variant="destructive">
        Delete Selected
      </Button>
    </div>
  );
}