"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#19183B] text-[#E7F2EF] py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>© 2025 TechBloggy. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="#" className="hover:text-[#A1C2BD] transition">
            Privacy
          </Link>
          <Link href="#" className="hover:text-[#A1C2BD] transition">
            Terms
          </Link>
          <Link href="#" className="hover:text-[#A1C2BD] transition">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
