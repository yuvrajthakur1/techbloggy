"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "../../axios/axios";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import UserBlogCard from "../../components/user/UserBlogCard";
import useAuthStore from "../../utils/stores/authSore";
import { motion } from "framer-motion";

export default function PublicProfilePage() {
  const { id } = useParams(); // Profile owner’s ID
  const { user, token } = useAuthStore(); // Logged-in user

  const [profileUser, setProfileUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [profileLoading, setProfileLoading] = useState(true);
  const [blogsLoading, setBlogsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  // --- Fetch profile info ---
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const results = await Promise.allSettled([
          api.get(`/users/${id}`),
          api.get(`/users/${id}/followers`),
          api.get(`/users/${id}/following`),
          api.get(`/blogs/user/${id}`),
        ]);

        // User
        if (results[0].status === "fulfilled")
          setProfileUser(results[0].value.data);
        else setProfileUser(null);

        // Followers
        const followersData =
          results[1].status === "fulfilled" ? results[1].value.data : [];
        setFollowersCount(followersData.length || 0);
        if (followersData.some((f) => f._id === user?._id))
          setIsFollowing(true);

        // Following
        const followingData =
          results[2].status === "fulfilled" ? results[2].value.data : [];
        setFollowingCount(followingData.length || 0);

        // Blogs
        setBlogs(
          results[3].status === "fulfilled" ? results[3].value.data : []
        );
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setProfileLoading(false);
        setBlogsLoading(false);
      }
    };

    fetchProfile();
  }, [id, user]);

  // --- Handle follow/unfollow ---
  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await api.put(
          `/users/unfollow/${id}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setIsFollowing(false);
        setFollowersCount((prev) => Math.max(prev - 1, 0));
      } else {
        await api.put(
          `/users/follow/${id}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setIsFollowing(true);
        setFollowersCount((prev) => prev + 1);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (profileLoading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#19183B] via-[#708993] to-[#E7F2EF] px-4 py-8">
        <p className="text-white text-xl mb-4">Loading profile...</p>
        <div className="w-12 h-12 border-4 border-[#A1C2BD] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!profileUser) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#19183B] via-[#708993] to-[#E7F2EF] px-4 py-8">
        <p className="text-red-500 text-xl">User not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#19183B] via-[#708993] to-[#E7F2EF] px-4 py-8">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto bg-[#19183B] rounded-3xl shadow-2xl p-6 border border-[#708993]/20 mb-12"
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 sm:gap-8">
          {/* Avatar + Info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 w-full sm:w-auto">
            <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-full border-4 border-[#A1C2BD] shadow-lg overflow-hidden flex-shrink-0">
              <Image
                src={`http://localhost:5000${profileUser.avatar}`}
                alt="Profile Avatar"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#E7F2EF]">
                {profileUser.name}
              </h1>
              <p className="text-sm sm:text-base text-[#A1C2BD]">
                {profileUser.email}
              </p>
              <p className="text-sm sm:text-base text-[#708993]">
                {profileUser.number || "No number provided"}
              </p>

              {/* Followers + Following + Total Posts */}
              <div className="flex justify-center sm:justify-start gap-6 mt-2 sm:mt-3 text-[#E7F2EF] font-semibold">
                <p>
                  <span className="text-lg sm:text-xl">{followersCount}</span>{" "}
                  Followers
                </p>
                {/* <p>
                  <span className="text-lg sm:text-xl">{followingCount}</span> Following
                </p> */}
                <p>
                  <span className="text-lg sm:text-xl">{blogs.length}</span>{" "}
                  Posts
                </p>
              </div>
            </div>
          </div>

          {/* Follow/Unfollow */}
          {user?._id !== id && (
            <Button
              onClick={handleFollowToggle}
              className={`mt-3 sm:mt-0 w-full sm:w-auto font-semibold px-6 py-2.5 rounded-full shadow-md transition-all duration-300 transform
      ${
        isFollowing
          ? "bg-gradient-to-r from-[#708993] to-[#A1C2BD] text-white hover:scale-105 hover:brightness-105"
          : "bg-gradient-to-r from-[#A1C2BD]/80 to-[#708993]/80 text-[#19183B] hover:scale-105 hover:brightness-105"
      }`}
            >
              {isFollowing ? "Following" : "Follow"}
            </Button>
          )}
        </div>
      </motion.div>

      {/* Blogs Section */}
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-white inline-block relative pb-3">
            {profileUser?.name}'s Blogs 📰
            <span className="absolute left-1/2 bottom-0 w-28 h-[4px] bg-gradient-to-r from-[#19183B] via-[#708993] to-[#A1C2BD] rounded-full transform -translate-x-1/2 shadow-md"></span>
          </h2>
        </motion.div>

        {blogsLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="w-12 h-12 border-4 border-[#A1C2BD] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : blogs.length === 0 ? (
          <p className="text-[#A1C2BD] text-center">No posts yet...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <UserBlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
