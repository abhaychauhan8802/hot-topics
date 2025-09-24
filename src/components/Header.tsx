import { db } from "@/db/drizzle";
import { categories } from "@/db/schema";
import { asc } from "drizzle-orm";
import { Flame } from "lucide-react";
import Link from "next/link";
import SearchBar from "./SearchBar";

const Header = async () => {
  const topCategories = await db
    .select({ name: categories.name })
    .from(categories)
    .orderBy(asc(categories.name))
    .limit(6);

  return (
    <div className="py-4 border-b">
      <div className="text-primary flex items-center gap-1">
        <Flame />
        <h1 className="text-xl lg:text-2xl font-bold">HotTopicsHub</h1>
      </div>

      <nav className="flex justify-between items-center mt-4 flex-col md:flex-row gap-5">
        <ul className="flex gap-4 items-center w-screen overflow-x-auto overflow-y-hidden px-4 scrollbar-none py-1">
          <li>
            <Link
              href="/"
              className="capitalize px-3 py-1 rounded-md hover:bg-primary/10"
            >
              Home
            </Link>
          </li>
          {topCategories.map((category) => (
            <li key={category.name}>
              <Link
                href={`/search?category=${category.name}`}
                className="capitalize px-3 py-1 rounded-md hover:bg-primary/10"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="w-full md:w-[400px]">
          <SearchBar />
        </div>
      </nav>
    </div>
  );
};

export default Header;
