'use client'

import { useEffect, useState } from "react";
import useSWR from "swr";
import ProductCard from "./ProductCard";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function ProductList() {
  const { data, error, isLoading } = useSWR(
    process.env.NEXT_PUBLIC_URL_API_PRODUCT,
    fetcher
  );

  const { data: categories } = useSWR(
    process.env.NEXT_PUBLIC_URL_API_PRODUCT_CATEGORIES,
    fetcher
  );

  // state untuk search
  const [query, setQuery] = useState("");
  // query debounce
  const [debouncedQuery, setDebouncedQuery] = useState("");
  // query loading Searching
  const [isSearching, setIsSearching] = useState(false);

  //state untuk kategori
  const [selectedCategory, setSelectedCategory] = useState ("All");
  //state untuk sortir harga
  const [sortedPrice, setSortedPrice] = useState("default");

  // debounce effect
  useEffect(() => {
    if (!query) {
      setDebouncedQuery("");
      return;
    }

    setIsSearching(true); // mulai searching
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
      setIsSearching(false); // selesai searching
    }, 2000); // tunggu 500ms

    return () => clearTimeout(handler);
  }, [query]);

  if (isLoading) return <div className="flex justify-center items-start min-h-screen pt-32">
            <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] text-blue-500"
                role="status"
            >
                <span className="sr-only">Loading...</span>
            </div>
        </div>;
  if (error) return <div>Error : {error.message}</div>;

  // filter case-insensitive pakai debouncedQuery
  // filter gabungan
  let filteredProducts = data.filter((p) => {
    const matchQuery = p.title.toLowerCase().includes(debouncedQuery.toLowerCase());
    const matchCategory = selectedCategory === "All" || p.category === selectedCategory;
    return matchQuery && matchCategory;
  });
  //sort produk harga
  if (sortedPrice === "asc") {
    filteredProducts =  [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortedPrice === "desc") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  };

  return (
    <>
        <section className="bg-white shadow-md sticky top-0 z-50 flex sm:flex-row justify-center items-center gap-4 sm:gap-6 p-4">
            {/* Search Bar */}
            <div className="relative w-[180px] sm:w-1/3">
                <input
                type="text"
                placeholder="Search Products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-10 px-5 pr-10 rounded text-sm border-1 w-full focus:outline-none focus:ring-1 focus:ring-slate-400 transition-all duration-300"
                />
                <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-200 hover:text-white"
                >
                <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                >
                    <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
                </svg>
                </button>
            </div>

            {/* Filter Kategori */}
            <div className="w-[129px] sm:w-1/8">
                <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border rounded px-4 py-2 w-full text-sm focus:outline-none focus:ring-1 focus:ring-slate-400"
                >
                <option value="All">All Category</option>
                {categories &&
                    categories.map((cat) => (
                    <option key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                    ))}
                </select>
            </div>

            {/* Sort Harga */}
            <div className="w-[128px] sm:w-1/8">
                <select
                value={sortedPrice}
                onChange={(e) => setSortedPrice(e.target.value)}
                className="border rounded px-4 py-2 w-full text-sm focus:outline-none focus:ring-1 focus:ring-slate-400"
                >
                    <option value="default">All Price</option>
                    <option value="asc">Price: Lowest → Higest</option>
                    <option value="desc">Price: Higest → Lowest</option>
                </select>
            </div>
        </section>


      {isSearching && (
        <div className="flex justify-center items-start min-h-screen pt-32">
            <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
            >
                <span className="sr-only">Loading...</span>
            </div>
        </div>
      )}

    <section className="w-full max-w-7xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-2 mt-10 mb-5 justify-items-center shadow-md border-t-4 border-red-800 p-4">
    {!isSearching &&
        (filteredProducts.length > 0 ? (
        filteredProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
        ))
        ) : (
            <p className="text-4xl font-bold text-center col-span-full flex justify-center items-start min-h-screen pt-32 bg-gradient-to-r from-red-300 via-yellow-200 to-green-400 bg-clip-text text-transparent select-auto">
                Produk Tidak Ditemukan
            </p>
        ))}
    </section>


    </>
  );
}
