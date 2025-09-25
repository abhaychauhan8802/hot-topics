"use client";

import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";

const SearchDialog = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(window.location.search);
    params.set("q", search);

    let targetPath = pathname;
    if (pathname !== "/search") {
      targetPath = "/search";
    }

    setOpen(false);
    router.push(`${targetPath}?${params.toString()}`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center justify-center w-10 h-10 transition-transform duration-300 rounded-full shadow-lg bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 hover:scale-110">
          <Search className="w-5 h-5 text-white" />
        </button>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="p-0 bg-transparent border-none max-sm:top-20 shadow-none"
      >
        <DialogTitle className="hidden">Search</DialogTitle>
        <form
          className="flex items-center gap-2 w-full"
          onSubmit={handleSubmit}
        >
          <Input
            placeholder="Search..."
            value={search}
            className="h-14 py-5 bg-background"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button size="icon" type="submit" className="size-14">
            <Search />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
