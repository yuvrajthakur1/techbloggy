"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import api from "./axios/axios";
import BlogCard from "./components/BlogCard";
import { motion } from "framer-motion";
import Link from "next/link";
// Variants for animations

import { Feather } from "lucide-react";

const MotionFeather = motion(Feather);
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLatestBlog = async () => {
    try {
      const res = await api.get("/blogs/home/latest");
      setBlogs(res.data);
    } catch (error) {
      console.error("Some Error Occurred In Fetching Data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestBlog();
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#19183B] via-[#708993] to-[#E7F2EF] min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-32 text-white bg-cover bg-center bg-[url('/hero-image.jpg')] overflow-hidden">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Floating light effect */}
        <motion.div
          className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-[#708993]/20 blur-3xl"
          animate={{ x: [0, 50, -50, 0], y: [0, -30, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        ></motion.div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center justify-center">
          <motion.h1
            className="flex flex-wrap justify-center items-center gap-3 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="flex flex-wrap justify-center items-center gap-3">
              Welcome to
              <motion.span
                className="relative inline-flex items-center gap-2 bg-gradient-to-r from-[#A1C2BD] via-[#708993] to-[#19183B] bg-clip-text text-transparent"
                animate={{ backgroundPosition: ["200% center", "0% center"] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "mirror",
                }}
                style={{ backgroundSize: "200% auto" }}
              >
                Tech
                <MotionFeather
                  className="h-8 w-8 sm:h-9 sm:w-9 text-[#A1C2BD]"
                  strokeWidth={1.5}
                  initial={{ rotate: -8, y: -2 }}
                  animate={{ rotate: [-8, 6, -8], y: [-2, -6, -2] }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.span>
            </span>
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl opacity-90 mb-8 max-w-2xl"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 1, delay: 0.5 }}
          >
            A space where developers share ideas, learn together, and grow their
            craft.
          </motion.p>

          <motion.div
            variants={scaleUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Link href="/feed">
              <Button className="px-8 py-3 text-lg font-semibold rounded-full bg-gradient-to-r from-[#A1C2BD] via-[#708993] to-[#19183B] hover:scale-110 transition-transform duration-300 shadow-xl">
                Explore Blogs
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Latest Blogs */}
      <section className="max-w-6xl mx-auto px-6 py-20 flex-1">
        <motion.div
          className="text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-white inline-block relative pb-3">
            Latest Blogs 📰
            <span className="absolute left-1/2 bottom-0 w-28 h-[4px] bg-gradient-to-r from-[#19183B] via-[#708993] to-[#A1C2BD] rounded-full transform -translate-x-1/2 shadow-md"></span>
          </h2>
        </motion.div>

        {!loading ? (
          <>
            {/* Blog Cards with animation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.slice(0, 3).map((blog, i) => (
                <motion.div
                  key={blog._id}
                  variants={scaleUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                >
                  <BlogCard blog={blog} />
                </motion.div>
              ))}
            </div>

            {/* Explore More Button */}
            <motion.div
              className="mt-10 text-center"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Link href="/feed">
                <Button name = "Explore" className="px-8 py-3 rounded-full bg-gradient-to-r from-[#A1C2BD] via-[#708993] to-[#19183B] text-white font-semibold hover:scale-105 transition-transform duration-300 shadow-lg">
                  Explore More Blogs 🚀
                </Button>
              </Link>
            </motion.div>
          </>
        ) : (
          <motion.h1
            className="text-center text-white text-lg"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8 }}
          >
            Loading Your Blogs...
          </motion.h1>
        )}
      </section>
    </div>
  );
}
