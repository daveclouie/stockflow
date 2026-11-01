"use client";

import { useEffect, useState } from "react";

import AddCategoryDialog from "@/components/categories/dialogs/AddCategoryDialog";
import CategoryTable from "@/components/categories/tables/CategoryTable";

import type { Category } from "@/types/category";
import type { CategoryFormValues } from "@/lib/validations/category";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCategories() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/categories");

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();

        setCategories(
          data.map((category: Category) => ({
            id: category.id,
            name: category.name,
            description: category.description ?? "",
          }))
        );
      } catch (error) {
        console.error("Failed to load categories:", error);
        setError("Failed to load categories.");
      } finally {
        setLoading(false);
      }
    }

    loadCategories();
  }, []);

  const handleCategoryAdded = async (
    data: CategoryFormValues
  ) => {
    const response = await fetch("/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const result = await response.json().catch(() => null);

      throw new Error(
        result?.error || "Failed to create category"
      );
    }

    const createdCategory: Category =
      await response.json();

    setCategories((currentCategories) => [
      createdCategory,
      ...currentCategories,
    ]);
  };

  const handleCategoryEdited = async (
    category: Category
  ) => {
    const name = window.prompt(
      "Category name:",
      category.name
    );

    if (name === null) {
      return;
    }

    const trimmedName = name.trim();

    if (!trimmedName) {
      window.alert("Category name is required.");
      return;
    }

    const description = window.prompt(
      "Description:",
      category.description || ""
    );

    if (description === null) {
      return;
    }

    try {
      const response = await fetch("/api/categories", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: category.id,
          name: trimmedName,
          description,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.error || "Failed to update category"
        );
      }

      setCategories((currentCategories) =>
        currentCategories.map((currentCategory) =>
          currentCategory.id === category.id
            ? result
            : currentCategory
        )
      );
    } catch (error) {
      console.error("Failed to update category:", error);

      window.alert(
        error instanceof Error
          ? error.message
          : "Failed to update category"
      );
    }
  };

  const handleCategoryDeleted = async (
    category: Category
  ) => {
    const confirmed = window.confirm(
      `Delete category "${category.name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch("/api/categories", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: category.id,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.error || "Failed to delete category"
        );
      }

      setCategories((currentCategories) =>
        currentCategories.filter(
          (currentCategory) =>
            currentCategory.id !== category.id
        )
      );
    } catch (error) {
      console.error("Failed to delete category:", error);

      window.alert(
        error instanceof Error
          ? error.message
          : "Failed to delete category"
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            Categories
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage your product categories.
          </p>
        </div>

        <AddCategoryDialog
          onCategoryAdded={handleCategoryAdded}
        />
      </div>

      {loading && (
        <div className="rounded-lg border p-6 text-sm text-muted-foreground">
          Loading categories...
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-200 p-6 text-sm text-red-600">
          {error}
        </div>
      )}

      {!loading && !error && (
        <CategoryTable
          categories={categories}
          onEdit={handleCategoryEdited}
          onDelete={handleCategoryDeleted}
        />
      )}
    </div>
  );
}
