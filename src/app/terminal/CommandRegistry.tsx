import dynamic from "next/dynamic";

// Lazy load each command component
const WhoAmI = dynamic(() => import("./commands/WhoAmI"));
const Help = dynamic(() => import("./commands/Help"));
const Skills = dynamic(() => import("./commands/Skills"));
// const Experience = dynamic(() => import("./commands/Experience"));

export async function executeCommand(cmd: string) {
  switch (cmd.toLowerCase()) {
    case "whoami":
      return <WhoAmI />;
    case "help":
      return <Help />;
    case "skills":
      return <Skills />;
    // case "experience":
    //   return <Experience />;
    default:
      return <p className="text-red-400">Command not found: {cmd}</p>;
  }
}
