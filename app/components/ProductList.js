"use client";

import ProductCard from "./ProductCard";

export default function ProductList({
  data,
  debouncedQuery,
  isSearching,
  selectedCategory,
  sortedPrice,
}) {
  // 🔹 Filter + search
  let filteredProducts = data.filter((p) => {
    const matchQuery = p.title.toLowerCase().includes(debouncedQuery.toLowerCase());
    const matchCategory = selectedCategory === "All" || p.category === selectedCategory;
    return matchQuery && matchCategory;
  });

  // 🔹 Sort harga
  if (sortedPrice === "asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortedPrice === "desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  if (isSearching) {
    return (
      <div className="flex justify-center items-start min-h-screen pt-32">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent text-gray-500"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full shadow-md max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-2 mt-10 mb-5 justify-items-center">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))
      ) : (
        <p className="text-2xl font-semibold text-center col-span-full">
          Produk Tidak Ditemukan
        </p>
      )}
    </section>
  );
}
