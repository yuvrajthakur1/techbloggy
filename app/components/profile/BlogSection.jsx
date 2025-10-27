"use client";

import { motion } from "framer-motion";
import { Feather } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserBlogCard from "../user/UserBlogCard";

export default function UserBlogsSection({
  blogs = [],
  loading,
  visibleCount,
  setVisibleCount,
  setBlogOpen,
  handleDelete,
  handleUpdate,
  user,
}) {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const cardVariant = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  return (
    <div className="max-w-7xl container mt-16 mx-auto px-2 sm:px-4 lg:px-8">
      {/* Section Heading */}
      <motion.div
        className="text-center mb-12"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-white inline-flex items-center justify-center relative pb-3">
          <span className="flex items-center justify-center gap-2">
            Your Blogs
            {/* Feather Icon Animation */}
            <motion.span
              initial={{ rotate: -10, y: -2, opacity: 0 }}
              whileInView={{
                rotate: [-10, 10, -10],
                y: [-2, -6, -2],
                opacity: 1,
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="inline-flex items-center"
            >
              <Feather
                className="h-7 w-7 md:h-8 md:w-8 text-[#A1C2BD] drop-shadow-lg"
                strokeWidth={1.8}
              />
            </motion.span>
          </span>

          {/* Underline */}
          <span className="absolute left-1/2 bottom-0 w-28 h-[4px] bg-gradient-to-r from-[#19183B] via-[#708993] to-[#A1C2BD] rounded-full transform -translate-x-1/2 shadow-md"></span>
        </h2>
      </motion.div>

      {/* Blog States */}
      {loading ? (
        <motion.p
          className="text-[#A1C2BD] text-center animate-pulse"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Loading blogs...
        </motion.p>
      ) : blogs.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-12 bg-[#1E1B3B] rounded-xl border border-[#708993]/30">
          <p className="text-[#A1C2BD] text-center text-lg sm:text-xl">
            No blogs yet...
          </p>
          <Button
            className="w-full sm:w-auto bg-gradient-to-r from-[#A1C2BD] to-[#708993] text-[#19183B] font-semibold px-6 py-2 rounded-full shadow-md hover:scale-105 transition-all duration-300"
            onClick={() => setBlogOpen(true)}
          >
            Create Your First Blog
          </Button>
        </div>
      ) : (
        <>
          {/* Blog Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
          >
            {blogs.slice(0, visibleCount).map((blog) => (
              <motion.div key={blog._id} variants={cardVariant}>
                <UserBlogCard
                  blog={blog}
                  currentUserId={user?._id}
                  onDelete={handleDelete}
                  onUpdate={handleUpdate}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Load More Button */}
          {visibleCount < blogs.length && (
            <div className="flex justify-center mt-8">
              <Button
                onClick={() => setVisibleCount((prev) => prev + 4)}
                className="w-full sm:w-auto bg-gradient-to-r from-[#A1C2BD] to-[#708993] hover:from-[#708993] hover:to-[#A1C2BD] text-[#19183B] font-semibold px-6 py-2 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
              >
                Load More Blogs
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
