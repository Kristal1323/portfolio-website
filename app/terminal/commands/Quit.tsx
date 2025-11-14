"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Quit({ onExit }: { onExit?: () => void }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 600),
      setTimeout(() => setStage(2), 1600),
      setTimeout(() => {
        onExit?.();
      }, 3600),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onExit]);

  return (
    <div className="relative overflow-hidden">
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
              transition={{ duration: 0.6 }}
            >
              Saving state ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 100%
            </motion.p>
          )}
          {stage === 2 && (
            <motion.div
              key="stage2"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [1, 0.85, 0.95, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1 }}
              className="space-y-2 pt-6"
            >
              <p>Disconnecting subsystems...</p>
              <p>Shutting down kernel...</p>
              <p className="text-green-500/70 italic">
                “Till next time! Thank you for visiting Kristal’s portfolio.”
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
