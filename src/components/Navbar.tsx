"use client";

import Link from "next/link";
import { useState } from "react";
import { Flame, Menu, X } from "lucide-react";
import SearchDialog from "./SearchDialog";

export default function Navbar({
  categories,
}: {
  categories: { name: string }[];
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow">
      {/* Top Row: Logo + Ad Space */}
      <div className="flex items-center justify-between max-w-6xl px-4 py-3 mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Flame className="text-blue-600 w-7 h-7 sm:w-8 sm:h-8" />
          <div className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            <span className="text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text">
              HotTopics
            </span>
            <span className="text-blue-600">Hub</span>
          </div>
        </Link>

        {/* Ad Placeholder */}
        <div className="hidden md:block">
          <div className="flex items-center justify-center w-64 h-10 text-sm text-gray-500 bg-gray-100 border rounded-md">
            Ad Space
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="text-gray-700 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Desktop Category Bar */}
      <nav className="items-center justify-between hidden max-w-6xl px-4 py-3 mx-auto mt-2 text-white md:flex bg-gradient-to-r from-red-700 to-red-600 rounded-xl">
        {/* Categories */}
        <div className="flex space-x-6 font-medium">
          <Link
            href="/"
            className="hover:underline whitespace-nowrap capitalize"
          >
            Home
          </Link>
          {categories?.map((cat) => (
            <Link
              key={cat.name}
              href={`/category/${cat.name}`}
              className="hover:underline whitespace-nowrap capitalize"
            >
              {cat.name}
            </Link>
          ))}
        </div>
        {/* Search */}
        <SearchDialog />
      </nav>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <nav className="px-4 py-3 space-y-3 text-white rounded-none md:hidden bg-gradient-to-r from-red-700 to-red-600">
          <Link
            href="/"
            className="block hover:underline capitalize"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          {categories?.map((cat) => (
            <Link
              key={cat.name}
              href={`/category/${cat.name}`}
              className="block hover:underline capitalize"
              onClick={() => setMenuOpen(false)}
            >
              {cat.name}
            </Link>
          ))}
          <SearchDialog />
        </nav>
      )}
    </header>
  );
}
