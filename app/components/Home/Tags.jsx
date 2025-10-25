"use client";

import { motion } from "framer-motion";

const tags = ["JavaScript", "React", "Next.js", "DevTips", "CSS", "Tailwind", "Node.js"];

export default function CategoriesSection() {
  return (
    <section className="relative py-20 px-6 sm:px-10 bg-[#E7F2EF]  overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#A1C2BD]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#708993]/10 rounded-full blur-2xl"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Heading */}
        <motion.h2
          className="text-3xl sm:text-4xl font-extrabold text-[#19183B] mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Popular Tags
        </motion.h2>

        {/* Tags Container */}
        <div className="flex flex-wrap justify-center gap-3">
          {tags.map((tag, i) => (
            <motion.div
              key={tag}
              className="px-4 py-1.5 rounded-full border border-[#708993]/40 text-[#19183B] text-sm sm:text-base font-medium cursor-pointer hover:bg-[#708993]/10 hover:border-[#708993]/60 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => console.log(`Clicked tag: ${tag}`)} // Dummy action
            >
              {tag}
            </motion.div>
          ))}
        </div>

        <p className="text-center mt-6 text-sm text-[#708993]">
          Click any tag to explore blogs (dummy for now)
        </p>
      </div>
    </section>
  );
}
