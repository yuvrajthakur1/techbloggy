"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {useState } from "react";
import { Menu, X } from "lucide-react";
import useAuthStore from "../utils/stores/authSore";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user ,logout } = useAuthStore();
  const router = useRouter();


  const handleLogout = () => {
  logout();                  // Clear user auth
  setIsOpen(false);          // Close mobile menu if open
  alert("Logout Successfully");
  router.replace("/feed");   // Navigate to feed
};


  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-extrabold text-[#19183B] tracking-tight hover:text-[#708993] transition-colors duration-300"
        >
          TechBloggy
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-sm font-medium text-gray-700 hover:text-[#708993] transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            href="/feed"
            className="text-sm font-medium text-gray-700 hover:text-[#708993] transition-colors duration-300"
          >
            Feed
          </Link>

          {user && (
            <Link
              href="/profile"
              className="text-sm font-medium text-gray-700 hover:text-[#708993] transition-colors duration-300"
            >
              Profile
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

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none text-[#19183B] transition-transform duration-300"
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-96 shadow-md" : "max-h-0"
        }`}
      >
        <div className="flex flex-col divide-y divide-gray-200">
          <Link
            href="/"
            className="block px-6 py-3 text-gray-700 hover:bg-gray-100 transition"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/feed"
            className="block px-6 py-3 text-gray-700 hover:bg-gray-100 transition"
            onClick={() => setIsOpen(false)}
          >
            Feed
          </Link>
          {user && (
            <Link
              href="/profile"
              className="block px-6 py-3 text-gray-700 hover:bg-gray-100 transition"
              onClick={() => setIsOpen(false)}
            >
              Profile
            </Link>
          )}
          <div className="px-6 py-4">
            {!user ? (
              <Link href="/login" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-[#19183B] hover:bg-[#708993] text-white rounded-full">
                  Login
                </Button>
              </Link>
            ) : (
              <Button
                onClick={handleLogout}
                className="w-full bg-[#19183B] hover:bg-[#708993] text-white rounded-full"
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
