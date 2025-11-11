"use client";

import dynamic from "next/dynamic";
import Terminal from "./terminal/Terminal";
import { motion } from "framer-motion";

// Dynamically import CircuitBackground to avoid SSR hydration errors
const CircuitBackground = dynamic(() => import("./CircuitBackground"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* AI Circuit Pulse Background */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <CircuitBackground />
      </motion.div>

      {/* Terminal Window */}
      <Terminal />
    </main>
  );
}
