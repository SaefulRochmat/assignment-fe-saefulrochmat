"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import NavigationBar from "./components/NavigationBar";
import ProductList from "./components/ProductList";
import HeroImage from "./components/HeroImage";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Home() {
  // 🔹 Fetch products & categories
  const { data, error, isLoading } = useSWR(
    process.env.NEXT_PUBLIC_URL_API_PRODUCT,
    fetcher
  );
  const { data: categories } = useSWR(
    process.env.NEXT_PUBLIC_URL_API_PRODUCT_CATEGORIES,
    fetcher
  );

  // 🔹 State pindah ke Home
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortedPrice, setSortedPrice] = useState("default");

  // 🔹 Debounce search
  useEffect(() => {
    if (!query) {
      setDebouncedQuery("");
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    const t = setTimeout(() => {
      setDebouncedQuery(query);
      setIsSearching(false);
    }, 2000);
    return () => clearTimeout(t);
  }, [query]);

  if (isLoading) {
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
  if (error) return <div>Error : {error.message}</div>;

  return (
    <>
      {/* 🔹 NavigationBar sekarang di Home */}
      <NavigationBar
        query={query}
        setQuery={setQuery}
        categories={categories ?? []}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortedPrice={sortedPrice}
        setSortedPrice={setSortedPrice}
      />
      
      {/* Hero Image Disini */}
      <HeroImage></HeroImage>

      {/* 🔹 ProductList jadi "dumb component" */}
      <ProductList
        data={data ?? []}
        debouncedQuery={debouncedQuery}
        isSearching={isSearching}
        selectedCategory={selectedCategory}
        sortedPrice={sortedPrice}
      />
    </>
  );
}
