"use client";

import { useMemo, useState } from "react";

import ProductTable from "@/components/products/ProductTable";
import ProductToolbar from "@/components/products/ProductToolbar";

import { products } from "@/lib/data/products";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "all" ||
        product.category === category;

      const matchesStatus =
        status === "all" ||
        product.status === status;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    });
  }, [search, category, status]);

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-4xl font-bold">
          Products
        </h1>
      </div>

      <ProductToolbar
        search={search}
        category={category}
        status={status}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
        onStatusChange={setStatus}
      />

      <ProductTable products={filteredProducts} />

    </div>
  );
}
