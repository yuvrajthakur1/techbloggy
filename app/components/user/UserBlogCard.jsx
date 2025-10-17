"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import {
  MoreVertical,
  Heart,
  ArrowRight,
  Edit2,
  Trash2,
  X,
  Upload,
} from "lucide-react";
import { useRouter } from "next/navigation";
import CommentSection from "../blogs/CommentSection";
import api from "../../axios/axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import useAuthStore from "../../utils/stores/authSore";
import Link from "next/link";
import dynamic from "next/dynamic";
import sanitizeMarkdown from "../markdown/sanitizeMarkdown";

// ✅ Dynamic import for Markdown Editor + Preview
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });
const MarkdownPreview = dynamic(() => import("@uiw/react-markdown-preview"), {
  ssr: false,
});

const MySwal = withReactContent(Swal);

export default function UserBlogCard({ blog, onDelete, onUpdate }) {
  const { title, description, image, author, _id } = blog;
  const { user, token } = useAuthStore();

  const [menuOpen, setMenuOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [editImage, setEditImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(image?.url);
  const [saving, setSaving] = useState(false);

  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(blog.likes?.length || 0);

  const router = useRouter();
  const isAuthor = user?._id === author?._id;

  useEffect(() => {
    if (editModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [editModalOpen]);

  // init liked
  useEffect(() => {
    if (blog.likes && user) {
      setLiked(blog.likes.some((id) => id.toString() === user._id));
      setLikesCount(blog.likes.length);
    }
  }, [blog.likes, user]);

  const themeSweetAlert = (options) =>
    MySwal.fire({
      ...options,
      background: "#19183B",
      color: "#E7F2EF",
      confirmButtonColor: "#A1C2BD",
      cancelButtonColor: "#708993",
      scrollbarPadding: false,
      allowOutsideClick: false,
    });

  // delete blog
  const handleDelete = async () => {
    const result = await themeSweetAlert({
      title: "Are you sure?",
      text: "Do you want to delete this blog?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      setMenuOpen(false);
      await api.delete(`/blogs/${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      themeSweetAlert({
        title: "Deleted!",
        text: "Blog deleted successfully.",
        icon: "success",
      });
      if (onDelete) onDelete(_id);
    } catch (err) {
      themeSweetAlert({
        title: "Error!",
        text: "Failed to delete blog.",
        icon: "error",
      });
    }
  };

  // update blog
  const handleUpdate = async () => {
    if (saving) return;
    setSaving(true);

    try {
      const formData = new FormData();
      formData.append("title", editTitle);
      formData.append("description", editDescription); // markdown string
      if (editImage) formData.append("image", editImage);

      setEditModalOpen(false);
      setMenuOpen(false);

      const res = await api.put(`/blogs/${_id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (onUpdate && res.data) onUpdate(_id, res.data);

      themeSweetAlert({
        title: "Success!",
        text: "Blog updated successfully.",
        icon: "success",
      });
    } catch (err) {
      themeSweetAlert({
        title: "Error!",
        text: "Failed to update blog.",
        icon: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  // handle image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditImage(file);
      setPreviewImage(URL.createObjectURL(file));
      console.log(previewImage);
    }
  };

  const displayImage = editModalOpen
    ? previewImage
    : image
    ? `${image?.url}`
    : null;

  // like
  const handleLike = async () => {
    if (!user) {
      themeSweetAlert({
        title: "Login Required",
        text: "You need to be logged in to like a blog.",
        icon: "info",
      });
      return;
    }

    try {
      const res = await api.put(
        `/blogs/like/${_id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedLikes = res.data.likes.map((id) => id.toString());
      setLikesCount(updatedLikes.length);
      setLiked(user && updatedLikes.includes(user._id));
    } catch (err) {
      console.error("Failed to like/unlike:", err);
    }
  };

  return (
    <>
      {/* Card */}
      <div className="flex flex-col bg-[#19183B] rounded-2xl shadow-2xl border border-[#708993]/40">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#708993]/20">
          <div className="flex items-center gap-3">
            { author?.avatar?.url &&
              <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-[#A1C2BD]">
                <Link href={`/publicprofile/${author._id}`}>
                  <Image
                    src={author?.avatar?.url}
                    fill
                    alt={author.name}
                    className="object-cover"
                    unoptimized
                  />
                </Link>
              </div>
            }
            <div>
              <h1 className="text-[#E7F2EF] font-semibold text-sm">
                {author?.name}
              </h1>
              <p className="text-[#708993] text-xs">Author</p>
            </div>
          </div>

          {isAuthor && (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-[#708993]"
              >
                <MoreVertical size={20} />
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-[#2a295c] rounded-lg shadow-lg z-30">
                  <button
                    className="px-4 py-2 text-sm text-[#A1C2BD] flex items-center gap-2"
                    onClick={() => {
                      setEditModalOpen(true);
                      setMenuOpen(false);
                    }}
                  >
                    <Edit2 size={16} /> Edit
                  </button>
                  <button
                    className="px-4 py-2 text-sm text-[#E7F2EF] flex items-center gap-2"
                    onClick={handleDelete}
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Blog Image (Refined Height) */}

        {/* Blog Image */}
        {displayImage && (
          <div className="relative w-full aspect-[16/9] sm:aspect-[4/3] lg:aspect-[3/2] max-h-[400px] sm:max-h-[350px] md:max-h-[300px] overflow-hidden rounded-2xl">
            {console.log("display image",displayImage)}
            <Image
              src={blog?.image?.url}
              fill
              alt={blog?.title}
              className="object-cover transition-transform duration-500 hover:scale-105"
              unoptimized
            />
          </div>
        )}

        {/* Content */}
        <div className="p-2 flex flex-col gap-3 flex-grow">
          <h2 className="text-[#A1C2BD] font-bold text-lg">{blog.title}</h2>
          {/* <div className="text-[#E7F2EF]/90 text-sm leading-relaxed line-clamp-3">
            <MarkdownPreview
              source={editDescription || undefined}
              style={{
                backgroundColor: "#19183B",
                color: "white",
                padding: "0.5rem",
                borderRadius: "0.5rem",
              }}
            />
          </div> */}
          <button
            onClick={() => router.push(`/blog/${_id}`)}
            className="text-[#708993] hover:text-[#A1C2BD] flex gap-1 items-center"
          >
            See More <ArrowRight size={16} />
          </button>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-[#708993]/20 flex gap-6">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 ${
              user && liked ? "text-red-500" : "text-white"
            }`}
          >
            <Heart size={16} fill={user && liked ? "currentColor" : "none"} />{" "}
            <span>{likesCount}</span>
          </button>
          <CommentSection blogId={_id} blogAuthorId={author?._id} />
        </div>
      </div>

      {editModalOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div
            className="
        relative bg-[#19183B] rounded-2xl w-full 
        max-w-2xl md:max-w-3xl 
        max-h-[90vh] overflow-y-auto 
        p-6 shadow-2xl border border-[#708993]/30
        scrollbar-thin scrollbar-thumb-[#A1C2BD]/30 scrollbar-track-transparent
      "
          >
            {/* Close Button */}
            <button
              onClick={() => setEditModalOpen(false)}
              className="absolute top-4 right-4 text-[#A1C2BD] hover:text-white transition"
            >
              <X size={22} />
            </button>

            {/* Header */}
            <h2 className="text-[#A1C2BD] font-bold text-xl mb-4 text-center">
              ✏️ Edit Blog
            </h2>

            {/* Title Input */}
            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full p-3 mb-4 bg-[#2a295c] text-[#E7F2EF] rounded-lg outline-none focus:ring-2 focus:ring-[#A1C2BD]/60 transition"
              placeholder="Enter blog title"
            />

            {/* Markdown Editor */}
            <div data-color-mode="dark" className="mb-6">
              <MDEditor
                value={editDescription}
                onChange={(val) => setEditDescription(sanitizeMarkdown(val))}
                height={250}
                preview="edit"
              />

              {/* Markdown Preview Section */}
              <div
                className="
            mt-4 bg-[#2a295c]/70 rounded-lg border border-[#708993]/30
            max-h-[40vh] overflow-y-auto
            p-6 leading-relaxed tracking-wide
            scrollbar-thin scrollbar-thumb-[#A1C2BD]/30 scrollbar-track-transparent
          "
              >
                <h3 className="text-[#A1C2BD] text-sm mb-3 font-semibold">
                  🪄 Preview:
                </h3>
                <MarkdownPreview
                  source={sanitizeMarkdown(editDescription) || ""}
                  className="text-[#E7F2EF] prose prose-invert max-w-none prose-headings:text-[#A1C2BD] prose-p:text-[#E7F2EF]/90 prose-a:text-[#A1C2BD]"
                />
              </div>
            </div>

            {/* Image Upload */}
            <label className="inline-flex items-center gap-2 cursor-pointer text-[#A1C2BD] mb-3 hover:text-[#E7F2EF] transition">
              <Upload size={18} /> Change Image
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>

            {/* Preview Image */}
            {previewImage && (
              <div className="relative w-full h-48 mt-2 rounded-lg overflow-hidden border border-[#708993]/30">
                <img
                  src={previewImage}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Save Button */}
            <button
              onClick={handleUpdate}
              disabled={saving}
              className="mt-6 w-full px-5 py-3 bg-gradient-to-r from-[#708993] to-[#A1C2BD] text-[#19183B] font-bold rounded-lg shadow-md hover:shadow-xl transition-all duration-300 disabled:opacity-60"
            >
              {saving ? "💾 Saving..." : "✅ Save Changes"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
