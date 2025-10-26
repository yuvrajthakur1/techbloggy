// "use client";

// import Link from "next/link";

// export default function Footer() {
//   return (
//     <footer className="bg-[#19183B] text-[#E7F2EF] py-8 mt-auto">
//       <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
//         <p>© 2025 TechBloggy. All rights reserved.</p>
//         <div className="flex gap-4">
//           <Link href="#" className="hover:text-[#A1C2BD] transition">
//             Privacy
//           </Link>
//           <Link href="#" className="hover:text-[#A1C2BD] transition">
//             Terms
//           </Link>
//           <Link href="#" className="hover:text-[#A1C2BD] transition">
//             Contact
//           </Link>
//         </div>
//       </div>
//     </footer>
//   );
// }

"use client";

import Link from "next/link";
import { Facebook, Twitter, Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#19183B] text-[#E7F2EF] pt-16 pb-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* 1. Brand & Description */}
        <div>
          <h2 className="text-2xl font-bold mb-3">CodeHorizon</h2>
          <p className="text-[#E7F2EF]/80 text-sm leading-relaxed">
            A platform where developers share tutorials, insights, and tech updates.
          </p>
        </div>

        {/* 2. Quick Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-[#A1C2BD] transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/feed" className="hover:text-[#A1C2BD] transition-colors">
                Feed
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-[#A1C2BD] transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/our-story" className="hover:text-[#A1C2BD] transition-colors">
                Our Story
              </Link>
            </li>
          </ul>
        </div>

        {/* 3. Resources */}
        <div>
          <h3 className="font-semibold mb-3">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#" className="hover:text-[#A1C2BD] transition-colors">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#A1C2BD] transition-colors">
                Terms
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#A1C2BD] transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* 4. Social & Newsletter */}
        <div>
          <h3 className="font-semibold mb-3">Connect with us</h3>
          <div className="flex gap-3 mb-4">
            <a href="#" className="hover:text-[#A1C2BD]">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-[#A1C2BD]">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-[#A1C2BD]">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-[#A1C2BD]">
              <Github className="w-5 h-5" />
            </a>
          </div>
          <p className="text-sm text-[#E7F2EF]/80 mb-2">Subscribe to our newsletter:</p>
         
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-12 border-t border-[#708993]/30 pt-4 text-center text-sm text-[#E7F2EF]/60">
        © 2025 CodeHorizon. All rights reserved.
      </div>
    </footer>
  );
}
