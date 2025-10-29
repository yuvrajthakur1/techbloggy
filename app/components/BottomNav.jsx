"use client";
import { PlusCircle, Search, User, Bot } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useAuthStore from "../utils/stores/authSore"; // 👈 Import auth store

export default function BottomNav() {
  const router = useRouter();
  const [active, setActive] = useState("/");
  const { user } = useAuthStore((s) => s); // 👈 Get logged-in user

  // 🔒 If not logged in, return null (nothing will render)
  if (!user) return null;

  const handleClick = (route) => {
    setActive(route);
    if (route === "bot") router.push("/");
    if (route === "create") router.push("/create");
    if (route === "profile") router.push("/profile");
    if (route === "search") router.push("/search");
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-[#E7F2EF] border-t border-[#A1C2BD]/60 shadow-sm flex justify-around items-center py-3 z-50">
      {/* 🔍 Search */}
      <button
        onClick={() => handleClick("search")}
        className={`flex flex-col items-center text-xs transition-colors duration-200 ${
          active === "search" ? "text-[#19183B]" : "text-[#708993]"
        }`}
      >
        <Search className="w-6 h-6 mb-1" />
        Search
      </button>

      {/* 🤖 Bot */}
      <button
        onClick={() => handleClick("bot")}
        className={`flex flex-col items-center text-xs transition-colors duration-200 ${
          active === "bot" ? "text-[#19183B]" : "text-[#708993]"
        }`}
      >
        <Bot className="w-6 h-6 mb-1" />
        Bot
      </button>

      {/* ➕ Create */}
      <button
        onClick={() => handleClick("create")}
        className={`flex flex-col items-center text-xs transition-transform duration-200 ${
          active === "create" ? "text-[#19183B] scale-110" : "text-[#708993]"
        }`}
      >
        <div className="bg-[#A1C2BD] text-[#19183B] rounded-full p-2 shadow-md">
          <PlusCircle className="w-6 h-6" />
        </div>
        <span className="mt-1">Create</span>
      </button>

      {/* 👤 Profile */}
      <button
        onClick={() => handleClick("profile")}
        className={`flex flex-col items-center text-xs transition-colors duration-200 ${
          active === "profile" ? "text-[#19183B]" : "text-[#708993]"
        }`}
      >
        <User className="w-6 h-6 mb-1" />
        Profile
      </button>
    </nav>
  );
}
