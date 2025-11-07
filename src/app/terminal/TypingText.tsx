"use client";
import { useEffect, useState } from "react";

interface Props {
  text: string;
  speed?: number;
}

/**
 * Stable typing animation using substring slicing.
 * Never drops characters and works reliably across rerenders.
 */
export default function TypingText({ text, speed = 25 }: Props) {
  const safeText = typeof text === "string" ? text : "";
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);                      // reset counter each new text
    if (safeText.length === 0) return;

    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= safeText.length) clearInterval(id);
    }, speed);

    return () => clearInterval(id);
  }, [safeText, speed]);

  return <p>{safeText.slice(0, count)}</p>;
}
