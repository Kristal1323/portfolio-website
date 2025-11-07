import TypingText from "../TypingText";

export default function WhoAmI() {
  const lines = [
    "Kristal Sin",
    "Software Engineer",
    "Brisbane, Australia",
    "",
    "Bachelor of Computer Science — University of Queensland, July 2023",
    "GPA: 6.25/7 | Relevant Coursework:",
    "→ Introduction to Software Engineering",
    "→ Computer Systems Principles & Programming",
    "→ Algorithms & Data Structures",
    "→ Artificial Intelligence",
    "→ Cloud Computing",
    "→ Web/Mobile Programming",
    "→ Fundamentals of Data Science",
    "→ Information Systems"
  ];

  return (
    <div>
      {lines.map((line, i) => (
        <TypingText key={i} text={line} speed={20} />
      ))}
    </div>
  );
}
