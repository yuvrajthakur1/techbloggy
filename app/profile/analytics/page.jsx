"use client";

import { useEffect, useState } from "react";
import api from "../../axios/axios";
import { motion } from "framer-motion";
import useAuthStore from "../../utils/stores/authSore";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UserDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false); // ✅ track if API call finished
  const { token } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const fetchDashboard = async () => {
      if (!token) {
        setLoading(false);
        setHasFetched(true); // mark that fetch attempted
        return;
      }
      try {
        const res = await api.get("/userdashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data); // only set actual data
      } catch (err) {
        console.error("Error fetching dashboard:", err);
      } finally {
        setLoading(false);
        setHasFetched(true); // ✅ API finished
      }
    };

    fetchDashboard();
  }, [token]);

  const containerClasses =
    "min-h-[calc(100vh-80px)]  mx-auto p-6 bg-gradient-to-br from-[#19183B] via-[#708993] to-[#E7F2EF] text-white";

  if (loading) {
    return (
      <div className={`${containerClasses} flex items-center justify-center`}>
        <p className="text-white text-center text-lg">Loading...</p>
      </div>
    );
  }

  // ✅ Only show "No data" if API finished fetching and no data returned
  if (hasFetched && !data) {
    return (
      <div className={`${containerClasses} flex items-center justify-center`}>
        <p className="text-white text-center text-lg">Loading..</p>
      </div>
    );
  }

  if (!data) return null; // nothing to render yet

  const { user, stats, blogs, recentFollowers } = data;

  return (
    <div className={containerClasses}>
     <div className="max-w-7xl mx-auto">
       {/* User Info */}
      <div className="flex items-center gap-4 mb-8">
        {user?.avatar && (
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}${user.avatar}`}
            alt={user.name}
            className="h-20 w-20 rounded-full object-cover"
          />
        )}
        <div>
          <h1 className="text-3xl font-bold">{user?.name}</h1>
          <p className="text-gray-300">{user?.email}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="p-4 bg-[#1E1D40]/80 rounded-xl text-center shadow-md">
          <p className="text-2xl font-bold">{stats?.blogsCount || 0}</p>
          <p className="text-gray-300">Blogs</p>
        </div>
        <div className="p-4 bg-[#1E1D40]/80 rounded-xl text-center shadow-md">
          <p className="text-2xl font-bold">{stats?.followersCount || 0}</p>
          <p className="text-gray-300">Followers</p>
        </div>
        <div className="p-4 bg-[#1E1D40]/80 rounded-xl text-center shadow-md">
          <p className="text-2xl font-bold">{stats?.followingCount || 0}</p>
          <p className="text-gray-300">Following</p>
        </div>
      </div>

      {/* My Blogs */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">My Blogs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {blogs?.map((b) => (
            <motion.div
              key={b._id}
              className="p-4 bg-[#1E1D40]/80 rounded-xl shadow-md"
              whileHover={{ scale: 1.03 }}
            >
              {b.image && (
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}${b.image}`}
                  alt={b.title}
                  className="h-40 w-full object-cover rounded-md mb-2"
                />
              )}
              <h3 className="font-semibold">{b.title}</h3>
              <button
                onClick={() => router.push(`/blog/${b._id}`)}
                className="text-[#708993] hover:text-[#A1C2BD] flex gap-1 items-center mt-1"
              >
                See More <ArrowRight size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Followers */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Recent Followers</h2>
        <div className="flex gap-4">
          {recentFollowers?.map((f) => (
            <Link key={f._id} href={`/publicprofile/${f._id}`}>
              <div className="flex flex-col items-center gap-2 cursor-pointer">
                {f.avatar && (
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}${f.avatar}`}
                    alt={f.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                )}
                <p className="text-gray-300 text-sm">{f.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
     </div>
    </div>
  );
}
