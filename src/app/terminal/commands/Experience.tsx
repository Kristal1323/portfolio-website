"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsFillCircleFill } from "react-icons/bs";

export default function Experience() {
  const experience = {
    title: "Graduate Software Engineer — BHP",
    location: "Brisbane, QLD",
    period: "Feb 2024 – Present",
    summary:
      "Two-year rotational graduate program, transitioning through multiple technical teams every 6 months. Partnered with cross-functional teams in an Agile environment, driving delivery with Jira and Confluence.",
    rotations: [
      {
        name: "Data & Digital: People Domain",
        period: "Feb 2024 – Aug 2024",
        details: [
          "Developed and deployed a Random Forest-based ML model into an attendance tracking system to predict and flag roster-attendance mismatches, improving shift reliability and reducing manual discrepancies by ~40% across mine sites.",
        ],
      },
      {
        name: "Cyber Engineering",
        period: "Aug 2024 – Feb 2025",
        details: [
          "Implemented a new analytics feature for the internal phishing incident tracker, automating calculation of resolution times and surfacing triage insights via a dashboard, reducing average investigation time by ~30%.",
        ],
      },
      {
        name: "OFT BOME Engineering: BHP GenAI Agents Hub",
        period: "Feb 2025 – Aug 2025",
        details: [
          "Authored comprehensive technical documentation and onboarding guides detailing codebase architecture, Git workflows, and infrastructure (Terraform), accelerating developer ramp-up and reducing onboarding friction.",
          "Engineered and deployed a GenAI internal Streamlit web app on AWS leveraging Bedrock embeddings and OpenSearch vector search to enable dynamic document ingestion and improve semantic retrieval accuracy for automated customer insights.",
        ],
      },
      {
        name: "Data & Digital: Mining Domain",
        period: "Aug 2025 – Present",
        details: [
          "Building a scalable data synchronization service within BHP’s Haul Tune platform to integrate real-time haul-truck telemetry with Short Range Forecast data, focusing on high-throughput ETL pipelines.",
          "Designing scalable validation and reconciliation logic to align real-time machine activity with forecast plans across multiple mine sites.",
        ],
        active: true,
      },
    ],
  };

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i));

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 6 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={container}
      className="text-green-300 space-y-6"
    >
      {/* Intro */}
      <motion.div variants={item} className="font-mono text-green-400 mb-4">
        <p>[ EXPERIENCE LOG ]</p>
        <motion.p
          className="text-green-500/70 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          Initializing work history...
        </motion.p>
      </motion.div>

      {/* Header */}
      <motion.div variants={item}>
        <p className="text-green-400 font-semibold text-lg">
          {experience.title}
        </p>
        <p className="text-green-500/80">
          {experience.period} | {experience.location}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-green-300/90 max-w-3xl">
          {experience.summary}
        </p>
      </motion.div>

      <div className="w-full border-t border-green-500/40 opacity-70" />

      {/* Tip message */}
      <motion.p
        variants={item}
        className="text-green-500/60 text-xs italic mt-1"
      >
        Tip: click on each point to expand and view detailed experience.
      </motion.p>

      {/* Timeline */}
      <motion.div
        variants={container}
        className="relative border-l border-green-500/40 pl-6 space-y-6"
      >
        {experience.rotations.map((rot, idx) => (
          <motion.div
            key={idx}
            variants={item}
            transition={{ delay: idx * 0.15 }}
            className="relative"
          >
            {/* Dot */}
            <motion.div
              className={`absolute -left-[6.5px] top-[6px] ${
                rot.active
                  ? "text-green-400 drop-shadow-[0_0_10px_rgba(0,255,156,0.9)]"
                  : "text-green-500/70"
              }`}
              animate={rot.active ? { opacity: [0.5, 1, 0.5] } : { opacity: 1 }}
              transition={
                rot.active
                  ? { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
                  : {}
              }
            >
              <BsFillCircleFill size={10} />
            </motion.div>

            {/* Clickable summary */}
            <div
              onClick={() => toggle(idx)}
              className="cursor-pointer select-none"
            >
              <p className="font-semibold text-green-400 hover:text-green-200 transition-colors">
                ⬥ {rot.name}
              </p>
              <p className="text-green-500/80 text-sm mb-1">{rot.period}</p>
            </div>

            {/* Expandable details */}
            <AnimatePresence>
              {openIndex === idx && (
                <motion.ul
                  className="list-disc list-inside text-sm space-y-1 overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {rot.details.map((line, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="text-green-300/90 leading-relaxed"
                    >
                      {line}
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>

      <div className="w-full border-t border-green-500/40 opacity-70" />
    </motion.div>
  );
}
