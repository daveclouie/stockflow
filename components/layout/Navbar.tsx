import { Bell, Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

export default function Navbar() {
  return (
    <header className="h-16 bg-white border-b px-6 flex items-center justify-between">

      <div className="flex items-center gap-3">
        <Search className="text-gray-400" size={18} />
        <Input
          placeholder="Search..."
          className="w-80"
        />
      </div>

      <div className="flex items-center gap-6">

        <Bell
          size={20}
          className="cursor-pointer text-gray-600 hover:text-black"
        />

        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>

          <div>
            <p className="text-sm font-semibold">Admin</p>
            <p className="text-xs text-gray-500">
              Administrator
            </p>
          </div>

        </div>

      </div>

    </header>
  );
}
