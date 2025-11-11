"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BootSequence from "./BootSequence";
import { executeCommand } from "./CommandRegistry";
import Projects from "./commands/Projects";

export default function Terminal() {
  // null = powered off, false = booting, true = running
  const [booted, setBooted] = useState<boolean | null>(null);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{ input: string; output: React.ReactNode }[]>([]);
  const [currentCommand, setCurrentCommand] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (booted) inputRef.current?.focus();
  }, [booted]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim();
    const output = await executeCommand(cmd, setCurrentCommand, () => setBooted(null)); // back to power-off state
    setHistory((prev) => [...prev, { input: `$ ${cmd}`, output }]);
    setInput("");
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-[60vh]">
      <AnimatePresence mode="wait">
        {/* Power-off screen */}
        {booted === null && (
          <motion.div
            key="poweroff"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center font-mono text-green-400 space-y-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, textShadow: "0 0 10px rgba(0,255,156,0.8)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setBooted(false)}
              className="border border-green-400/60 px-6 py-2 rounded-md bg-black/60 hover:bg-green-500/10 transition"
            >
              ▶ Power On
            </motion.button>
            <p className="text-green-500/70 text-sm italic">
              Click to boot KristalOS terminal
            </p>
          </motion.div>
        )}

        {/* Boot sequence */}
        {booted === false && (
          <motion.div
            key="boot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-[95%] md:w-[960px] max-w-[1100px]"
          >
            <BootSequence onBootComplete={() => setBooted(true)} />
          </motion.div>
        )}

        {/* Active terminal */}
        {booted === true && (
          <motion.div
            key="terminal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-[#0a0a0a]/95 border border-green-400/10 rounded-2xl shadow-2xl p-6 w-[95%] md:w-[960px] max-w-[1100px] backdrop-blur-sm relative"
          >
            {/* MacOS window dots */}
            <div className="flex gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>

            {/* Terminal content */}
            <div className="font-mono text-[var(--green)] leading-relaxed space-y-2 overflow-y-auto max-h-[60vh]">
              {currentCommand === "projects" ? (
                <Projects onExit={() => setCurrentCommand(null)} />
              ) : (
                <>
                  {history.map((entry, i) => (
                    <div key={i}>
                      <p className="text-green-400">{entry.input}</p>
                      <div className="ml-4">{entry.output}</div>
                    </div>
                  ))}

                  <form onSubmit={handleCommand} className="flex mt-2">
                    <span className="text-green-400 mr-2">$</span>
                    <input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="bg-transparent border-none outline-none text-green-400 flex-1 caret-green-400"
                      placeholder="type a command..."
                      autoFocus
                    />
                  </form>

                  <div ref={terminalEndRef}></div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flicker / fade-to-black overlay when shutting down */}
      {booted === null && (
        <motion.div
          key="flicker"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.8, 0.3, 1],
            backgroundColor: ["#000000", "#0a0a0a", "#000000"],
          }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
          className="fixed inset-0 pointer-events-none"
        />
      )}
    </div>
  );
}
