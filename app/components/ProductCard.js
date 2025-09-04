"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, StarHalf, Star as StarOutline, X } from "lucide-react";

export default function ProductCard({ product }) {
  const [isOpen, setIsOpen] = useState(false);
  const { rate, count } = product.rating;

  // 🔹 Bintang rating
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rate)) {
      stars.push(<Star key={i} className="w-5 h-5 text-yellow-400 inline-block" />);
    } else if (i - rate < 1) {
      stars.push(<StarHalf key={i} className="w-5 h-5 text-yellow-400 inline-block" />);
    } else {
      stars.push(<StarOutline key={i} className="w-5 h-5 text-gray-300 inline-block" />);
    }
  }

  return (
    <>
      {/* 🔹 Card */}
      <div
        onClick={() => setIsOpen(true)}
        className="w-full max-w-xs rounded-md shadow-md mb-4 border-b-2 border-red-700 cursor-pointer transition duration-300 ease-in hover:translate-y-1 hover:scale-110"
      >
        <div className="relative w-full h-48 sm:h-52">
          <Image
            src={product.image}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            alt={product.title}
            className="object-cover rounded-t-xl p-4"
          />
        </div>
        <div className="px-4 py-3">
          <span className="text-slate-700 font-medium mr-3 uppercase text-xs">
            {product.category}
          </span>
          <p className="text-lg font-bold truncate block capitalize">
            {product.title}
          </p>
          <div className="flex items-center mt-1">
            {stars}
            <span className="ml-2 text-sm text-gray-600">({count})</span>
          </div>
          <p className="text-xl font-semibold text-slate-800 mt-2">$ {product.price}</p>
        </div>
      </div>

      {/* 🔹 Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 transition-opacity duration-300 ease-in-out"
        >
          <div
            className="bg-white rounded-lg shadow-lg max-w-3xl w-full relative overflow-hidden transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-modalFadeIn"
          >
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
              {/* Gambar */}
              <div className="relative w-full h-64 md:h-full">
                <Image
                  src={product.image}
                  fill
                  alt={product.title}
                  className="object-contain"
                />
              </div>

              {/* Detail */}
              <div className="flex flex-col justify-between">
                <div>
                  <span className="text-slate-700 font-medium mr-3 uppercase text-sm">
                    {product.category}
                  </span>
                  <h2 className="text-2xl font-bold capitalize mt-1">{product.title}</h2>
                  <div className="flex items-center mt-2">{stars} <span className="ml-2 text-sm text-gray-600">({count})</span></div>
                  <p className="mt-4 text-gray-700">{product.description}</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-2xl font-semibold text-slate-800">$ {product.price}</p>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🔹 Tailwind Animasi */}
      <style jsx>{`
        @keyframes modalFadeIn {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-modalFadeIn {
          animation: modalFadeIn 0.3s forwards;
        }
      `}</style>
    </>
  );
}
