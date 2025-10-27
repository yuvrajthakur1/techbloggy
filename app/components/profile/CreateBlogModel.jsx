"use client";

import { motion } from "framer-motion";
import { X, Upload } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";
import MarkdownPreview from "@uiw/react-markdown-preview";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function CreateBlogModal({
  blogOpen,
  setBlogOpen,
  form,
  setForm,
  previewImage,
  setPreviewImage,
  handleChange,
  handleSubmit,
  saving,
  sanitizeMarkdown,
}) {
  if (!blogOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, type: "spring", stiffness: 120 }}
        className="bg-[#19183B] rounded-2xl w-full max-w-4xl p-4 sm:p-6 relative border border-[#708993]/20 shadow-xl max-h-[90vh] overflow-y-auto"
      >
        {/* ❌ Close Button */}
        <button
          onClick={() => {
            setBlogOpen(false);
            setPreviewImage(null);
            setForm({ title: "", description: "", tags: [], image: null });
          }}
          className="absolute top-4 right-4 text-[#E7F2EF] hover:text-[#A1C2BD]"
        >
          <X size={20} />
        </button>

        <h2 className="text-[#A1C2BD] font-bold text-lg mb-4">
          Create Blog
        </h2>

        {/* 📝 Title Input */}
        <input
          value={form.title}
          onChange={handleChange}
          name="title"
          placeholder="Title"
          className="w-full p-2 rounded-md bg-[#1E1B3B] text-[#E7F2EF] border border-[#708993] focus:outline-none focus:ring-2 focus:ring-[#A1C2BD] text-sm sm:text-base mb-3"
        />

        {/* 🏷️ Tags Input */}
        <div className="py-2">
          <input
            type="text"
            name="tags"
            value={form.tags}
            onChange={handleChange}
            placeholder="Enter tags (comma separated)"
            className="w-full p-2 text-white rounded-md bg-[#1E1B3B] border border-[#708993] focus:outline-none focus:ring-2 focus:ring-[#A1C2BD]"
          />
        </div>

        {/* ✏️ Markdown Editor */}
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

        {/* 🖼️ Image Upload */}
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

        {/* 🚀 Submit Button */}
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
  );
}
