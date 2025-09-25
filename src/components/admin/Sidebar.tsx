"use client";

import Link from "next/link";
import {
  ChartBarStacked,
  Flame,
  LayoutDashboard,
  LogOut,
  Menu,
  Newspaper,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/lib/server/auth";
import { Button } from "../ui/button";
import { useState } from "react";

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Posts",
    href: "/admin/posts",
    icon: Newspaper,
  },
  {
    name: "Categories",
    href: "/admin/categories",
    icon: ChartBarStacked,
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.replace("/admin/login");
  };

  return (
    <>
      <div className="sm:hidden absolute top-2 left-3">
        <Button variant="outline" onClick={() => setOpen(!open)}>
          <Menu />
        </Button>
      </div>
      <div
        className={cn(
          "fixed top-0 left-[-200px] sm:left-0 w-[200px] lg:w-[250px] h-screen border-r py-4 px-3 flex flex-col justify-between bg-background z-10",
          open ? "left-0" : "left-[-200px]"
        )}
      >
        <div>
          <Button
            variant="ghost"
            onClick={() => setOpen(!open)}
            className="sm:hidden"
          >
            <X />
          </Button>

          <div className="text-primary flex items-center gap-1 justify-center">
            <Flame />
            <h1 className="text-xl lg:text-2xl font-bold">HotTopicsHub</h1>
          </div>

          <nav>
            <ul className="mt-5 flex flex-col gap-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 px-6 py-4 rounded-md hover:bg-primary/10",
                      item.href === "/admin"
                        ? pathname === "/admin" &&
                            "bg-primary text-primary-foreground hover:bg-primary/90"
                        : pathname.startsWith(item.href) &&
                            "bg-primary text-primary-foreground hover:bg-primary/90"
                    )}
                  >
                    <item.icon size={18} /> {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div>
          <button className="btn-ghost w-full" onClick={handleLogout}>
            <LogOut /> Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
