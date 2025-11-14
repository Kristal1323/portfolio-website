export type Project = {
  id: string;
  name: string;
  language: string;
  file: string;
  description: string;
  link?: string;
};

const paragraph = (lines: string[]) => lines.join("\n");

export const projects: Project[] = [
  {
    id: "colorithm",
    name: "Colorithm",
    language: "Python",
    file: "main.py",
    description: paragraph([
      '"Colorithm reimagines how people interact with color. Traditional color pickers rely on hue wheels or basic complementarity — Colorithm goes further by leveraging AI-driven aesthetic reasoning.',
      '',
      'Using the Colormind deep learning model, it learns from thousands of examples in art, film stills, and photography to understand which colors feel right together rather than just matching mathematically.',
      '',
      'Users can:',
      '- Option 1: Pick 1–2 base colors to guide the palette',
      '- Option 2: Upload photos or artworks to extract refined palettes with balanced tones',
      '- Let the model generate 5 harmonious swatches based on learned style patterns',
      '',
      'Stack: Python, Streamlit, Pillow, Requests, Colormind API',
      '',
      'Goal: Make color exploration intuitive, creative, and accessible — bridging the gap between human taste and machine intelligence.',
      '',
      'Whether for fashion styling, home decor, art direction, or UI design, Colorithm helps creators find palettes that are not only technically balanced but emotionally resonant."',
    ]),
    link: "https://kwiskwis-colorithm.hf.space",
  },
  {
    id: "hexplore",
    name: "Hexplore",
    language: "Python",
    file: "main.py",
    description: paragraph([
      '"Hexplore is an interactive unified intelligent agent for navigating a hex-grid environment under increasing uncertainty. It demonstrates three different approaches to autonomous decision-making.',
      'Hexplore places one agent in a shared environment and shows how its behaviour changes when the world becomes deterministic, probabilistic, or completely unknown.',
      '',
      'The simulation highlights three core AI paradigms:',
      '',
      'Deterministic Planning (UCS/A*)',
      'The agent computes the lowest-cost path when every action behaves exactly as expected. This mode visualizes classical graph search expanding nodes, evaluating paths, and converging on an optimal solution.',
      '',
      'Stochastic Decision-Making (MDP Value & Policy Iteration)',
      'When actions can drift or produce multiple outcomes, the agent switches to MDP planning. It evaluates expected rewards, updates value functions, and produces stable policies that handle uncertainty built into the environment.',
      '',
      'Model-Free Learning (Q-Learning / SARSA)',
      'When transition probabilities and penalties are hidden, the agent must learn the environment from scratch. Through repeated interaction, it updates Q-values, balances exploration vs. exploitation, and gradually discovers an effective policy without any prior model.',
      '',
      'Users can:',
      '- Run each decision mode in the same hex-grid environment',
      '- Watch search, planning, and RL unfold through visual animations',
      '- Compare how the agent behaves as environmental assumptions change',
      '- Inspect value maps, policy arrows, and RL learning progress',
      '- Switch between deterministic, stochastic, and unknown dynamics in real time',
      '',
      'Stack: Python, Next.js, React, JavaScript, Canvas API',
      '',
      'Goal: To provide a clear, interactive way to observe how a single agent adapts its strategy as uncertainty increases—bridging classical search, stochastic planning, and reinforcement learning into a single, intuitive environment."',
    ]),
  },
  {
    id: "schrodingersword",
    name: "Schrödinger's Word",
    language: "Python",
    file: "main.py",
    description: paragraph([
      '"UPCOMING PROJECT"',
      '"Schrödinger’s Word will be a cross-platform tool designed to strengthen vocabulary by breaking down how meaning will actually work in real contexts. Instead of treating words as single fixed definitions, the app will show how they shift depending on tone, phrasing, and surrounding clues.',
      '',
      'The system will be organized into four focused modules:',
      '',
      'Semantic Gradients: Users will compare closely related words to see how they differ in strength, nuance, or specificity.',
      '',
      'Connotation Analysis: The app will examine how tone, emotional weight, and implied attitude change the meaning a word carries.',
      '',
      'Inference Tasks: Learners will practice using surrounding context to determine which interpretation of a word fits best.',
      '',
      'Figurative Usage: Explore metaphors, symbolic phrasing, and other non-literal ways words convey meaning.',
      '',
      'These modules will be powered by embeddings, NLI models, and lightweight LLM reasoning, allowing the tool to highlight subtle differences between related terms and show why certain interpretations will make more sense in a given sentence.',
      '',
      'Stack: Next.js, React Native, Expo, Python, OpenAI API, Hugging Face models',
      '',
      'Goal: Help users build a deeper, more intuitive understanding of word choice, contextual meaning, and semantic nuance — useful for learners, writers, test prep, and anyone wanting sharper reading and communication skills."',
    ]),
  },
];
