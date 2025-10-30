

"use client";
import { PlusCircle, Search, User, Bot,Lightbulb } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useAuthStore from "../utils/stores/authSore";
import AiWriterModal from "../components/AiWriteModal"; // 👈 Import your modal component

export default function BottomNav() {
  const router = useRouter();
  const [active, setActive] = useState("/");
  const [chatOpen, setChatOpen] = useState(false); // 👈 state for modal
  const { user } = useAuthStore((s) => s);

  if (!user) return null;

  const handleClick = (route) => {
    setActive(route);

    if (route === "bot") {
      // 🧠 Open modal instead of routing
      setChatOpen(true);
      return;
    }

    if (route === "create") router.push("/create");
    if (route === "profile") router.push("/profile");
    if (route === "search") router.push("/search");
  };

  return (
    <>
      {/* 🧠 AI Writer Modal */}
      {chatOpen && <AiWriterModal open={chatOpen} setChatOpen={setChatOpen} />}

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
          <Lightbulb className="w-6 h-6 mb-1" />
          Bot
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
    </>
  );
}
