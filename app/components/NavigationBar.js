"use client";

import { useState } from "react";
import { Menu, X, Search } from "lucide-react";

export default function NavigationBar({
  query,
  setQuery,
  categories,
  selectedCategory,
  setSelectedCategory,
  sortedPrice,
  setSortedPrice,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="text-2xl font-extrabold text-slate-800 tracking-tight">
            Fake<span className="text-indigo-600">Store</span>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex relative flex-1 max-w-md mx-6">
            <input
              type="text"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-10 pl-4 pr-10 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm shadow-sm"
            />
            <Search
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>

          {/* Desktop filter & sort */}
          <div className="hidden md:flex items-center gap-4">
            {/* Filter kategori */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 rounded-xl border border-gray-200 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">All Categories</option>
              {categories &&
                categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
            </select>

            {/* Sort harga */}
            <select
              value={sortedPrice}
              onChange={(e) => setSortedPrice(e.target.value)}
              className="px-4 py-2 rounded-xl border border-gray-200 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="default">Default</option>
              <option value="asc">Price: Low → High</option>
              <option value="desc">Price: High → Low</option>
            </select>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 transition"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 border-t border-gray-100 bg-white shadow-md">
          {/* Search */}
          <div className="relative mt-3">
            <input
              type="text"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-10 pl-4 pr-10 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm shadow-sm"
            />
            <Search
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>

          {/* Filter kategori */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All Categories</option>
            {categories &&
              categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
          </select>

          {/* Sort harga */}
          <select
            value={sortedPrice}
            onChange={(e) => setSortedPrice(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="default">Default</option>
            <option value="asc">Price: Low → High</option>
            <option value="desc">Price: High → Low</option>
          </select>
        </div>
      )}
    </nav>
  );
}
