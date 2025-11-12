"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Quit({ onExit }: { onExit?: () => void }) {
  const [stage, setStage] = useState(0);
  const [showFlicker, setShowFlicker] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 800),
      setTimeout(() => setStage(2), 2000),
      setTimeout(() => setStage(3), 3500),
      // Quick flicker near the end
      setTimeout(() => setShowFlicker(true), 4200),
      // End sequence and reset
      setTimeout(() => {
        setShowFlicker(false);
        onExit?.();
      }, 5500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onExit]);

  return (
    <div className="relative overflow-hidden">
      {/* Flicker overlay (short burst effect) */}
      <AnimatePresence>
        {showFlicker && (
          <motion.div
            key="flicker"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.7, 0.2, 0.9, 0],
              backgroundColor: ["#0a0a0a", "#000000", "#0a0a0a"],
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Shutdown sequence */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="font-mono text-green-300 text-center py-10 select-none relative z-10"
      >
        <AnimatePresence mode="wait">
          {stage === 0 && (
            <motion.p
              key="stage0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-green-400"
            >
              [ system: terminating session... ]
            </motion.p>
          )}
          {stage === 1 && (
            <motion.p
              key="stage1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              Saving state ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 100%
            </motion.p>
          )}
          {stage === 2 && (
            <motion.div
              key="stage2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-2"
            >
              <p>Disconnecting subsystems...</p>
              <p>Shutting down kernel...</p>
              <p className="text-green-500/70 italic">“Till next time!.”</p>
            </motion.div>
          )}
          {stage === 3 && (
            <motion.div
              key="stage3"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [1, 0.5, 1, 0],
                filter: ["brightness(1.2)", "brightness(0.8)", "brightness(0)"],
              }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
              className="pt-10"
            >
              <p className="text-green-400 text-lg font-semibold">
                ✨ Session Ended ✨
              </p>
              <p className="text-green-500/60 text-sm mt-2">
                Thank you for visiting Kristal’s portfolio.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
