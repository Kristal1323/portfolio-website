"use client";
import { motion } from "framer-motion";

export default function Help() {
  const commands = [
    { cmd: "whoami", desc: "Show background information about Kristal." },
    { cmd: "experience", desc: "Display work experience timeline." },
    { cmd: "skills", desc: "List technical proficiencies and tools." },
    { cmd: "projects", desc: "Open the IDE–style project interface." },
    { cmd: "socials", desc: "Display LinkedIn, GitHub, and contact links." },
    { cmd: "resume", desc: "Preview and download a pdf file of Kristal's resume." },
    { cmd: "backlog", desc: "View the list of upcoming features and planned improvements."},
    { cmd: "message", desc: "Send an message to Kristal directly from the terminal." },
    { cmd: "quit", desc: "End the session with a cinematic outro." },
    { cmd: "help", desc: "Show this list of commands." },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.05 } },
      }}
      className="font-mono text-green-300 space-y-2"
    >
      <motion.p
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-green-400 font-semibold mb-2"
      >
        Available Commands:
      </motion.p>

      <div className="grid gap-2 sm:gap-3 overflow-visible px-2 md:px-4">
        {commands.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 0 18px rgba(0,255,166,0.35)",
              borderColor: "rgba(0,255,166,0.6)",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
            whileTap={{ scale: 0.98 }}
            className="flex w-full flex-col md:flex-row md:items-start md:gap-4 rounded-lg border border-green-500/20 bg-black/20 px-3 py-2 transition-all duration-200"
          >
            {/* Command name */}
            <motion.span
              className="text-green-400 font-bold tracking-wide md:min-w-[10ch] text-xs md:text-sm"
              whileHover={{
                color: "#00ffaa",
                textShadow: "0px 0px 8px rgba(0,255,156,0.8)",
              }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
            >
              {c.cmd}
            </motion.span>

            {/* Description */}
            <span className="text-green-200/90 text-sm">
              {c.desc}
            </span>
          </motion.div>
        ))}
      </div>

      <div
        className="w-full border-t border-green-500/40 opacity-70 mt-4"
        aria-hidden="true"
      ></div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-green-400/70 text-sm italic"
      >
        Tip: Type a command name and press{" "}
        <span className="text-green-300 font-semibold">Enter</span> to execute.
      </motion.p>
    </motion.div>
  );
}
