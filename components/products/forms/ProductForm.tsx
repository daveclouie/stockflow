"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  productSchema,
  type ProductFormValues,
} from "@/lib/validations/product";

import type { Product } from "@/types/product";

interface CategoryOption {
  id: string;
  name: string;
}

interface SupplierOption {
  id: string;
  companyName: string;
}

interface ProductFormProps {
  product?: Product;
  onProductSaved: (product: ProductFormValues) => void | Promise<void>;
}

export default function ProductForm({
  product,
  onProductSaved,
}: ProductFormProps) {
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [suppliers, setSuppliers] = useState<SupplierOption[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name ?? "",
      sku: product?.sku ?? "",
      category: product?.category ?? "",
      supplier: product?.supplier ?? "",
      costPrice: product?.costPrice ?? 0,
      sellingPrice: product?.sellingPrice ?? 0,
      stock: product?.stock ?? 0,
      minimumStock: product?.minimumStock ?? 5,
      description: product?.description ?? "",
    },
  });

  useEffect(() => {
    async function loadOptions() {
      try {
        setLoadingOptions(true);

        const [categoriesResponse, suppliersResponse] = await Promise.all([
          fetch("/api/categories"),
          fetch("/api/suppliers"),
        ]);

        if (!categoriesResponse.ok || !suppliersResponse.ok) {
          throw new Error("Failed to load categories or suppliers");
        }

        const categoriesData: CategoryOption[] =
          await categoriesResponse.json();

        const suppliersData: SupplierOption[] =
          await suppliersResponse.json();

        setCategories(categoriesData);
        setSuppliers(suppliersData);
      } catch (error) {
        console.error("Failed to load product options:", error);
      } finally {
        setLoadingOptions(false);
      }
    }

    loadOptions();
  }, []);

  useEffect(() => {
    reset({
      name: product?.name ?? "",
      sku: product?.sku ?? "",
      category: product?.category ?? "",
      supplier: product?.supplier ?? "",
      costPrice: product?.costPrice ?? 0,
      sellingPrice: product?.sellingPrice ?? 0,
      stock: product?.stock ?? 0,
      minimumStock: product?.minimumStock ?? 5,
      description: product?.description ?? "",
    });
  }, [product, reset]);

  const onSubmit = async (data: ProductFormValues) => {
    await onProductSaved(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="name">Product Name</Label>

        <Input
          id="name"
          placeholder="Enter product name"
          {...register("name")}
        />

        {errors.name && (
          <p className="text-sm text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="sku">SKU</Label>

        <Input
          id="sku"
          placeholder="e.g. GM-001"
          {...register("sku")}
        />

        {errors.sku && (
          <p className="text-sm text-red-500">
            {errors.sku.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>

          <select
            id="category"
            {...register("category")}
            disabled={loadingOptions}
            className="h-8 w-full rounded-lg border border-input bg-background px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">
              {loadingOptions ? "Loading categories..." : "Select category"}
            </option>

            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>

          {errors.category && (
            <p className="text-sm text-red-500">
              {errors.category.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="supplier">Supplier</Label>

          <select
            id="supplier"
            {...register("supplier")}
            disabled={loadingOptions}
            className="h-8 w-full rounded-lg border border-input bg-background px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">
              {loadingOptions ? "Loading suppliers..." : "Select supplier"}
            </option>

            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.companyName}>
                {supplier.companyName}
              </option>
            ))}
          </select>

          {errors.supplier && (
            <p className="text-sm text-red-500">
              {errors.supplier.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="costPrice">Cost Price</Label>

          <Input
            id="costPrice"
            type="number"
            step="0.01"
            {...register("costPrice", {
              valueAsNumber: true,
            })}
          />

          {errors.costPrice && (
            <p className="text-sm text-red-500">
              {errors.costPrice.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="sellingPrice">Selling Price</Label>

          <Input
            id="sellingPrice"
            type="number"
            step="0.01"
            {...register("sellingPrice", {
              valueAsNumber: true,
            })}
          />

          {errors.sellingPrice && (
            <p className="text-sm text-red-500">
              {errors.sellingPrice.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="stock">Stock</Label>

          <Input
            id="stock"
            type="number"
            {...register("stock", {
              valueAsNumber: true,
            })}
          />

          {errors.stock && (
            <p className="text-sm text-red-500">
              {errors.stock.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="minimumStock">Minimum Stock</Label>

          <Input
            id="minimumStock"
            type="number"
            {...register("minimumStock", {
              valueAsNumber: true,
            })}
          />

          {errors.minimumStock && (
            <p className="text-sm text-red-500">
              {errors.minimumStock.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>

        <Textarea
          id="description"
          placeholder="Enter product description..."
          {...register("description")}
        />

        {errors.description && (
          <p className="text-sm text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting || loadingOptions}
      >
        {isSubmitting
          ? "Saving..."
          : product
            ? "Save Changes"
            : "Save Product"}
      </Button>
    </form>
  );
}
