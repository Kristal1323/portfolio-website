"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "./ProjectsData";
import { FiPlay, FiX, FiFolder, FiFileText, FiArrowLeft, FiExternalLink } from "react-icons/fi";

export default function Projects({ onExit }: { onExit?: () => void }) {
  const [activeProject, setActiveProject] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    if (showPreview) {
      setIframeLoaded(false);
    }
  }, [showPreview]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="bg-[#1e1e1e] text-gray-200 rounded-lg shadow-xl overflow-hidden border border-[#3a3d41]"
    >
      {/* HEADER BAR */}
      <div className="flex items-center justify-between bg-[#3c3c3c] px-4 py-2 border-b border-[#1f1f1f]">
        <p className="text-[#d7ba7d] font-semibold text-sm tracking-wide">
          Kristal's Projects
        </p>
        <button
          onClick={onExit}
          className="flex items-center gap-1 text-white bg-[#0e639c] hover:bg-[#1177bb] px-2 py-1 rounded-md text-sm transition-colors"
        >
          <FiArrowLeft /> Back to Terminal
        </button>
      </div>

      {/* MAIN LAYOUT */}
      <div className="flex h-[520px]">
        {/* EXPLORER PANEL */}
        <div className="w-52 bg-[#252526] border-r border-[#1f1f1f] p-2">
          <p className="text-sm text-[#c586c0] font-semibold mb-2">EXPLORER</p>
          {projects.map((proj) => (
            <div key={proj.id} className="mb-2">
              {/* Folder */}
              <div className="flex items-center gap-2 mb-1 text-gray-200">
                <FiFolder className="text-[#dcdcdc]" />
                <p className="font-semibold">{proj.name}</p>
              </div>

              {/* File */}
              <button
                onClick={() => setActiveProject(proj)}
                className={`flex items-center gap-2 w-full text-left text-sm pl-6 py-1 rounded-md ${
                  activeProject?.id === proj.id
                    ? "bg-[#264f78] text-white"
                    : "hover:bg-white/10 text-[#d4d4d4]"
                }`}
              >
                <FiFileText /> {proj.file}
              </button>
            </div>
          ))}
        </div>

        {/* CODE EDITOR AREA */}
        <div className="flex-1 flex flex-col bg-[#1e1e1e]">
          {activeProject ? (
            <>
              {/* File Header */}
              <div className="flex justify-between items-center px-4 py-2 border-b border-[#1f1f1f] bg-[#2d2d2d]">
                <p className="text-[#9cdcfe] font-mono text-sm">
                  {activeProject.file}
                </p>

                {activeProject.link && (
                  <button
                    onClick={() => {
                      try {
                        setShowPreview(true);
                      } catch {
                        window.open(activeProject.link, "_blank");
                      }
                    }}
                    className="flex items-center gap-1 bg-[#0e639c] hover:bg-[#1177bb] px-2 py-1 rounded-md text-white text-sm transition-colors"
                  >
                    <FiPlay /> Run
                  </button>
                )}
              </div>

              {/* File Content */}
              <div className="flex-1 overflow-y-auto p-4 font-mono text-sm text-[#d4d4d4] whitespace-pre-line leading-relaxed">
                {activeProject.description}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-[#9cdcfe]/70 font-mono text-sm">
              Select a project file to open its content.
            </div>
          )}
        </div>
      </div>

      {/* TERMINAL FOOTER */}
      <div className="bg-[#1f2428] text-[#9cdcfe] font-mono text-sm px-4 py-2 border-t border-[#3a3d41]">
        <p>
          $ Click{" "}
          <span className="text-white font-semibold">Back to Terminal</span>{" "}
          to return.
        </p>
      </div>

      {/* PREVIEW POPUP */}
      <AnimatePresence>
        {showPreview && activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          >
            <div className="relative w-[90%] h-[80%] bg-[#1c1c1c] rounded-lg overflow-hidden border border-[#3a3d41] shadow-2xl">
              {/* Close and external buttons */}
              <div className="absolute top-2 right-2 flex items-center gap-2 z-10">
                <button
                  onClick={() =>
                    activeProject.link &&
                    window.open(activeProject.link, "_blank", "noopener,noreferrer")
                  }
                  className="text-white bg-transparent border border-white/40 hover:bg-white/10 px-3 py-1 rounded-full flex items-center gap-1 text-xs uppercase tracking-wide transition-colors"
                >
                  <FiExternalLink size={14} /> New Tab
                </button>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-white bg-[#0e639c] hover:bg-[#1177bb] p-2 rounded-full transition-colors"
                >
                  <FiX size={18} />
                </button>
              </div>

              {/* IFRAME */}
              <iframe
                src={activeProject.link}
                title={activeProject.name}
                className="w-full h-full"
                sandbox="allow-scripts allow-same-origin allow-forms"
                onLoad={() => setIframeLoaded(true)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
