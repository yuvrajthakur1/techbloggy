

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "../../axios/axios";
import Image from "next/image";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import useAuthStore from "../../utils/stores/authSore";
import { Clipboard, Check, Heart, Share } from "lucide-react";
import CommentSection from "../../components/blogs/CommentSection";

export default function BlogDetailClient({id}) {


  const { user, token } = useAuthStore();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        const res = await api.get(`/blogs/${id}`);
        setBlog(res.data);

        // Initialize likes
        const blogLikes = res.data.likes?.map(like => like.user ? like.user.toString() : null).filter(Boolean) || [];
        setLikesCount(blogLikes.length);
        setLiked(user && blogLikes.includes(user._id));

      } catch (err) {
        console.error(err);
        setError("Failed to fetch blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, user]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleLike = async () => {
    if (!user) return alert("Login required to like!");

    try {
      // Optimistic update
      setLiked(!liked);
      setLikesCount(liked ? likesCount - 1 : likesCount + 1);

      const res = await api.put(
        `/blogs/like/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedLikes = res.data.likes?.map(like => like ? like : null).filter(Boolean) || [];
      setLikesCount(updatedLikes.length);
      setLiked(user && updatedLikes.includes(user._id));
    } catch (err) {
      console.error(err);
      // rollback
      setLiked(liked);
      setLikesCount(likesCount);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#19183B]">
        <p className="text-[#A1C2BD] animate-pulse text-lg font-semibold">
          Loading blog...
        </p>
      </div>
    );

  if (error || !blog)
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#19183B]">
        <p className="text-[#E7F2EF] text-lg font-semibold">
          {error || "Blog not found"}
        </p>
      </div>
    );

  const createdDate = new Date(blog.createdAt);
  const updatedDate = new Date(blog.updatedAt);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#19183B] via-[#708993]/60 to-[#E7F2EF]/20 px-4 sm:px-6 md:px-8 lg:px-12 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: "spring", stiffness: 120 }}
        className="relative w-full max-w-[900px] mx-auto bg-[#19183B]/95 backdrop-blur-xl rounded-3xl p-6 sm:p-10 shadow-2xl border border-[#708993]/25 transition-transform duration-300"
      >
        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          className="absolute top-4 right-4 p-2 bg-[#708993]/30 hover:bg-[#A1C2BD]/50 rounded-full transition"
          title={copied ? "Link Copied!" : "Copy Link"}
        >
          {copied ? <Check size={16} /> : <Clipboard size={16} />}
        </button>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#E7F2EF] mb-6 leading-tight tracking-tight text-center sm:text-left">
          {blog.title}
        </h1>

        {/* Author Info & Dates */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 border-b border-[#708993]/25 pb-4">
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-[#A1C2BD] shadow-md">
              { blog.author &&
                <Image
                src={blog.author?.avatar?.url}
                alt={blog?.author?.name}
                fill
                className="object-cover"
              />
              }
            </div>
            <p className="text-[#A1C2BD] font-medium text-base sm:text-lg">
              {blog?.author?.name}
            </p>
          </div>

          <div className="text-[#708993] text-xs sm:text-sm text-right space-y-1">
            <p>
              <span className="font-semibold text-[#A1C2BD]">Created:</span>{" "}
              {createdDate.toLocaleDateString()} {createdDate.toLocaleTimeString()}
            </p>
            <p>
              <span className="font-semibold text-[#A1C2BD]">Updated:</span>{" "}
              {updatedDate.toLocaleDateString()} {updatedDate.toLocaleTimeString()}
            </p>
          </div>
        </div>

        {/* Blog Image */}
        {blog.image && (
          <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden mb-8 shadow-xl">
            <Image
              src={
              blog.image?.url
              }
              alt={blog.title}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        )}

        {/* Markdown Content */}
        <div className="prose prose-invert max-w-full overflow-x-auto text-[#E7F2EF] leading-relaxed mb-6">
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={tomorrow}
                    language={match[1]}
                    PreTag="div"
                    className="rounded-lg mb-6"
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code
                    className="bg-[#1E1B3B] text-[#E7F2EF] px-2 py-1 rounded-md"
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
            }}
          >
            {blog.description || ""}
          </ReactMarkdown>
        </div>

        {/* Likes + Comments Footer */}
        <div className="flex items-center gap-6 mb-4">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 ${liked ? "text-red-500" : "text-white"}`}
          >
            <Heart size={20} fill={liked ? "currentColor" : "none"} />
            <span>{likesCount}</span>
          </button>

          {/* Comment Section */}
          <CommentSection blogId={blog._id} />
        </div>
      </motion.div>
    </div>
  );
}

