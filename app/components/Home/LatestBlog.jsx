"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import BlogCard from "../BlogCard";

export default function LatestBlogs({ blogs, loading }) {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 flex-1 w-full">
      <div className="text-center mb-10 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl font-semibold text-white inline-block relative pb-3">
          Latest Blogs 📰
          <span className="absolute left-1/2 bottom-0 w-28 h-[4px] bg-gradient-to-r from-[#19183B] via-[#708993] to-[#A1C2BD] rounded-full transform -translate-x-1/2"></span>
        </h2>
      </div>

      {!loading ? (
        <>
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
              <SwiperSlide key={blog._id} className="!overflow-visible">
                <div className="p-3 sm:p-4">
                  <BlogCard blog={blog} simple /> {/* simple flag ensures BlogCard is flat */}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="mt-10 text-center">
            <Link href="/feed">
              <button className="px-6 sm:px-8 py-3 rounded-full bg-gradient-to-r from-[#A1C2BD] via-[#708993] to-[#19183B] text-white font-semibold hover:scale-100 transition-none">
                Explore More Blogs 🚀
              </button>
            </Link>
          </div>
        </>
      ) : (
        <h1 className="text-center text-white text-lg">Loading Your Blogs...</h1>
      )}
    </section>
  );
}
