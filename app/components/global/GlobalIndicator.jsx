// components/GlobalLoader.jsx
"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function GlobalLoader() {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  // Trigger loader on pathname change or link click
  useEffect(() => {
    const handleStart = (url) => {
      // Only show loader if user clicked a link (even same page)
      if (url !== pathname || url === pathname) setLoading(true);
    };
    const handleComplete = () => setLoading(false);

    // Next.js 13 app-router doesn't have events like next/router
    // So we manually watch pathname
    handleStart(pathname); // trigger on initial change

    const timer = setTimeout(() => handleComplete(), 500); // fallback if slow network

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/20 flex flex-col items-center justify-center z-50 backdrop-blur-sm"
        >
          <motion.div
            className="w-14 h-14 rounded-full border-4 border-t-[#A1C2BD] border-gray-300"
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ repeat: Infinity, repeatType: "mirror", duration: 1.5 }}
            className="mt-4 text-[#708993] font-medium text-sm"
          >
            Loading...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
