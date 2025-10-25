import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <>
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
    </>
  );
}
