import dynamic from "next/dynamic";

// Lazy load each command component
const WhoAmI = dynamic(() => import("./commands/WhoAmI"));
const Help = dynamic(() => import("./commands/Help"));
const Skills = dynamic(() => import("./commands/Skills"));
const Experience = dynamic(() => import("./commands/Experience"));
const Projects = dynamic(() => import("./commands/Projects"));

export async function executeCommand(
  cmd: string,
  setCurrentCommand: (cmd: string | null) => void
) {
  switch (cmd.toLowerCase()) {
    case "whoami":
      return <WhoAmI />;
    case "help":
      return <Help />;
    case "skills":
      return <Skills />;
    case "experience":
      return <Experience />;
    case "projects":
      setCurrentCommand("projects");
      return <Projects onExit={() => setCurrentCommand(null)} />;
    case "back":
      setCurrentCommand(null);
      return "Returning to terminal...";

    default:
      return (
        <p className="text-red-400">
          Command not found: <span className="font-semibold">{cmd}</span>
        </p>
      );
  }
}
