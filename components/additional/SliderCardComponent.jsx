"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Autoplay, Navigation } from "swiper/modules";
import BlogCard from "@/app/components/BlogCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

export default function BlogSlider({ blogs }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="w-full relative px-2 sm:px-6">
      {/* Custom Arrows */}
      <button
        ref={prevRef}
        className="absolute top-1/2 -left-3 sm:-left-5 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 bg-[#19183B]/70 rounded-full flex items-center justify-center hover:bg-[#19183B]/90 transition"
      >
        <ChevronLeft className="text-[#A1C2BD] w-4 h-4 sm:w-6 sm:h-6" />
      </button>
      <button
        ref={nextRef}
        className="absolute top-1/2 -right-3 sm:-right-5 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 bg-[#19183B]/70 rounded-full flex items-center justify-center hover:bg-[#19183B]/90 transition"
      >
        <ChevronRight className="text-[#A1C2BD] w-4 h-4 sm:w-6 sm:h-6" />
      </button>

      <Swiper
        modules={[Pagination, Autoplay, Navigation]}
        spaceBetween={20}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          0: { slidesPerView: 1 },      // mobile
          768: { slidesPerView: 2 },    // tablet
          1024: { slidesPerView: 3 },   // desktop
        }}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        className="pb-10"
      >
        {blogs.map((blog) => (
          <SwiperSlide key={blog._id}>
            <BlogCard blog={blog} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination Bullets Styling */}
      <style jsx>{`
        .swiper-pagination-bullet {
          background: #708993;
          opacity: 0.7;
        }
        .swiper-pagination-bullet-active {
          background: #A1C2BD;
        }
      `}</style>
    </div>
  );
}
