"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function HeroImage() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_URL_API_PRODUCT);
        const data = await res.json();
        setImages(data.slice(0, 5)); // ambil 5 produk pertama aja
      } catch (err) {
        console.error("Error fetching images:", err);
      }
    };
    getData();
  }, []);

  if (!images.length) {
    return (
      <div className="flex justify-center items-center h-[400px] bg-gray-200">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 mt-6">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{ clickable: true }}
        navigation={true}
        className="rounded-md shadow-lg"
      >
        {images.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative w-full h-[400px] sm:h-[350px]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-contain bg-white"
                priority
              />
              {/* Overlay teks opsional */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white p-4 text-center">
                <h2 className="text-lg sm:text-2xl font-semibold">{item.title}</h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="p-14 mt-8 mb-24 text-center shadow-lg w-full sm:1/3">
        <h1 className="text-4xl font-bold">Semua yang Kamu Butuhkan, Ada di Sini.</h1>
      </div>
    </section>
  );
}
