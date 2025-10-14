"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import api from "../axios/axios";
import Link from "next/link";
import useAuthStore from "../utils/stores/authSore";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const { login} = useAuthStore();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", form);
      login(res?.data.user, res.data?.token);
      setMsg("✅ Login successful!");
      router.push("/profile");
    } catch (err) {
      setMsg(err.response?.data?.msg || "❌ Invalid credentials");
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
          Login ✨
        </h2>

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
        <div className="mb-6">
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

        {/* Login Button */}
        <Button
          type="submit"
          className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl transition"
          disabled={loading}
        >
          {loading ? "Logging In..." : "Login"}
        </Button>

        {/* Message */}
        {msg && <p className="mt-4 text-center text-yellow-200">{msg}</p>}

        {/* Signup Link */}
        <p className="mt-6 text-center text-gray-300">
          Don't have an account?{" "}
          <Link href="/signup" className="text-indigo-400 hover:underline">
            Sign up here
          </Link>
        </p>
      </form>
    </div>
  );
}
