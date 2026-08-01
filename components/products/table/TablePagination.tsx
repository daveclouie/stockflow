"use client";

import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

interface TablePaginationProps<TData> {
  table: Table<TData>;
}

export default function TablePagination<TData>({
  table,
}: TablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between border-t p-4">

      <div className="text-sm text-muted-foreground">
        Page{" "}
        <strong>
          {table.getState().pagination.pageIndex + 1}
        </strong>{" "}
        of{" "}
        <strong>
          {table.getPageCount()}
        </strong>
      </div>

      <div className="flex gap-2">

        <Button
          variant="outline"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>

        <Button
          variant="outline"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>

      </div>

    </div>
  );
}