"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Socials() {
  const socials = [
    {
      name: "LinkedIn",
      icon: <FaLinkedin className="text-[#0A66C2]" />,
      url: "https://www.linkedin.com/in/kyi-phyu-sin-ks613",
      color: "hover:text-[#0A66C2]",
    },
    {
      name: "GitHub",
      icon: <FaGithub className="text-gray-300" />,
      url: "https://github.com/Kristal1323",
      color: "hover:text-gray-200",
    },
    {
      name: "Gmail",
      icon: <FaEnvelope className="text-[#EA4335]" />,
      url: "mailto:kristalsin23@gmail.com",
      color: "hover:text-[#EA4335]",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      <p className="text-green-300 font-semibold text-sm">
        CONNECT WITH ME:
      </p>

      <div className="flex flex-col space-y-3">
        {socials.map((item, i) => (
          <motion.a
            key={i}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-3 text-green-200 transition-colors duration-200 ${item.color}`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-mono text-sm">{item.name}</span>
          </motion.a>
        ))}
      </div>

      <p className="text-green-500/60 text-xs mt-4">
        Tip: click an icon or label to open it in a new tab.
      </p>
    </motion.div>
  );
}
