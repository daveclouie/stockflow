export type ProductStatus = "Active" | "Low" | "Out of Stock";

export interface Product {
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
  status: ProductStatus;
}
