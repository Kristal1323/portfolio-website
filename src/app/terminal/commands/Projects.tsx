"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "./ProjectsData";
import { FiPlay, FiX, FiFolder, FiFileText, FiArrowLeft } from "react-icons/fi";

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
      className="bg-[#1e1e1e] text-gray-200 rounded-lg shadow-xl overflow-hidden border border-green-400/20"
    >
      {/* HEADER BAR */}
      <div className="flex items-center justify-between bg-[#2d2d2d] px-4 py-2 border-b border-green-400/20">
        <p className="text-green-400 font-semibold text-sm tracking-wide">
          Kristal's Projects
        </p>
        <button
          onClick={onExit}
          className="flex items-center gap-1 text-green-300 hover:text-green-100 bg-green-500/10 hover:bg-green-500/20 px-2 py-1 rounded-md text-sm"
        >
          <FiArrowLeft /> Back to Terminal
        </button>
      </div>

      {/* MAIN LAYOUT */}
      <div className="flex h-[520px]">
        {/* EXPLORER PANEL */}
        <div className="w-52 bg-[#252526] border-r border-green-500/10 p-2">
          <p className="text-sm text-green-400 font-semibold mb-2">EXPLORER</p>
          {projects.map((proj) => (
            <div key={proj.id} className="mb-2">
              {/* Folder */}
              <div className="flex items-center gap-2 mb-1 text-green-300">
                <FiFolder className="text-green-400" />
                <p className="font-semibold">{proj.name}</p>
              </div>

              {/* File */}
              <button
                onClick={() => setActiveProject(proj)}
                className={`flex items-center gap-2 w-full text-left text-sm pl-6 py-1 rounded-md ${
                  activeProject?.id === proj.id
                    ? "bg-green-500/10 text-green-300"
                    : "hover:bg-green-400/10 text-green-200"
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
              <div className="flex justify-between items-center px-4 py-2 border-b border-green-400/10 bg-[#2d2d2d]">
                <p className="text-green-300 font-mono text-sm">
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
                    className="flex items-center gap-1 bg-green-500/10 hover:bg-green-500/20 px-2 py-1 rounded-md text-green-300 text-sm"
                  >
                    <FiPlay /> Run
                  </button>
                )}
              </div>

              {/* File Content */}
              <div className="flex-1 overflow-y-auto p-4 font-mono text-sm text-green-200 whitespace-pre-line leading-relaxed">
                {activeProject.description}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-green-400/70 font-mono text-sm">
              Select a project file to open its code.
            </div>
          )}
        </div>
      </div>

      {/* TERMINAL FOOTER */}
      <div className="bg-black text-green-400 font-mono text-sm px-4 py-2 border-t border-green-400/20">
        <p>
          $ Click{" "}
          <span className="text-green-200 font-semibold">Back to Terminal</span>{" "}
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
            <div className="relative w-[90%] h-[80%] bg-[#111] rounded-lg overflow-hidden border border-green-400/30 shadow-2xl">
              {/* Close button */}
              <button
                onClick={() => setShowPreview(false)}
                className="absolute top-2 right-2 text-green-300 hover:text-green-100 bg-green-500/10 hover:bg-green-500/20 p-2 rounded-full z-10"
              >
                <FiX size={18} />
              </button>

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
