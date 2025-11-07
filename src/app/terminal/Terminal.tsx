"use client";

import { useState, useRef, useEffect } from "react";
import BootSequence from "./BootSequence";
import { executeCommand } from "./CommandRegistry";
import TypingText from "./TypingText";

export default function Terminal() {
  const [booted, setBooted] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{ input: string; output: React.ReactNode }[]>([]);
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
    const output = await executeCommand(cmd);
    setHistory((prev) => [...prev, { input: `$ ${cmd}`, output }]);
    setInput("");
  };

  return (
    <div className="bg-[#0a0a0a]/95 border border-green-400/10 rounded-2xl shadow-2xl p-6 w-[90%] md:w-[700px] backdrop-blur-sm relative">
      <div className="flex gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>

      {/* ↓↓↓ The important part ↓↓↓ */}
      {!booted ? (
        <BootSequence onBootComplete={() => setBooted(true)} />
      ) : (
        <div className="font-mono text-[var(--green)] leading-relaxed space-y-2 overflow-y-auto max-h-[60vh]">
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
        </div>
      )}
    </div>
  );
}
