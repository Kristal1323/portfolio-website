"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BootSequence from "./BootSequence";
import { executeCommand } from "./CommandRegistry";
import Projects from "./commands/Projects";

export default function Terminal() {
  const [booted, setBooted] = useState<boolean | null>(null);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{ input: string; output: React.ReactNode }[]>([]);
  const [currentCommand, setCurrentCommand] = useState<string | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
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
    const output = await executeCommand(cmd, setCurrentCommand, () => setBooted(null));
    setHistory((prev) => [...prev, { input: `$ ${cmd}`, output }]);
    setInput("");
  };

  const resetTerminal = () => {
    setBooted(null);
    setHistory([]);
    setInput("");
    setCurrentCommand(null);
    setIsMinimized(false);
    setIsFullScreen(false);
  };

  const handleMinimize = () => setIsMinimized(true);
  const handleRestore = () => setIsMinimized(false);
  const handleToggleFullScreen = () => setIsFullScreen((prev) => !prev);

  const terminalSizeClasses = isFullScreen
    ? "w-[98%] max-w-none min-h-[85vh]"
    : "w-[95%] md:w-[960px] max-w-[1100px]";

  const scrollAreaMaxHeight = isFullScreen ? "max-h-[78vh]" : "max-h-[60vh]";

  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-[60vh]">
      {isMinimized && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          onClick={handleRestore}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full border border-green-500/40 bg-black/80 text-green-300 font-mono text-sm shadow-lg hover:bg-green-500/10 transition-colors"
        >
          Restore KristalOS Terminal
        </motion.button>
      )}

      {!isMinimized && (
        <AnimatePresence mode="wait">
        {/* -------------------- POWER-OFF STATE -------------------- */}
        {booted === null && (
          <motion.div
            key="poweroff"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center font-mono text-green-400 space-y-4 bg-transparent"
          >
            {/* Glowing button */}
            <motion.button
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 18px rgba(0,255,156,0.8)",
              }}
              animate={{
                boxShadow: [
                  "0 0 8px rgba(0,255,156,0.4)",
                  "0 0 16px rgba(0,255,156,0.7)",
                  "0 0 8px rgba(0,255,156,0.4)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              onClick={() => setBooted(false)}
              className="border border-green-400/60 px-6 py-2 rounded-md bg-black/70 hover:bg-green-500/10 transition-all text-green-300 font-semibold relative overflow-hidden"
            >
              {/* Subtle scanline shimmer */}
              <motion.span
                className="absolute inset-0 bg-gradient-to-t from-transparent via-green-500/20 to-transparent"
                animate={{
                  y: ["100%", "-100%"],
                  opacity: [0, 0.15, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              ▶ Power On
            </motion.button>

            {/* Blinking hint text */}
            <motion.p
              className="text-green-500/70 text-sm italic mt-2 select-none"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            >
              Click to boot KristalOS terminal
            </motion.p>
          </motion.div>
        )}

        {/* -------------------- BOOT SEQUENCE -------------------- */}
        {booted === false && (
          <motion.div
            key="boot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`${terminalSizeClasses}`}
          >
            <BootSequence onBootComplete={() => setBooted(true)} />
          </motion.div>
        )}

        {/* -------------------- ACTIVE TERMINAL -------------------- */}
        {booted === true && (
          <motion.div
            key="terminal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className={`bg-[#0a0a0a]/95 border border-green-400/10 rounded-2xl shadow-2xl p-6 ${terminalSizeClasses} backdrop-blur-sm relative transition-all duration-300`}
          >
            {/* MacOS window dots */}
            <div className="flex gap-2 mb-4">
              <button
                aria-label="Close terminal"
                onClick={resetTerminal}
                className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"
              />
              <button
                aria-label="Minimize terminal"
                onClick={handleMinimize}
                className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-300 transition-colors"
              />
              <button
                aria-label={isFullScreen ? "Exit full screen" : "Enter full screen"}
                onClick={handleToggleFullScreen}
                className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors"
              />
            </div>

            <div
              className={`font-mono text-[var(--green)] leading-relaxed space-y-2 overflow-y-auto ${scrollAreaMaxHeight} scrollbar-terminal pr-1`}
            >
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
      )}
    </div>
  );
}
