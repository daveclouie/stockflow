import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(2, "Product name must be at least 2 characters"),

  sku: z
    .string()
    .min(2, "SKU is required"),

  category: z
    .string()
    .min(1, "Category is required"),

  supplier: z
    .string()
    .min(1, "Supplier is required"),

  costPrice: z
    .number()
    .min(0, "Cost price cannot be negative"),

  sellingPrice: z
    .number()
    .min(0, "Selling price cannot be negative"),

  stock: z
    .number()
    .int("Stock must be a whole number")
    .min(0, "Stock cannot be negative"),

  minimumStock: z
    .number()
    .int("Minimum stock must be a whole number")
    .min(0, "Minimum stock cannot be negative"),

  description: z
    .string()
    .optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;
