"use client";

import { useState, useEffect, useRef } from "react";
import api from "../axios/axios";
import UserBlogCard from "../components/user/UserBlogCard";
import useAuthStore from "../utils/stores/authSore";
import { motion } from "framer-motion";
import useDebounce from "../components/utils/Debounce";

import { Compass } from "lucide-react";
import { Search, X } from "lucide-react";

export default function Feed() {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filterBy, setFilterBy] = useState("title");
  const debouncedSearch = useDebounce(search, 1000);

  const { user } = useAuthStore();
  const curId = user ? user?._id : "";
  const loader = useRef(null);

  const loadBlogs = async (pageNum = 1, searchQuery = "", filter = "title") => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await api.get("/blogs", {
        params: { page: pageNum, limit: 6, search: searchQuery, filter },
      });

      if (pageNum === 1) setBlogs(res.data.blogs);
      else
        setBlogs((prev) => {
          const newBlogs = res.data.blogs.filter(
            (b) => !prev.some((pb) => pb?._id === b?._id)
          );
          return [...prev, ...newBlogs];
        });

      setHasMore(res.data.hasMore);
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    setBlogs([]);
    loadBlogs(1, debouncedSearch, filterBy);
  }, [debouncedSearch, filterBy]);

  useEffect(() => {
    if (page === 1) return;
    loadBlogs(page, debouncedSearch, filterBy);
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.8 }
    );

    if (loader.current) observer.observe(loader.current);
    return () => loader.current && observer.unobserve(loader.current);
  }, [hasMore, loading]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#19183B] via-[#708993] to-[#E7F2EF] px-4 py-8 sm:px-6 md:px-10">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          {/* Animated Gradient Heading with Compass */}
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <motion.h1
              className="text-3xl sm:text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-[#A1C2BD] via-[#708993] to-[#19183B] bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
              animate={{
                backgroundPosition: ["200% center", "0% center"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
              style={{ backgroundSize: "200% auto" }}
            >
              Discover Insights
            </motion.h1>

            {/* Animated Compass Icon */}
            <motion.span
              initial={{ rotate: -15, opacity: 0 }}
              whileInView={{
                rotate: [-15, 15, -15],
                opacity: 1,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Compass
                className="h-6 w-6 sm:h-9 sm:w-9 text-[#A1C2BD] drop-shadow-lg"
                strokeWidth={1.6}
              />
            </motion.span>
          </div>

          {/* Soft fade-in tagline */}
          <motion.p
            className="mt-3 text-[#A1C2BD]/80 sm:text-lg text-sm tracking-wide"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Dive into trending blogs, stories, and more.
          </motion.p>

          {/* Underline flourish */}
          <motion.span
            className="block mx-auto mt-4 w-24 h-[3px] bg-gradient-to-r from-[#19183B] via-[#708993] to-[#A1C2BD] rounded-full shadow-md"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
            style={{ transformOrigin: "center" }}
          />
        </motion.div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10 items-stretch">
          <div className="relative flex-1 w-full">
            <Search
              className="absolute left-4 top-3 text-[#A1C2BD]/70"
              size={20}
            />
            {search && (
              <X
                className="absolute right-4 top-3 text-[#A1C2BD]/70 cursor-pointer hover:text-white"
                size={20}
                onClick={() => setSearch("")}
              />
            )}
            <input
              type="text"
              placeholder={`Search by ${filterBy}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#1E1D40]/90 text-[#E7F2EF] rounded-2xl pl-10 pr-10 py-3 outline-none border border-[#708993]/40 focus:border-[#A1C2BD] focus:ring-1 focus:ring-[#A1C2BD] shadow-md sm:text-base text-sm transition duration-200"
            />
          </div>

          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="bg-[#1E1D40]/90 text-[#E7F2EF] border border-[#708993]/40 rounded-2xl px-5 py-3 outline-none focus:border-[#A1C2BD] focus:ring-1 focus:ring-[#A1C2BD] shadow-md w-full sm:w-44 sm:text-base text-sm transition duration-200"
          >
            <option value="title">Title</option>
            <option value="author">Author</option>
          </select>
        </div>

        {/* Blogs List */}
        <div className="flex flex-col gap-8">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog._id}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                type: "spring",
                stiffness: 120,
              }}
              viewport={{ once: false, amount: 0.2 }}
            >
              {
                console.log("Apka Blog", blog)
              }
              <UserBlogCard blog={blog} currentUserId={curId} fullWidth />
            </motion.div>
          ))}
        </div>

        {/* Loader */}
        <div
          ref={loader}
          className="h-16 flex justify-center items-center mt-10"
        >
          {loading && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="animate-pulse text-white text-lg font-semibold"
            >
              Loading blogs...
            </motion.p>
          )}
        </div>

        {/* End of feed */}
        {!hasMore && !loading && (
          <motion.p
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 150, damping: 10 }}
            viewport={{ once: true }}
            className="text-gray-300 mt-12 text-center text-lg font-medium"
          >
            🎉 You’ve reached the end of the feed!
          </motion.p>
        )}
      </div>
    </div>
  );
}
