// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import SectionDivider from "./SectionDivider";

// export default function Hero() {
//   return (
//     <>
//       {/* 🌟 Hero Section */}
//       <section className="relative flex flex-col items-center justify-center text-center py-24 sm:py-32 text-white bg-cover bg-center bg-[url('/hero-image.jpg')] overflow-hidden">
//         {/* Overlay */}
//         <div className="absolute inset-0 bg-black/60"></div>

//         {/* Hero Content */}
//         <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center">
//           <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
//             Welcome to{" "}
//             <span className="bg-gradient-to-r from-[#A1C2BD] via-[#708993] to-[#19183B] bg-clip-text text-transparent">
//               CodeHorizon
//             </span>
//           </h1>

//           <p className="text-base sm:text-lg md:text-xl opacity-90 mb-8 max-w-2xl">
//             A space where developers share ideas, learn together, and grow their
//             craft.
//           </p>

//           <Link href="/feed">
//             <Button className="px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold rounded-full bg-gradient-to-r from-[#A1C2BD] via-[#708993] to-[#19183B] hover:scale-105 transition-transform duration-300 shadow-xl">
//               Explore Blogs
//             </Button>
//           </Link>
//         </div>

//       </section>

//     </>
//   );
// }

"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative py-20 bg-[#E7F2EF] overflow-hidden">
      {/* Background Decorative Shapes */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#A1C2BD]/30 rounded-full blur-3xl"></div>
      
      <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-[#A1C2BD]/10 rotate-45 rounded-2xl blur-xl -translate-x-1/2 -translate-y-1/2"></div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center md:items-start gap-10 relative z-10">
        {/* Left: Text */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <div className="mb-10 sm:mb-12">
            <h1 className="text-3xl  sm:text-5xl font-extrabold text-[#19183B] inline-block relative pb-3">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-[#A1C2BD] via-[#708993] to-[#19183B] bg-clip-text text-transparent">
                CodeHorizon
              </span>
             
            </h1>
          </div>

          <p className="text-[#19183B]/80 text-left text-lg sm:text-2xl leading-relaxed mb-6">
            A space where developers share ideas, learn together, and grow their
            craft.
          </p>

          <Link href="/feed">
            <Button className="px-6 py-3 rounded-full bg-gradient-to-r from-[#19183B] via-[#708993] to-[#A1C2BD] text-white font-semibold shadow-md hover:scale-105 transition-transform duration-300">
              Explore Blogs
            </Button>
          </Link>
        </div>

        {/* Right: Image */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end relative">
          <div className="absolute -top-6 -left-6 w-20 h-20 bg-[#A1C2BD]/40 rotate-12 rounded-lg hidden md:block"></div>
          <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-[#708993]/30 rounded-full hidden md:block"></div>

          <div className="relative w-full max-w-sm sm:max-w-md md:max-w-none md:w-96 md:h-96 aspect-square rounded-2xl md:block hidden overflow-hidden">
            <Image
              src="/Hero.webp"
              alt="CodeHorizon Hero"
              fill
              className="object-cover "
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
