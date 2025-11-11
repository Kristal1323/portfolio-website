"use client";
import { motion } from "framer-motion";
import TypingText from "../TypingText";

export default function WhoAmI() {
  const headerDelay = 0.3;

  const coursework = [
    "→ Introduction to Software Engineering",
    "→ Computer Systems Principles & Programming",
    "→ Algorithms & Data Structures",
    "→ Artificial Intelligence",
    "→ Cloud Computing",
    "→ Web/Mobile Programming",
    "→ Fundamentals of Data Science",
    "→ Information Systems",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-4 font-mono text-green-300"
    >
      {/* Name */}
      <motion.h1
        className="text-2xl md:text-3xl font-bold text-green-400 tracking-wide drop-shadow-[0_0_8px_rgba(0,255,156,0.7)]"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: headerDelay }}
      >
        Kristal Sin
      </motion.h1>

      {/* Role & Location */}
      <motion.p
        className="text-lg text-green-300/90"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: headerDelay + 0.2 }}
      >
        Software Engineer
      </motion.p>
      <motion.p
        className="text-sm text-green-400/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: headerDelay + 0.4 }}
      >
        Brisbane, Australia 🇦🇺
      </motion.p>

      {/* Divider */}
      <div
        className="w-full border-t border-green-500/40 opacity-70 mt-3"
        aria-hidden="true"
      ></div>

      {/* Education */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: headerDelay + 0.6 }}
        className="space-y-2"
      >
        <p className="text-green-400 font-semibold">
          🎓 B.CompSci — Univeristy of Queensland, 2020-2023
        </p>
        <p className="text-green-300/90 text-sm">
          GPA: <span className="text-green-200 font-semibold">6.25 / 7</span>
        </p>
        <p className="text-green-500/70 text-sm">
          Relevant Coursework:
        </p>

        {/* Coursework list */}
        <motion.ul
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.05 } },
          }}
          className="space-y-1 pl-3"
        >
          {coursework.map((line, i) => (
            <motion.li
              key={i}
              variants={{
                hidden: { opacity: 0, x: -5 },
                show: { opacity: 1, x: 0 },
              }}
            >
              <TypingText text={line} speed={20} />
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      {/* Footer Divider */}
      <div
        className="w-full border-t border-green-500/40 opacity-70"
        aria-hidden="true"
      ></div>

      {/* Signature tagline */}
      <motion.p
        className="italic text-green-400/70 text-sm mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        “Half logic, half daydream -- fully me.”
      </motion.p>
    </motion.div>
  );
}
