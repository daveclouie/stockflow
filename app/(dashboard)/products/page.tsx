import ProductTable from "@/components/products/ProductTable";
import AddProductDialog from "@/components/products/AddProductDialog";
import { Input } from "@/components/ui/input";

export default function ProductsPage() {
  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Products</h1>

        <AddProductDialog />
      </div>

      <Input placeholder="Search products..." />

      <ProductTable />

    </div>
  );
}
