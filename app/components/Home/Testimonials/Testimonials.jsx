"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { Quote } from "lucide-react";
import testimonials from "./testimonials.json";

export default function Testimonials() {
  return (
    <section
      className="py-24 sm:py-32 relative overflow-hidden"
      style={{ backgroundColor: "#E7F2EF" }}
    >
      <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
        {/* Decorative circles */}
        <div className="absolute -top-20 -left-20 w-48 h-48 bg-[#A1C2BD] rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#708993] rounded-full opacity-20 animate-pulse"></div>

        {/* Heading */}
        <div className="text-center mb-14 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#19183B] inline-block relative pb-3">
            What Our Reader's Say
            <span className="absolute left-1/2 bottom-0 w-48 h-[4px] bg-gradient-to-r from-[#19183B] via-[#708993] to-[#A1C2BD] rounded-full transform -translate-x-1/2"></span>
          </h2>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={40}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="mt-14"
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <div
                className="rounded-3xl p-8 sm:p-10 flex flex-col h-full border transition-transform hover:scale-[1.04] duration-300"
                style={{
                  backgroundColor: "#19183B",
                  borderColor: "#A1C2BD",
                }}
              >
                {/* User Info */}
                <div className="flex items-center gap-5 mb-6">
                  <div className="relative w-14 h-14">
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      width={56}
                      height={56}
                      className="rounded-full object-cover border-2"
                      style={{ borderColor: "#A1C2BD" }}
                      unoptimized
                    />
                    <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#A1C2BD] rounded-full border border-white"></span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#E7F2EF]">
                      {item.name}
                    </h3>
                    <p className="text-sm text-[#708993]">{item.role}</p>
                  </div>
                </div>

                {/* Feedback */}
                <div className="flex-1 flex items-start gap-3">
                  <Quote className="w-5 h-5 text-[#A1C2BD] mt-1 flex-shrink-0" />
                  <p className="leading-relaxed text-[#E7F2EF] text-[0.95rem]">
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
