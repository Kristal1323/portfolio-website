"use client";
import { motion } from "framer-motion";

const logs = [
  "[ OK ] Loading modules...",
  "[ OK ] Initializing AI core...",
  "[ OK ] Mounting KristalOS environment...",
  "[ OK ] Welcome, human. Type `help` to begin.",
];

export default function BootSequence() {
  return (
    <div className="text-green-400 space-y-1">
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
    </div>
  );
}
