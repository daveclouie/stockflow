"use client";

import { useEffect, useMemo, useState } from "react";

import ProductTable from "@/components/products/ProductTable";
import ProductToolbar from "@/components/products/ProductToolbar";

import type { Product } from "@/types/product";
import type { ProductFormValues } from "@/lib/validations/product";

interface ApiProduct {
  id: string;
  name: string;
  sku: string;
  category: string;
  supplier: string;
  costPrice: number;
  sellingPrice: number;
  stock: number;
  minimumStock: number;
  description: string;
  status: "Active" | "Low" | "Out of Stock";
}

function mapApiProduct(product: ApiProduct): Product {
  return {
    id: product.id,
    name: product.name,
    sku: product.sku,
    category: product.category,
    supplier: product.supplier,
    costPrice: Number(product.costPrice),
    sellingPrice: Number(product.sellingPrice),
    stock: product.stock,
    minimumStock: product.minimumStock,
    description: product.description ?? "",
    status: product.status,
  };
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/products");

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data: ApiProduct[] = await response.json();

        setProducts(data.map(mapApiProduct));
      } catch (error) {
        console.error("Failed to load products:", error);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        product.name.toLowerCase().includes(searchValue) ||
        product.sku.toLowerCase().includes(searchValue);

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
  }, [products, search, category, status]);

  const handleProductAdded = async (data: ProductFormValues) => {
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          sku: data.sku,
          category: data.category,
          supplier: data.supplier,
          costPrice: data.costPrice,
          sellingPrice: data.sellingPrice,
          stock: data.stock,
          minimumStock: data.minimumStock,
          description: data.description || null,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      const createdProduct: ApiProduct = await response.json();

      setProducts((currentProducts) => [
        mapApiProduct(createdProduct),
        ...currentProducts,
      ]);
    } catch (error) {
      console.error("Failed to create product:", error);
      throw error;
    }
  };

  const handleProductEdited = (updatedProduct: Product) => {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === updatedProduct.id
          ? updatedProduct
          : product
      )
    );
  };

  const handleProductDeleted = (product: Product) => {
    setProducts((currentProducts) =>
      currentProducts.filter(
        (currentProduct) =>
          currentProduct.id !== product.id
      )
    );
  };

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
        onProductAdded={handleProductAdded}
      />

      {loading && (
        <div className="rounded-lg border p-6 text-sm text-muted-foreground">
          Loading products...
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-200 p-6 text-sm text-red-600">
          {error}
        </div>
      )}

      {!loading && !error && (
        <ProductTable
          products={filteredProducts}
          onEdit={handleProductEdited}
          onDelete={handleProductDeleted}
        />
      )}

    </div>
  );
}


