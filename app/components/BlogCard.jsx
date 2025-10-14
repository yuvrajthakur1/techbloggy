
// "use client";

// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { ArrowRight } from "lucide-react";

// export default function BlogCard({ blog }) {
//   const router = useRouter();

//   const handleSeeMore = () => {
//     router.push(`/blog/${blog._id}`);
//   };

//   return (
//     <div className="flex flex-col bg-[#19183B] rounded-2xl shadow-2xl border border-[#708993] overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
      
//       {/* Blog Image */}
//       {blog.image && (
//         <div className="relative w-full h-36 sm:h-44 md:h-48 overflow-hidden">
//           <Image
//             src={`http://localhost:5000${blog.image}`}
//             fill
//             alt={blog.title}
//             className="object-cover group-hover:scale-105 transition-transform duration-500"
//             priority
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
//         </div>
//       )}

//       {/* Content */}
//       <div className="p-3 flex flex-col flex-1 gap-1">
//         <h2 className="text-[#A1C2BD] font-bold text-base sm:text-lg md:text-xl break-words line-clamp-1">
//           {blog.title}
//         </h2>
//         <p className="text-[#E7F2EF] text-xs sm:text-sm md:text-base line-clamp-3 flex-grow">
//           {blog.description}
//         </p>

//         {/* Read More Button */}
//         <button
//           onClick={handleSeeMore}
//           className="mt-1 inline-flex items-center text-[#708993] hover:text-[#A1C2BD] font-semibold text-xs sm:text-sm transition gap-1"
//         >
//           Read More <ArrowRight size={14} />
//         </button>
//       </div>

//       {/* Footer: Author */}
//       <div className="p-3 border-t border-[#708993]/20 flex justify-start items-center gap-2 text-[#708993] text-xs sm:text-sm">
//         <span>by {blog.author?.name || "Unknown"}</span>
//       </div>
//     </div>
//   );
// }



"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function BlogCard({ blog }) {
  const router = useRouter();

  const handleSeeMore = () => {
    router.push(`/blog/${blog._id}`);
  };

  return (
    <div className="flex min-w-60 flex-col bg-[#19183B] rounded-2xl shadow-2xl border border-[#708993]/50 overflow-hidden group hover:scale-[1.03] transition-transform duration-300">
      
      {/* Blog Image */}
      {blog.image && (
        <div className="relative w-full h-36 sm:h-44 md:h-48 overflow-hidden">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}${blog.image}`}
            fill
            alt={blog.title}
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div>
      )}

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <h2 className="text-[#A1C2BD] font-bold text-base sm:text-lg md:text-xl break-words line-clamp-1">
          {blog.title}
        </h2>

     

        {/* Read More Button */}
        <button
          onClick={handleSeeMore}
          className="mt-2 inline-flex items-center text-[#708993] hover:text-[#A1C2BD] font-semibold text-xs sm:text-sm transition gap-1"
        >
          Read More <ArrowRight size={14} />
        </button>
      </div>

      {/* Footer: Author */}
      <div className="p-3 border-t border-[#708993]/20 flex justify-start items-center gap-2 text-[#708993] text-xs sm:text-sm">
        <span>by {blog.author?.name || "Unknown"}</span>
      </div>
    </div>
  );
}
