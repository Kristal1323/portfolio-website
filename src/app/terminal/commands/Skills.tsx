"use client";

import { motion } from "framer-motion";
import {
  SiPython,
  SiC,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiFramer,
  SiTerraform,
  SiHtml5,
  SiCss3,
  SiDocker,
  SiGithub,
  SiGitlab,
  SiAmazondynamodb,
  SiLinux,
  SiJira,
  SiConfluence,
  SiMysql,
  SiPostgresql,
  SiAmazons3,
} from "react-icons/si";
import { DiJava } from "react-icons/di";
import { TbBrandCSharp } from "react-icons/tb";
import { FaAws } from "react-icons/fa";

export default function Skills() {
  const skillGroups = [
    {
      title: "🧠 Languages",
      skills: [
        { name: "Python", icon: SiPython, color: "#3776AB" },
        { name: "Java", icon: DiJava, color: "#E11E24" },
        { name: "C#", icon: TbBrandCSharp, color: "#68217A" },
        { name: "C", icon: SiC, color: "#A8B9CC" },
        { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
        { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
        { name: "HTML", icon: SiHtml5, color: "#E34F26" },
        { name: "CSS", icon: SiCss3, color: "#1572B6" },
      ],
    },
    {
      title: "⚙️ Frameworks & Libraries",
      skills: [
        { name: "React", icon: SiReact, color: "#61DAFB" },
        { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
        { name: "TailwindCSS", icon: SiTailwindcss, color: "#06B6D4" },
        { name: "Framer Motion", icon: SiFramer, color: "#E24064" },
      ],
    },
    {
      title: "☁️ Cloud / DevOps / OS",
      skills: [
        { name: "AWS", icon: FaAws, color: "#FF9900" },
        { name: "Terraform", icon: SiTerraform, color: "#7B42BC" },
        { name: "Docker", icon: SiDocker, color: "#2496ED" },
        { name: "GitHub", icon: SiGithub, color: "#FFFFFF" },
        { name: "GitLab", icon: SiGitlab, color: "#FC6D26" },
        { name: "Linux", icon: SiLinux, color: "#FCC624" },
      ],
    },
    {
      title: "🗄️ Databases & Storage",
      skills: [
        { name: "MySQL", icon: SiMysql, color: "#4479A1" },
        { name: "PostgresSQL", icon: SiPostgresql, color: "#336791" },
        { name: "DynamoDB", icon: SiAmazondynamodb, color: "#4053D6" },
        { name: "Amazon S3", icon: SiAmazons3, color: "#569A31" },
      ],
    },
    {
      title: "🧰 Tools & Collaboration",
      skills: [
        { name: "Jira", icon: SiJira, color: "#0052CC" },
        { name: "Confluence", icon: SiConfluence, color: "#172B4D" },
      ],
    },
  ];

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.08 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 4 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={container}
      className="space-y-6 text-green-300"
    >
      {skillGroups.map((group, idx) => (
        <motion.div key={idx} variants={item} className="overflow-hidden">
          {/* Divider */}
          <div className="w-full border-t border-green-500/40 opacity-70 mb-3" />
          {/* Section Title */}
          <motion.p
            variants={item}
            className="mb-3 font-semibold tracking-wide text-green-400"
          >
            {group.title}
          </motion.p>

          {/* Skill Badges */}
          <motion.div
            className="flex flex-wrap gap-2"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {group.skills.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={i}
                  variants={item}
                  whileHover={{
                    scale: 1.08,
                    boxShadow: `0 0 10px ${s.color}`,
                    borderColor: s.color,
                  }}
                  transition={{ type: "spring", stiffness: 250 }}
                  className="flex items-center gap-2 border border-green-400/30 rounded-md px-3 py-1.5 bg-[#0b0b0b]/80 hover:bg-[#0f0f0f] cursor-default"
                >
                  <Icon className="text-lg" style={{ color: s.color }} />
                  <span className="text-sm text-green-100">{s.name}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      ))}

      <motion.div
        variants={item}
        className="w-full border-t border-green-500/40 opacity-70"
      />
    </motion.div>
  );
}
