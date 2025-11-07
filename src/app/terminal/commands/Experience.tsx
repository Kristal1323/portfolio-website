"use client";

import { motion } from "framer-motion";
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
      },
    ],
  };

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

      {/* Divider */}
      <p className="text-green-500/70">
        ────────────────────────────────────────────────
      </p>

      {/* Timeline */}
      <motion.div
        variants={container}
        className="relative border-l border-green-500/40 pl-6 space-y-6"
      >
        {experience.rotations.map((rot, idx) => (
          <motion.div key={idx} variants={item} className="relative">
            {/* Timeline dot */}
            <BsFillCircleFill
              size={10}
              className="absolute -left-[6.5px] top-[6px] text-green-400 drop-shadow-[0_0_6px_rgba(0,255,156,0.8)]"
            />
            <div>
              <p className="font-semibold text-green-400">
                ⬥ {rot.name}
              </p>
              <p className="text-green-500/80 text-sm mb-1">{rot.period}</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                {rot.details.map((line, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-green-300/90 leading-relaxed"
                  >
                    {line}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Closing divider */}
      <p className="text-green-500/70">
        ────────────────────────────────────────────────
      </p>
    </motion.div>
  );
}
