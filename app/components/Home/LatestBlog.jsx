// "use client";

// import Link from "next/link";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import { Pagination, Autoplay } from "swiper/modules";
// import BlogCard from "../BlogCard";
// import { ArrowRight } from "lucide-react";

// export default function LatestBlogs({ blogs, loading }) {
//   return (
//     <section className="relative py-20 bg-[#E7F2EF] overflow-hidden">
//       {/* Decorative background shapes (matching AboutPreview style) */}
//       <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#A1C2BD]/30 rounded-full blur-3xl"></div>
//       <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#708993]/20 rounded-full blur-2xl"></div>
//       <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-[#A1C2BD]/10 rotate-45 rounded-2xl blur-xl -translate-x-1/2 -translate-y-1/2"></div>
//       <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-[#708993]/20 rounded-lg rotate-12 blur-md"></div>
//       <div className="absolute bottom-24 left-1/3 w-16 h-16 bg-[#19183B]/5 rotate-6 rounded-md blur-sm"></div>

//       <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
//         {/* Section Heading */}
//         <div className="text-center mb-12">
//           <h2 className="text-3xl sm:text-4xl font-extrabold text-[#19183B] inline-block relative pb-3">
//             Latest Blogs 📰
//             <span className="absolute left-1/2 bottom-0 w-48 h-[4px] bg-gradient-to-r from-[#19183B] via-[#708993] to-[#A1C2BD] rounded-full transform -translate-x-1/2"></span>
//           </h2>
//           <p className="text-[#708993] mt-4 text-sm sm:text-base max-w-2xl mx-auto">
//             Stay updated with the latest coding tips, tutorials, and insights — made for developers who love to learn fast and smart.
//           </p>
//         </div>

//         {/* Swiper Section */}
//         {!loading ? (
//           <>
//             <Swiper
//               modules={[Pagination, Autoplay]}
//               autoplay={{ delay: 2500, disableOnInteraction: false }}
//               pagination={{ clickable: true }}
//               spaceBetween={24}
//               slidesPerView={1}
//               breakpoints={{
//                 640: { slidesPerView: 1 },
//                 768: { slidesPerView: 2 },
//                 1024: { slidesPerView: 3 },
//               }}
//               className="w-full"
//             >
//               {blogs.map((blog) => (
//                 <SwiperSlide key={blog._id} className="!overflow-visible">
//                   <div className="p-3 sm:p-4 transition-transform hover:scale-[1.02] duration-300">
//                     <BlogCard blog={blog} simple />
//                   </div>
//                 </SwiperSlide>
//               ))}
//             </Swiper>

//             {/* CTA Button */}
//             <div className="mt-14 text-center">
//               <Link href="/feed">
//                 <button className="group px-6 sm:px-8 py-3 rounded-full bg-gradient-to-r from-[#19183B] via-[#708993] to-[#A1C2BD] text-[#E7F2EF] font-semibold transition-all hover:scale-105 hover:opacity-90">
//                   <div className="flex justify-center items-center gap-2">
//                     Explore Blogs{" "}
//                     <ArrowRight
//                       size={20}
//                       className="group-hover:translate-x-1 transition-transform"
//                     />
//                   </div>
//                 </button>
//               </Link>
//             </div>
//           </>
//         ) : (
//           <h1 className="text-center text-[#19183B] text-lg">
//             Loading Your Blogs...
//           </h1>
//         )}
//       </div>
//     </section>
//   );
// }


"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import BlogCard from "../BlogCard";
import { ArrowRight } from "lucide-react";

export default function LatestBlogs({ blogs, loading }) {
  return (
    <section className="relative py-20 bg-[#E7F2EF]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="absolute -top-6 -left-6 w-20 h-20 bg-[#A1C2BD]/40 rotate-12 rounded-lg hidden md:block"></div>
          <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-[#708993]/30 rounded-full hidden md:block"></div>
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#19183B] inline-block relative pb-3">
            Latest Blogs 📰
            <span className="absolute left-1/2 bottom-0 w-48 h-[4px] bg-gradient-to-r from-[#19183B] via-[#708993] to-[#A1C2BD] rounded-full transform -translate-x-1/2"></span>
          </h2>
          <p className="text-[#708993] mt-4 text-sm sm:text-base max-w-2xl mx-auto">
            Stay updated with the latest coding tips, tutorials, and insights — made for developers who love to learn fast and smart.
          </p>
        </div>

        {/* Swiper Section */}
        {!loading ? (
          <>
            <Swiper
              modules={[Pagination, Autoplay]}
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
              style={{ background: "transparent" }}
            >
              {blogs.map((blog) => (
                <SwiperSlide
                  key={blog._id}
                  className="!overflow-visible"
                  style={{ background: "transparent", boxShadow: "none" }}
                >
                  <div className="p-3 sm:p-4 transition-transform hover:scale-[1.02] duration-300">
                    <BlogCard blog={blog} simple />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* CTA Button */}
            <div className="mt-14 text-center">
              <Link href="/feed">
                <button className="group px-6 sm:px-8 py-3 rounded-full bg-gradient-to-r from-[#19183B] via-[#708993] to-[#A1C2BD] text-[#E7F2EF] font-semibold transition-all hover:scale-105 hover:opacity-90">
                  <div className="flex justify-center items-center gap-2">
                    Explore Blogs{" "}
                    <ArrowRight
                      size={20}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </button>
              </Link>
            </div>
          </>
        ) : (
          <h1 className="text-center text-[#19183B] text-lg">
            Loading Your Blogs...
          </h1>
        )}
      </div>
    </section>
  );
}
