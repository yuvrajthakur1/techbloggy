"use client";

import { motion } from "framer-motion";
import { PenTool, Users, Heart, MessageSquare, Bot, Code } from "lucide-react";
import Link from "next/link";

export default function FeaturesPage() {
  const features = [
    {
      icon: <PenTool size={28} />,
      title: "Create Blogs Easily",
      desc: "Craft and publish blogs effortlessly using a clean, user-friendly editor that supports Markdown for rich formatting and images.",
    },
    {
      icon: <Users size={28} />,
      title: "Follow & Unfollow",
      desc: "Build your community by following your favorite authors and staying updated with their latest posts in real-time.",
    },
    {
      icon: <Heart size={28} />,
      title: "Like & Interact",
      desc: "Appreciate posts you love, see likes in real-time, and engage in discussions through a built-in commenting system.",
    },
    {
      icon: <MessageSquare size={28} />,
      title: "Interactive Comments",
      desc: "Start conversations directly under blogs with threaded comments, keeping discussions organized and friendly.",
    },
    {
      icon: <Code size={28} />,
      title: "Markdown + Code Snippets",
      desc: "Write blogs in Markdown with syntax-highlighted code blocks for developers — perfect for sharing tutorials and snippets.",
    },
    {
      icon: <Bot size={28} />,
      title: "AI Blog Assistant",
      desc: "Get help writing your next blog with our AI chatbot. It can generate ideas, outlines, or full posts based on your topic and tone.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#E7F2EF] text-[#E7F2EF] px-6 md:px-12 py-16">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#19183B] mb-4 tracking-tight">
        Platform Features
        </h1>
        <p className="text-[#19183B] max-w-2xl mx-auto text-lg">
          Everything you need to write, share, and grow your audience — designed
          for developers, writers, and thinkers.
        </p>
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="bg-[#19183B] border border-[#708993]/25 rounded-2xl p-6 hover:shadow-2xl hover:shadow-[#708993]/20 transition-all duration-300 backdrop-blur-lg"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#708993]/30 text-[#E7F2EF] mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-[#A1C2BD] mb-2">
              {feature.title}
            </h3>
            <p className="text-[#E7F2EF]/80 leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="text-center mt-20"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-[#E7F2EF]">
          Ready to Create Your First Blog?
        </h2>
        <p className="text-[#19183B] mb-6">
          Join our platform and let your thoughts reach thousands of readers.
        </p>
        <button className="px-6 py-3 rounded-xl  bg-gradient-to-r from-[#19183B] via-[#708993] to-[#A1C2BD] text-white font-semibold hover:bg-[#A1C2BD] transition-all">
         <Link href="/signup">
          Get Started
         </Link>
        </button>
      </motion.div>
    </div>
  );
}
