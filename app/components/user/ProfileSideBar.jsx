// components/user/ProfileSidebar.jsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { User, BarChart2, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import useAuthStore from "../../utils/stores/authSore";
import { useRouter } from "next/navigation";

export default function ProfileSidebar({ activePage }) {
  const { user, token, setUser } = useAuthStore();
  const router = useRouter();

  const menuItems = [
    { label: "My Profile", icon: User, href: "/profile", key: "profile" },
    { label: "Analytics", icon: BarChart2, href: "/profile/analytics", key: "analytics" },
    { label: "Settings", icon: Settings, href: "/profile/settings", key: "settings" },
  ];

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className="hidden md:flex flex-col w-64 bg-[#19183B]/90 backdrop-blur-md border border-[#708993]/20 rounded-2xl p-4 gap-4 sticky top-8 self-start"
    >
      <div className="flex flex-col items-center gap-3 mb-6">
        <img
          src={`http://localhost:5000${user?.avatar}`}
          alt={user?.name}
          className="h-20 w-20 rounded-full object-cover border-2 border-[#A1C2BD]"
        />
        <h2 className="text-[#E7F2EF] font-bold text-lg">{user?.name}</h2>
        <p className="text-[#708993] text-sm">{user?.email}</p>
      </div>

      <div className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <Link key={item.key} href={item.href}>
            <Button
              variant={activePage === item.key ? "default" : "ghost"}
              className={`w-full justify-start gap-2 text-[#E7F2EF] hover:bg-[#708993]/20 hover:text-[#A1C2BD]`}
            >
              <item.icon size={18} />
              {item.label}
            </Button>
          </Link>
        ))}
      </div>

      <div className="mt-auto">
        <Button
          variant="destructive"
          className="w-full justify-start gap-2 hover:bg-[#FF4C4C]/20 hover:text-[#FF4C4C]"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          Logout
        </Button>
      </div>
    </motion.div>
  );
}
