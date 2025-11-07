"use client";
import { useEffect, useState, useRef } from "react";
import BootSequence from "./BootSequence";
import TypingText from "./TypingText";

export default function Terminal() {
  const [booted, setBooted] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{ input: string; output: string[] }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Simulate boot-up delay
  useEffect(() => {
    const timer = setTimeout(() => setBooted(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  // Auto-focus input
  useEffect(() => {
    if (booted) inputRef.current?.focus();
  }, [booted]);

  // Auto-scroll down when history updates
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    let output: string[] = [];

    switch (cmd) {
      case "whoami":
        output = [
          "Kristal Sin",
          "Software Engineer",
          "Brisbane, Australia 🇦🇺",
        ];
        break;

      case "help":
        output = [
          "Available commands:",
          "whoami     — show info about Kristal",
          "help       — list all commands",
        ];
        break;

      default:
        output = [`Command not found: ${cmd}`];
        break;
    }

    setHistory((prev) => [...prev, { input: `$ ${input}`, output }]);
    setInput("");
  };

  return (
    <div className="bg-[#0a0a0a]/95 border border-green-400/10 rounded-2xl shadow-2xl p-6 w-[90%] md:w-[700px] backdrop-blur-sm relative">
      {/* macOS dots */}
      <div className="flex gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>

      {!booted ? (
        <BootSequence />
      ) : (
        <div className="font-mono text-[var(--green)] leading-relaxed space-y-1 overflow-y-auto max-h-[60vh]">
          {history.map((entry, i) => (
            <div key={i} className="mb-2">
              <p className="text-green-400">{entry.input}</p>
              {entry.output.map((line, j) => (
                <TypingText key={j} text={line} speed={20} />
              ))}
            </div>
          ))}

          {/* Input line */}
          <form onSubmit={handleCommand} className="flex">
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
