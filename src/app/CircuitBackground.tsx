"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

interface Node {
  x: number;
  y: number;
  color: string;
  delay: number;
  duration: number;
}

export default function CircuitBackground() {
  const colors = ["#00ff9c", "#00ccff", "#b388ff", "#ff66cc"];
  const [nodes, setNodes] = useState<Node[]>([]);

  // Generate nodes client-side to avoid SSR mismatch
  useEffect(() => {
    const genNodes = Array.from({ length: 30 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 5,
      duration: 1.5 + Math.random() * 2,
    }));
    setNodes(genNodes);
  }, []);

  // Compute nearest-node connections
  const connections = useMemo(() => {
    const lines: { x1: number; y1: number; x2: number; y2: number; color: string }[] = [];
    if (nodes.length === 0) return lines;

    for (let i = 0; i < nodes.length; i++) {
      const n1 = nodes[i];
      const nearest = [...nodes]
        .filter((_, j) => j !== i)
        .sort(
          (a, b) =>
            (n1.x - a.x) ** 2 + (n1.y - a.y) ** 2 -
            ((n1.x - b.x) ** 2 + (n1.y - b.y) ** 2)
        )
        .slice(0, 3); // 3 nearest

      nearest.forEach((n2) =>
        lines.push({
          x1: n1.x,
          y1: n1.y,
          x2: n2.x,
          y2: n2.y,
          color: n1.color,
        })
      );
    }
    return lines;
  }, [nodes]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* 🌌 Layer 1 – Base dark gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#001010_0%,#000_80%)]" />

      {/* 🟩 Layer 2 – Matrix grid background */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(#00ff9c12 1px, transparent 1px), linear-gradient(90deg, #00ff9c12 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        animate={{ backgroundPosition: ["0px 0px", "40px 40px"] }}
        transition={{ duration: 25, ease: "linear", repeat: Infinity }}
      />

      {/* ⚡️ Layer 3 – Circuit connections */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {connections.map((line, i) => (
          <motion.line
            key={i}
            x1={`${line.x1}%`}
            y1={`${line.y1}%`}
            x2={`${line.x2}%`}
            y2={`${line.y2}%`}
            stroke={line.color}
            strokeWidth="0.4"
            strokeOpacity="0.35"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.2, 0.9, 0.3, 0.7, 0.2] }}
            transition={{
              duration: 5 + Math.random() * 3,
              delay: Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      {/* 💡 Layer 4 – Pulsing nodes */}
      {nodes.map((node, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: "7px",
            height: "7px",
            backgroundColor: node.color,
            boxShadow: `0 0 12px ${node.color}`,
          }}
          animate={{
            opacity: [0, 1, 0.4, 1, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: node.duration,
            delay: node.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* 🌈 Layer 5 – Global hue shift for subtle color movement */}
      <div className="absolute inset-0 mix-blend-screen animate-hueShift" />

      <style jsx global>{`
        @keyframes hueShift {
          0% {
            filter: hue-rotate(0deg);
          }
          100% {
            filter: hue-rotate(360deg);
          }
        }
        .animate-hueShift {
          animation: hueShift 80s linear infinite;
        }
      `}</style>
    </div>
  );
}
