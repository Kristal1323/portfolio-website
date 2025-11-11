import dynamic from "next/dynamic";

const WhoAmI = dynamic(() => import("./commands/WhoAmI"));
const Help = dynamic(() => import("./commands/Help"));
const Skills = dynamic(() => import("./commands/Skills"));
const Experience = dynamic(() => import("./commands/Experience"));
const Projects = dynamic(() => import("./commands/Projects"));
const Socials = dynamic(() => import("./commands/Socials"));
const Resume = dynamic(() => import("./commands/Resume"));
const Message = dynamic(() => import("./commands/Message"));
const Quit = dynamic(() => import("./commands/Quit"));

export async function executeCommand(
  cmd: string,
  setCurrentCommand: (cmd: string | null) => void,
  onExit?: () => void      // 👈 add this optional callback
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
    case "socials":
      return <Socials />;
    case "resume":
      return <Resume />;
    case "message":
      return <Message />;
    case "quit":
      return <Quit onExit={onExit} />;   // ✅ use the callback from props

    default:
      return (
        <p className="text-red-400">
          Command not found: <span className="font-semibold">{cmd}</span>
        </p>
      );
  }
}
