"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Backlog() {
  const [loading, setLoading] = useState(true);
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length === 3 ? "." : prev + "."));
    }, 400);
    const timeout = setTimeout(() => {
      clearInterval(interval);
      setLoading(false);
    }, 1800);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const upcoming = [
    "Implement `ask` command — AI chatbot session to ask Kristal questions.",
    "Add system sound effects for power-on / shutdown / command actions.",
    "Introduce command autocomplete + suggestion hints.",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="font-mono text-green-300 space-y-3 relative"
    >
      {loading ? (
        <p>Fetching developer backlog{dots}</p>
      ) : (
        <>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.7, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-green-400 font-semibold tracking-wide"
          >
            [ SYSTEM BACKLOG — Upcoming Features ]
          </motion.p>

          <ul className="list-none text-sm space-y-1 mt-2">
            {upcoming.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2, duration: 0.4 }}
                className="text-green-300/90 tracking-tight"
              >
                <span className="text-green-500/60 mr-1">{">_"}</span>
                {item}
              </motion.li>
            ))}
          </ul>

          <motion.p
            className="text-green-500/70 text-xs mt-4 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            Tip: Type <span className="text-green-300">'message'</span> to suggest new features!
          </motion.p>
        </>
      )}
    </motion.div>
  );
}
