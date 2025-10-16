"use client";

import { useEffect, useState } from "react";
import useAuthStore from "../utils/stores/authSore";
import api from "../axios/axios";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, X, Upload, BarChart2 } from "lucide-react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import UserBlogCard from "../components/user/UserBlogCard";
import FollowersModal from "../components/user/FollowersModal";
import {useRouter, userRouter}  from 'next/navigation'

// ✅ Dynamic import for Markdown Editor (Next.js SSR safe)
import dynamic from "next/dynamic";
import sanitizeMarkdown from "../components/markdown/sanitizeMarkdown";

import { Feather } from "lucide-react";
import ProfileSidebar from "../components/user/ProfileSideBar";
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });
const MarkdownPreview = dynamic(() => import("@uiw/react-markdown-preview"), {
  ssr: false,
});

const MySwal = withReactContent(Swal);

export default function ProfilePage() {
  const { user, token } = useAuthStore();
  const [authChecked, setAuthChecked] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [followersCount, setFollowersCount] = useState(user?.followers?.length);
  const [followingCount, setFollowingCount] = useState(user?.following?.length);
  const [followersModalOpen, setFollowersModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [blogOpen, setBlogOpen] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", image: null });
  const [previewImage, setPreviewImage] = useState(null);
  const [saving, setSaving] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);
  const router = useRouter();

  const cardVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Authentication check
  useEffect(() => {
    const timeout = setTimeout(() => setAuthChecked(true), 50);
    return () => clearTimeout(timeout);
  }, []);

  // Fetch blogs and counts
  const fetchProfileData = async () => {
    if (!user?._id) return;
    setLoading(true);
    try {
      const [blogsRes, followersRes, followingRes, profileUser] =
        await Promise.all([
          api.get(`/blogs/user/${user._id}`),
          // api.get(`/users/${user._id}/followers`),
          // api.get(`/users/${user._id}/following`),
          api.get(`/users/${user._id}`),
        ]);
      console.log("Profile", profileUser);
      setBlogs(blogsRes.data || []);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setBlogs([]);
      } else {
        console.error(err);
        MySwal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to fetch profile data",
          confirmButtonColor: "#A1C2BD",
          scrollbarPadding: false, // ⚡ important
          allowOutsideClick: false, // optional
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, [user]);

  useEffect(() => {
    if (!selectedUserId || !followersModalOpen) return;

    const fetchFollowers = async () => {
      try {
        const res = await api.get(`/users/${selectedUserId}/followers`);
        setFollowersCount(res.data.length || 0); // ✅ update count here
      } catch (err) {
        console.error(err);
      }
    };

    fetchFollowers();
  }, [selectedUserId, followersModalOpen]);

  // Form handlers
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] });
      if (files[0]) setPreviewImage(URL.createObjectURL(files[0]));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description)
      return MySwal.fire({
        icon: "warning",
        title: "Oops!",
        text: "Please fill all fields",
        confirmButtonColor: "#A1C2BD",
        scrollbarPadding: false, // ⚡ important
        allowOutsideClick: false, // optional
      });

    try {
      setSaving(true);
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description); // markdown text
      if (form.image) formData.append("image", form.image);

      await api.post("/blogs", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      MySwal.fire({
        icon: "success",
        title: "Created!",
        text: "Blog created successfully",
        confirmButtonColor: "#A1C2BD",
        scrollbarPadding: false, // ⚡ important
        allowOutsideClick: false, // optional
      });

      setBlogOpen(false);
      setForm({ title: "", description: "", image: null });
      setPreviewImage(null);
      fetchProfileData();
    } catch (err) {
      console.error(err);
      MySwal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to create blog",
        confirmButtonColor: "#A1C2BD",
        scrollbarPadding: false, // ⚡ important
        allowOutsideClick: false, // optional
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (id) =>
    setBlogs((prev) => prev.filter((b) => b._id !== id));
  const handleUpdate = (updatedBlog) =>
    setBlogs((prev) =>
      prev.map((b) => (b._id === updatedBlog._id ? updatedBlog : b))
    );

  if (!authChecked) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <motion.p
          className="text-[#A1C2BD] text-lg sm:text-xl"
          animate={{ opacity: [0, 1, 0], y: [0, -5, 0] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          Checking authentication...
        </motion.p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen text-[#19183B] text-2xl">
        <Link
          href="/login"
          className="text-[#A1C2BD] underline hover:text-[#E7F2EF]"
        >
          Login First
        </Link>
      </div>
    );
  }

  return (
   <>
      
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#19183B] via-[#708993] to-[#E7F2EF] px-4 sm:px-6 md:px-8 lg:px-10 py-8">
      {/* Profile Header */}
      {/* Profile Header */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
        className="w-full max-w-5xl mx-auto bg-[#19183B] rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 lg:p-12 border border-[#708993]/20 mb-12"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 p-4 sm:p-6 bg-gradient-to-br from-[#19183B] via-[#22215E] to-[#2D2C70] rounded-2xl shadow-2xl border border-[#708993]/20">
          {/* Profile Info */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full md:w-auto">
           { user?.avatar?.url &&
              <motion.div
              className="relative h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 rounded-full border-4 border-[#A1C2BD] shadow-lg overflow-hidden"
              whileHover={{ scale: 1.1 }}
            >
              <Image
                src={`${user?.avatar?.url}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt="Profile Image"
                className="object-cover"
                priority
              />
            </motion.div>
           }
               
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#E7F2EF] mb-1 drop-shadow-lg">
                {user.name}
              </h1>
              <p className="text-[#A1C2BD] text-xs sm:text-sm">{user.email}</p>
              <p className="text-[#708993] text-xs sm:text-sm">
                {user.number || "No number provided"}
              </p>

              {/* Followers, Following & Blogs */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4 sm:gap-6 mt-2 sm:mt-3 text-[#E7F2EF] font-semibold text-sm sm:text-base">
                <p
                  onClick={() => {
                    setSelectedUserId(user._id);
                    setFollowersModalOpen(true);
                  }}
                  className="cursor-pointer hover:text-[#A1C2BD]"
                >
                  <span className="text-lg sm:text-xl">{followersCount}</span>{" "}
                  Followers
                </p>

                <p>
                  <span className="text-lg sm:text-xl">{followingCount}</span>{" "}
                  Following
                </p>

                <p>
                  <span className="text-lg sm:text-xl">{blogs.length}</span>{" "}
                  Blogs
                </p>
              </div>
            </div>
          </div>

          {/* Buttons: Create Blog + Analytics */}
          <motion.div className="w-full sm:w-auto mt-4 md:mt-0 flex flex-col sm:flex-row gap-2">
            {/* Create Blog */}
            <Button
              onClick={() => setBlogOpen(true)}
               className="w-full sm:w-auto bg-[#2D2C70] hover:bg-[#22215E] text-[#E7F2EF] font-semibold px-6 py-2 rounded-full shadow-lg flex items-center gap-2 transition-all duration-300"
            >
              <Plus size={20} /> Blog
            </Button>

            {/* Analytics */}
            <Button
              onClick={() => router.push("/profile/analytics")}
              className="w-full sm:w-auto bg-[#2D2C70] hover:bg-[#22215E] text-[#E7F2EF] font-semibold px-6 py-2 rounded-full shadow-lg flex items-center gap-2 transition-all duration-300"
            >
              <BarChart2 size={20} /> 
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Create Blog Modal */}
      {blogOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 120 }}
            className="bg-[#19183B] rounded-2xl w-full max-w-4xl p-4 sm:p-6 relative border border-[#708993]/20 shadow-xl
                 max-h-[90vh] overflow-y-auto"
          >
            {/* ❌ Close Button */}
            <button
              onClick={() => {
                setBlogOpen(false);
                setPreviewImage(null);
                setForm({ title: "", description: "", image: null });
              }}
              className="absolute top-4 right-4 text-[#E7F2EF] hover:text-[#A1C2BD]"
            >
              <X size={20} />
            </button>

            <h2 className="text-[#A1C2BD] font-bold text-lg mb-4">
              Create Blog
            </h2>

            {/* ✅ Your form content as it is... */}
            <input
              value={form.title}
              onChange={handleChange}
              name="title"
              placeholder="Title"
              className="w-full p-2 rounded-md bg-[#1E1B3B] text-[#E7F2EF] border border-[#708993] focus:outline-none focus:ring-2 focus:ring-[#A1C2BD] text-sm sm:text-base mb-3"
            />

            <div data-color-mode="dark" className="mb-4">
              <MDEditor
                value={form.description}
                onChange={(val) =>
                  setForm({ ...form, description: sanitizeMarkdown(val) })
                }
                height={250}
              />
              <div className="mt-3 bg-[#1E1B3B] p-2 rounded-md border border-[#708993]">
                <h3 className="text-[#A1C2BD] text-sm mb-1">Preview:</h3>
                <MarkdownPreview source={sanitizeMarkdown(form.description)} />
              </div>
            </div>

            {/* Image Upload */}
            <div className="flex flex-col gap-2 mb-3">
              {previewImage && (
                <div className="relative w-full h-32 sm:h-40 rounded-md overflow-hidden border border-[#708993]">
                  <Image
                    src={previewImage}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <label className="inline-flex items-center gap-2 cursor-pointer text-[#A1C2BD] hover:text-[#708993]">
                <Upload size={16} /> Choose Image
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className="hidden"
                  onChange={handleChange}
                />
              </label>
            </div>

            <button
              onClick={handleSubmit}
              className={`mt-4 w-full px-4 py-2 bg-gradient-to-r from-[#708993] to-[#A1C2BD] text-[#19183B] font-bold rounded-md ${
                saving
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:scale-105 transition-all duration-300"
              }`}
              disabled={saving}
            >
              {saving ? "Saving..." : "Create Blog"}
            </button>
          </motion.div>
        </div>
      )}
      {/* Blogs Section */}
      {/* Blogs Section */}
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
              {/* Feather-style Icon Animation on Right */}
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

            {/* Centered underline stays aligned under the text */}
            <span className="absolute left-1/2 bottom-0 w-28 h-[4px] bg-gradient-to-r from-[#19183B] via-[#708993] to-[#A1C2BD] rounded-full transform -translate-x-1/2 shadow-md"></span>
          </h2>
        </motion.div>

        {loading ? (
          <motion.p className="text-[#A1C2BD] text-center animate-pulse">
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
                    currentUserId={user._id}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                  />
                </motion.div>
              ))}
            </motion.div>

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
      <div className="min-h-screen flex flex-col bg-gradient-to-br ...">
        {/* ===== Profile Header & Create Blog Modal & Blogs Section ===== */}
        {/* Your existing code here ... */}

        {/* Followers Modal */}
        {followersModalOpen && selectedUserId && (
          <FollowersModal
            userId={selectedUserId}
            onClose={() => setFollowersModalOpen(false)}
          />
        )}
      </div>
    </div>
   </>
  );
}
