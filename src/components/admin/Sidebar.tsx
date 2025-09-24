"use client";

import Link from "next/link";
import {
  ChartBarStacked,
  Flame,
  LayoutDashboard,
  Newspaper,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

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

  return (
    <div className="fixed top-0 w-[200px] lg:w-[250px] h-screen border-r py-4 px-3">
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
  );
};

export default Sidebar;
