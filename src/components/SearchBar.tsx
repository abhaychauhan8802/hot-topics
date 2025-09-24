"use client";

import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const SearchBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(window.location.search);
    params.set("q", search);

    let targetPath = pathname;
    if (pathname !== "/search") {
      targetPath = "/search";
    }

    router.push(`${targetPath}?${params.toString()}`);
  };

  return (
    <form className="flex items-center gap-2 w-full" onSubmit={handleSubmit}>
      <Input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button size="icon" type="submit">
        <Search />
      </Button>
    </form>
  );
};

export default SearchBar;
