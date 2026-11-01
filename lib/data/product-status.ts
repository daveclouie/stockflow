export type ProductStatus = "Active" | "Low" | "Out of Stock";

export function getProductStatus(
  quantity: number,
  minimumStock: number
): ProductStatus {
  if (quantity === 0) {
    return "Out of Stock";
  }

  if (quantity <= minimumStock) {
    return "Low";
  }

  return "Active";
}
