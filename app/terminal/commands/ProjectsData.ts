export type Project = {
  id: string;
  name: string;
  language: string;
  file: string;
  description: string;
  link?: string;
};

export const projects: Project[] = [
  {
    id: "colorithm",
    name: "Colorithm",
    language: "Python",
    file: "main.py",
    description: `"Colorithm reimagines how people interact with color. Traditional color pickers rely on hue wheels or basic complementarity — Colorithm goes further by leveraging AI-driven aesthetic reasoning.

Using the Colormind deep learning model, it learns from thousands of examples in art, film stills, and photography to understand which colors feel right together rather than just matching mathematically.

Users can:
- Pick 1–2 base colors to guide the palette
- Let the model generate 5 harmonious swatches based on learned style patterns
- (Upcoming) Upload photos or artworks to extract refined palettes with balanced tones

Stack: Python, Streamlit, Pillow, Requests, Colormind API

Goal: Make color exploration intuitive, creative, and accessible — bridging the gap between human taste and machine intelligence.

Whether for fashion styling, home decor, art direction, or UI design, Colorithm helps creators find palettes that are not only technically balanced but emotionally resonant."`,
    link: "https://kwiskwis-colorithm.hf.space",
  },

  // Placeholder projects — easy to fill in later
  {
    id: "echohands",
    name: "EchoHands",
    language: "Python",
    file: "main.py",
    description: `EchoHands is a sign language recognition system that bridges communication between the Deaf and hearing communities. Using a CNN-based hand gesture recognition model, it interprets sign gestures in real time via webcam and translates them into text or speech output.

Stack: Python, TensorFlow, OpenCV, Streamlit
Goal: Improve accessibility through AI-driven communication tools.`,
  },
  {
    id: "stellarmind",
    name: "StellarMind",
    language: "TypeScript",
    file: "app.tsx",
    description: `StellarMind is a mindfulness and focus tracker powered by AI. It learns your mental rhythm by analyzing journaling patterns, break times, and productivity cycles — offering adaptive focus sessions and meditative insights.

Stack: Next.js, TypeScript, OpenAI API, Tailwind CSS
Goal: Combine cognitive science with design to help people with ADHD find flow, focus, and calm.`,
  },
];
