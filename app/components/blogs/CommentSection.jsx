"use client";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../axios/axios";
import useAuthStore from "../../utils/stores/authSore";
import Comment from "../comment/Comment";

export default function CommentSection({ blogId, blogAuthorId }) {
  const { user, token } = useAuthStore();
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const popupRef = useRef();

  const fetchComments = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/blogs/comments/${blogId}`);
      setComments(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) fetchComments();
  }, [open]);

  const handleAddComment = async () => {
    if (!user) return alert("Login first");
    if (!newComment.trim()) return;

    try {
      const res = await api.post(
        `/blogs/comment/${blogId}`,
        { text: newComment },
        {
          headers: {
            Authorization: `Bearer ${token}`, // JWT token header me bheja
          },
        }
      );
      setComments((prev) => [res.data, ...prev]);
      setNewComment("");
    } catch (err) {
      console.error(err);
      alert("Error adding comment");
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?"))
      return;

    try {
      await api.delete(`/blogs/comment/${blogId}/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove from state
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (err) {
      console.error(err);
      alert("Failed to delete comment");
    }
  };

  return (
    <div className="relative flex items-center">
      {/* Comment Icon */}
      <button
        onClick={() => setOpen(true)}
        className="text-white transition flex items-center gap-1 cursor-pointer"
      >
        <MessageCircle size={16} /> {comments.length}
      </button>

      {/* Portal Popup */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                ref={popupRef}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                           w-[95vw] sm:w-80 md:w-96 max-h-[60vh] sm:max-h-[70vh] overflow-hidden 
                           bg-[#22215E] border border-[#708993]/20 rounded-xl shadow-2xl 
                           z-[9999] flex flex-col"
              >
                {/* Header */}
                <div className="flex justify-between items-center p-3 border-b border-[#708993]/20">
                  <h2 className="text-[#A1C2BD] font-semibold text-base sm:text-lg">
                    Comments
                  </h2>
                  <button
                    onClick={() => setOpen(false)}
                    className="text-[#A1C2BD] hover:text-[#E7F2EF]"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Comment Input */}
                <div className="flex gap-2 p-3 border-b border-[#708993]/20">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="flex-1 p-2 rounded-md bg-[#19183B] text-[#E7F2EF] border border-[#708993] focus:outline-none focus:ring-2 focus:ring-[#A1C2BD] text-sm"
                  />
                  <button
                    onClick={handleAddComment}
                    className="px-3 py-2 bg-gradient-to-r from-[#708993] to-[#A1C2BD] text-[#19183B] font-bold rounded-md text-sm"
                  >
                    Post
                  </button>
                </div>

                {/* Comment List */}
                {/* Comment List */}
                <div className="flex-1 overflow-y-auto p-3 space-y-2">
                  {loading ? (
                    <p className="text-[#A1C2BD] text-center text-sm">
                      Loading comments...
                    </p>
                  ) : comments.length === 0 ? (
                    <p className="text-[#A1C2BD] text-center text-sm">
                      No comments yet
                    </p>
                  ) : (
                    // comments.map((c) => (
                    //   <div
                    //     key={c._id}
                    //     className="flex items-start gap-3 p-2 bg-[#19183B] rounded-md border border-[#708993]/20"
                    //   >
                    //     {/* Avatar */}
                    //     <img
                    //       src={`http://localhost:5000${c.user?.avatar}`} // fallback if no avatar
                    //       alt={c.user?.name || "User"}
                    //       className="w-8 h-8 rounded-full object-cover border border-[#708993]/30"
                    //     />

                    //     {/* Comment content */}
                    //     <div className="flex-1">
                    //       <p className="text-[#A1C2BD] font-semibold text-sm">
                    //         {c.user?.name}
                    //       </p>
                    //       <p className="text-[#E7F2EF] text-xs sm:text-sm break-words">
                    //         {c.text}
                    //       </p>
                    //     </div>
                    //   </div>
                    // ))
                    <Comment comments={comments} user={user} blogAuthorId={blogAuthorId} handleDeleteComment={handleDeleteComment}/>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}
