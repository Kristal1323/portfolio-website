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
  SiAmazons3
} from "react-icons/si";
import { DiJava } from "react-icons/di";
import { TbBrandCSharp } from "react-icons/tb";
import { FaAws } from "react-icons/fa"; // fallback AWS icon

export default function Skills() {
  const skillGroups = [
    {
      title: "🧠 Languages",
      skills: [
        { name: "Python", icon: SiPython },
        { name: "Java", icon: DiJava },
        { name: "C#", icon: TbBrandCSharp }, 
        { name: "C", icon: SiC }, 
        { name: "JavaScript", icon: SiJavascript },
        { name: "TypeScript", icon: SiTypescript },
        { name: "HTML", icon: SiHtml5 },
        { name: "CSS", icon: SiCss3 }
      ],
    },
    {
      title: "⚙️ Frameworks & Libraries",
      skills: [
        { name: "React", icon: SiReact },
        { name: "Next.js", icon: SiNextdotjs },
        { name: "TailwindCSS", icon: SiTailwindcss },
        { name: "Framer Motion", icon: SiFramer },
      ],
    },
    {
      title: "☁️ Cloud / DevOps / OS",
      skills: [
        { name: "AWS", icon: FaAws },
        { name: "Terraform", icon: SiTerraform },
        { name: "Docker", icon: SiDocker },
        { name: "GitHub", icon: SiGithub },
        { name: "GitLab", icon: SiGitlab },
        { name: "Linux", icon: SiLinux },
      ],
    },
    {
      title: "🗄️ Databases & Storage",
      skills: [
        { name: "MySQL", icon: SiMysql},
        { name: "PostgresSQL", icon: SiPostgresql},
        { name: "DynamoDB", icon: SiAmazondynamodb},
        { name: "Amazon S3", icon: SiAmazons3 },
      ],
    },
    {
      title: "🧰 Tools & Collaboration",
      skills: [
        { name: "Jira", icon: SiJira },
        { name: "Confluence", icon: SiConfluence },
      ],
    },
  ];

  // parent variant for staggered animation
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
      },
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
        <motion.div
          key={idx}
          variants={item}
          transition={{ delay: idx * 0.2 }}
          className="overflow-hidden"
        >
          {/* Divider */}
          <div
            className="w-full border-t border-green-500/40 opacity-70 mb-3"
            aria-hidden="true"
          ></div>

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
                    boxShadow: "0 0 10px rgba(0,255,156,0.5)",
                    borderColor: "rgba(0,255,156,0.6)",
                  }}
                  transition={{ type: "spring", stiffness: 250 }}
                  className="flex items-center gap-2 border border-green-400/30 rounded-md px-3 py-1.5 bg-[#0b0b0b]/80 hover:bg-[#0f0f0f] cursor-default"
                >
                  <Icon className="text-green-400" />
                  <span className="text-sm">{s.name}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      ))}

      {/* Closing divider */}
      <motion.div
        variants={item}
        className="w-full border-t border-green-500/40 opacity-70"
        aria-hidden="true"
      ></motion.div>
    </motion.div>
  );
}
