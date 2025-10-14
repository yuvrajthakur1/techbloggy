"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import api from "../axios/axios";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    avatar: null,
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [preview, setPreview] = useState(null); // For avatar preview

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar") {
      setForm({ ...form, avatar: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    for (let key in form) data.append(key, form[key]);
    try {
      const res = await api.post("/auth/register", data);
      setMsg("✅ User registered successfully!");
    } catch (err) {
      setMsg(err.response?.data?.msg || "❌ Error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#19183B] via-[#708993] to-[#A1C2BD] flex items-center justify-center py-16 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#222B45] p-10 rounded-3xl shadow-2xl w-full max-w-md border border-white/10"
      >
        <h2 className="text-3xl font-extrabold mb-8 text-center text-white">
          Sign Up 🚀
        </h2>

        {/* Name Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-[#3A446F] placeholder-gray-400 text-white border border-transparent focus:border-indigo-400 focus:ring focus:ring-indigo-400 focus:ring-opacity-30 transition"
            required
          />
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-[#3A446F] placeholder-gray-400 text-white border border-transparent focus:border-indigo-400 focus:ring focus:ring-indigo-400 focus:ring-opacity-30 transition"
            required
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-[#3A446F] placeholder-gray-400 text-white border border-transparent focus:border-indigo-400 focus:ring focus:ring-indigo-400 focus:ring-opacity-30 transition"
            required
          />
        </div>

        {/* Avatar Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">Profile Picture</label>
          <div className="flex items-center gap-4">
            <label
              htmlFor="avatar"
              className="cursor-pointer w-24 h-24 rounded-full border-2 border-dashed border-indigo-400 flex items-center justify-center text-gray-400 hover:bg-indigo-500/20 transition relative overflow-hidden"
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Profile Preview"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <span className="text-center text-sm">Choose File</span>
              )}
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
            {form.avatar && <span className="text-gray-300 text-sm">{form.avatar.name}</span>}
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl transition"
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </Button>

        {msg && <p className="mt-4 text-center text-yellow-200">{msg}</p>}

        {/* Login Link */}
        <p className="mt-6 text-center text-gray-300">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-400 hover:underline">
            Login Here
          </Link>
        </p>
      </form>
    </div>
  );
}
