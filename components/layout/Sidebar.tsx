import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  Boxes,
  Warehouse,
  Truck,
  FileBarChart2,
  Users,
  Settings,
} from "lucide-react";

const links = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Products", href: "/products", icon: Package },
  { name: "Categories", href: "/categories", icon: Boxes },
  { name: "Inventory", href: "/inventory", icon: Warehouse },
  { name: "Suppliers", href: "/suppliers", icon: Truck },
  { name: "Reports", href: "/reports", icon: FileBarChart2 },
  { name: "Users", href: "/users", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col">
      <div className="h-16 flex items-center px-6 text-2xl font-bold border-b border-slate-800">
        StockFlow
      </div>

      <nav className="flex-1 px-3 py-6 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-slate-800 transition"
            >
              <Icon size={20} />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
