"use client";

import Image from "next/image";

export default function AboutPreview() {
  return (
    <section className="relative py-20 bg-[#E7F2EF] overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#A1C2BD]/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#708993]/20 rounded-full blur-2xl"></div>
      <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-[#A1C2BD]/10 rotate-45 rounded-2xl blur-xl -translate-x-1/2 -translate-y-1/2"></div>

      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center md:items-start gap-10 relative z-10">
        {/* Left: Text (always left aligned) */}
        <div className="w-full md:w-1/2 text-center">
        
          <div className="mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#19183B] inline-block relative pb-3">
              💡 What is TechBloggy?
              <span className="absolute left-1/2 bottom-0 w-48 h-[4px] bg-gradient-to-r from-[#19183B] via-[#708993] to-[#A1C2BD] rounded-full transform -translate-x-1/2"></span>
            </h2>
          </div>
          <p className="text-[#19183B]/80 text-left text-sm sm:text-base leading-relaxed mb-6">
            TechBloggy is your go-to platform for quick, clear, and practical
            web development tips. We help developers learn React, JavaScript,
            Tailwind, Next.js, and more — in a fun and interactive way.
          </p>
          <ul className="space-y-2 text-[#19183B]/70 text-left font-medium text-sm sm:text-base">
            <li>• Short, beginner-friendly tutorials</li>
            <li>• Hands-on code examples</li>
            <li>• Stay updated with the latest tech trends</li>
          </ul>
        </div>

        {/* Right: Illustration/Image */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end relative">
          {/* Decorative elements near image */}
          <div className="absolute -top-6 -left-6 w-20 h-20 bg-[#A1C2BD]/40 rotate-12 rounded-lg hidden md:block"></div>
          <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-[#708993]/30 rounded-full hidden md:block"></div>

          <div className="relative w-full max-w-sm sm:max-w-md md:max-w-none md:w-80 md:h-80 aspect-square rounded-2xl md:block hidden overflow-hidden shadow-2xl border-[3px] border-[#A1C2BD] bg-[#E7F2EF]">
            <Image
              src="/About.webp"
              alt="About TechBloggy"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
