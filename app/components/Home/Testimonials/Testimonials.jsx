

"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { Quote } from "lucide-react"; // small quote icon
import testimonials from "./testimonials.json";

export default function Testimonials() {
  return (
    <section className="py-16 relative overflow-hidden" style={{ backgroundColor: "#E7F2EF" }}>
      {/* Decorative circles */}
      <div className="absolute -top-16 -left-16 w-40 h-40 bg-[#A1C2BD] rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-16 -right-16 w-60 h-60 bg-[#708993] rounded-full opacity-20 animate-pulse"></div>

      <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-[#19183B] inline-block relative pb-3 mb-10">
          What Our Readers Say
          <span className="absolute left-1/2 bottom-0 w-28 h-[4px] bg-gradient-to-r from-[#19183B] via-[#708993] to-[#A1C2BD] rounded-full transform -translate-x-1/2 shadow-md"></span>
        </h2>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          className="mt-10"
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <div
                className="rounded-2xl p-6 text-left border transition-transform hover:scale-105 duration-300"
                style={{
                  backgroundColor: "#19183B",
                  borderColor: "#A1C2BD",
                }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-12 h-12">
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      width={48}
                      height={48}
                      className="rounded-full object-cover border-2"
                      style={{ borderColor: "#A1C2BD" }}
                      loading="lazy"
                    />
                    <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#A1C2BD] rounded-full animate-pulse border border-white"></span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#E7F2EF]">{item.name}</h3>
                    <p className="text-sm text-[#708993]">{item.role}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Quote className="w-5 h-5 text-[#A1C2BD] mt-1 flex-shrink-0" />
                  <p className="leading-relaxed text-[#E7F2EF]">
                    {item.feedback}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
