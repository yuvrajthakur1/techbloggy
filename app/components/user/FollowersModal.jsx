


// "use client";

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import api from "../../axios/axios";
// import Image from "next/image";
// import { X, Trash2 } from "lucide-react";
// import Link from "next/link";
// import useAuthStore from "../../utils/stores/authSore"; // 👈 for token
// import Swal from "sweetalert2";

// export default function FollowersModal({ userId, onClose }) {
//   const [followers, setFollowers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { token } = useAuthStore();

//   // Fetch followers
//   useEffect(() => {
//     const fetchFollowers = async () => {
//       try {
//         const res = await api.get(`/users/${userId}`);
//         const user = res.data;

//         if (user.followers && user.followers.length > 0) {
//           const followersDetails = await Promise.all(
//             user.followers.map(async (fid) => {
//               const fRes = await api.get(`/users/${fid}`);
//               return fRes.data;
//             })
//           );
//           setFollowers(followersDetails);
//         } else {
//           setFollowers([]);
//         }
//       } catch (err) {
//         console.error(err);
//         setFollowers([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (userId) fetchFollowers();
//   }, [userId]);

//   // 🔥 Handle Remove Follower
//   const handleRemoveFollower = async (followerId, followerName) => {
//     const confirm = await Swal.fire({
//       title: "Remove Follower?",
//       text: `Do you really want to remove ${followerName}?`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, remove",
//       cancelButtonText: "Cancel",
//       background: "#19183B",
//       color: "#E7F2EF",
//       confirmButtonColor: "#A1C2BD",
//       cancelButtonColor: "#708993",
//     });

//     if (!confirm.isConfirmed) return;

//     try {
//       await api.put(
//         `/users/remove-follower/${followerId}`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setFollowers((prev) => prev.filter((f) => f._id !== followerId));

//       Swal.fire({
//         title: "Removed!",
//         text: `${followerName} has been removed.`,
//         icon: "success",
//         background: "#19183B",
//         color: "#E7F2EF",
//         confirmButtonColor: "#A1C2BD",
//       });
//     } catch (err) {
//       console.error(err);
//       Swal.fire({
//         title: "Error",
//         text: "Failed to remove follower. Try again later.",
//         icon: "error",
//         background: "#19183B",
//         color: "#E7F2EF",
//         confirmButtonColor: "#A1C2BD",
//       });
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 overflow-y-auto">
//       <motion.div
//         initial={{ scale: 0.8, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 0.4, type: "spring", stiffness: 120 }}
//         className="bg-[#19183B] rounded-2xl w-full max-w-md p-6 border border-[#708993]/25 shadow-xl"
//       >
//         {/* Header */}
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-[#A1C2BD] font-bold text-lg">Followers</h2>
//           <button
//             onClick={onClose}
//             className="text-[#E7F2EF] hover:text-[#A1C2BD] transition"
//           >
//             <X size={20} />
//           </button>
//         </div>

//         {/* Followers List */}
//         {loading ? (
//           <p className="text-[#A1C2BD] animate-pulse text-center">
//             Loading followers...
//           </p>
//         ) : followers.length === 0 ? (
//           <p className="text-[#A1C2BD] text-center">No followers yet.</p>
//         ) : (
//           <div className="flex flex-col gap-3 max-h-80 overflow-y-auto">
//             {followers.map((follower) => (
//               <div
//                 key={follower._id}
//                 className="flex items-center justify-between bg-[#1E1D40] hover:bg-[#23224B] transition p-2 rounded-xl"
//               >
//                 <div className="flex items-center gap-3">
//                   <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#A1C2BD]/60">
//                     <Link href={`/publicprofile/${follower._id}`}>
//                       <Image
//                         src={
//                           follower.avatar?.startsWith("http")
//                             ? follower.avatar
//                             : `http://localhost:5000${follower.avatar}`
//                         }
//                         alt={follower.name}
//                         fill
//                         className="object-cover"
//                       />
//                     </Link>
//                   </div>
//                   <p className="text-[#E7F2EF] font-medium">
//                     {follower.name}
//                   </p>
//                 </div>

//                 {/* ❌ Remove Button */}
//                 <button
//                   onClick={() =>
//                     handleRemoveFollower(follower._id, follower.name)
//                   }
//                   className="text-[#A1C2BD] hover:text-red-400 transition"
//                   title="Remove follower"
//                 >
//                   <Trash2 size={18} />
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </motion.div>
//     </div>
//   );
// }



// "use client";

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import api from "../../axios/axios";
// import Image from "next/image";
// import { X, Trash2, Search } from "lucide-react";
// import Link from "next/link";
// import useAuthStore from "../../utils/stores/authSore";
// import Swal from "sweetalert2";

// export default function FollowersModal({ userId, onClose }) {
//   const [followers, setFollowers] = useState([]);
//   const [filteredFollowers, setFilteredFollowers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const { token } = useAuthStore();

//   // Fetch followers
//   useEffect(() => {
//     const fetchFollowers = async () => {
//       try {
//         const res = await api.get(`/users/${userId}`);
//         const user = res.data;

//         if (user.followers && user.followers.length > 0) {
//           const followersDetails = await Promise.allSettled(
//             user.followers.map(async (fid) => {
//               const fRes = await api.get(`/users/${fid}`);
//               return fRes.data;
//             })
//           );

//           const successful = followersDetails
//             .filter((r) => r.status === "fulfilled")
//             .map((r) => r.value);

//           setFollowers(successful);
//           setFilteredFollowers(successful);
//         } else {
//           setFollowers([]);
//           setFilteredFollowers([]);
//         }
//       } catch (err) {
//         console.error(err);
//         setFollowers([]);
//         setFilteredFollowers([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (userId) fetchFollowers();
//   }, [userId]);

//   // Handle Remove Follower
//   const handleRemoveFollower = async (followerId, followerName) => {
//     const confirm = await Swal.fire({
//       title: "Remove Follower?",
//       text: `Do you really want to remove ${followerName}?`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, remove",
//       cancelButtonText: "Cancel",
//       background: "#19183B",
//       color: "#E7F2EF",
//       confirmButtonColor: "#A1C2BD",
//       cancelButtonColor: "#708993",
//     });

//     if (!confirm.isConfirmed) return;

//     try {
//       await api.put(
//         `/users/remove-follower/${followerId}`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       const updated = followers.filter((f) => f._id !== followerId);
//       setFollowers(updated);
//       setFilteredFollowers(updated);

//       Swal.fire({
//         title: "Removed!",
//         text: `${followerName} has been removed.`,
//         icon: "success",
//         background: "#19183B",
//         color: "#E7F2EF",
//         confirmButtonColor: "#A1C2BD",
//       });
//     } catch (err) {
//       console.error(err);
//       Swal.fire({
//         title: "Error",
//         text: "Failed to remove follower. Try again later.",
//         icon: "error",
//         background: "#19183B",
//         color: "#E7F2EF",
//         confirmButtonColor: "#A1C2BD",
//       });
//     }
//   };

//   // 🔍 Handle search
//   useEffect(() => {
//     if (search.trim() === "") {
//       setFilteredFollowers(followers);
//     } else {
//       const lower = search.toLowerCase();
//       const filtered = followers.filter((f) =>
//         f.name.toLowerCase().includes(lower)
//       );
//       setFilteredFollowers(filtered);
//     }
//   }, [search, followers]);

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 overflow-y-auto">
//       <motion.div
//         initial={{ scale: 0.8, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 0.4, type: "spring", stiffness: 120 }}
//         className="bg-[#19183B] rounded-2xl w-full max-w-md p-6 border border-[#708993]/25 shadow-xl"
//       >
//         {/* Header */}
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-[#A1C2BD] font-bold text-lg">Followers</h2>
//           <button
//             onClick={onClose}
//             className="text-[#E7F2EF] hover:text-[#A1C2BD] transition"
//           >
//             <X size={20} />
//           </button>
//         </div>

//         {/* 🔍 Search Bar */}
//         <div className="relative mb-4">
//           <Search
//             className="absolute left-3 top-2.5 text-[#A1C2BD]/70"
//             size={18}
//           />
//           <input
//             type="text"
//             placeholder="Search followers..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full bg-[#1E1D40] text-[#E7F2EF] rounded-lg pl-9 pr-3 py-2 outline-none border border-[#708993]/40 focus:border-[#A1C2BD] transition"
//           />
//         </div>

//         {/* Followers List */}
//         {loading ? (
//           <p className="text-[#A1C2BD] animate-pulse text-center">
//             Loading followers...
//           </p>
//         ) : filteredFollowers.length === 0 ? (
//           <p className="text-[#A1C2BD] text-center">No followers found.</p>
//         ) : (
//           <div className="flex flex-col gap-3 max-h-80 overflow-y-auto">
//             {filteredFollowers.map((follower) => (
//               <div
//                 key={follower._id}
//                 className="flex items-center justify-between bg-[#1E1D40] hover:bg-[#23224B] transition p-2 rounded-xl"
//               >
//                 <div className="flex items-center gap-3">
//                   <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#A1C2BD]/60">
//                     <Link href={`/publicprofile/${follower._id}`}>
//                       <Image
//                         src={
//                           follower.avatar?.startsWith("http")
//                             ? follower.avatar
//                             : `http://localhost:5000${follower.avatar}`
//                         }
//                         alt={follower.name}
//                         fill
//                         className="object-cover"
//                       />
//                     </Link>
//                   </div>
//                   <p className="text-[#E7F2EF] font-medium">
//                     {follower.name}
//                   </p>
//                 </div>

//                 {/* ❌ Remove Button */}
//                 <button
//                   onClick={() =>
//                     handleRemoveFollower(follower._id, follower.name)
//                   }
//                   className="text-[#A1C2BD] hover:text-red-400 transition"
//                   title="Remove follower"
//                 >
//                   <Trash2 size={18} />
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </motion.div>
//     </div>
//   );
// }




"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../../axios/axios";
import Image from "next/image";
import { X, Trash2, Search } from "lucide-react";
import Link from "next/link";
import useAuthStore from "../../utils/stores/authSore";
import Swal from "sweetalert2";

export default function FollowersModal({ userId, onClose }) {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { token } = useAuthStore();

  // --- Fetch followers --- 
  const fetchFollowers = async (query = "") => {
    setLoading(true);
    try {
      // Backend search route
      const res = await api.get(`/users/${userId}/followers`, {
        params: { search: query }, // backend query param
        headers: { Authorization: `Bearer ${token}` },
      });
      setFollowers(res.data || []);
    } catch (err) {
      console.error(err);
      setFollowers([]);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    if (userId) fetchFollowers();
  }, [userId]);

  // --- Handle Remove Follower ---
  const handleRemoveFollower = async (followerId, followerName) => {
    const confirm = await Swal.fire({
      title: "Remove Follower?",
      text: `Do you really want to remove ${followerName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove",
      cancelButtonText: "Cancel",
      background: "#19183B",
      color: "#E7F2EF",
      confirmButtonColor: "#A1C2BD",
      cancelButtonColor: "#708993",
    });

    if (!confirm.isConfirmed) return;

    try {
      await api.put(
        `/users/remove-follower/${followerId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Refresh followers after removal
      fetchFollowers(search);

      Swal.fire({
        title: "Removed!",
        text: `${followerName} has been removed.`,
        icon: "success",
        background: "#19183B",
        color: "#E7F2EF",
        confirmButtonColor: "#A1C2BD",
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: "Failed to remove follower. Try again later.",
        icon: "error",
        background: "#19183B",
        color: "#E7F2EF",
        confirmButtonColor: "#A1C2BD",
      });
    }
  };

  // --- Handle search input ---
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchFollowers(value); // backend search call
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 overflow-y-auto">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, type: "spring", stiffness: 120 }}
        className="bg-[#19183B] rounded-2xl w-full max-w-md p-6 border border-[#708993]/25 shadow-xl"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[#A1C2BD] font-bold text-lg">Followers</h2>
          <button
            onClick={onClose}
            className="text-[#E7F2EF] hover:text-[#A1C2BD] transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search
            className="absolute left-3 top-2.5 text-[#A1C2BD]/70"
            size={18}
          />
          <input
            type="text"
            placeholder="Search followers..."
            value={search}
            onChange={handleSearchChange}
            className="w-full bg-[#1E1D40] text-[#E7F2EF] rounded-lg pl-9 pr-3 py-2 outline-none border border-[#708993]/40 focus:border-[#A1C2BD] transition"
          />
        </div>

        {/* Followers List */}
        {loading ? (
          <p className="text-[#A1C2BD] animate-pulse text-center">
            Loading followers...
          </p>
        ) : followers.length === 0 ? (
          <p className="text-[#A1C2BD] text-center">No followers found.</p>
        ) : (
          <div className="flex flex-col gap-3 max-h-80 overflow-y-auto">
            {followers.map((follower) => (
              <div
                key={follower._id}
                className="flex items-center justify-between bg-[#1E1D40] hover:bg-[#23224B] transition p-2 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#A1C2BD]/60">
                    <Link href={`/publicprofile/${follower._id}`}>
                      <Image
                        src={
                          follower.avatar?.startsWith("http")
                            ? follower.avatar
                            : `http://localhost:5000${follower.avatar}`
                        }
                        alt={follower.name}
                        fill
                        className="object-cover"
                      />
                    </Link>
                  </div>
                  <p className="text-[#E7F2EF] font-medium">{follower.name}</p>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() =>
                    handleRemoveFollower(follower._id, follower.name)
                  }
                  className="text-[#A1C2BD] hover:text-red-400 transition"
                  title="Remove follower"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
