"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRef } from "react";

interface Error404Props {}

export default function Error404({}: Error404Props) {
  const router = useRouter();
  const revealRef = useRef(null);

  function handleHomeClick() {
    router.push("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-purple-950/50">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="mb-8"
        >
          <h1 className="text-9xl font-bold text-purple-500 italic">404</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white italic">
            Page Not Found
          </h2>
          <p className="text-zinc-400 mt-4">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleHomeClick}
          className="px-10 py-4 bg-white text-black font-bold tracking-wider rounded-sm transition-all duration-300"
        >
          Return to Home
        </motion.button>
      </div>
    </div>
  );
}