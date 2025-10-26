// "use client";

// import {Book, Users, Star } from "lucide-react"; // icons for features

// export default function OurStory() {
//   return (
//     <section className="relative py-28 px-6 sm:px-12 lg:px-20 bg-[#F5F7F9]">
//         <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#A1C2BD]/30 rounded-full blur-3xl"></div>
//       <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#708993]/20 rounded-full blur-2xl"></div>
//       <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-[#A1C2BD]/10 rotate-45 rounded-2xl blur-xl -translate-x-1/2 -translate-y-1/2"></div>
//       <div className="max-w-6xl mx-auto text-center">
//         {/* Heading */}
//         <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#19183B] mb-6">
//           Our Story
//         </h2>
//         <p className="text-[#708993] text-lg sm:text-xl md:text-2xl mb-16 max-w-3xl mx-auto leading-relaxed">
//           TechBloggy is a modern platform where developers and tech enthusiasts
//           come together to share tutorials, insights, and the latest updates
//           across various technologies. We aim to make learning and sharing
//           knowledge seamless, interactive, and fun for everyone.
//         </p>

//         {/* Features Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-10 text-left">
//           {/* Feature 1 */}
//           <div className="flex flex-col items-center sm:items-start gap-4">
//             <div className="p-4 bg-[#A1C2BD]/20 rounded-xl inline-flex">
//               <Book className="w-6 h-6 text-[#19183B]" />
//             </div>
//             <h3 className="text-xl font-semibold text-[#19183B]">Tutorial Sharing</h3>
//             <p className="text-[#708993] text-sm sm:text-base leading-relaxed">
//               Users can create and share tutorials on tech topics to help others learn quickly.
//             </p>
//           </div>

//           {/* Feature 2 */}
//           <div className="flex flex-col items-center sm:items-start gap-4">
//             <div className="p-4 bg-[#708993]/20 rounded-xl inline-flex">
//               <Users className="w-6 h-6 text-[#19183B]" />
//             </div>
//             <h3 className="text-xl font-semibold text-[#19183B]">Community Insights</h3>
//             <p className="text-[#708993] text-sm sm:text-base leading-relaxed">
//               Share and discover insights from different tech enthusiasts worldwide.
//             </p>
//           </div>

//           {/* Feature 3 */}
//           <div className="flex flex-col items-center sm:items-start gap-4">
//             <div className="p-4 bg-[#19183B]/10 rounded-xl inline-flex">
//                <Book className="w-6 h-6 text-[#19183B]" />
//             </div>
//             <h3 className="text-xl font-semibold text-[#19183B]">New Features</h3>
//             <p className="text-[#708993] text-sm sm:text-base leading-relaxed">
//               Stay updated with the latest features and enhancements we bring to the platform.
//             </p>
//           </div>

//           {/* Feature 4 */}
//           <div className="flex flex-col items-center sm:items-start gap-4">
//             <div className="p-4 bg-[#A1C2BD]/20 rounded-xl inline-flex">
//               <Star className="w-6 h-6 text-[#19183B]" />
//             </div>
//             <h3 className="text-xl font-semibold text-[#19183B]">Tech Community</h3>
//             <p className="text-[#708993] text-sm sm:text-base leading-relaxed">
//               Build connections with like-minded individuals and grow your tech network.
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { Book, Users, Star, Lightning } from "lucide-react";

export default function OurStory() {
  return (
    <section className="relative py-24 px-6 sm:px-12 lg:px-20 bg-[#F5F7F9] overflow-hidden">
      {/* Subtle background shapes */}
      <div className="absolute -top-16 -left-16 md:w-48 md:h-48 w-24 h-24 bg-[#A1C2BD]/50 rounded-full"></div>
      <div className="absolute bottom-0 right-0 md:w-72 md:h-72 w-48 h-48 bg-[#A1C2BD]/50 rounded-full"></div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#19183B] mb-4">
          Our Story
        </h2>
        <p className="text-[#708993] text-base sm:text-lg md:text-xl mb-16 max-w-3xl mx-auto leading-relaxed">
          CodeHorizon is a modern platform where developers and tech enthusiasts
          share tutorials, insights, and updates on various technologies. Our
          mission is to make learning and sharing knowledge interactive, simple,
          and fun.
        </p>

        {/* Features Grid */}
        <div className="grid text-left grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Feature 1 */}
          <div className="flex flex-col items-center sm:items-start gap-4 p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="p-4 bg-[#A1C2BD]/20 rounded-full inline-flex">
              <Book className="w-7 h-7 text-[#19183B]" />
            </div>
            <h3 className="text-xl font-semibold text-[#19183B]">
              Tutorial Sharing
            </h3>
            <p className="text-[#708993] text-sm sm:text-base leading-relaxed">
              Share tutorials and help others learn quickly across different
              tech topics.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center sm:items-start gap-4 p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="p-4 bg-[#708993]/20 rounded-full inline-flex">
              <Users className="w-7 h-7 text-[#19183B]" />
            </div>
            <h3 className="text-xl font-semibold text-[#19183B]">
              Community Insights
            </h3>
            <p className="text-[#708993] text-sm sm:text-base leading-relaxed">
              Discover and share insights from tech enthusiasts around the
              world.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center sm:items-start gap-4 p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="p-4 bg-[#19183B]/10 rounded-full inline-flex">
              <Book className="w-7 h-7 text-[#19183B]" />
            </div>
            <h3 className="text-xl font-semibold text-[#19183B]">
              New Features
            </h3>
            <p className="text-[#708993] text-sm sm:text-base leading-relaxed">
              Stay updated with the latest platform features and improvements.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="flex flex-col items-center sm:items-start gap-4 p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="p-4 bg-[#A1C2BD]/20 rounded-full inline-flex">
              <Star className="w-7 h-7 text-[#19183B]" />
            </div>
            <h3 className="text-xl font-semibold text-[#19183B]">
              Tech Community
            </h3>
            <p className="text-[#708993] text-sm sm:text-base leading-relaxed">
              Connect with like-minded people and grow your network in tech.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
