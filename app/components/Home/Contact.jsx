"use client";

import Link from "next/link";

export default function ContactCTA() {
  return (
    <section className="relative py-24 px-6 sm:px-12 lg:px-20 bg-gradient-to-r from-[#A1C2BD]/20 via-[#708993]/20 to-[#19183B]/10 overflow-hidden rounded-2xl ">
      {/* Decorative circles */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#A1C2BD]/30 rounded-full"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#708993]/20 rounded-full"></div>
      <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-[#19183B]/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
        {/* Heading / Short text */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#19183B] leading-tight">
          Want to contribute or collaborate?
        </h2>
        <p className="text-[#708993] text-base sm:text-lg md:text-xl max-w-2xl">
          Join our community of developers and tech enthusiasts. Share tutorials, insights, or explore exciting opportunities with TechBloggy.
        </p>

        {/* CTA Button */}
        <Link href="/contact">
          <button className="mt-4 px-8 py-4 rounded-full bg-gradient-to-r from-[#19183B] via-[#708993] to-[#A1C2BD] text-[#E7F2EF] font-semibold text-lg shadow-lg hover:scale-105 transition-transform duration-300">
            Contact Us
          </button>
        </Link>
      </div>
    </section>
  );
}
