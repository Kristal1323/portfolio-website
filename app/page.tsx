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

      {/* Vertical Name Overlay */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 0.75, x: 0 }}
        transition={{ duration: 1.5, delay: 0.6 }}
        className="flex flex-col items-center gap-4 absolute left-4 md:left-6 lg:left-10 top-1/2 -translate-y-1/2 pointer-events-none select-none"
      >
        <div className="flex flex-col items-center gap-2 rotate-180 [writing-mode:vertical-rl] tracking-[0.35em] text-lg md:text-xl text-[#e6fff4] drop-shadow-[0_0_25px_rgba(122,255,214,0.8)] font-semibold">
          <motion.span
            animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.02, 1] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          >
            KRISTAL SIN
          </motion.span>
        </div>
        <div className="w-[1px] h-20 md:h-28 lg:h-36 bg-gradient-to-b from-[#8effd6]/65 via-[#5ce0b8]/40 to-transparent shadow-[0_0_14px_rgba(94,235,192,0.45)]" />
        <motion.p
          className="rotate-180 [writing-mode:vertical-rl] text-sm md:text-base tracking-[0.48em] text-green-50/85 drop-shadow-[0_0_18px_rgba(122,255,214,0.6)] uppercase"
          animate={{ opacity: [0.7, 1, 0.7], letterSpacing: [0.45, 0.58, 0.45] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        >
          SOFTWARE ENGINEER
        </motion.p>
      </motion.div>

      {/* Terminal Window */}
      <Terminal />
    </main>
  );
}
