"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() === "") return;
    setSuccess(true);
    setEmail("");
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <section className="relative py-24 px-6 sm:px-10 bg-[#E7F2EF] overflow-hidden ">
      {/* Decorative floating elements */}
      <motion.div
        className="absolute -top-32 -left-24 w-64 h-64 bg-[#A1C2BD]/20 rounded-full blur-3xl"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
      />
      <motion.div
        className="absolute top-1/3 right-0 w-72 h-72 bg-[#708993]/10 rounded-2xl blur-3xl"
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-10 left-1/4 w-48 h-48 bg-[#19183B]/5 rounded-lg blur-2xl"
        animate={{ y: [-10, 10] }}
        transition={{ repeat: Infinity, duration: 6, yoyo: true }}
      />

      <div className="max-w-3xl mx-auto relative z-10 text-center">
        {/* Heading */}
        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#19183B] mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Stay Updated
        </motion.h2>
        <motion.p
          className="text-[#708993] text-lg sm:text-xl mb-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Subscribe to our newsletter and never miss new tutorials, tips, and updates from our team of developers.
        </motion.p>

        {/* Input + Button */}
        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:flex-1 px-6 py-4 rounded-3xl border border-[#708993]/40 focus:ring-2 focus:ring-[#A1C2BD] focus:border-[#A1C2BD] outline-none text-[#19183B] text-lg shadow-lg transition duration-200"
          />
          <button
            type="submit"
            className="px-8 py-4 rounded-3xl bg-gradient-to-r from-[#19183B] via-[#708993] to-[#A1C2BD] text-[#E7F2EF] font-bold text-lg shadow-lg hover:scale-105 transition-transform duration-200"
          >
            Subscribe
          </button>
        </form>

        {/* Success Message */}
        {success && (
          <motion.p
            className="mt-6 text-green-600 font-semibold text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            🎉 Successfully Subscribed!
          </motion.p>
        )}
      </div>
    </section>
  );
}
