"use client";
import { motion } from "framer-motion";

export default function SectionDivider({ type = "slant", color = "#708993" }) {
  return (
    <div className="relative w-full overflow-hidden -mt-2">
      {type === "wave" && (
        <motion.svg
          className="w-full h-4 sm:h-8"
          viewBox="0 0 1440 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <path
            d="M0 20C360 40 1080 0 1440 20V40H0V20Z"
            fill={color}
          />
        </motion.svg>
      )}

      {type === "slant" && (
        <motion.div
          className={`w-full h-4 sm:h-8 ${color} transform -skew-y-2 origin-top-left`}
          style={{ backgroundColor: color }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
      )}

      {type === "curve" && (
        <motion.div
          className={`w-full h-12 sm:h-16 ${color} rounded-t-full`}
          style={{ backgroundColor: color }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
      )}
    </div>
  );
}
