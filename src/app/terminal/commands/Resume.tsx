 "use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiDownload, FiExternalLink } from "react-icons/fi";

export default function Resume() {
  const [loading, setLoading] = useState(true);
  const [dots, setDots] = useState(".");

  // Simple animated “fetching” effect
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length === 3 ? "." : prev + "."));
    }, 400);
    const timeout = setTimeout(() => {
      clearInterval(interval);
      setLoading(false);
    }, 2000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const resumeUrl = "/resume_kristalsin.pdf"; // make sure this file is placed in /public

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4 font-mono text-green-300"
    >
      {loading ? (
        <p>Fetching resume{dots}</p>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-3"
        >
          <p className="text-green-400 font-semibold">
            ✅ Resume fetched successfully!
          </p>
          <p className="text-green-200 text-sm">
            Choose an option below to view or download:
          </p>

          <div className="flex gap-4 mt-2">
            {/* View button */}
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-green-500/40 px-3 py-1.5 rounded-md hover:bg-green-500/10 transition"
            >
              <FiExternalLink /> View PDF
            </a>

            {/* Download button */}
            <a
              href={resumeUrl}
              download="Kristal_Sin_Resume.pdf"
              className="flex items-center gap-2 border border-green-500/40 px-3 py-1.5 rounded-md hover:bg-green-500/10 transition"
            >
              <FiDownload /> Download
            </a>
          </div>

          <p className="text-xs text-green-500/70 mt-3">
            Tip: you can type <span className="text-green-300">'resume'</span> anytime to access this again.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
