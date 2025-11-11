"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const logs = [
  "[ OK ] Loading modules...",
  "[ OK ] Initializing AI core...",
  "[ OK ] Mounting KristalOS environment...",
  "[ OK ] Welcome! Type `help` to begin.",
];

export default function BootSequence({ onBootComplete }: { onBootComplete?: () => void }) {
  const [finished, setFinished] = useState(false); // when logs finish printing
  const [exiting, setExiting] = useState(false);   // fade-out on Enter or Tap

  // Step 1: run through logs
  useEffect(() => {
    const timer = setTimeout(() => setFinished(true), logs.length * 0.3 * 1000 + 400);
    return () => clearTimeout(timer);
  }, []);

  // Step 2: only when user presses Enter or taps → exit
  useEffect(() => {
    if (!finished) return;

    const handleProceed = () => {
      setExiting(true);
      setTimeout(() => onBootComplete?.(), 900);
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") handleProceed();
    };

    window.addEventListener("keydown", handleKey);
    window.addEventListener("click", handleProceed); // tap/click support
    window.addEventListener("touchstart", handleProceed); // mobile tap

    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("click", handleProceed);
      window.removeEventListener("touchstart", handleProceed);
    };
  }, [finished, onBootComplete]);

  return (
    <motion.div
      className="text-green-400 space-y-1 font-mono select-none"
      initial={{ opacity: 1 }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: 0.7 }}
    >
      {/* Boot log lines */}
      {logs.map((line, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.3 }}
          className="text-sm md:text-base"
        >
          {line}
        </motion.p>
      ))}

      {/* Show blinking prompt ONLY after logs finish */}
      {finished && !exiting && (
        <motion.p
          className="text-green-500/70 mt-4 text-center text-sm md:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          Press <span className="text-green-300 font-semibold">Enter</span> or{" "}
          <span className="text-green-300 font-semibold">Tap</span> to begin
        </motion.p>
      )}
    </motion.div>
  );
}
