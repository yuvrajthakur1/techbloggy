

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import useAuthStore from "../utils/stores/authSore";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  // 🧩 Fix hydration issue → render only after client mount
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    alert("Logout Successfully");
    router.replace("/feed");
  };

  const isActive = (path) =>
    mounted && pathname === path
      ? "text-[#19183B] font-semibold"
      : "text-gray-700";

  return (
    <header>
      <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-md z-50 transition-all">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-extrabold text-[#19183B] tracking-tight hover:text-[#708993] transition-colors duration-300"
          >
            CodeHorizon
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {[
              { href: "/", label: "Home" },
              { href: "/features", label: "Features" },
              { href: "/feed", label: "Feed" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium ${isActive(
                  link.href
                )} hover:text-[#708993] transition-colors duration-300 group`}
              >
                {link.label}
                {/* underline animation */}
                {mounted && (
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] bg-[#19183B] transition-all duration-300 ${
                      pathname === link.href
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                )}
              </Link>
            ))}

            {user && (
              <Link
                href="/profile"
                className={`relative text-sm font-medium ${isActive(
                  "/profile"
                )} hover:text-[#708993] transition-colors duration-300 group`}
              >
                Profile
                {mounted && (
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] bg-[#19183B] transition-all duration-300 ${
                      pathname === "/profile"
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                )}
              </Link>
            )}

            {!user ? (
              <Link href="/login">
                <Button className="bg-[#19183B] hover:bg-[#708993] text-white px-5 py-2 rounded-full transition-all duration-300 shadow-md">
                  Login
                </Button>
              </Link>
            ) : (
              <Button
                onClick={handleLogout}
                className="bg-[#19183B] hover:bg-[#708993] text-white px-5 py-2 rounded-full transition-all duration-300 shadow-md"
              >
                Logout
              </Button>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              aria-label="Toggle menu"
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none text-[#19183B] transition-transform duration-300"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      <div className="pt-16 md:pt-16"></div>
    </header>
  );
}
