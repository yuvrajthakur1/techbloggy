
"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import BlogCard from "../BlogCard";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function Home({ blogs }) {
  const loading = !blogs || blogs.length === 0;

  return (
    <div className="bg-gradient-to-br from-[#19183B] via-[#708993] to-[#E7F2EF] min-h-screen flex flex-col">
      {/* 🌟 Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-24 sm:py-32 text-white bg-cover bg-center bg-[url('/hero-image.jpg')] overflow-hidden">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-[#A1C2BD] via-[#708993] to-[#19183B] bg-clip-text text-transparent">
              TechBloggy
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl opacity-90 mb-8 max-w-2xl">
            A space where developers share ideas, learn together, and grow their
            craft.
          </p>

          <Link href="/feed">
            <Button className="px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold rounded-full bg-gradient-to-r from-[#A1C2BD] via-[#708993] to-[#19183B] hover:scale-105 transition-transform duration-300 shadow-xl">
              Explore Blogs
            </Button>
          </Link>
        </div>
      </section>

      {/* 📰 Latest Blogs Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 flex-1 w-full">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold text-white inline-block relative pb-3">
            Latest Blogs 📰
            <span className="absolute left-1/2 bottom-0 w-28 h-[4px] bg-gradient-to-r from-[#19183B] via-[#708993] to-[#A1C2BD] rounded-full transform -translate-x-1/2 shadow-md"></span>
          </h2>
        </div>

        {!loading ? (
          <>
            {/* ✅ Swiper Slider for Blog Cards */}
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="w-full"
            >
              {blogs.map((blog) => (
                <SwiperSlide key={blog._id}>
                  <div className="p-3 sm:p-4">
                    <BlogCard blog={blog} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Explore More Button */}
            <div className="mt-10 text-center">
              <Link href="/feed">
                <Button className="px-6 sm:px-8 py-3 rounded-full bg-gradient-to-r from-[#A1C2BD] via-[#708993] to-[#19183B] text-white font-semibold hover:scale-105 transition-transform duration-300 shadow-lg">
                  Explore More Blogs 🚀
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <h1 className="text-center text-white text-lg">
            Loading Your Blogs...
          </h1>
        )}
      </section>
    </div>
  );
}
