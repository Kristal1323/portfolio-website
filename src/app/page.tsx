
"use client";
import Terminal from "./terminal/Terminal";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="h-screen w-full flex items-center justify-center relative">
      {/* Animated background grid */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,#00ff9c10_0%,#000_80%)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <div
          className="absolute inset-0 bg-[linear-gradient(#00ff9c12_1px,transparent_1px),linear-gradient(90deg,#00ff9c12_1px,transparent_1px)] bg-[size:40px_40px]"
          style={{ animation: "gridmove 25s linear infinite" }}
        />
        <style jsx global>{`
          @keyframes gridmove {
            from {
              background-position: 0 0;
            }
            to {
              background-position: 40px 40px;
            }
          }
        `}</style>
      </motion.div>

      {/* Terminal window */}
      <Terminal />
    </main>
  );
}
