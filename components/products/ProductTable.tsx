"use client";

import { products } from "@/lib/data/products";
import { Badge } from "@/components/ui/badge";

export default function ProductTable() {
  return (
    <div className="rounded-xl border bg-white">
      <table className="w-full">
        <thead className="border-b bg-gray-50">
          <tr>
            <th className="p-4 text-left">Product</th>
            <th className="p-4 text-left">Category</th>
            <th className="p-4 text-left">Stock</th>
            <th className="p-4 text-left">Price</th>
            <th className="p-4 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b hover:bg-gray-50">
              <td className="p-4 font-medium">{product.name}</td>
              <td className="p-4">{product.category}</td>
              <td className="p-4">{product.stock}</td>
              <td className="p-4">?{product.price}</td>
              <td className="p-4">
                <Badge
                  variant={
                    product.status === "Active"
                      ? "default"
                      : "destructive"
                  }
                >
                  {product.status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
